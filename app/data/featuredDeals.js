// Featured / promoted cruise deals for the Cruise Deals page.
// These are specific, dated offers with real pricing from the current flyers.
// Keep pricing accurate and current; when a sailing closes, remove its object.

export const featuredDeals = [
  {
    id: "new-years-islander-2026",
    tag: "Deal of the week",
    title: "New Year's at Sea",
    ship: "Margaritaville at Sea Islander",
    when: "Departs Tampa, Dec 28, 2026",
    nights: "5 nights",
    itinerary: "5-Night Mexico Duo",
    image: "/deals/islander.jpg",
    compare: {
      basis: "Balcony cabin, total for two",
      rows: [{ cabin: "Balcony for two", direct: "$2,374", ours: "$1,818" }],
    },
    savings: "$556",
    onboardCredit: "$25",
    includes: ["Taxes", "Fees", "Gratuities"],
    cta: { label: "Get This Deal", href: "/contact" },
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
      basis: "Same ship, same sailing, same cabin",
      rows: [
        { cabin: "Interior", direct: "$1,850", ours: "$1,617.90" },
        { cabin: "Oceanview", direct: "$2,270", ours: "$2,073.90" },
        { cabin: "Balcony", direct: "$3,550", ours: "$2,381.70" },
      ],
    },
    savings: "Up to $1,168",
    savingsNote: "on a balcony cabin",
    onboardCredit: "$75",
    includes: ["Taxes", "Fees", "Gratuities"],
    cta: { label: "Get This Deal", href: "/contact" },
  },
  {
    id: "parrot-head-day-cruise-2027",
    tag: "Group cruise",
    title: "International Parrot Head Day Cruise 2027",
    ship: "Margaritaville at Sea Beachcomber",
    when: "June 26 to July 3, 2027",
    nights: "7 nights",
    itinerary: "Round-trip Miami: Key West, Grand Cayman, Ocho Rios",
    image: "/deals/beachcomber.jpg",
    logo: "/parrot-head-drifters-logo.png",
    fromPrice: "$844.40",
    fromUnit: "per person, double occupancy",
    blurb:
      "Sail with the Parrot Head Drifters on the biggest Parrothead cruise of the year aboard the brand-new Beachcomber. Live music, theme nights, and a whole ship full of fins-up fun.",
    cta: {
      label: "Visit parrotheadscruise.com",
      href: "https://www.parrotheadscruise.com",
      external: true,
    },
  },
];
