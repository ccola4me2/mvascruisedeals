// Shared contact / quote-prefill helpers.
// Every "Get a Quote / Get This Deal" CTA routes through /contact with the
// selected cruise attached, so the contact page can prefill a text, email, and
// the request form. Keeps lead quality high without any new form backend.

export const CONTACT = {
  phone: "+15617779911",
  phoneDisplay: "(561) 777-9911",
  email: "Brent.beasley@cruiseplanners.com",
  form: "https://brentbeasley.dreamingtotravel.com/form/CohcX6UGsr",
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
export function quoteMessage({ cruise, when, ship } = {}) {
  const parts = [cruise, when].filter(Boolean).join(", ");
  const shipLine = ship ? ` aboard Margaritaville at Sea ${shortShip(ship)}` : "";
  return `Hi Brent, I'd like a quote for the ${parts || "cruise"}${shipLine}. My dates and party size are:`;
}

export function smsHref(sel) {
  return `sms:${CONTACT.phone}?&body=${encodeURIComponent(quoteMessage(sel))}`;
}

export function mailtoHref(sel) {
  const subject = `Quote request: ${[sel.cruise, sel.when].filter(Boolean).join(", ") || "Margaritaville at Sea cruise"}`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(quoteMessage(sel))}`;
}
