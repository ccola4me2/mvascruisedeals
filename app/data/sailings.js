// ---------------------------------------------------------------------------
// ALL SAILINGS DATA  (powers the /sailings "Explore Every Sailing" page)
// ---------------------------------------------------------------------------
// This is a browse/discover list of Margaritaville at Sea itineraries. It is
// NOT live pricing or availability: it's just itinerary details, with every
// card's CTA routing to the quote/contact flow.
//
// HOW TO ADD / EDIT / REMOVE A SAILING
//   - Each sailing is one object in the `sailings` array below.
//   - To ADD: copy an existing object, paste it, and change the fields.
//   - To EDIT: change the fields in place.
//   - To REMOVE: delete the whole { ... }, object (including the trailing comma).
//   - After editing, that's it: the /sailings page and its Ship / Port /
//     Length / Destination filters update automatically from this data.
//
// FIELDS
//   id            : unique string (used as the React key). Keep it unique.
//   ship          : "Paradise" | "Islander" | "Beachcomber"
//   departure_port: "Palm Beach, FL" | "Tampa, FL" | "Miami, FL"
//   nights        : number (3, 4, 5, 6, 7, 10, ...)
//   route         : short headline for the card, e.g. "Western Caribbean"
//   ports_of_call : array of port names, e.g. ["Cozumel", "Key West"]
//   typical_days  : usual departure day(s) if known, else "" (leave blank)
//   description   : 1-2 sentence casual blurb
//   image         : "/deals/paradise.jpg" | "/deals/islander.jpg" | "/deals/beachcomber.jpg"
//   note          : optional small tag on the card (e.g. "Sailing 2027")
//
// ACCURACY: sailing schedules change. Verify nights / ports / dates against
// margaritavilleatsea.com/explore-itineraries before relying on these, and
// replace any [PLACEHOLDER: confirm ...] text with confirmed info.
// ---------------------------------------------------------------------------

export const sailings = [
  // ---- Islander: Port Tampa Bay (4 to 10 nights) --------------------------
  {
    id: "islander-4-western",
    ship: "Islander",
    departure_port: "Tampa, FL",
    nights: 4,
    route: "Western Caribbean",
    ports_of_call: ["Cozumel"],
    typical_days: "",
    description:
      "A quick long-weekend hop from Tampa to Cozumel. Just enough island time to shake off the mainland.",
    image: "/deals/islander.jpg",
  },
  {
    id: "islander-5-mexico-duo",
    ship: "Islander",
    departure_port: "Tampa, FL",
    nights: 5,
    route: "Mexico Duo",
    ports_of_call: ["Progreso", "Cozumel"],
    typical_days: "",
    description:
      "Two Mexican ports in five nights: Mayan culture in Progreso and beach-bar bliss in Cozumel.",
    image: "/deals/islander.jpg",
  },
  {
    id: "islander-5-western",
    ship: "Islander",
    departure_port: "Tampa, FL",
    nights: 5,
    route: "Key West & Cozumel",
    ports_of_call: ["Key West", "Cozumel"],
    typical_days: "",
    description:
      "Conch Republic vibes in Key West plus a Cozumel beach day. Classic Caribbean, easy pace.",
    image: "/deals/islander.jpg",
  },
  {
    id: "islander-6-belize-progreso",
    ship: "Islander",
    departure_port: "Tampa, FL",
    nights: 6,
    route: "Belize & Progreso",
    ports_of_call: ["Belize", "Progreso"],
    typical_days: "",
    description:
      "Jungle, reef, and ruins: snorkel Belize's barrier reef and explore the Yucatan out of Progreso.",
    image: "/deals/islander.jpg",
  },
  {
    id: "islander-6-grand-cayman",
    ship: "Islander",
    departure_port: "Tampa, FL",
    nights: 6,
    route: "Grand Cayman & Cozumel",
    ports_of_call: ["Grand Cayman", "Cozumel"],
    typical_days: "",
    description:
      "Swim with the stingrays off Grand Cayman, then cap it with a Cozumel beach day.",
    image: "/deals/islander.jpg",
  },
  {
    id: "islander-7-western",
    ship: "Islander",
    departure_port: "Tampa, FL",
    nights: 7,
    route: "Western Caribbean",
    ports_of_call: ["Key West", "Grand Cayman", "Cozumel"],
    typical_days: "",
    description:
      "A full week hitting three of the Caribbean's best: Key West, Grand Cayman, and Cozumel.",
    image: "/deals/islander.jpg",
  },
  {
    id: "islander-7-jamaica",
    ship: "Islander",
    departure_port: "Tampa, FL",
    nights: 7,
    route: "Jamaica & the Caymans",
    ports_of_call: ["Ocho Rios", "Grand Cayman", "Cozumel"],
    typical_days: "",
    description:
      "Feel irie in Ocho Rios, snorkel Grand Cayman, and soak up Cozumel: a proper island week.",
    image: "/deals/islander.jpg",
  },
  {
    id: "islander-10-southern",
    ship: "Islander",
    departure_port: "Tampa, FL",
    nights: 10,
    route: "Southern Caribbean",
    ports_of_call: ["Aruba", "Curacao", "Grand Cayman"],
    typical_days: "",
    description:
      "The big one: ten nights down to the ABC islands. Aruba and Curacao are worth every day at sea.",
    image: "/deals/islander.jpg",
  },

  // ---- Paradise: Port of Palm Beach --------------------------------------
  // Ports (Nassau, Key West, Cozumel) are confirmed; exact night counts vary,
  // so those are marked for you to confirm.
  {
    id: "paradise-bahamas-getaway",
    ship: "Paradise",
    departure_port: "Palm Beach, FL",
    nights: 2,
    route: "Bahamas Getaway",
    ports_of_call: ["Nassau"],
    typical_days: "[PLACEHOLDER: confirm departure days]",
    description:
      "The quick escape: island time before you've even unpacked. Perfect first cruise.",
    image: "/deals/paradise.jpg",
    note: "[PLACEHOLDER: confirm nights]",
  },
  {
    id: "paradise-bahamas-keywest",
    ship: "Paradise",
    departure_port: "Palm Beach, FL",
    nights: 4,
    route: "Bahamas & Key West",
    ports_of_call: ["Nassau", "Key West"],
    typical_days: "",
    description:
      "Nassau's beaches plus a Key West afternoon: two islands, one easy sailing from Palm Beach.",
    image: "/deals/paradise.jpg",
    note: "[PLACEHOLDER: confirm nights]",
  },
  {
    id: "paradise-cozumel",
    ship: "Paradise",
    departure_port: "Palm Beach, FL",
    nights: 4,
    route: "Cozumel Escape",
    ports_of_call: ["Cozumel"],
    typical_days: "",
    description:
      "Paradise's newer Mexico route: turquoise water, reefs, and cantina vibes in Cozumel.",
    image: "/deals/paradise.jpg",
    note: "New for Summer 2026",
  },

  // ---- Beachcomber: PortMiami (4 to 8 nights, Eastern Caribbean) ----------
  // Beachcomber launches early 2027; specific dated itineraries are being
  // released, so confirm the exact nights/ports as they publish.
  {
    id: "beachcomber-7-eastern",
    ship: "Beachcomber",
    departure_port: "Miami, FL",
    nights: 7,
    route: "Eastern Caribbean",
    ports_of_call: ["St. Maarten", "St. Thomas", "San Juan"],
    typical_days: "",
    description:
      "The fleet's biggest ship on longer sailings: two-nation St. Maarten, duty-free St. Thomas, and old-world San Juan.",
    image: "/deals/beachcomber.jpg",
    note: "Sailing early 2027",
  },
  {
    id: "beachcomber-5-eastern",
    ship: "Beachcomber",
    departure_port: "Miami, FL",
    nights: 5,
    route: "Eastern Caribbean",
    ports_of_call: ["San Juan", "Puerto Plata"],
    typical_days: "",
    description:
      "A shorter taste of the Eastern Caribbean from Miami: San Juan's history and the beaches of the Dominican Republic.",
    image: "/deals/beachcomber.jpg",
    note: "Sailing early 2027 · [PLACEHOLDER: confirm]",
  },
];
