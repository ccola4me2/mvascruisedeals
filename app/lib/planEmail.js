// The emails the cruise guide planner sends. Pure functions (no network), so
// the exact wording and layout can be tested and previewed offline.

import { BRENT } from "../data/guideContent.js";

export const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const NAVY = "#0e3b53";
const GOLD = "#f4c542";
const TEAL = "#1c7c8c";
const CREAM = "#fbf6ec";
const INK = "#1d2a33";

const firstName = (name) => String(name).trim().split(/\s+/)[0] || "there";

// The message a guest gets when they build a guide.
export function buildPlanEmail({ name, g, url, alerts }) {
  const first = firstName(name);
  const subject = "Your " + g.fullTitle + " guide, " + g.depLong.replace(/^\w+, /, "");
  const places = g.ports.map((p) => p.name);
  const intro =
    "Here is your personalized guide for the " + g.fullTitle + " cruise on Margaritaville at Sea " +
    g.ship + (g.oneWay ? ", sailing from " + g.hp.city + " to " + g.arriveHp.city : ", sailing round-trip from " + g.hp.city) +
    ", " + g.depLong + " to " + g.retLong + ".";

  const inside = [
    "Your route and the ship at a glance",
    "Ports of call and what to do ashore",
    "Life onboard: dining, bars, pools and shows",
    "What your fare covers, and what costs extra",
    "A dated countdown to sailing day",
    "How to book",
  ];

  const text = [
    "Hi " + first + ",",
    "",
    intro,
    "",
    "Open your guide: " + url,
    "",
    "On a computer, choose Save as PDF at the top of the guide to keep a six-page copy.",
    "",
    "Ports: " + places.join(", "),
    "",
    "Inside: " + inside.join("; ") + ".",
    "",
    "Ready to hold a cabin, or want help choosing one? Just reply to this email or call or text me at " + BRENT.phone + ".",
    "",
    BRENT.name,
    "Independent travel advisor, " + BRENT.cred,
    BRENT.site,
    "",
    "You asked for this guide at " + BRENT.site + ". This is a one-time message." +
      (alerts ? " You also asked for deal alerts on this sailing. Reply stop any time." : ""),
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f1efe8;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1efe8;padding:28px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:14px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${INK};">
<tr><td style="background:${NAVY};padding:26px 32px;">
<div style="color:${GOLD};font-size:12px;font-weight:700;letter-spacing:2px;">MVAS CRUISE DEALS</div>
<div style="color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.15;font-weight:700;margin-top:8px;">Your guide is ready, ${esc(first)}.</div>
</td></tr>
<tr><td style="background:${GOLD};padding:14px 32px;color:${NAVY};">
<div style="font-family:Georgia,'Times New Roman',serif;font-size:21px;font-weight:700;">${esc(g.fullTitle)}</div>
<div style="font-size:13px;margin-top:2px;">Margaritaville at Sea ${esc(g.ship)} &middot; ${esc(g.depLong)}</div>
</td></tr>
<tr><td style="padding:28px 32px 8px;font-size:15px;line-height:1.6;">
<p style="margin:0 0 18px;">${esc(intro)}</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 6px;"><tr><td style="background:${NAVY};border-radius:999px;">
<a href="${esc(url)}" style="display:inline-block;padding:14px 30px;color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;">Open my guide</a>
</td></tr></table>
<p style="margin:10px 0 0;font-size:13px;color:#4a5a66;">On a computer, choose <b>Save as PDF</b> at the top of the guide to keep a six-page copy.</p>
</td></tr>
<tr><td style="padding:18px 32px 4px;">
<div style="background:${CREAM};border-radius:12px;padding:16px 18px;">
<div style="font-size:11px;font-weight:800;letter-spacing:1.6px;color:${TEAL};text-transform:uppercase;margin-bottom:8px;">Your ports</div>
<div style="font-size:14px;line-height:1.6;">${places.map(esc).join("<br>")}</div>
</div>
</td></tr>
<tr><td style="padding:18px 32px 4px;font-size:14px;line-height:1.6;">
<div style="font-size:11px;font-weight:800;letter-spacing:1.6px;color:${TEAL};text-transform:uppercase;margin-bottom:6px;">Inside your guide</div>
${inside.map((t) => `<div style="padding:2px 0;">&#10003;&nbsp; ${esc(t)}</div>`).join("")}
</td></tr>
<tr><td style="padding:20px 32px 28px;font-size:15px;line-height:1.6;">
<p style="margin:0 0 14px;">Ready to hold a cabin, or want help choosing one? Just reply to this email or call or text me at <a href="tel:+15617779911" style="color:${NAVY};font-weight:700;">${esc(BRENT.phone)}</a>.</p>
<p style="margin:0;"><b>${esc(BRENT.name)}</b><br><span style="font-size:13px;color:#4a5a66;">Independent travel advisor &middot; ${esc(BRENT.cred)}</span></p>
</td></tr>
<tr><td style="border-top:1px solid #e5ded1;padding:16px 32px;font-size:12px;line-height:1.5;color:#5a6a76;">
You asked for this guide at ${esc(BRENT.site)}. This is a one-time message.${alerts ? " You also asked for deal alerts on this sailing. Reply stop any time." : ""}
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;

  return { subject, html, text };
}

// The heads-up that goes to Brent when the lead could not be filed in the CTT
// portal, so a request is never lost.
export function buildPlanNotice({ name, email, g, url, alerts, filed }) {
  const subject = "New cruise guide request: " + name + " (" + g.fullTitle + ")";
  const lines = [
    "Name: " + name,
    "Email: " + email,
    "Cruise: " + g.fullTitle + " aboard Margaritaville at Sea " + g.ship + " from " + g.hp.city,
    "Sailing date: " + g.depLong,
    "Wants deal alerts: " + (alerts ? "yes" : "no"),
    "Guide: " + url,
    "",
    filed
      ? "This lead was also filed in the CTT portal."
      : "NOTE: the CTT portal filing did not confirm, so this email is the record.",
  ];
  return { subject, text: lines.join("\n") };
}
