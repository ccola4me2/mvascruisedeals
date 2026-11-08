// Shared helpers for the one-page-per-itinerary pages (/sailings/<id>/) and the
// ship pages (/ships/<ship>/). Everything comes from itineraries.js, so a page can
// never disagree with the guide or the planner.

import { itineraries } from "../data/itineraries.js";
import { HOMEPORTS } from "../data/guideContent.js";
import { destinations } from "../data/destinations.js";
import { futureDates, tripTitle, longDate, todayISO } from "./guide.js";

export const SHIP_ORDER = ["Paradise", "Islander", "Beachcomber"];
export const shipSlug = (ship) => ship.toLowerCase();
export const shipFromSlug = (slug) => SHIP_ORDER.find((s) => shipSlug(s) === slug) || null;
export const cityOf = (frm) => frm.split(",")[0];
export const homeportOf = (it) => HOMEPORTS[cityOf(it.frm)];

// Sailings still to come on `today` (the planner offers the same ones).
export const liveItineraries = (today = todayISO()) =>
  itineraries.filter((it) => futureDates(it, today).length > 0);

export const sailingPath = (it) => "/sailings/" + it.id + "/";
export const planHref = (it, date) => "/plan/?s=" + encodeURIComponent(it.id) + (date ? "&d=" + date : "");
export const destinationForPort = (port) => destinations.find((d) => d.port === port) || null;

// "Key West, Belize and Cozumel"
export function joinList(list) {
  if (list.length <= 1) return list.join("");
  if (list.length === 2) return list[0] + " and " + list[1];
  return list.slice(0, -1).join(", ") + " and " + list[list.length - 1];
}

// A repeated port in a row is an overnight stay.
export function portNotes(it) {
  const out = [];
  it.ports.forEach((p, i) => {
    if (i > 0 && it.ports[i - 1] === p) out.push(p);
  });
  return out;
}
export const uniquePorts = (it) => it.ports.filter((p, i) => it.ports.indexOf(p) === i);

// More than one itinerary can share a name, ship, homeport and length with a
// different set of ports, so the page title then carries the ports.
export function isAmbiguous(it) {
  return (
    itineraries.filter(
      (x) => x.ship === it.ship && x.frm === it.frm && x.nights === it.nights && x.name === it.name
    ).length > 1
  );
}

export function pageTitle(it) {
  const base = tripTitle(it) + " on " + it.ship + " from " + cityOf(it.frm);
  return isAmbiguous(it) ? base + " (" + uniquePorts(it).join(", ") + ")" : base;
}

export function headline(it) {
  return tripTitle(it) + (it.arrive ? " (one way)" : "") + " on Margaritaville at Sea " + it.ship + " from " + cityOf(it.frm);
}

// First and last sailing date, in words, for descriptions.
export function dateSpan(dates) {
  if (!dates.length) return "";
  const a = longDate(dates[0], { year: true });
  const b = longDate(dates[dates.length - 1], { year: true });
  return dates.length === 1 ? a : a + " to " + b;
}

// Ship highlights carry an optional later wording and the date it takes over
// (a christening that has passed is told in the past tense).
export const glanceText = (g, today) => (g.length >= 4 && today > g[3] ? g[2] : g[1]);

// The itinerary page for a card on the all-sailings list. A card merges itineraries
// that differ only in port order, so this picks the first one that still has a date.
export function pageForSailing(s, today = todayISO()) {
  const key = (ports) => ports.slice().sort().join("|");
  const it = itineraries.find(
    (x) =>
      x.ship === s.ship && x.frm === s.departure_port && x.nights === s.nights &&
      x.name === s.route && (x.note || "") === (s.note || "") &&
      key(uniquePorts(x)) === key(s.ports_of_call) && futureDates(x, today).length
  );
  return it ? sailingPath(it) : null;
}
