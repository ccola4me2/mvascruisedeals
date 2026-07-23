import Link from "next/link";
import Image from "next/image";
import DealCard from "./components/DealCard";
import { deals, ships } from "./data/deals";

export default function HomePage() {
  const featured = deals.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">It&apos;s always island time</p>
          <h1 className="hero-title">
            Margaritaville at Sea cruise deals and group rates.
          </h1>
          <p className="hero-subtitle">
            We specialize in one thing: getting you the best fares and group
            rates on Margaritaville at Sea. From 2-night Bahamas escapes to
            week-long Caribbean sailings, tell us your dates and we&apos;ll do the
            rest.
          </p>
          <div className="hero-actions">
            <Link href="/deals" className="btn btn-primary btn-lg">
              See Cruise Deals
            </Link>
            <Link href="/group-rates" className="btn btn-ghost btn-lg">
              Book a Group
            </Link>
          </div>
          <dl className="hero-stats">
            <div>
              <dt>3</dt>
              <dd>Ships, endless island time</dd>
            </div>
            <div>
              <dt>3</dt>
              <dd>Florida homeports</dd>
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
            <h2>Popular Margaritaville at Sea sailings</h2>
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
            <h2>Meet the Margaritaville at Sea fleet</h2>
          </div>
          <div className="ship-grid">
            {ships.map((ship) => (
              <article className="ship-card" key={ship.id}>
                <div className="ship-media">
                  <Image
                    src={ship.image}
                    alt={ship.name}
                    width={640}
                    height={420}
                    className="ship-image"
                  />
                  {ship.status && (
                    <span className="ship-status">{ship.status}</span>
                  )}
                </div>
                <div className="ship-body">
                  <p className="deal-line">{ship.region}</p>
                  <h3>{ship.name}</h3>
                  {ship.homeport && (
                    <p className="deal-meta">Sails from {ship.homeport}</p>
                  )}
                  <p>{ship.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <h2>Why book with MVA Cruise Deals</h2>
          </div>
          <div className="feature-grid">
            <div className="feature">
              <h3>Margaritaville specialists</h3>
              <p>
                We book Margaritaville at Sea every day, so we know the ships,
                the cabins, and the sailings that deliver the best value.
              </p>
            </div>
            <div className="feature">
              <h3>Group rate experts</h3>
              <p>
                Sailing with 8 cabins or more? We unlock group pricing, perks,
                and amenities you can&apos;t get booking on your own.
              </p>
            </div>
            <div className="feature">
              <h3>No booking fees</h3>
              <p>
                Our help is free. You get a real person to plan, book, and
                support your cruise from quote to gangway.
              </p>
            </div>
            <div className="feature">
              <h3>Personal service</h3>
              <p>
                One dedicated agent handles your booking start to finish. No call
                centers, no runaround.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>Ready to set sail?</h2>
          <p>
            Send us your preferred ship, dates, and party size. We&apos;ll reply
            with the best available fare or group rate, usually within one
            business day.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Get My Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
