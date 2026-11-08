// "Watch this price": the rules for when a watch should email, and the emails
// themselves. Pure functions (no network or storage), so the exact wording and
// the drop rule can be tested offline. The Worker side is src/watch.js.

import { BRENT } from "../data/guideContent.js";
import { esc } from "./planEmail.js";

export const WATCH_ROOMS = ["Interior", "Ocean View", "Balcony", "Suite"];
// A fare has to fall by at least this much below the last price someone was told
// about, so a $2 wobble never sends an email.
export const DROP_MIN = 50;
// Quiet limits: one alert per watch every few days, and one alert email per address a day,
// whatever the fares do. A drop held back by a limit goes out on a later check.
export const ALERT_GAP_DAYS = 3;
export const ADDRESS_GAP_HOURS = 24;
// Fares older than this many days are never used to send an alert.
export const FARES_FRESH_DAYS = 4;
// Most watches one address can hold, so the form cannot be used to flood an inbox.
export const MAX_WATCHES_PER_EMAIL = 10;

export const roomWords = (room) => room.toLowerCase();
export const usd = (n) => "$" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const fareKey = (sailing, date) => sailing + "|" + date;

// The price now for one room of one sailing, or null when it is not on sale (sold out or untracked).
export function priceFor(fares, sailing, date, room) {
  const row = fares && fares.fares && fares.fares[fareKey(sailing, date)];
  const p = row && row[room];
  return typeof p === "number" && p > 0 ? p : null;
}

// What to do with one watch given today's fares: let it lapse once the ship has
// sailed, send an alert on a big enough drop, otherwise leave it alone. The price
// a watch remembers only ever moves down, when someone is told about a new low.
export function judge(watch, fares, today) {
  if (watch.date < today) return { action: "expire" };
  const now = priceFor(fares, watch.sailing, watch.date, watch.room);
  if (now === null) return { action: "none" };
  if (now <= watch.last_price - DROP_MIN) return { action: "alert", now, was: watch.last_price };
  return { action: "none", now };
}

const NAVY = "#0e3b53";
const GOLD = "#f4c542";
const TEAL = "#1c7c8c";
const CREAM = "#fbf6ec";
const INK = "#1d2a33";

function shell({ preheader, headline, body, stopUrl }) {
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
You asked to watch this fare at ${esc(BRENT.site)}. I only email when it drops. <a href="${esc(stopUrl)}" style="color:${NAVY};font-weight:700;">Stop watching this price</a>.<br>
${esc(BRENT.name)}, Cruises Tours and Travel, LLC &middot; ${esc(BRENT.cred)}. Independent and not affiliated with Margaritaville at Sea.
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

const button = (href, label, bg, fg) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 10px 10px 0;display:inline-block;"><tr><td style="background:${bg};border-radius:999px;"><a href="${esc(href)}" style="display:inline-block;padding:13px 26px;color:${fg};font-weight:700;font-size:15px;text-decoration:none;">${esc(label)}</a></td></tr></table>`;

const FARE_NOTE =
  "Fares are per person, taxes and fees included, and change daily. A fare is not held until you book, and the cabin has to be available.";

const tripBar = (cruise, ship, depLong) =>
  `<tr><td style="background:${GOLD};padding:14px 32px;color:${NAVY};">
<div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:700;">${esc(cruise)}</div>
<div style="font-size:13px;margin-top:2px;">Margaritaville at Sea ${esc(ship)} &middot; ${esc(depLong)}</div>
</td></tr>`;

// Sent right after someone starts a watch.
export function buildWatchConfirmEmail({ first, cruise, ship, depLong, room, price, guideUrl, stopUrl }) {
  const subject = "Watching the " + roomWords(room) + " fare: " + cruise + ", " + depLong.replace(/^\w+, /, "");
  const lead =
    price === null
      ? "The " + roomWords(room) + " category is not on sale right now. I will email you if it comes back at a price."
      : "The " + roomWords(room) + " fare is " + usd(price) + " per person right now. I will email you if it drops by " + usd(DROP_MIN) + " or more.";
  const text = [
    "Hi " + (first || "there") + ",",
    "",
    "I am watching the " + cruise + " cruise on Margaritaville at Sea " + ship + ", " + depLong + ", for you.",
    lead,
    "",
    "Your free guide for this sailing: " + guideUrl,
    "",
    FARE_NOTE,
    "",
    BRENT.name,
    "Stop watching this price: " + stopUrl,
  ].join("\n");
  const body = `${tripBar(cruise, ship, depLong)}
<tr><td style="padding:26px 32px 8px;font-size:15px;line-height:1.6;">
<p style="margin:0 0 14px;">Hi ${esc(first || "there")}, I am watching this cruise for you.</p>
<p style="margin:0 0 14px;">${esc(lead)}</p>
<p style="margin:0 0 6px;">${button(guideUrl, "Open my free guide", NAVY, "#ffffff")}</p>
<p style="margin:10px 0 0;font-size:13px;color:#4a5a66;">${esc(FARE_NOTE)}</p>
</td></tr>`;
  return {
    subject,
    text,
    html: shell({ preheader: lead, headline: "You are watching this price", body, stopUrl }),
  };
}

// Sent when a watched fare drops.
export function buildWatchAlertEmail({ first, cruise, ship, depLong, room, was, now, guideUrl, quoteUrl, stopUrl }) {
  const drop = was - now;
  const subject = "Price drop: " + roomWords(room) + " now " + usd(now) + ", " + cruise + ", " + depLong.replace(/^\w+, /, "");
  const line =
    "The " + roomWords(room) + " fare dropped " + usd(drop) + ", from " + usd(was) + " to " + usd(now) + " per person.";
  const text = [
    "Hi " + (first || "there") + ",",
    "",
    "Good news on the " + cruise + " cruise on Margaritaville at Sea " + ship + ", " + depLong + ".",
    line,
    "",
    "Want me to check your cabin and hold it? I will send a quote with no booking fees: " + quoteUrl,
    "Or call or text me at " + BRENT.phone + ".",
    "Your free guide for this sailing: " + guideUrl,
    "",
    FARE_NOTE,
    "",
    BRENT.name,
    "Stop watching this price: " + stopUrl,
  ].join("\n");
  const body = `${tripBar(cruise, ship, depLong)}
<tr><td style="padding:26px 32px 8px;font-size:15px;line-height:1.6;">
<p style="margin:0 0 14px;">Hi ${esc(first || "there")}, good news.</p>
<div style="background:${CREAM};border-radius:12px;padding:16px 18px;margin:0 0 16px;">
<div style="font-size:11px;font-weight:800;letter-spacing:1.6px;color:${TEAL};text-transform:uppercase;">${esc(room)} fare, per person</div>
<div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:700;color:${NAVY};margin-top:4px;"><span style="text-decoration:line-through;color:#7a8791;font-size:20px;">${esc(usd(was))}</span> &nbsp;${esc(usd(now))}</div>
<div style="font-size:13px;color:#4a5a66;margin-top:2px;">Down ${esc(usd(drop))}</div>
</div>
<p style="margin:0 0 14px;">Want me to check your cabin and hold it? I will send a quote with no booking fees. Reply to this email or call or text me at <a href="tel:+15617779911" style="color:${NAVY};font-weight:700;">${esc(BRENT.phone)}</a>.</p>
<p style="margin:0 0 6px;">${button(quoteUrl, "Get my free quote", GOLD, NAVY)}${button(guideUrl, "Open my guide", NAVY, "#ffffff")}</p>
<p style="margin:10px 0 0;font-size:13px;color:#4a5a66;">${esc(FARE_NOTE)}</p>
</td></tr>`;
  return {
    subject,
    text,
    html: shell({ preheader: line, headline: "The price dropped", body, stopUrl }),
  };
}
