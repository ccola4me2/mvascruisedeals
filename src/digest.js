// The price-drop email digest: the Worker side. A visitor leaves an email on /trends/
// and picks weekly (the default) or daily. A cron run (the same one that checks price
// watches) emails each subscriber when the trends update goes live. The numbers come
// from /digest.json, which scripts/build-trends.py writes with the trends data. The
// rules and the emails are in app/lib/digest.js so they can be tested without a network.
//
// Subscribers live in D1 (the WATCH_DB binding, a table of their own). Everything here
// stays quiet when WATCH_DB is not bound.

import { diffDays } from "../app/lib/guide.js";
import { FARES_FRESH_DAYS } from "../app/lib/watch.js";
import {
  FREQUENCIES,
  DEFAULT_FREQUENCY,
  weekKey,
  dailyWorthSending,
  weeklyWorthSending,
  buildDigestEmail,
  buildDigestWelcome,
} from "../app/lib/digest.js";

const SITE = "https://mvascruisedeals.com";
const FROM = (env) => env.QUOTE_FROM || "MVAS Cruise Deals <noreply@cttagents.com>";
const REPLY = (env) => env.QUOTE_NOTIFY_TO || "brentb@cruisestoursandtravel.com";
// Few sends per run keeps one cron run well inside the Worker's subrequest limit; the rest
// go out on the next run (every three hours).
const MAX_SENDS_PER_RUN = 40;

let schemaReady = false;
async function ensureSchema(db) {
  if (schemaReady) return;
  await db.batch([
    db.prepare(
      `CREATE TABLE IF NOT EXISTS digest_subs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        frequency TEXT NOT NULL DEFAULT 'weekly',
        active INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        last_asof TEXT,
        last_week TEXT,
        sends INTEGER NOT NULL DEFAULT 0
      )`
    ),
    db.prepare("CREATE INDEX IF NOT EXISTS digest_active ON digest_subs (active, frequency)"),
  ]);
  schemaReady = true;
}

const todayUTC = () => new Date().toISOString().slice(0, 10);

// Today's digest numbers, or null when the file is missing or too old to quote.
async function loadDigest(env) {
  try {
    const r = await env.ASSETS.fetch(new Request(SITE + "/digest.json"));
    if (!r.ok) return null;
    const d = await r.json();
    if (!d || !d.asOf || !Array.isArray(d.top) || !d.week) return null;
    if (diffDays(todayUTC(), d.asOf) > FARES_FRESH_DAYS) return null;
    return d;
  } catch {
    return null;
  }
}

const links = (token) => ({
  stopUrl: SITE + "/digest/stop/?t=" + token,
  switchUrl: SITE + "/digest/stop/?t=" + token + "&switch=1",
  oneClickUrl: SITE + "/api/digest/stop?t=" + token,
});
const unsubscribeHeaders = (oneClickUrl) => ({
  "List-Unsubscribe": "<" + oneClickUrl + ">",
  "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
});

// POST /api/digest  { email, frequency, company_website }
export async function handleDigest(request, env, h) {
  const { clean, isEmail, json, throttled, sendResend, shortHash } = h;
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: h.corsHeaders() });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!env.WATCH_DB) return json({ error: "The email digest is not switched on yet. Please call or text (561) 777-9911." }, 503);

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  if (clean(body.company_website, 200)) return json({ ok: true });

  const email = clean(body.email, 160).toLowerCase();
  if (!email || !isEmail(email)) return json({ error: "Please add a valid email." }, 400);
  const frequency = FREQUENCIES.indexOf(body.frequency) === -1 ? DEFAULT_FREQUENCY : body.frequency;

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (await throttled("digest-ip-" + ip, 20)) return json({ error: "Please wait a moment and try again." }, 429);

  const db = env.WATCH_DB;
  try {
    await ensureSchema(db);
    const digest = await loadDigest(env);
    // Start the clock at today's data, so the first scheduled email is the next one and not a repeat of
    // the sample in the welcome email.
    const lastAsof = digest ? digest.asOf : null;
    const lastWeek = digest ? weekKey(digest.asOf) : null;
    await db
      .prepare(
        `INSERT INTO digest_subs (token, email, frequency, created_at, last_asof, last_week)
         VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT (email) DO UPDATE SET active = 1, frequency = excluded.frequency,
           last_asof = excluded.last_asof, last_week = excluded.last_week`
      )
      .bind(crypto.randomUUID(), email, frequency, new Date().toISOString(), lastAsof, lastWeek)
      .run();
    const sub = await db.prepare("SELECT * FROM digest_subs WHERE email = ?").bind(email).first();
    const { stopUrl, switchUrl, oneClickUrl } = links(sub.token);

    let emailed = false;
    if (!(await throttled("digest-email-" + (await shortHash(email)), 600))) {
      const mail = buildDigestWelcome({ frequency, digest: digest || { asOf: todayUTC(), drops: 0, top: [], week: { count: 0, rows: [] } }, stopUrl, switchUrl });
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
    return json({ ok: true, frequency, emailed });
  } catch {
    return json({ error: "Something went wrong. Please call or text (561) 777-9911." }, 502);
  }
}

// POST /api/digest/stop  (token in the query for the mail client's one-click unsubscribe,
// or in the JSON body from the manage page; { frequency } switches instead of stopping)
export async function handleDigestStop(request, env, h) {
  const { clean, json } = h;
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: h.corsHeaders() });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!env.WATCH_DB) return json({ error: "The email digest is not switched on." }, 503);

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
    const sub = await db.prepare("SELECT id FROM digest_subs WHERE token = ?").bind(token).first();
    if (!sub) return json({ error: "That link is no longer valid." }, 404);
    if (FREQUENCIES.indexOf(body.frequency) !== -1) {
      // Switching keeps them subscribed. The clocks stay as they were, so a switch to
      // daily sends the next daily update and a switch to weekly waits for Monday.
      await db.prepare("UPDATE digest_subs SET frequency = ?, active = 1 WHERE id = ?").bind(body.frequency, sub.id).run();
      return json({ ok: true, frequency: body.frequency });
    }
    await db.prepare("UPDATE digest_subs SET active = 0 WHERE id = ?").bind(sub.id).run();
    return json({ ok: true, stopped: 1 });
  } catch {
    return json({ error: "Something went wrong. Please reply to any of my emails and I will stop it by hand." }, 502);
  }
}

// Cron: when the trends update has gone live, email every subscriber whose turn it is.
export async function sendDigests(env, h) {
  if (!env.WATCH_DB) return { skipped: "no database" };
  const digest = await loadDigest(env);
  if (!digest) return { skipped: "no fresh digest" };
  const daily = dailyWorthSending(digest);
  const weekly = weeklyWorthSending(digest);
  if (!daily && !weekly) return { skipped: "nothing to send" };
  const db = env.WATCH_DB;
  await ensureSchema(db);
  const wk = weekKey(digest.asOf);

  const due = [];
  const binds = [];
  if (daily) {
    due.push("(frequency = 'daily' AND (last_asof IS NULL OR last_asof != ?))");
    binds.push(digest.asOf);
  }
  if (weekly) {
    due.push("(frequency = 'weekly' AND (last_week IS NULL OR last_week != ?))");
    binds.push(wk);
  }
  const { results } = await db
    .prepare("SELECT * FROM digest_subs WHERE active = 1 AND (" + due.join(" OR ") + ") ORDER BY id LIMIT " + MAX_SENDS_PER_RUN)
    .bind(...binds)
    .all();

  let sent = 0;
  for (const sub of results || []) {
    const isDaily = sub.frequency === "daily";
    const col = isDaily ? "last_asof" : "last_week";
    const val = isDaily ? digest.asOf : wk;
    // Claim this issue first, so two overlapping runs cannot email the same one twice.
    const claim = await db
      .prepare("UPDATE digest_subs SET " + col + " = ?, sends = sends + 1 WHERE id = ? AND (" + col + " IS NULL OR " + col + " != ?)")
      .bind(val, sub.id, val)
      .run();
    if (!claim.meta || claim.meta.changes !== 1) continue;
    const { stopUrl, switchUrl, oneClickUrl } = links(sub.token);
    const mail = buildDigestEmail({ kind: sub.frequency, digest, stopUrl, switchUrl });
    const ok = await h.sendResend(env, {
      from: FROM(env),
      to: [sub.email],
      reply_to: REPLY(env),
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      headers: unsubscribeHeaders(oneClickUrl),
    });
    if (ok) {
      sent += 1;
    } else {
      // Put the old value back so the next run tries again.
      await db
        .prepare("UPDATE digest_subs SET " + col + " = ?, sends = sends - 1 WHERE id = ?")
        .bind(sub[col], sub.id)
        .run();
    }
  }
  return { due: (results || []).length, sent };
}
