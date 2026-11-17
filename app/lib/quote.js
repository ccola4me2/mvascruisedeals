// Shared contact / quote-prefill helpers.
// Every "Get a Quote / Get This Deal" CTA routes through /contact with the
// selected cruise attached, so the contact page can prefill a text, email, and
// the request form. Keeps lead quality high without any new form backend.

export const CONTACT = {
  phone: "+15617779911",
  phoneDisplay: "(561) 777-9911",
  email: "brentb@cruisestoursandtravel.com",
  form: "https://cttagents.com/f/wwwmvascruisedealscom",
};

// Short ship name from either "Islander" or "Margaritaville at Sea Islander".
export function shortShip(ship) {
  return (ship || "").replace(/^Margaritaville at Sea\s+/i, "").trim();
}

// Build a /contact link carrying the selected cruise.
export function quoteHref({ ship, cruise, when } = {}) {
  const p = new URLSearchParams();
  if (cruise) p.set("cruise", cruise);
  if (ship) p.set("ship", shortShip(ship));
  if (when) p.set("when", when);
  const qs = p.toString();
  return qs ? `/contact/?${qs}` : "/contact/";
}

// Prefilled sms: / mailto: links for a selected cruise.
// The message names the sailing when we know it, then lists the four things a
// quote needs as blank lines to fill in, and ends with the page it was sent
// from, so even a text sent without changes tells Brent what they were viewing.
export function quoteMessage({ cruise, when, ship, page } = {}) {
  const parts = [cruise, when].filter(Boolean).join(", ");
  const shipLine = ship ? ` aboard Margaritaville at Sea ${shortShip(ship)}` : "";
  const what = parts ? `the ${parts}${shipLine}` : "a Margaritaville at Sea cruise";
  const lines = [
    `Hi Brent, I'd like a free quote for ${what}.`,
    "",
    "My name:",
    "Travel dates:",
    "Number of guests:",
    "Cabin type (interior, ocean view, balcony or suite):",
  ];
  if (page) lines.push("", `Seen on: ${page}`);
  return lines.join("\n");
}

export function smsHref(sel) {
  return `sms:${CONTACT.phone}?&body=${encodeURIComponent(quoteMessage(sel))}`;
}

export function mailtoHref(sel) {
  const subject = `Quote request: ${[sel.cruise, sel.when].filter(Boolean).join(", ") || "Margaritaville at Sea cruise"}`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(quoteMessage(sel))}`;
}
