// Weekly Cruise Spotlight ("Deal of the Week").
// Update this object each week to feature a new sailing. Keep pricing accurate
// and current; leave priced fields blank ("") to hide them.

export const spotlight = {
  eyebrow: "Deal of the week",
  title: "New Year's at Sea",
  subtitle: "Ring in 2027 the Margaritaville way",
  ship: "Margaritaville at Sea Islander",
  facts: [
    { label: "Departs", value: "Tampa, Dec 28, 2026" },
    { label: "Length", value: "5-Night Mexico Duo" },
    { label: "Cabin", value: "Balcony for two" },
  ],
  theirPrice: "$2,374",
  ourPrice: "$1,818",
  priceUnit: "total for two",
  savings: "556",
  onboardCredit: { amount: "$25", text: "Onboard credit included" },
  includes: ["Taxes included", "Fees included", "Gratuities included"],
  addOn: "Drink & Wi-Fi bundle available at $499 per person (subject to change).",
  image: "/deals/islander.jpg",
};
