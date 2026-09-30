// Cloudflare Worker for mvascruisedeals.
//
// The site is a static Next.js export served from ./out via the ASSETS binding.
// This Worker adds one dynamic endpoint, POST /api/quote, which takes an inline
// quote-form submission and:
//   1. Files it into the CTT portal by posting to the same public form endpoint
//      the hosted CTT form uses, so the lead lands on the advisor's book and
//      lead board exactly like a native submission.
//   2. Emails a copy to the advisor via Resend, best effort, as an instant
//      heads-up and a backstop if the portal filing ever fails.
// Everything else falls through to the static assets (and the 404 page).

const CTT_ENDPOINT =
  "https://cttagents.com/api/public/forms/wwwmvascruisedealscom";

// Bumped on deploys so a poll of the endpoint can confirm the new Worker is live.
const VERSION = "4";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/quote") {
      return handleQuote(request, env);
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
