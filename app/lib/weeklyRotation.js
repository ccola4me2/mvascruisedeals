// "Deals of the week" on the home page rotate every Monday through the open
// offers on the Cruise Deals page (app/data/featuredDeals.js). Nothing here
// needs editing each week: add or remove a deal in featuredDeals.js and the
// rotation follows. A deal drops out by itself once its departure date passes.
//
// The site is a static export, so the week is worked out in the visitor's
// browser (Eastern time, weeks start Monday). The page is also built with the
// week it was built in, so it reads correctly with scripts off.

import { featuredDeals } from "../data/featuredDeals.js";

export const PER_WEEK = 3;

// Urgency lines written for specific deals on the home page.
const URGENCY = {
  "beachcomber-5night-bahamas-eastern-2027": "Limited cabins at this rate",
};

// Weeks are counted from a Monday, so every browser agrees on the week number.
const EPOCH = Date.UTC(2026, 0, 5); // Monday, January 5, 2026

// Today's date in Eastern time as YYYY-MM-DD.
export function todayET(now = new Date()) {
  return now.toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}

export function weekIndex(todayISO) {
  const [y, m, d] = todayISO.split("-").map(Number);
  return Math.floor((Date.UTC(y, m - 1, d) - EPOCH) / (7 * 86400000));
}

// The deals that can appear: dated offers with their own page, shaped for the
// home page card. Group cruises that send guests to another site are left out.
export function rotationPool() {
  return featuredDeals
    .filter((d) => d.landing && d.landing.from)
    .map((d) => {
      const city = d.landing.homeport.split(",")[0];
      return {
        id: d.id,
        tag: d.tag,
        title: d.title,
        ship: d.ship,
        when: d.when,
        ports: "Round-trip " + city + " · " + d.landing.ports.join(" · "),
        image: d.image,
        fare: "From " + d.landing.from,
        fareUnit: d.landing.fromUnit,
        onboardCredit: d.onboardCredit,
        urgency: d.limited || URGENCY[d.id] || null,
        banner: d.banner || null,
        detailsHref: "/deals/" + d.landing.slug + "/",
        departs: d.landing.departs,
        cta: { label: "Get This Deal" },
      };
    });
}

// Three deals for the given day. The window slides by three each week, so a
// week's picks are new and every open deal comes round in turn.
export function picksFor(pool, todayISO, n = PER_WEEK) {
  const open = pool.filter((p) => p.departs >= todayISO);
  if (open.length <= n) return open;
  const start = (((weekIndex(todayISO) * n) % open.length) + open.length) % open.length;
  return Array.from({ length: n }, (_, i) => open[(start + i) % open.length]);
}
