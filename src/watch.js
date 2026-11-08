// "Watch this price": the Worker side. A guest picks a sailing, a date and a room
// category on /sailings/<id>/, and gets an email when that fare drops. Watches live
// in D1 (the WATCH_DB binding); a cron trigger checks them against /fares.json,
// which the daily trends build publishes. The rules and the emails are in
// app/lib/watch.js so they can be tested without a network.
//
// Everything here stays quiet when WATCH_DB is not bound, so a deploy never
// depends on the database existing.

import { findItinerary, buildGuide, futureDates, diffDays } from "../app/lib/guide.js";
import {
  WATCH_ROOMS,
  FARES_FRESH_DAYS,
  MAX_WATCHES_PER_EMAIL,
  priceFor,
  judge,
  buildWatchConfirmEmail,
  buildWatchAlertEmail,
} from "../app/lib/watch.js";

const SITE = "https://mvascruisedeals.com";
const FROM = (env) => env.QUOTE_FROM || "MVAS Cruise Deals <noreply@cttagents.com>";
const REPLY = (env) => env.QUOTE_NOTIFY_TO || "brentb@cruisestoursandtravel.com";
const MAX_SENDS_PER_RUN = 100;

let schemaReady = false;
async function ensureSchema(db) {
  if (schemaReady) return;
  await db.batch([
    db.prepare(
      `CREATE TABLE IF NOT EXISTS watches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL,
        first_name TEXT NOT NULL DEFAULT '',
        last_name TEXT NOT NULL DEFAULT '',
        sailing TEXT NOT NULL,
        date TEXT NOT NULL,
        room TEXT NOT NULL,
        start_price INTEGER NOT NULL,
        last_price INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        last_alert_at TEXT,
        alerts_sent INTEGER NOT NULL DEFAULT 0,
        active INTEGER NOT NULL DEFAULT 1,
        UNIQUE (email, sailing, date, room)
      )`
    ),
    db.prepare("CREATE INDEX IF NOT EXISTS watches_active ON watches (active, date)"),
  ]);
  schemaReady = true;
}

const todayUTC = () => new Date().toISOString().slice(0, 10);

// Today's fares, or null when the file is missing or too old to quote.
async function loadFares(env) {
  try {
    const r = await env.ASSETS.fetch(new Request(SITE + "/fares.json"));
    if (!r.ok) return null;
    const f = await r.json();
    if (!f || !f.fares || !f.asOf) return null;
    if (diffDays(todayUTC(), f.asOf) > FARES_FRESH_DAYS) return null;
    return f;
  } catch {
    return null;
  }
}

const links = (w) => ({
  guideUrl: SITE + "/guide/?s=" + encodeURIComponent(w.sailing) + "&d=" + w.date,
  stopUrl: SITE + "/watch/stop/?t=" + w.token,
  oneClickUrl: SITE + "/api/watch/stop?t=" + w.token,
});
const unsubscribeHeaders = (oneClickUrl) => ({
  "List-Unsubscribe": "<" + oneClickUrl + ">",
  "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
});

function labelFor(w) {
  const it = findItinerary(w.sailing);
  if (!it) return null;
  const g = buildGuide(it, w.date, todayUTC());
  const quoteUrl =
    SITE + "/contact/?" +
    new URLSearchParams({ cruise: g.fullTitle, ship: g.ship, when: g.depLong.replace(/^\w+, /, "") }).toString();
  return { cruise: g.fullTitle, ship: g.ship, depLong: g.depLong, quoteUrl };
}

// POST /api/watch
export async function handleWatch(request, env, h) {
  const { clean, isEmail, json, throttled, sendResend, shortHash } = h;
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: h.corsHeaders() });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!env.WATCH_DB) return json({ error: "Price alerts are not switched on yet. Please call or text (561) 777-9911." }, 503);

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  if (clean(body.company_website, 200)) return json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 160).toLowerCase();
  const missing = [];
  if (!name || name.split(/\s+/).length < 2) missing.push("your first and last name");
  if (!email || !isEmail(email)) missing.push("a valid email");
  if (missing.length) return json({ error: "Please add " + missing.join(" and ") + "." }, 400);

  const it = findItinerary(clean(body.sailing, 200));
  if (!it) return json({ error: "Please pick a cruise from the list." }, 400);
  const today = todayUTC();
  const date = clean(body.date, 12);
  if (futureDates(it, today).indexOf(date) === -1) return json({ error: "Please choose a sailing date." }, 400);
  const room = clean(body.room, 20);
  if (WATCH_ROOMS.indexOf(room) === -1) return json({ error: "Please choose a stateroom category." }, 400);

  const fares = await loadFares(env);
  if (!fares) return json({ error: "Fares are being refreshed. Please try again in a little while." }, 503);
  const price = priceFor(fares, it.id, date, room);
  if (price === null) return json({ error: "That category is not on sale right now. Please choose another." }, 400);

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (await throttled("watch-ip-" + ip, 20)) return json({ error: "Please wait a moment and try again." }, 429);

  const db = env.WATCH_DB;
  try {
    await ensureSchema(db);
    const have = await db
      .prepare("SELECT COUNT(*) AS n FROM watches WHERE email = ? AND active = 1")
      .bind(email)
      .first();
    const same = await db
      .prepare("SELECT id FROM watches WHERE email = ? AND sailing = ? AND date = ? AND room = ? AND active = 1")
      .bind(email, it.id, date, room)
      .first();
    if (!same && have && have.n >= MAX_WATCHES_PER_EMAIL) {
      return json({ error: "You are already watching " + MAX_WATCHES_PER_EMAIL + " prices. Stop one first, or call or text (561) 777-9911." }, 400);
    }
    const parts = name.split(/\s+/);
    await db
      .prepare(
        `INSERT INTO watches (token, email, first_name, last_name, sailing, date, room, start_price, last_price, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT (email, sailing, date, room) DO UPDATE SET
           active = 1, first_name = excluded.first_name, last_name = excluded.last_name,
           start_price = excluded.start_price, last_price = excluded.last_price`
      )
      .bind(crypto.randomUUID(), email, parts[0], parts.slice(1).join(" "), it.id, date, room, price, price, new Date().toISOString())
      .run();
    const w = await db
      .prepare("SELECT * FROM watches WHERE email = ? AND sailing = ? AND date = ? AND room = ?")
      .bind(email, it.id, date, room)
      .first();

    const label = labelFor(w);
    const { guideUrl, stopUrl, oneClickUrl } = links(w);

    // File the person in CTT like every other signup (best effort; the watch is already saved).
    let filed = false;
    try {
      const r = await fetch(
        "https://cttagents.com/api/public/forms/" + encodeURIComponent(env.ALERTS_FORM_SLUG || "mvas-deal-alerts"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: parts[0],
            last_name: parts.slice(1).join(" "),
            email,
            notes:
              "Watching a price on mvascruisedeals.com: " + label.cruise + " aboard Margaritaville at Sea " + label.ship +
              ", " + label.depLong + ", " + room + " from $" + price + ". Guide: " + guideUrl,
            company_website: "",
          }),
        }
      );
      const data = await r.json().catch(() => ({}));
      filed = r.ok && data && data.ok !== false && !data.error;
    } catch {
      filed = false;
    }

    let emailed = false;
    if (!(await throttled("watch-email-" + (await shortHash(email + it.id + date + room)), 600))) {
      const mail = buildWatchConfirmEmail({ first: parts[0], ...label, room, price, guideUrl, stopUrl });
      emailed = await sendResend(env, {
        from: FROM(env),
        to: [email],
        reply_to: REPLY(env),
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        headers: unsubscribeHeaders(oneClickUrl),
      });
    }
    return json({ ok: true, price, filed, emailed });
  } catch (e) {
    return json({ error: "Something went wrong. Please call or text (561) 777-9911." }, 502);
  }
}

// POST /api/watch/stop  (token in the query for the mail client's one-click unsubscribe,
// or in the JSON body from the stop page; { all: true } stops every watch for that address)
export async function handleStop(request, env, h) {
  const { clean, json } = h;
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: h.corsHeaders() });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!env.WATCH_DB) return json({ error: "Price alerts are not switched on." }, 503);

  const url = new URL(request.url);
  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const token = clean(url.searchParams.get("t") || body.token, 80);
  if (!token) return json({ error: "That link is missing its code." }, 400);

  const db = env.WATCH_DB;
  try {
    await ensureSchema(db);
    const w = await db.prepare("SELECT email FROM watches WHERE token = ?").bind(token).first();
    if (!w) return json({ error: "That link is no longer valid." }, 404);
    const r =
      body.all === true
        ? await db.prepare("UPDATE watches SET active = 0 WHERE email = ?").bind(w.email).run()
        : await db.prepare("UPDATE watches SET active = 0 WHERE token = ?").bind(token).run();
    return json({ ok: true, stopped: (r.meta && r.meta.changes) || 0 });
  } catch {
    return json({ error: "Something went wrong. Please reply to any of my emails and I will stop it by hand." }, 502);
  }
}

// Cron: compare every active watch with today's fares and email the drops.
export async function checkWatches(env, h) {
  if (!env.WATCH_DB) return { skipped: "no database" };
  const db = env.WATCH_DB;
  await ensureSchema(db);
  const fares = await loadFares(env);
  if (!fares) return { skipped: "no fresh fares" };
  const today = todayUTC();
  const { results } = await db.prepare("SELECT * FROM watches WHERE active = 1 ORDER BY id LIMIT 2000").all();
  let alerts = 0;
  let expired = 0;
  for (const w of results || []) {
    const v = judge(w, fares, today);
    if (v.action === "expire") {
      await db.prepare("UPDATE watches SET active = 0 WHERE id = ?").bind(w.id).run();
      expired += 1;
      continue;
    }
    if (v.action !== "alert" || alerts >= MAX_SENDS_PER_RUN) continue;
    const label = labelFor(w);
    if (!label) continue;
    // Claim the drop first, so two overlapping runs cannot email the same one twice.
    const claim = await db
      .prepare("UPDATE watches SET last_price = ?, last_alert_at = ?, alerts_sent = alerts_sent + 1 WHERE id = ? AND last_price = ?")
      .bind(v.now, new Date().toISOString(), w.id, w.last_price)
      .run();
    if (!claim.meta || claim.meta.changes !== 1) continue;
    const { guideUrl, stopUrl, oneClickUrl } = links(w);
    const mail = buildWatchAlertEmail({
      first: w.first_name,
      ...label,
      room: w.room,
      was: v.was,
      now: v.now,
      guideUrl,
      stopUrl,
    });
    const sent = await h.sendResend(env, {
      from: FROM(env),
      to: [w.email],
      reply_to: REPLY(env),
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      headers: unsubscribeHeaders(oneClickUrl),
    });
    if (sent) {
      alerts += 1;
    } else {
      // Put the old price back so the next run tries again.
      await db
        .prepare("UPDATE watches SET last_price = ?, alerts_sent = alerts_sent - 1 WHERE id = ?")
        .bind(w.last_price, w.id)
        .run();
    }
  }
  return { checked: (results || []).length, alerts, expired };
}
