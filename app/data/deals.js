// Margaritaville at Sea content for MVA Cruise Deals.
//
// Ship facts below are sourced from the official Margaritaville at Sea ship
// reference guides (homeports, destinations, launch timing, tonnage). Sailing
// dates and pricing change constantly, so nothing here states a specific fare as
// a live offer; every deal drives the visitor to request current sailings and a
// quote. Specific per-sailing night counts are intentionally omitted where not
// confirmed, to avoid publishing wrong itineraries.

export const ships = [
  {
    id: "paradise",
    name: "Margaritaville at Sea Paradise",
    homeport: "Port of Palm Beach, FL",
    region: "The Bahamas, Key West & Cozumel",
    blurb:
      "Your easy-breezy resort at sea. Sail from the Port of Palm Beach to Nassau and Key West, and starting summer 2026, to Cozumel, Mexico. 52,926 GT, room for 1,316 guests.",
    image: "/deals/paradise.jpg",
  },
  {
    id: "islander",
    name: "Margaritaville at Sea Islander",
    homeport: "Port Tampa Bay, FL",
    region: "Western Caribbean",
    blurb:
      "The feature-packed ship that debuted in 2024, with more than a dozen dining venues, bars, and kids' clubs. Western Caribbean sailings from Tampa.",
    image: "/deals/islander.jpg",
  },
  {
    id: "beachcomber",
    name: "Margaritaville at Sea Beachcomber",
    homeport: "PortMiami, FL",
    region: "Eastern Caribbean",
    status: "Sailing early 2027",
    blurb:
      "The largest ship in the fleet at over 102,000 GT, built for longer escapes. 4 to 8-night Eastern Caribbean journeys to St. Maarten, St. Thomas, San Juan, and the Dominican Republic. Now booking the inaugural season.",
    image: "/deals/beachcomber.jpg",
  },
];

export const deals = [
  {
    id: "paradise-bahamas",
    ship: "Margaritaville at Sea Paradise",
    shipId: "paradise",
    title: "Bahamas Getaway to Nassau",
    departurePort: "Port of Palm Beach, FL",
    badge: "Bahamas",
    region: "The Bahamas",
    ports: ["Port of Palm Beach", "Nassau"],
    highlight: "Year-round sunshine and white-sand beaches",
    priceNote: "Ask for current sailings & rates",
    image: "/deals/paradise.jpg",
  },
  {
    id: "paradise-key-west",
    ship: "Margaritaville at Sea Paradise",
    shipId: "paradise",
    title: "Key West & The Bahamas",
    departurePort: "Port of Palm Beach, FL",
    badge: "Bahamas + Key West",
    region: "Key West & The Bahamas",
    ports: ["Port of Palm Beach", "Key West", "Nassau"],
    highlight: "Two islands, one easy getaway",
    priceNote: "Ask for current sailings & rates",
    image: "/deals/paradise.jpg",
  },
  {
    id: "paradise-cozumel",
    ship: "Margaritaville at Sea Paradise",
    shipId: "paradise",
    title: "Cozumel Escape",
    departurePort: "Port of Palm Beach, FL",
    badge: "New Summer 2026",
    region: "Cozumel, Mexico",
    ports: ["Port of Palm Beach", "Cozumel"],
    highlight: "All-new Mexico sailings starting summer 2026",
    priceNote: "Ask for current sailings & rates",
    image: "/deals/paradise.jpg",
  },
  {
    id: "islander-western-caribbean",
    ship: "Margaritaville at Sea Islander",
    shipId: "islander",
    title: "Western Caribbean",
    departurePort: "Port Tampa Bay, FL",
    badge: "Western Caribbean",
    region: "Western Caribbean",
    ports: ["Tampa", "Cozumel", "Days at Sea"],
    highlight: "Longer Caribbean sailings from Tampa",
    priceNote: "Ask for current sailings & rates",
    image: "/deals/islander.jpg",
  },
  {
    id: "beachcomber-eastern-caribbean",
    ship: "Margaritaville at Sea Beachcomber",
    shipId: "beachcomber",
    title: "4 to 8-Night Eastern Caribbean",
    departurePort: "PortMiami, FL",
    badge: "Sailing early 2027",
    region: "Eastern Caribbean",
    ports: ["Miami", "St. Maarten", "St. Thomas", "San Juan", "Dominican Republic"],
    highlight: "Inaugural-season bookings now open",
    priceNote: "Ask about inaugural sailings",
    image: "/deals/beachcomber.jpg",
  },
];

export function getDeal(id) {
  return deals.find((deal) => deal.id === id);
}
