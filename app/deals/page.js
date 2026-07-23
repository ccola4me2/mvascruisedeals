import DealCard from "../components/DealCard";
import { deals } from "../data/deals";

export const metadata = {
  title: "Cruise Deals",
  description:
    "Browse current cruise deals from MVA Cruise Deals — Caribbean, Alaska, Mediterranean, Bahamas, Mexico, and Hawaii sailings at the lowest fares.",
};

export default function DealsPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Current offers</p>
          <h1>Cruise Deals</h1>
          <p className="page-lede">
            Live-tracked fares across the world&apos;s top cruise lines. Prices are
            per person and update as inventory changes, so grab a quote before your
            favorite sailing sells out.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="deal-grid">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
