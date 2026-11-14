// The price-drop email digest: who gets which email and when, and the emails
// themselves. Pure functions (no network or storage), so the exact wording and the
// send rules can be tested offline. The Worker side is src/digest.js, and the numbers
// come from public/digest.json, which scripts/build-trends.py writes with the trends.

import { BRENT } from "../data/guideContent.js";
import { esc } from "./planEmail.js";

export const FREQUENCIES = ["weekly", "daily"];
export const DEFAULT_FREQUENCY = "weekly";

const SITE = "https://" + BRENT.site;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const usd = (n) => "$" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const parts = (iso) => iso.split("-").map(Number);
export const shortDate = (iso) => {
  const [, m, d] = parts(iso);
  return MONTHS[m - 1] + " " + d;
};
export const longDate = (iso) => {
  const [y, m, d] = parts(iso);
  return MONTHS[m - 1] + " " + d + ", " + y;
};
const DOWS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const withDow = (iso) => {
  const [y, m, d] = parts(iso);
  return DOWS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()] + ", " + shortDate(iso);
};

// The Monday of the week a date falls in. A weekly email goes out once per week key,
// on the first fresh data of a new week (Monday's update), so every weekly reader
// gets the same issue on the same day.
export function weekKey(iso) {
  const [y, m, d] = parts(iso);
  const t = new Date(Date.UTC(y, m - 1, d));
  const back = (t.getUTCDay() + 6) % 7;
  return new Date(t.getTime() - back * 86400000).toISOString().slice(0, 10);
}

// Is there anything worth emailing today / this week?
// A quiet day (nothing changed since the last check) has nothing new to say, so no daily email goes out.
export const dailyWorthSending = (digest) => !!digest && !digest.quiet && digest.drops > 0;
export const weeklyWorthSending = (digest) => !!digest && !!digest.week && digest.week.count > 0 && digest.week.rows.length > 0;

// Should this subscriber get the digest for this data? Daily: once per data date.
// Weekly: once per week. Returns the value to remember, or null for "not now".
export function dueKey(sub, digest) {
  if (!sub.active || !digest) return null;
  if (sub.frequency === "daily") {
    return dailyWorthSending(digest) && sub.last_asof !== digest.asOf ? digest.asOf : null;
  }
  const wk = weekKey(digest.asOf);
  return weeklyWorthSending(digest) && sub.last_week !== wk ? wk : null;
}

const NAVY = "#0e3b53";
const GOLD = "#f4c542";
const TEAL = "#1c7c8c";
const CREAM = "#fbf6ec";
const INK = "#1d2a33";

const FARE_NOTE =
  "Fares are per person, double occupancy, taxes and fees included, and change daily. A fare is not held until you book, and the cabin has to be available.";

const roomWords = (room) => room.toLowerCase();
const pctText = (pct) => Math.abs(Math.round(pct)) + "%";

const guideUrl = (r) => (r.id ? SITE + "/guide/?s=" + encodeURIComponent(r.id) + "&d=" + r.sail : null);
const quoteUrl = (r) =>
  SITE +
  "/contact/?" +
  new URLSearchParams({ cruise: r.itin + " (" + r.room + ")", ship: r.ship, when: longDate(r.sail) }).toString();

function shell({ preheader, headline, body, stopUrl, switchUrl, frequency }) {
  const other = frequency === "daily" ? "weekly" : "daily";
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#efe9dc;font-family:Helvetica,Arial,sans-serif;color:${INK};">
<div style="display:none;max-height:0;overflow:hidden;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#efe9dc;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;">
<tr><td style="background:${NAVY};padding:26px 32px;">
<div style="color:${GOLD};font-size:12px;font-weight:700;letter-spacing:2px;">MVAS CRUISE DEALS</div>
<div style="color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.2;font-weight:700;margin-top:8px;">${esc(headline)}</div>
</td></tr>
${body}
<tr><td style="border-top:1px solid #e5ded1;padding:16px 32px;font-size:12px;line-height:1.5;color:#5a6a76;">
You asked for the ${esc(frequency)} price-drop email at ${esc(BRENT.site)}. <a href="${esc(stopUrl)}" style="color:${NAVY};font-weight:700;">Unsubscribe</a> or <a href="${esc(switchUrl)}" style="color:${NAVY};font-weight:700;">switch to ${esc(other)}</a>.<br>
${esc(BRENT.name)}, Cruises Tours and Travel, LLC &middot; ${esc(BRENT.cred)}. Independent and not affiliated with Margaritaville at Sea.
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

const button = (href, label, bg, fg) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 10px 10px 0;display:inline-block;"><tr><td style="background:${bg};border-radius:999px;"><a href="${esc(href)}" style="display:inline-block;padding:13px 26px;color:${fg};font-weight:700;font-size:15px;text-decoration:none;">${esc(label)}</a></td></tr></table>`;

function rowHtml(r) {
  const g = guideUrl(r);
  return `<tr><td style="padding:14px 0;border-top:1px solid #efe9dc;">
<div style="font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:700;color:${NAVY};">${esc(r.ship)} ${esc(r.itin)}</div>
<div style="font-size:13px;color:#4a5a66;margin-top:2px;">${esc(r.room)} &middot; sails ${esc(longDate(r.sail))}</div>
<div style="margin-top:6px;font-size:15px;"><span style="text-decoration:line-through;color:#7a8791;">${esc(usd(r.old))}</span> &nbsp;<b style="color:${NAVY};font-size:19px;">${esc(usd(r.new))}</b> <span style="display:inline-block;margin-left:6px;background:${CREAM};color:${TEAL};font-size:12px;font-weight:800;border-radius:999px;padding:3px 10px;">Down ${esc(usd(-r.diff))} (${esc(pctText(r.pct))})</span></div>
<div style="margin-top:6px;font-size:13px;"><a href="${esc(quoteUrl(r))}" style="color:${NAVY};font-weight:700;">Ask Brent about this fare</a>${g ? ` &middot; <a href="${esc(g)}" style="color:${NAVY};font-weight:700;">Free guide</a>` : ""}</div>
</td></tr>`;
}

function rowText(r) {
  const g = guideUrl(r);
  return [
    r.ship + " " + r.itin + ", " + r.room + ", sails " + longDate(r.sail),
    "  " + usd(r.old) + " now " + usd(r.new) + ", down " + usd(-r.diff) + " (" + pctText(r.pct) + ")",
    "  Ask me about it: " + quoteUrl(r),
    g ? "  Free guide: " + g : null,
  ]
    .filter(Boolean)
    .join("\n");
}

const plural = (n, w) => n + " " + w + (n === 1 ? "" : "s");

// What goes in one issue: a headline, a one-line summary, and the rows.
function issue(kind, digest) {
  if (kind === "weekly") {
    const w = digest.week;
    const biggest = w.rows[0];
    return {
      headline: "This week's price drops",
      subject:
        "Weekly cruise price drops: " + plural(w.count, "fare") + " cheaper than last week, biggest " + usd(-biggest.diff) + " off",
      summary:
        plural(w.count, "fare") + " on Margaritaville at Sea cost less than they did on " + longDate(w.since) + ", and " +
        w.increases + " cost more. These are the biggest drops, compared with a week ago.",
      rows: w.rows,
      label: "Net change since " + shortDate(w.since),
    };
  }
  const top = digest.top[0];
  return {
    headline: "Today's price drops",
    subject: top
      ? top.ship + " " + top.itin + ": " + roomWords(top.room) + " now " + usd(top.new) + ", down " + pctText(top.pct)
      : plural(digest.drops, "cruise fare") + " dropped today",
    summary:
      plural(digest.drops, "fare") + " dropped on " + withDow(digest.date) + ", " + digest.increases + " rose, " +
      plural(digest.newFares, "fare") + " newly listed and " + digest.soldOut + " sold out." +
      (digest.top.length ? " These are the biggest new lows." : ""),
    rows: digest.top,
    label: "New lows today",
  };
}

// An email for one subscriber. kind is "daily" or "weekly". intro is an optional
// lead paragraph (the welcome email uses it).
export function buildDigestEmail({ kind, digest, stopUrl, switchUrl, intro, frequency = kind }) {
  const it = issue(kind, digest);
  const trendsUrl = SITE + "/trends/";
  const text = [
    ...(intro ? [intro, ""] : []),
    it.summary,
    "",
    ...(it.rows.length ? [it.label.toUpperCase(), ""] : []),
    ...it.rows.map((r) => rowText(r) + "\n"),
    "Every drop, with the fare history: " + trendsUrl,
    "Or call or text me at " + BRENT.phone + " and I will check your cabin.",
    "",
    FARE_NOTE,
    "",
    BRENT.name,
    "Unsubscribe: " + stopUrl,
    "Switch to " + (frequency === "daily" ? "weekly" : "daily") + ": " + switchUrl,
  ].join("\n");
  const rows = it.rows.length
    ? `<div style="font-size:11px;font-weight:800;letter-spacing:1.6px;color:${TEAL};text-transform:uppercase;margin:6px 0 0;">${esc(it.label)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 10px;">${it.rows.map(rowHtml).join("")}</table>`
    : "";
  const body = `<tr><td style="padding:26px 32px 8px;font-size:15px;line-height:1.6;">
${intro ? `<p style="margin:0 0 14px;">${esc(intro)}</p>` : ""}
<p style="margin:0 0 10px;">${esc(it.summary)}</p>
${rows}
<p style="margin:10px 0 6px;">${button(trendsUrl, "See every drop", NAVY, "#ffffff")}${button(SITE + "/contact/", "Get my free quote", GOLD, NAVY)}</p>
<p style="margin:10px 0 0;font-size:13px;color:#4a5a66;">Questions? Reply to this email or call or text me at <a href="${esc(BRENT.phoneHref)}" style="color:${NAVY};font-weight:700;">${esc(BRENT.phone)}</a>.</p>
<p style="margin:10px 0 0;font-size:13px;color:#4a5a66;">${esc(FARE_NOTE)}</p>
</td></tr>`;
  return {
    subject: (intro ? "You're on the list: " : "") + it.subject,
    text,
    html: shell({ preheader: it.summary, headline: it.headline, body, stopUrl, switchUrl, frequency }),
  };
}

// The first email, sent the moment someone signs up: what they will get and when,
// then a sample issue with today's real numbers so the signup pays off straight away.
export function buildDigestWelcome({ frequency, digest, stopUrl, switchUrl }) {
  const when =
    frequency === "daily"
      ? "I will send the day's biggest drops after each daily price check, only on days fares actually dropped."
      : "I will send one email each Monday with the week's biggest drops.";
  // Prefer the weekly sample for weekly readers when there is one, else the daily one.
  const kind = frequency === "weekly" && weeklyWorthSending(digest) ? "weekly" : "daily";
  const fallback = !dailyWorthSending(digest) && kind === "daily";
  const intro = "You're on the list. " + when + " Here is the latest, so you can see what it looks like.";
  if (fallback) {
    const text = [intro.replace(" Here is the latest, so you can see what it looks like.", ""), "", "Every drop, with the fare history: " + SITE + "/trends/", "", BRENT.name, "Unsubscribe: " + stopUrl].join("\n");
    const body = `<tr><td style="padding:26px 32px 8px;font-size:15px;line-height:1.6;">
<p style="margin:0 0 14px;">${esc(intro.replace(" Here is the latest, so you can see what it looks like.", ""))}</p>
<p style="margin:10px 0 6px;">${button(SITE + "/trends/", "See today's prices", NAVY, "#ffffff")}</p>
</td></tr>`;
    return {
      subject: "You're on the list for cruise price drops",
      text,
      html: shell({ preheader: when, headline: "You're on the list", body, stopUrl, switchUrl, frequency }),
    };
  }
  return buildDigestEmail({ kind, digest, stopUrl, switchUrl, intro, frequency });
}
