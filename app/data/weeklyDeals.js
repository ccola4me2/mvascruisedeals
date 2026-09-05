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
