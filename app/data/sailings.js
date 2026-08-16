// ---------------------------------------------------------------------------
// ALL SAILINGS DATA  (powers the /sailings "Explore Every Sailing" page)
// ---------------------------------------------------------------------------
// A browse/discover list of Margaritaville at Sea itineraries. NOT live pricing
// or availability: just itinerary details, with each card's CTA routing to the
// quote/contact flow.
//
// HOW TO ADD / EDIT / REMOVE A SAILING
//   - Each sailing is one object in the `sailings` array below.
//   - To ADD: copy an existing object, paste it, and change the fields.
//   - To EDIT: change the fields in place.
//   - To REMOVE: delete the whole { ... } object (including its trailing comma).
//   - After editing, the /sailings page and its Ship / Port / Length /
//     Destination filters update automatically from this data.
//
// FIELDS
//   id            : unique string (used as the React key). Keep it unique.
//   ship          : "Paradise" | "Islander" | "Beachcomber"
//   departure_port: "Palm Beach, FL" | "Tampa, FL" | "Miami, FL"
//   nights        : number (2, 3, 4, 5, 7, ...)
//   route         : short headline for the card, e.g. "Western Caribbean"
//   ports_of_call : array of port names, e.g. ["Cozumel", "Key West"]
//   typical_days  : usual departure day(s) if known, else "" (leave blank)
//   description   : 1-2 sentence casual blurb
//   image         : "/deals/paradise.jpg" | "/deals/islander.jpg" | "/deals/beachcomber.jpg"
//   note          : optional small tag on the card (e.g. "Sailing 2027")
//
// SOURCE: seeded from margaritavilleatsea.com/explore-itineraries (Aug 2026).
// Schedules change , re-check that page when updating.
// ---------------------------------------------------------------------------

export const sailings = [
  // ---- Islander , Port Tampa Bay -----------------------------------------
  {
    id: "islander-4-cozumel",
    ship: "Islander",
    departure_port: "Tampa, FL",
    nights: 4,
    route: "Cozumel Express",
    ports_of_call: ["Cozumel"],
    typical_days: "",
    description:
      "A quick hop from Tampa to Cozumel. Just enough beach-bar time to shake off the mainland.",
    image: "/deals/islander.jpg",
  },
  {
    id: "islander-5-mexico-duo",
    ship: "Islander",
    departure_port: "Tampa, FL",
    nights: 5,
    route: "Mexico Duo",
    ports_of_call: ["Cozumel", "Progreso"],
    typical_days: "",
    description:
      "Two Mexican ports in five nights: beach bliss in Cozumel and Mayan culture in Progreso.",
    image: "/deals/islander.jpg",
  },
  {
    id: "islander-5-keywest-progreso",
    ship: "Islander",
    departure_port: "Tampa, FL",
    nights: 5,
    route: "Key West & Progreso",
    ports_of_call: ["Key West", "Progreso"],
    typical_days: "",
    description:
      "Conch Republic vibes in Key West plus the Yucatan out of Progreso. Classic Caribbean, easy pace.",
    image: "/deals/islander.jpg",
  },
  {
    id: "islander-7-western",
    ship: "Islander",
    departure_port: "Tampa, FL",
    nights: 7,
    route: "Key West & Western Caribbean",
    ports_of_call: ["Key West", "Roatan", "Belize", "Cozumel"],
    typical_days: "",
    description:
      "A full week hitting Key West, Roatan, Belize, and Cozumel. Reefs, ruins, and rum all week long.",
    image: "/deals/islander.jpg",
  },

  // ---- Paradise , Port of Palm Beach --------------------------------------
  {
    id: "paradise-2-grand-bahama",
    ship: "Paradise",
    departure_port: "Palm Beach, FL",
    nights: 2,
    route: "Grand Bahama Getaway",
    ports_of_call: ["Grand Bahama Island"],
    typical_days: "",
    description:
      "The quick escape: island time on Grand Bahama before you've even unpacked. Perfect first cruise.",
    image: "/deals/paradise.jpg",
  },
  {
    id: "paradise-3-nassau",
    ship: "Paradise",
    departure_port: "Palm Beach, FL",
    nights: 3,
    route: "Nassau Escape",
    ports_of_call: ["Nassau"],
    typical_days: "",
    description:
      "Three nights, one gorgeous island: Nassau's beaches, forts, and fish fry, easy from Palm Beach.",
    image: "/deals/paradise.jpg",
  },
  {
    id: "paradise-4-keywest-grand-bahama",
    ship: "Paradise",
    departure_port: "Palm Beach, FL",
    nights: 4,
    route: "Key West & Grand Bahama",
    ports_of_call: ["Key West", "Grand Bahama Island"],
    typical_days: "",
    description:
      "Two islands in one long weekend: Key West's Conch Republic and the beaches of Grand Bahama.",
    image: "/deals/paradise.jpg",
  },
  {
    id: "paradise-4-bahamas-duo",
    ship: "Paradise",
    departure_port: "Palm Beach, FL",
    nights: 4,
    route: "Bahamas Duo",
    ports_of_call: ["Nassau", "Grand Bahama Island"],
    typical_days: "",
    description:
      "Double up on the Bahamas: Nassau and Grand Bahama in four easy nights from Palm Beach.",
    image: "/deals/paradise.jpg",
  },

  // ---- Beachcomber , PortMiami (joins the fleet in 2027) -------------------
  {
    id: "beachcomber-7-eastern",
    ship: "Beachcomber",
    departure_port: "Miami, FL",
    nights: 7,
    route: "Eastern Caribbean",
    ports_of_call: ["San Juan", "Puerto Plata"],
    typical_days: "",
    description:
      "The fleet's biggest ship on longer sailings: old-world San Juan, the beaches of Puerto Plata, and more.",
    image: "/deals/beachcomber.jpg",
    note: "Sailing 2027",
  },
  {
    id: "beachcomber-7-western",
    ship: "Beachcomber",
    departure_port: "Miami, FL",
    nights: 7,
    route: "Key West, Bahamas & Western Caribbean",
    ports_of_call: ["Nassau", "Key West", "Grand Cayman", "Jamaica"],
    typical_days: "",
    description:
      "One epic week from Miami: Nassau, Key West, Grand Cayman, and Jamaica aboard the new Beachcomber.",
    image: "/deals/beachcomber.jpg",
    note: "Sailing 2027",
  },
];
