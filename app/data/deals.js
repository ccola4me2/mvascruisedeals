// Margaritaville at Sea content for MVA Cruise Deals.
//
// IMPORTANT: This is a real agency site. Ship names and photos are real. Sailing
// dates and pricing change constantly, so nothing here states a specific fare as
// a live offer. Every deal drives the visitor to request a current quote / group
// rate. Paradise and Islander homeports/itineraries are confirmed; Beachcomber's
// deployment details are pending confirmation, so they are intentionally left off
// until verified (do not publish guessed homeports/itineraries).

export const ships = [
  {
    id: "paradise",
    name: "Margaritaville at Sea Paradise",
    homeport: "Port of Palm Beach, FL",
    lengths: "2 & 3 nights",
    region: "Bahamas",
    blurb:
      "The quick-escape ship. Short, affordable getaways from South Florida to Grand Bahama Island, with island-time vibes the moment you step aboard.",
    image: "/deals/paradise.jpg",
  },
  {
    id: "islander",
    name: "Margaritaville at Sea Islander",
    homeport: "Port Tampa Bay, FL",
    lengths: "4 to 7 nights",
    region: "Western Caribbean",
    blurb:
      "The full Caribbean experience. Longer sailings to Key West, Cozumel, and Grand Cayman aboard a larger, feature-packed ship.",
    image: "/deals/islander.jpg",
  },
  {
    id: "beachcomber",
    name: "Margaritaville at Sea Beachcomber",
    region: "Margaritaville at Sea",
    blurb:
      "The newest ship in the Margaritaville at Sea fleet. Ask us about current Beachcomber sailings, itineraries, and group space.",
    image: "/deals/beachcomber.jpg",
  },
];

export const deals = [
  {
    id: "paradise-2-night-bahamas",
    ship: "Margaritaville at Sea Paradise",
    shipId: "paradise",
    title: "2-Night Bahamas Getaway",
    departurePort: "Port of Palm Beach, FL",
    nights: 2,
    region: "Bahamas",
    ports: ["Port of Palm Beach", "Grand Bahama Island (Freeport)"],
    highlight: "Our most popular quick escape",
    priceNote: "Ask for current sailing rates",
    image: "/deals/paradise.jpg",
  },
  {
    id: "paradise-3-night-bahamas",
    ship: "Margaritaville at Sea Paradise",
    shipId: "paradise",
    title: "3-Night Bahamas Long Weekend",
    departurePort: "Port of Palm Beach, FL",
    nights: 3,
    region: "Bahamas",
    ports: ["Port of Palm Beach", "Grand Bahama Island (Freeport)", "Day at Sea"],
    highlight: "Extra day of island time",
    priceNote: "Ask for current sailing rates",
    image: "/deals/paradise.jpg",
  },
  {
    id: "islander-4-night-caribbean",
    ship: "Margaritaville at Sea Islander",
    shipId: "islander",
    title: "4-Night Western Caribbean",
    departurePort: "Port Tampa Bay, FL",
    nights: 4,
    region: "Western Caribbean",
    ports: ["Tampa", "Cozumel", "Day at Sea"],
    highlight: "Cozumel in a long weekend",
    priceNote: "Ask for current sailing rates",
    image: "/deals/islander.jpg",
  },
  {
    id: "islander-5-night-caribbean",
    ship: "Margaritaville at Sea Islander",
    shipId: "islander",
    title: "5-Night Western Caribbean",
    departurePort: "Port Tampa Bay, FL",
    nights: 5,
    region: "Western Caribbean",
    ports: ["Tampa", "Key West", "Cozumel", "Day at Sea"],
    highlight: "Key West plus Cozumel",
    priceNote: "Ask for current sailing rates",
    image: "/deals/islander.jpg",
  },
  {
    id: "islander-6-night-caribbean",
    ship: "Margaritaville at Sea Islander",
    shipId: "islander",
    title: "6-Night Western Caribbean",
    departurePort: "Port Tampa Bay, FL",
    nights: 6,
    region: "Western Caribbean",
    ports: ["Tampa", "Grand Cayman", "Cozumel", "Days at Sea"],
    highlight: "Grand Cayman on the itinerary",
    priceNote: "Ask for current sailing rates",
    image: "/deals/islander.jpg",
  },
  {
    id: "islander-7-night-caribbean",
    ship: "Margaritaville at Sea Islander",
    shipId: "islander",
    title: "7-Night Western Caribbean",
    departurePort: "Port Tampa Bay, FL",
    nights: 7,
    region: "Western Caribbean",
    ports: ["Tampa", "Key West", "Grand Cayman", "Cozumel", "Days at Sea"],
    highlight: "The full week at sea",
    priceNote: "Ask for current sailing rates",
    image: "/deals/islander.jpg",
  },
];

export function getDeal(id) {
  return deals.find((deal) => deal.id === id);
}
