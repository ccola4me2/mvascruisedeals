// Featured / promoted cruise deals for the Cruise Deals page.
// These are specific, dated offers with real pricing from the current flyers.
// Keep pricing accurate and current; when a sailing closes, remove its object.
// The first entry is the current "Deal of the week."
//
// Each deal with a `landing` block also gets its own page at /deals/<slug>/.
// The page is built entirely from this file plus app/data/destinations.js, so
// a price or date changed here changes the card, the page, and the share link
// together. Write landing copy only from facts you can back up.
//
//   landing.slug      URL slug, and the name of public/og/<slug>.jpg
//   landing.departs   ISO date; the page shows a "this sailing has departed"
//                     notice once it passes
//   landing.homeport  e.g. "Galveston, TX"
//   landing.ports     port labels that match destinations.js, so each port
//                     links to its destination page
//   landing.from      headline price, and landing.fromUnit what it means
//   landing.group     true when the rate comes from a group block

export const featuredDeals = [
  {
    id: "beachcomber-7night-belize-mexico-galveston-2027",
    tag: "New from Galveston",
    title: "7-Night Belize & Mexico",
    ship: "Margaritaville at Sea Beachcomber",
    when: "October 22 to 29, 2027",
    nights: "7 nights",
    itinerary: "Round-trip Galveston: Cozumel, Belize City, Progreso",
    image: "/deals/beachcomber.jpg",
    limited: "Limited cabins available at this group rate",
    cabins: [
      { type: "Interior", name: "Cozy Interior", price: "$695.98" },
      { type: "Oceanview", name: "Picturesque Oceanview", price: "$807.58" },
      { type: "Balcony", name: "Breezy Balcony", price: "$1,095.88" },
      { type: "Suite", name: "Junior Corner Suite", price: "$1,860.88" },
    ],
    priceBasis: "Per guest, double occupancy. Taxes, fees, and gratuities included.",
    onboardCredit: "$75",
    includes: ["Taxes", "Fees", "Gratuities"],
    cta: { label: "Get This Deal", href: "/contact" },
    landing: {
      slug: "galveston-belize-mexico-oct-2027",
      departs: "2027-10-22",
      homeport: "Galveston, TX",
      ports: ["Cozumel", "Belize", "Progreso"],
      from: "$695.98",
      fromUnit: "per guest, double occupancy",
      group: true,
      lede: "A week of Mexican reefs and Belize adventure on Beachcomber, sailing round-trip from the Port of Galveston at a group rate that already includes taxes, fees, and gratuities.",
      why: [
        {
          title: "Taxes, fees, and gratuities included",
          text: "The price per guest already covers the basics, so there are no add-ons to chase before you book.",
        },
        {
          title: "Sail from Texas",
          text: "Round-trip from the Port of Galveston, a brand-new Margaritaville at Sea homeport and an easy start for Texas and Gulf Coast travelers.",
        },
        {
          title: "Three very different ports",
          text: "Reef beaches in Cozumel, barrier-reef and cave-tubing adventures from Belize City, and the Yucatan gateway of Progreso.",
        },
      ],
      faqs: [
        {
          q: "Which ship is this, and where does it leave from?",
          a: "Margaritaville at Sea Beachcomber, the largest ship in the fleet, sailing round-trip from the Port of Galveston, Texas, on October 22, 2027.",
        },
      ],
    },
  },
  {
    id: "beachcomber-7night-mexico-trio-galveston-2028",
    tag: "New from Galveston",
    title: "7-Night Mexico Trio",
    ship: "Margaritaville at Sea Beachcomber",
    when: "January 14 to 21, 2028",
    nights: "7 nights",
    itinerary: "Round-trip Galveston: Cozumel, Progreso, Veracruz",
    image: "/deals/beachcomber.jpg",
    limited: "Limited cabins available at this group rate",
    cabins: [
      { type: "Interior", name: "Cozy Interior", price: "$742.41" },
      { type: "Oceanview", name: "Picturesque Oceanview", price: "$854.01" },
      { type: "Balcony", name: "Breezy Balcony", price: "$1,188.81" },
    ],
    priceBasis: "Per guest, double occupancy. Taxes, fees, and gratuities included.",
    onboardCredit: "$75",
    includes: ["Taxes", "Fees", "Gratuities"],
    cta: { label: "Get This Deal", href: "/contact" },
    landing: {
      slug: "galveston-mexico-trio-jan-2028",
      departs: "2028-01-14",
      homeport: "Galveston, TX",
      ports: ["Cozumel", "Progreso", "Veracruz"],
      from: "$742.41",
      fromUnit: "per guest, double occupancy",
      group: true,
      lede: "Cozumel, Progreso, and historic Veracruz in one week, round-trip from Galveston on Beachcomber, at a group rate with taxes, fees, and gratuities included.",
      why: [
        {
          title: "Taxes, fees, and gratuities included",
          text: "The price per guest already covers the basics, so there are no add-ons to chase before you book.",
        },
        {
          title: "Historic Veracruz",
          text: "Marimba plazas, a centuries-old harbor fortress, and one of Latin America's top aquariums make Veracruz the standout stop on this itinerary.",
        },
        {
          title: "Early in Galveston's first season",
          text: "Galveston is a brand-new homeport, and this winter sailing is early in its first season, so group-rate cabins go quickly.",
        },
      ],
      faqs: [
        {
          q: "Which ship is this, and where does it leave from?",
          a: "Margaritaville at Sea Beachcomber, the largest ship in the fleet, sailing round-trip from the Port of Galveston, Texas, on January 14, 2028.",
        },
      ],
    },
  },
  {
    id: "islander-8night-grand-cayman-central-america-2028",
    tag: "Central America",
    title: "8-Night Grand Cayman & Central America",
    ship: "Margaritaville at Sea Islander",
    when: "October 7 to 15, 2028",
    nights: "8 nights",
    itinerary: "Round-trip Tampa: Limon, Colon, Grand Cayman",
    image: "/deals/islander.jpg",
    limited: "Limited cabins available at this group rate",
    cabins: [
      { type: "Interior", name: "Cozy Interior", price: "$881.85" },
      { type: "Oceanview", name: "Picturesque Oceanview", price: "$967.35" },
      { type: "Balcony", name: "Breezy Balcony", price: "$1,261.85" },
      { type: "Suite", name: "Grand Terrace Suite", price: "$2,150.35" },
    ],
    priceBasis: "Per guest, double occupancy. Taxes, fees, and gratuities included.",
    onboardCredit: "$50",
    includes: ["Taxes", "Fees", "Gratuities"],
    cta: { label: "Get This Deal", href: "/contact" },
    landing: {
      slug: "tampa-central-america-oct-2028",
      departs: "2028-10-07",
      homeport: "Tampa, FL",
      ports: ["Limon", "Colon", "Grand Cayman"],
      from: "$881.85",
      fromUnit: "per guest, double occupancy",
      group: true,
      lede: "Costa Rica and Panama on one itinerary, plus Grand Cayman, sailing round-trip from Tampa on Islander at a group rate with taxes, fees, and gratuities included.",
      why: [
        {
          title: "Taxes, fees, and gratuities included",
          text: "The price per guest already covers the basics, so there are no add-ons to chase before you book.",
        },
        {
          title: "Two Central American ports",
          text: "Limon, Costa Rica for rainforest canals and sloths, and Colon, Panama at the Caribbean doorway to the Panama Canal.",
        },
        {
          title: "Round-trip from Tampa",
          text: "Sail from Port Tampa Bay aboard Islander, the feature-packed ship with more than a dozen dining venues, bars, and kids' clubs.",
        },
      ],
      faqs: [
        {
          q: "Which ship is this, and where does it leave from?",
          a: "Margaritaville at Sea Islander, sailing round-trip from Port Tampa Bay, Florida, on October 7, 2028.",
        },
      ],
    },
  },
  {
    id: "beachcomber-southern-8night-2027",
    tag: "Best value",
    title: "8-Night Southern Caribbean",
    ship: "Margaritaville at Sea Beachcomber",
    when: "February 19 to 27, 2027",
    nights: "8 nights",
    itinerary: "Aruba, Bonaire, Puerto Plata",
    image: "/deals/beachcomber.jpg",
    compare: {
      basis: "Same sailing, same cabin, total for two. Every fare adds a $75 onboard credit.",
      rows: [
        { cabin: "Interior", direct: "$1,950.00", ours: "$1,617.90" },
        { cabin: "Balcony", direct: "$6,350.00", ours: "$2,381.70" },
      ],
    },
    savings: "Up to $3,968.30",
    savingsNote: "on a balcony cabin",
    onboardCredit: "$75",
    includes: ["Taxes", "Fees", "Gratuities"],
    cta: { label: "Get This Deal", href: "/contact" },
    landing: {
      slug: "miami-southern-caribbean-feb-2027",
      departs: "2027-02-19",
      homeport: "Miami, FL",
      ports: ["Aruba", "Bonaire", "Puerto Plata"],
      from: "$1,617.90",
      fromUnit: "interior, total for two",
      group: false,
      lede: "Eight nights in the Southern Caribbean on Beachcomber: Aruba, Bonaire, and Puerto Plata, with taxes, fees, and gratuities included and a $75 onboard credit on every fare.",
      why: [
        {
          title: "The comparison, side by side",
          text: "The pricing below puts the direct price next to my rate for the same sailing and the same cabin, so you can see the difference for yourself.",
        },
        {
          title: "Three distinct islands",
          text: "Aruba's trade-wind beaches, Bonaire's protected reef, and the amber coast of Puerto Plata in the Dominican Republic.",
        },
        {
          title: "Early in Beachcomber's first season",
          text: "February 2027 is among the earliest sailings of the fleet's largest ship, sailing round-trip from Miami.",
        },
      ],
      faqs: [
        {
          q: "Which ship is this, and where does it leave from?",
          a: "Margaritaville at Sea Beachcomber, the largest ship in the fleet, sailing round-trip from PortMiami on February 19, 2027.",
        },
      ],
    },
  },
  {
    id: "beachcomber-5night-bahamas-eastern-2027",
    tag: "New deal alert",
    // Optional seasonal promo banner. Set a string to show a green banner on the
    // card (e.g. "St. Patrick's Day Sailing"); remove or leave off to hide it.
    title: "5-Night Bahamas & Eastern Caribbean",
    ship: "Margaritaville at Sea Beachcomber",
    when: "March 15 to 20, 2027",
    nights: "5 nights",
    itinerary: "Round-trip Miami: Nassau and Puerto Plata",
    image: "/deals/beachcomber.jpg",
    cabins: [
      { type: "Interior", name: "Cozy Interior", price: "$411.22" },
      { type: "Oceanview", name: "Picturesque Oceanview", price: "$522.82" },
      {
        type: "Balcony",
        name: "Breezy Balcony",
        price: "$727.42",
        tag: "Most booked",
      },
    ],
    priceBasis: "Per guest, double occupancy. Gratuities additional.",
    onboardCredit: "$75",
    includes: ["Taxes", "Fees"],
    cta: { label: "Get This Deal", href: "/contact" },
    landing: {
      slug: "miami-bahamas-eastern-mar-2027",
      departs: "2027-03-15",
      homeport: "Miami, FL",
      ports: ["Nassau", "Puerto Plata"],
      from: "$411.22",
      fromUnit: "per guest, double occupancy",
      group: false,
      lede: "A five-night Bahamas and Eastern Caribbean getaway on Beachcomber: Nassau and Puerto Plata, round-trip from Miami, with a $75 onboard credit on every fare.",
      why: [
        {
          title: "Five nights, two islands",
          text: "Enough time for Nassau's beaches and Puerto Plata's mountain views without taking a full week away.",
        },
        {
          title: "The balcony is the favorite",
          text: "The Breezy Balcony is the most-booked cabin on this sailing.",
        },
        {
          title: "Round-trip from Miami",
          text: "Sail from PortMiami aboard Beachcomber, the largest ship in the Margaritaville at Sea fleet.",
        },
      ],
      faqs: [
        {
          q: "Which ship is this, and where does it leave from?",
          a: "Margaritaville at Sea Beachcomber, the largest ship in the fleet, sailing round-trip from PortMiami on March 15, 2027.",
        },
        {
          q: "Are gratuities included in this price?",
          a: "No. Taxes and fees are included, and gratuities are additional on this sailing.",
        },
      ],
    },
  },
  {
    id: "parrot-head-day-cruise-2027",
    tag: "Group cruise",
    title: "International Parrothead Day Cruise 2027",
    ship: "Margaritaville at Sea Beachcomber",
    when: "June 26 to July 3, 2027",
    nights: "7 nights",
    itinerary: "Round-trip Miami: Key West, Grand Cayman, Ocho Rios",
    image: "/deals/beachcomber.jpg",
    logo: "/parrot-head-drifters-logo.png",
    fromPrice: "$844.40",
    fromUnit: "per person, double occupancy",
    onboardCredit: "$100",
    blurb:
      "Sail with the Parrothead Drifters on the biggest Parrothead cruise of the year aboard the brand-new Beachcomber. Live music, theme nights, and a whole ship full of fins-up fun.",
    cta: {
      label: "Visit parrotheadscruise.com",
      href: "https://www.parrotheadscruise.com",
      external: true,
    },
  },
];

export function getLandingDeal(slug) {
  return featuredDeals.find((d) => d.landing && d.landing.slug === slug);
}
