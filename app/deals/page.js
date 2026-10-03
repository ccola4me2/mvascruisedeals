import DealCard from "../components/DealCard";
import FeaturedDeal from "../components/FeaturedDeal";
import QuoteSection from "../components/QuoteSection";
import { deals } from "../data/deals";
import { featuredDeals } from "../data/featuredDeals";

export const metadata = {
  title: "Margaritaville at Sea Cruise Deals",
  description:
    "Featured Margaritaville at Sea deals and every sailing from MVAS Cruise Deals: new Galveston sailings, an 8-night Southern Caribbean, the Parrothead Day Cruise, and more. Request current rates.",
  alternates: { canonical: "/deals/" },
};

export default function DealsPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="hero-banner hero-banner--center">
            Up to $100 onboard credit on most sailings
          </div>
          <p className="eyebrow">Current sailings</p>
          <h1>Margaritaville at Sea Cruise Deals</h1>
          <p className="page-lede">
            Sailings across all three Margaritaville at Sea ships, from quick
            Bahamas and Key West getaways to week-long Caribbean escapes. Fares
            change often and cabins sell out, so request a current quote and
            we&apos;ll send the best available rate for your dates.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Hand-picked offers</p>
            <h2>Featured deals</h2>
          </div>
          <div className="fdeal-list">
            {featuredDeals.map((deal, i) => (
              <FeaturedDeal key={deal.id} deal={deal} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Every itinerary</p>
            <h2>All Margaritaville at Sea sailings</h2>
          </div>
          <div className="deal-grid">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      <QuoteSection
        eyebrow="Ready to book your deal?"
        title="Get your free quote"
        lede="Tell me which sailing caught your eye and your party size, and I'll send the best available fare or group rate, usually within one business day. No fees, no obligation."
      />
    </>
  );
}
