// Homepage "Deals of the Week" , shown as a 3-up grid on the home page.
// Add, remove, or reorder deals here (keep it to ~3 for the grid to look right).
//
// Editable fields per deal:
//   urgency  , scarcity/urgency line on the card. Examples:
//              "Limited cabins at this rate"  or  "Fares good through 12/1/26"
//   banner   , optional green seasonal promo banner (e.g. "St. Patrick's Day
//              Sailing"); leave off to hide it.

export const weeklyDeals = [
  {
    id: "islander-6night-belize-progreso-nov2026",
    tag: "Deal of the week",
    title: "6-Night Belize & Progreso",
    ship: "Margaritaville at Sea Islander",
    when: "November 14, 2026",
    ports: "Round-trip Tampa · Belize · Progreso",
    image: "/deals/islander.jpg",
    fare: "$464.71",
    fareUnit: "per person, balcony",
    onboardCredit: "$75",
    urgency: "Limited cabins at this rate",
    cta: { label: "Get This Deal", href: "/contact" },
  },
  {
    id: "islander-5night-mexico-duo-nov2026",
    tag: "Special rate",
    title: "5-Night Mexico Duo",
    ship: "Margaritaville at Sea Islander",
    when: "November 30, 2026",
    ports: "Round-trip Tampa · Progreso · Cozumel",
    image: "/deals/islander.jpg",
    fare: "$633.55",
    fareUnit: "per person, balcony",
    onboardCredit: "$50",
    urgency: "Limited cabins at this rate",
    cta: { label: "Get This Deal", href: "/contact" },
  },
  {
    id: "beachcomber-5night-bahamas-eastern-2027",
    tag: "New deal alert",
    title: "5-Night Bahamas & Eastern Caribbean",
    ship: "Margaritaville at Sea Beachcomber",
    when: "March 15 to 20, 2027",
    ports: "Round-trip Miami · Nassau · Puerto Plata",
    image: "/deals/beachcomber.jpg",
    fare: "From $411.22",
    fareUnit: "per guest, double occupancy",
    onboardCredit: "$75",
    urgency: "Limited cabins at this rate",
    cta: { label: "Get This Deal", href: "/contact" },
  },
];
