// Builds the personalized cruise guide for one itinerary and one sailing date.
//
// Pure functions, no rendering: the same code feeds the on-screen guide
// (/guide/), the planner search (/plan/), and the confirmation email, so a date
// or port can never differ between them.

import { itineraries } from "../data/itineraries.js";
import {
  BRENT,
  HOMEPORTS,
  PORTS,
  REEF_PORTS,
  BIG_EXCURSION,
  SHIPS,
  PACKAGES,
} from "../data/guideContent.js";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DOWS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];
const NUM = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
  "Nine", "Ten", "Eleven", "Twelve",
];
const US_PLACES = [
  "the Florida Keys", "Louisiana", "Puerto Rico", "the U.S. Virgin Islands",
];
const CODES = { Galveston: "GAL", Tampa: "TPA", Miami: "MIA", "Palm Beach": "PBI" };

// ---- dates (all UTC, so a date never shifts with the viewer's time zone) ----
const ms = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};
const parts = (iso) => {
  const d = new Date(ms(iso));
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), w: d.getUTCDay() };
};
export const addDays = (iso, n) =>
  new Date(ms(iso) + n * 86400000).toISOString().slice(0, 10);
export const diffDays = (a, b) => Math.round((ms(a) - ms(b)) / 86400000);
export const dowName = (iso) => DOWS[parts(iso).w];
export function longDate(iso, { dow = false, year = false } = {}) {
  const p = parts(iso);
  return (
    (dow ? DOWS[p.w] + ", " : "") + MONTHS[p.m] + " " + p.d + (year ? ", " + p.y : "")
  );
}
export function shortDate(iso, { year = false } = {}) {
  const p = parts(iso);
  return MONTHS[p.m].slice(0, 3) + " " + p.d + (year ? ", " + p.y : "");
}
export function monthYear(iso) {
  const p = parts(iso);
  return MONTHS[p.m] + " " + p.y;
}
// Today's date in the viewer's own time zone, as YYYY-MM-DD.
export function todayISO() {
  const n = new Date();
  const z = (v) => String(v).padStart(2, "0");
  return n.getFullYear() + "-" + z(n.getMonth() + 1) + "-" + z(n.getDate());
}

const unique = (list) => list.filter((x, i) => list.indexOf(x) === i);
function joinList(list) {
  if (list.length <= 1) return list.join("");
  if (list.length === 2) return list[0] + " and " + list[1];
  return list.slice(0, -1).join(", ") + " and " + list[list.length - 1];
}
const homeportKey = (frm) => frm.split(",")[0];

// ---- itineraries ----
export function findItinerary(id) {
  return itineraries.find((i) => i.id === id) || null;
}
export const futureDates = (it, today) => it.dates.filter((d) => d >= today);
export function nextDate(it, today) {
  return futureDates(it, today)[0] || null;
}
export const tripTitle = (it) => it.nights + "-Night " + it.name;
export function itineraryLabel(it) {
  const hp = HOMEPORTS[homeportKey(it.frm)];
  return (
    tripTitle(it) + (it.arrive ? " (one way)" : "") + ", " + it.ship + " from " + hp.city
  );
}

// Records for the planner's search box: only itineraries that still sail.
export function plannerRecords(today) {
  return itineraries
    .map((it) => ({ it, dates: futureDates(it, today) }))
    .filter((r) => r.dates.length)
    .sort((a, b) => a.dates[0].localeCompare(b.dates[0]) || a.it.nights - b.it.nights)
    .map(({ it, dates }) => ({
      id: it.id,
      ship: it.ship,
      from: homeportKey(it.frm),
      nights: it.nights,
      name: it.name,
      note: it.note,
      oneWay: Boolean(it.arrive),
      ports: unique(it.ports),
      dates,
      haystack: [
        it.ship, homeportKey(it.frm), it.frm, it.nights + "-night", it.nights + " night",
        it.name, it.note, it.ports.join(" "),
        unique(dates.map((d) => longDate(d) + " " + parts(d).y)).join(" "),
      ]
        .join(" ")
        .toLowerCase(),
    }));
}

// Collapse a repeated port into one stop and mark it as an overnight.
function groupPorts(it) {
  const out = [];
  it.ports.forEach((p) => {
    const last = out[out.length - 1];
    if (last && last.key === p) last.overnight = true;
    else out.push({ key: p, overnight: false });
  });
  return out;
}

function headlineSize(name) {
  const n = name.length + 1;
  if (n <= 14) return 80;
  if (n <= 20) return 68;
  if (n <= 28) return 56;
  if (n <= 38) return 48;
  return 42;
}

function seasonBox(dep) {
  const m = parts(dep).m;
  if (m >= 5 && m <= 10) {
    return {
      h: "Sailing in " + MONTHS[m],
      t: "Expect warm, humid days. It's also hurricane season, so routes can shift for weather. Travel protection is worth a look.",
    };
  }
  if (m === 11 || m <= 2) {
    return {
      h: "Sailing in " + MONTHS[m],
      t: "Dry, breezy weather is typical this time of year, which also makes it a popular time to sail. Book your excursions early.",
    };
  }
  return {
    h: "Sailing in " + MONTHS[m],
    t: "Warm, sunny days are typical. Hurricane season starts June 1, so spring is a comfortable time to be on the water.",
  };
}

// ---- the guide ----
export function buildGuide(it, dateISO, today) {
  const hp = HOMEPORTS[homeportKey(it.frm)];
  const ship = SHIPS[it.ship];
  const arriveHp = it.arrive ? HOMEPORTS[homeportKey(it.arrive)] : hp;
  const dep = dateISO;
  const ret = addDays(dep, it.nights);
  const groups = groupPorts(it);
  const oneWay = Boolean(it.arrive);
  const places = unique(groups.map((g) => PORTS[g.key].place));
  const foreign = places.filter((p) => US_PLACES.indexOf(p) === -1);
  const code = (h) => CODES[h.city] || h.city.slice(0, 3).toUpperCase();

  // lede
  const sentences = [
    (NUM[it.nights] || it.nights) +
      " nights " +
      (oneWay
        ? "from " + hp.city + " to " + arriveHp.city
        : "round-trip from " + hp.city) +
      ", " + longDate(dep, { dow: true }) + " to " +
      longDate(ret, { dow: true, year: true }) + ".",
  ];
  if (it.note) sentences.push("Special sailing: " + it.note + ".");
  if (hp.since) {
    const gap = diffDays(dep, hp.since);
    if (gap >= 0 && gap <= 45) {
      sentences.push(
        "Sailing in " + it.ship + "'s first weeks from " + hp.city + "."
      );
    }
  }

  const stats = [
    { big: it.nights + " nights", small: dowName(dep) + " to " + dowName(ret) },
    {
      big: groups.length + (groups.length === 1 ? " port" : " ports"),
      small: joinList(places).replace(/^./, (c) => c.toUpperCase()),
    },
    hp.stat,
    ship.shortStat,
  ];

  const route = [
    {
      kind: "home",
      tag: code(hp),
      title: hp.city + ", " + hp.state,
      text:
        "Sail away " + longDate(dep, { dow: true }) +
        (hp.stat.big.indexOf("Terminal") === 0 ? " from " + hp.stat.big + "." : "."),
    },
    ...groups.map((g, i) => ({
      kind: "port",
      tag: String(i + 1),
      title: PORTS[g.key].name,
      text: PORTS[g.key].blurb + (g.overnight ? " You stay overnight." : ""),
    })),
    {
      kind: "home",
      tag: code(arriveHp),
      title: oneWay ? "Arrive in " + arriveHp.city : "Back in " + hp.city,
      text: longDate(ret, { dow: true, year: true }) + ".",
    },
  ];

  // Brent's note: the Beachcomber line shows only until its date passes.
  let note = "I built this guide from the cruise line's own published information. Call or text me with any question, and I'll hold your cabin and handle the details.";
  if (it.ship === "Beachcomber" && BRENT.beachcomberNote && today <= BRENT.beachcomberNote.until) {
    note = "This guide is everything I know so far. " + BRENT.beachcomberNote.text;
  }

  // ports page
  const n = groups.length;
  const ports = groups.map((g, i) => ({
    n: i + 1,
    key: g.key,
    overnight: g.overnight,
    ...PORTS[g.key],
  }));
  const portsHead =
    n === 1
      ? "One port, one great day."
      : (NUM[n] || n) + " ports, " + (NUM[n] || n).toLowerCase() + " moods.";

  const passport = {
    h:
      foreign.length >= 2
        ? (NUM[foreign.length] || foreign.length) + " countries, one passport"
        : "Bring your passport",
    t:
      "You'll visit " + joinList(foreign.length ? foreign : places) +
      ". The cruise line strongly recommends a passport, valid for 6 months after your cruise ends.",
  };

  // getting ready
  const m = parts(dep).m;
  const hurricane = m >= 5 && m <= 10;
  const reef = groups.some((g) => REEF_PORTS.indexOf(g.key) !== -1);
  const bigPort = groups.find((g) => BIG_EXCURSION[g.key]);
  const countdown = [
    {
      date: "Now",
      sub: "",
      h: "Reserve",
      t: "Hold your cabin and send me each guest's name as it appears on their documents.",
    },
    {
      date: shortDate(addDays(dep, -90)),
      sub: "90 days out",
      h: "Check passports",
      t: "Passports must be valid 6 months after your cruise ends. Renew early if needed.",
    },
    {
      date: shortDate(addDays(dep, -21)),
      sub: "21 days out",
      h: "Arrival window and boarding pass",
      t: "The cruise line emails them to the primary guest. Print the boarding pass.",
    },
    {
      date: shortDate(addDays(dep, -7)),
      sub: "7 days out",
      h: "Luggage tags",
      t: "Available in Cruise Control. Print them and tag every bag, carry-ons too.",
    },
    {
      date: shortDate(addDays(dep, -1)),
      sub: "The night before",
      h: "Arrive the night before",
      t: hp.airportLine.replace(/^Come in the night before\. /, ""),
    },
    {
      date: shortDate(dep),
      sub: dowName(dep),
      h: "Sailing day",
      t: "Board at " + hp.terminalLine + ". " + (hp.hoursLine ? hp.hoursLine + " " : "") + "Arrive in your assigned window.",
    },
    {
      date: shortDate(ret),
      sub: dowName(ret),
      h: oneWay ? "Arrive in " + arriveHp.city : "Back in " + hp.city,
      t: "Plan flights home for the afternoon or later.",
    },
  ];

  const bring = [
    "Original travel documents for everyone. No photocopies or phone photos.",
    "Your boarding pass, printed or digital. One per stateroom.",
    "A credit card for your onboard account.",
    "Luggage tags on every bag.",
    "A lanyard. Your stateroom key opens your door, pays for everything and gets you on and off the ship.",
    reef
      ? "Reef-safe sunscreen and water shoes for your snorkel ports."
      : "Sunscreen, sunglasses and comfortable walking shoes for port days.",
  ];

  const tips = [
    { h: "Bring your passport", t: "It is the cruise line's top recommendation. The name must match your reservation." },
    { h: "Pack a day-one carry-on", t: "Swimsuit, medications, documents and a change of clothes. Checked bags can take a while to reach your room." },
    { h: "Watch the all-aboard time", t: "Be back on the ship with room to spare in every port. The ship sails on schedule." },
    {
      h: "Protect the trip",
      t: hurricane
        ? "Hurricane season runs June through November. Ask about travel protection before final payment."
        : "Ask about travel protection before final payment. It can help if plans change.",
    },
    {
      h: "Pre-book your excursions",
      t: bigPort
        ? BIG_EXCURSION[bigPort.key].replace(/^./, (c) => c.toUpperCase()) + " fills up fast, so book early."
        : "Popular excursions fill up, so book the ones you care about early.",
    },
    { h: "Ask me anything", t: "Call or text " + BRENT.phone + " any time. I'm happy to help with excursions, cabins and packages." },
  ];

  const covers = {
    included: [
      "Your stateroom and the included dining on page 3.",
      "Production shows, live music and theme nights around the ship.",
      "The pools and pool-deck fun.",
      "Kids' clubs (check for any activity fees).",
    ],
    extra: [
      "Bar drinks and soft drinks, specialty dining and in-room dining.",
      "Wi-Fi, shore excursions, spa, casino play and photos.",
      "Parking at the port, paid directly to the port.",
      "Gratuities and service charges (below).",
    ],
    fuelNote: ship.fuelNote,
  };

  return {
    id: it.id,
    ship: it.ship,
    title: it.name,
    fullTitle: tripTitle(it),
    nights: it.nights,
    hp,
    arriveHp,
    oneWay,
    dep,
    ret,
    depLong: longDate(dep, { dow: true, year: true }),
    retLong: longDate(ret, { dow: true, year: true }),
    headSize: headlineSize(it.name),
    lede: sentences.join(" "),
    stats,
    route,
    glance: ship.glance,
    note,
    seaNote: "Plenty of time to enjoy the ship between ports. Day-by-day port times come with your booking. See page 2 for what to do ashore.",
    ports,
    portsHead,
    density: n <= 3 ? "roomy" : n === 4 ? "snug" : "tight",
    bulletsPer: n <= 3 ? 4 : n === 4 ? 3 : 2,
    season: seasonBox(dep),
    passport,
    onboard: ship.onboard,
    covers,
    staterooms: ship.staterooms,
    packages: PACKAGES,
    ready: { airport: hp.airportLine, parking: hp.parking, countdown, bring, tips },
    foreign,
    places,
    brent: BRENT,
  };
}
