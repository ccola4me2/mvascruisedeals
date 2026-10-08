// Cloudflare Worker for mvascruisedeals.
//
// The site is a static Next.js export served from ./out via the ASSETS binding.
// This Worker adds two dynamic endpoints. POST /api/plan builds a cruise guide
// request (see handlePlan below). POST /api/quote takes an inline quote-form
// submission and:
//   1. Files it into the CTT portal by posting to the same public form endpoint
//      the hosted CTT form uses, so the lead lands on the advisor's book and
//      lead board exactly like a native submission.
//   2. Emails a copy to the advisor via Resend, best effort, as an instant
//      heads-up and a backstop if the portal filing ever fails.
// Everything else falls through to the static assets (and the 404 page).

import { findItinerary, buildGuide, futureDates } from "../app/lib/guide.js";
import { buildPlanEmail, buildPlanNotice } from "../app/lib/planEmail.js";

const CTT_ENDPOINT =
  "https://cttagents.com/api/public/forms/wwwmvascruisedealscom";
const SITE = "https://mvascruisedeals.com";

// Bumped on deploys so a poll of the endpoint can confirm the new Worker is live.
const VERSION = "5";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/quote") {
      return handleQuote(request, env);
    }
    if (url.pathname === "/api/plan") {
      return handlePlan(request, env);
    }
    // Google Search Console ownership file. The static asset layer redirects a
    // ".html" path to its extensionless twin, and Google wants this exact URL
    // with a plain 200, so the Worker answers it directly. Keep it as long as
    // the site stays verified.
    if (url.pathname === "/google705e17e34b2526c5.html") {
      return new Response("google-site-verification: google705e17e34b2526c5.html", {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
    return env.ASSETS.fetch(request);
  },
};

const clean = (v, max = 300) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";
const isEmail = (s) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "X-Quote-Version": VERSION,
  };
}
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}

async function handleQuote(request, env) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  // Honeypot: a bot filled the hidden field. Answer as if it worked and stop.
  if (clean(body.company_website, 200)) {
    return json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 160).toLowerCase();
  const phone = clean(body.phone, 40);
  const address = clean(body.address, 200);
  const cruise = clean(body.cruise, 200);
  const ship = clean(body.ship, 60);
  const when = clean(body.when, 80);
  const party = Math.min(Math.max(parseInt(body.party, 10) || 1, 1), 8);
  const extra = clean(body.notes, 2000);

  const missing = [];
  if (!name) missing.push("your name");
  if (!email || !isEmail(email)) missing.push("a valid email");
  if (!phone) missing.push("a phone number");
  if (!address) missing.push("where you live");
  if (missing.length) {
    return json({ error: `Please add ${missing.join(", ")}.` }, 400);
  }

  // Notes carry the trip context CTT does not have a dedicated field for.
  const noteLines = [];
  if (cruise) {
    noteLines.push(
      `Interested in: ${cruise}${
        ship ? ` aboard Margaritaville at Sea ${ship}` : ""
      }`
    );
  }
  if (when) noteLines.push(`Preferred timing: ${when}`);
  noteLines.push(`Party size: ${party}`);
  if (extra) noteLines.push(extra);
  noteLines.push("Sent from the mvascruisedeals.com quote form.");
  const notes = noteLines.join("\n");

  const cttPayload = {
    full_name: name,
    email,
    mobile_phone: phone,
    address,
    travel_type: "A cruise",
    heard_about: "A web search",
    travellers__count: String(party),
    // The CTT "who is travelling" block is required and needs at least one
    // named person, not just a count. The lead is traveller 1.
    travellers__1__name: name,
    notes,
    company_website: "",
  };
  if (/^\d{4}-\d{2}-\d{2}$/.test(when)) cttPayload.travel_date = when;

  let cttOk = false;
  try {
    const r = await fetch(CTT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cttPayload),
    });
    const data = await r.json().catch(() => ({}));
    cttOk = r.ok && data && data.ok !== false && !data.error;
  } catch {
    cttOk = false;
  }

  // Backstop email via Resend, only when the CTT filing did not confirm. On a
  // normal submission CTT sends its own lead notice, so emailing here too
  // would just duplicate it; this is the safety net for when CTT is unreachable.
  let mailOk = false;
  if (!cttOk && env.RESEND_API_KEY) {
    try {
      const rr = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.QUOTE_FROM || "MVAS Cruise Deals <noreply@cttagents.com>",
          to: [env.QUOTE_NOTIFY_TO || "brentb@cruisestoursandtravel.com"],
          reply_to: email,
          subject: `New quote request: ${name}${cruise ? ` (${cruise})` : ""}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Where they live: ${address}`,
            cruise ? `Cruise: ${cruise}${ship ? ` aboard ${ship}` : ""}` : null,
            when ? `When: ${when}` : null,
            `Party size: ${party}`,
            extra ? `Notes: ${extra}` : null,
            "",
            cttOk
              ? "This lead was also filed in the CTT portal."
              : "NOTE: the CTT portal filing did not confirm; this email is the record.",
          ]
            .filter((l) => l !== null)
            .join("\n"),
        }),
      });
      mailOk = rr.ok;
    } catch {
      mailOk = false;
    }
  }

  if (cttOk || mailOk) {
    return json({ ok: true, filed: cttOk, emailed: mailOk });
  }
  return json(
    {
      error:
        "Something went wrong sending your request. Please call or text (561) 777-9911.",
    },
    502
  );
}


// ---------------------------------------------------------------------------
// POST /api/plan: a visitor picked a cruise and asked for their guide.
//
// Delivery, best effort at each step so one failure never loses the request:
//   1. File the lead in the CTT portal, on the "Free Guide" form (fields
//      first_name, last_name, email, and notes if the form has that question).
//   2. Email the guest their guide link (Resend).
//   3. Email Brent a heads-up, but only if step 1 did not file the lead, so it
//      is never both unfiled and unannounced (CTT sends its own notice).
// The guide is a public link, so even if every step fails the visitor can open
// it straight away; the response always carries the URL.
// ---------------------------------------------------------------------------

// Best-effort throttle with the edge cache: one request per IP every 20s and one
// guide email per address every 10 minutes, so the endpoint cannot be used to
// spam strangers.
async function throttled(key, seconds) {
  try {
    const cache = caches.default;
    const req = new Request("https://throttle.internal/" + key);
    if (await cache.match(req)) return true;
    await cache.put(
      req,
      new Response("1", { headers: { "Cache-Control": "max-age=" + seconds } })
    );
  } catch {
    /* no cache available: do not block */
  }
  return false;
}

async function shortHash(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)]
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sendResend(env, payload) {
  if (!env.RESEND_API_KEY) return false;
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + env.RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return r.ok;
  } catch {
    return false;
  }
}

async function handlePlan(request, env) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  // Honeypot: a bot filled the hidden field. Answer as if it worked and stop.
  if (clean(body.company_website, 200)) return json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 160).toLowerCase();
  const alerts = body.alerts === true;
  const missing = [];
  if (!name || name.split(/\s+/).length < 2) missing.push("your first and last name");
  if (!email || !isEmail(email)) missing.push("a valid email");
  if (missing.length) {
    return json({ error: "Please add " + missing.join(" and ") + "." }, 400);
  }

  const it = findItinerary(clean(body.sailing, 200));
  if (!it) {
    return json({ error: "Please pick a cruise from the list." }, 400);
  }
  const today = new Date().toISOString().slice(0, 10);
  const dates = futureDates(it, today);
  if (!dates.length) {
    return json({ error: "That cruise has no upcoming dates. Please pick another." }, 400);
  }
  const wanted = clean(body.date, 12);
  const date = dates.indexOf(wanted) !== -1 ? wanted : dates[0];

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (await throttled("plan-ip-" + ip, 20)) {
    return json({ error: "Please wait a moment and try again." }, 429);
  }
  const dupe = await throttled("plan-email-" + (await shortHash(email)), 600);

  const g = buildGuide(it, date, today);
  const url = SITE + "/guide/?s=" + encodeURIComponent(it.id) + "&d=" + date;

  // 1. File the lead in CTT (needs PLAN_FORM_SLUG).
  let filed = false;
  // The CTT form "Free Guide" (first_name, last_name, email, notes). The slug is
  // not a secret; the PLAN_FORM_SLUG variable overrides it if the form moves.
  const formSlug = env.PLAN_FORM_SLUG || "httpsmvascruisedealscomplan";
  if (formSlug) {
    try {
      const parts = name.split(/\s+/);
      const firstName = parts[0];
      const lastName = parts.slice(1).join(" ");
      const notes = [
        "Cruise guide request: " + g.fullTitle + " aboard Margaritaville at Sea " + g.ship + " from " + g.hp.city,
        "Sailing date: " + g.depLong,
        "Deal alerts for this sailing: " + (alerts ? "yes" : "no"),
        "Guide: " + url,
        "Sent from the mvascruisedeals.com guide builder.",
      ].join("\n");
      const r = await fetch(
        "https://cttagents.com/api/public/forms/" + encodeURIComponent(formSlug),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,
            notes,
            company_website: "",
          }),
        }
      );
      const data = await r.json().catch(() => ({}));
      filed = r.ok && data && data.ok !== false && !data.error;
    } catch {
      filed = false;
    }
  }

  // 2. Email the guest their guide (skipped for a repeat request within 10 min).
  let emailed = false;
  if (!dupe) {
    const quoteUrl =
      SITE + "/contact/?" +
      new URLSearchParams({
        cruise: g.fullTitle,
        ship: g.ship,
        when: g.depLong.replace(/^\w+, /, ""),
      }).toString();
    const mail = buildPlanEmail({ name, g, url, alerts, quoteUrl });
    emailed = await sendResend(env, {
      from: env.QUOTE_FROM || "MVAS Cruise Deals <noreply@cttagents.com>",
      to: [email],
      reply_to: env.QUOTE_NOTIFY_TO || "brentb@cruisestoursandtravel.com",
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
  }

  // 3. Tell Brent, only when CTT did not file the lead.
  let notified = false;
  if (!filed && !dupe) {
    const note = buildPlanNotice({ name, email, g, url, alerts, filed });
    notified = await sendResend(env, {
      from: env.QUOTE_FROM || "MVAS Cruise Deals <noreply@cttagents.com>",
      to: [env.QUOTE_NOTIFY_TO || "brentb@cruisestoursandtravel.com"],
      reply_to: email,
      subject: note.subject,
      text: note.text,
    });
  }

  if (filed || emailed || notified || dupe) {
    return json({ ok: true, url, filed, emailed, notified, repeat: Boolean(dupe) });
  }
  return json(
    {
      error: "Something went wrong sending your guide, but you can still open it now.",
      url,
    },
    502
  );
}
