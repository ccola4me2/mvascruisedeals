// The current limited-time sale, shown as a slim bar on every page and a card
// on /deals. `ends` is the last day (ISO). The site is a static export, so the
// browser hides both once the end of that day (Eastern, EST in November) has
// passed. When the sale is over, delete the <SaleBar /> line in app/layout.js,
// the <SaleCard /> line in app/deals/page.js, and this file.

export const flashSale = {
  name: "Veterans Day Flash Sale",
  headline: "Up to $1,000 onboard credit",
  ends: "2026-11-15",
  endsAt: "2026-11-15T23:59:59-05:00",
  window: "November 9 to November 15, 2026",
  // Onboard credit per person, by sailing length, for guests 1 to 4.
  credits: [
    { length: "Up to 3 nights", amount: "$25" },
    { length: "4 to 5 nights", amount: "$75" },
    { length: "6 to 7 nights", amount: "$175" },
    { length: "8 to 10 nights", amount: "$250" },
  ],
  terms:
    "Available for new reservations only made from November 9, 2026 to November 15, 2026. The offer includes onboard credit applied per guests 1-4 based on the duration of the selected sailing. Onboard credit is only earned/credited for guests paying at least $1 in cruise fare.",
};
