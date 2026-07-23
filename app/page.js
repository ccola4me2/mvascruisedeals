import Link from "next/link";
import DealCard from "./components/DealCard";
import { deals } from "./data/deals";

export default function HomePage() {
  const featured = deals.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">Sail more. Spend less.</p>
          <h1 className="hero-title">
            Unbeatable cruise deals, hand-picked by real travel experts.
          </h1>
          <p className="hero-subtitle">
            MVA Cruise Deals scours every major cruise line so you don&apos;t have to.
            Compare current offers, lock in the lowest fares, and set sail with
            confidence.
          </p>
          <div className="hero-actions">
            <Link href="/deals" className="btn btn-primary btn-lg">
              Browse Deals
            </Link>
            <Link href="/contact" className="btn btn-ghost btn-lg">
              Talk to an Expert
            </Link>
          </div>
          <dl className="hero-stats">
            <div>
              <dt>25+</dt>
              <dd>Cruise lines</dd>
            </div>
            <div>
              <dt>1,000s</dt>
              <dd>Sailings tracked</dd>
            </div>
            <div>
              <dt>$0</dt>
              <dd>Booking fees</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Featured deals this week</h2>
            <Link href="/deals" className="section-link">
              View all deals &rarr;
            </Link>
          </div>
          <div className="deal-grid">
            {featured.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-head section-head--center">
            <h2>Why book with MVA Cruise Deals</h2>
          </div>
          <div className="feature-grid">
            <div className="feature">
              <h3>Lowest-fare guarantee</h3>
              <p>
                Find the same sailing for less and we&apos;ll match it. You never
                overpay when you book through us.
              </p>
            </div>
            <div className="feature">
              <h3>No booking fees</h3>
              <p>
                We&apos;re paid by the cruise lines, not by you. Expert help comes at
                no extra cost.
              </p>
            </div>
            <div className="feature">
              <h3>Real human support</h3>
              <p>
                From your first question to the day you disembark, a dedicated
                cruise specialist has your back.
              </p>
            </div>
            <div className="feature">
              <h3>Exclusive perks</h3>
              <p>
                Onboard credit, free upgrades, and drink packages you won&apos;t find
                booking direct.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>Ready to find your next cruise?</h2>
          <p>
            Tell us where you want to go and your budget. We&apos;ll send you the best
            matching deals within one business day.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Get My Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
