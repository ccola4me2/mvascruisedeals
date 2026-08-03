// Weekly Cruise Spotlight ("Deal of the week") on the home page.
// Update this object each week to feature a new sailing. Keep pricing accurate.
// Use either a their-vs-our comparison (theirPrice/ourPrice/savings) OR a
// from-price (fromPrice/fromUnit); leave the unused fields off.

export const spotlight = {
  eyebrow: "Deal of the week",
  title: "5-Night Bahamas & Eastern Caribbean",
  subtitle: "Sail the Beachcomber from Miami",
  ship: "Margaritaville at Sea Beachcomber",
  facts: [
    { label: "Departs", value: "Miami, Mar 15, 2027" },
    { label: "Length", value: "5 nights" },
    { label: "Ports", value: "Nassau & Puerto Plata" },
  ],
  fromPrice: "$411.22",
  fromUnit: "per guest, double occupancy",
  onboardCredit: { amount: "$75", text: "Onboard credit per cabin" },
  includes: ["Taxes included", "Fees included"],
  addOn: "Gratuities additional.",
  image: "/deals/beachcomber.jpg",
};
