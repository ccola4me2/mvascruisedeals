import Link from "next/link";
import Image from "next/image";
import { ships } from "./data/deals";
import { spotlight } from "./data/spotlight";
import { groups } from "./data/groups";

export default function HomePage() {
  const flagship = groups.find((g) => g.featured) || groups[0];

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <Image
            src="/deals/islander.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-img"
          />
        </div>
        <div className="hero-overlay" />
        <div className="container hero-inner">
          <p className="eyebrow eyebrow--light">Margaritaville at Sea specialists</p>
          <h1 className="hero-title">
            Your Margaritaville at Sea <em>cruise deals</em> and group experts.
          </h1>
          <p className="hero-subtitle">
            From quick Bahamas escapes to week-long Caribbean sailings, we find
            the best fares and group rates across all three ships, then handle
            every detail from quote to gangway.
          </p>
          <div className="hero-actions">
            <Link href="/deals" className="btn btn-primary btn-lg">
              See Cruise Deals
            </Link>
            <Link href="/group-rates" className="btn btn-glass btn-lg">
              Group Rates
            </Link>
          </div>
          <dl className="hero-stats">
            <div>
              <dt>3</dt>
              <dd>Ships in the fleet</dd>
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

      {/* Weekly Cruise Spotlight */}
      <section className="section">
        <div className="container">
          <div className="spotlight">
            <div className="spotlight-media">
              <Image
                src={spotlight.image}
                alt={spotlight.ship}
                fill
                sizes="(max-width: 860px) 100vw, 55vw"
                className="spotlight-img"
              />
              {spotlight.savings && (
                <div className="save-seal">
                  <span className="save-seal-label">You Save</span>
                  <span className="save-seal-amt">${spotlight.savings}</span>
                </div>
              )}
            </div>
            <div className="spotlight-body">
              <p className="eyebrow">{spotlight.eyebrow}</p>
              <h2 className="spotlight-title">{spotlight.title}</h2>
              <p className="spotlight-subtitle">{spotlight.subtitle}</p>
              <p className="spotlight-ship">{spotlight.ship}</p>

              <dl className="spotlight-facts">
                {spotlight.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="price-block">
                <div className="price-was">
                  <span>Their price</span>
                  <s>{spotlight.theirPrice}</s>
                </div>
                <div className="price-now">
                  <span>Our price</span>
                  <strong>{spotlight.ourPrice}</strong>
                  <em>{spotlight.priceUnit}</em>
                </div>
              </div>

              {spotlight.onboardCredit && (
                <div className="obc-callout">
                  <span className="obc-amt">{spotlight.onboardCredit.amount}</span>
                  <span className="obc-text">{spotlight.onboardCredit.text}</span>
                </div>
              )}

              <ul className="includes-row">
                {spotlight.includes.map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>

              {spotlight.addOn && (
                <p className="spotlight-addon">{spotlight.addOn}</p>
              )}

              <div className="spotlight-foot">
                <Link href="/contact" className="btn btn-primary">
                  Get This Deal
                </Link>
                <a href="tel:+15617779911" className="spotlight-call">
                  Call or text Brent: (561) 777-9911
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="section section--muted">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Three ships, endless island time</p>
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

      {/* Current Group Cruises */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Sail with a crew</p>
            <h2>Current group cruises</h2>
          </div>

          {flagship && (
            <article className="group-feature">
              <div className="group-feature-media">
                <Image
                  src={flagship.image}
                  alt={flagship.name}
                  fill
                  sizes="(max-width: 860px) 100vw, 50vw"
                  className="group-feature-img"
                />
              </div>
              <div className="group-feature-body">
                <img
                  src={flagship.logo}
                  alt="Parrot Head Drifters"
                  className="group-logo"
                  width={150}
                  height={128}
                />
                <h3 className="group-feature-title">{flagship.name}</h3>
                <p className="group-feature-tag">{flagship.tagline}</p>
                <ul className="group-facts">
                  <li>
                    <span>When</span>
                    {flagship.when}
                  </li>
                  <li>
                    <span>Ship</span>
                    {flagship.ship}
                  </li>
                  <li>
                    <span>Sailing</span>
                    {flagship.departurePort}
                  </li>
                  <li>
                    <span>Ports</span>
                    {flagship.itinerary}
                  </li>
                  <li>
                    <span>Fares</span>
                    {flagship.priceFrom}
                  </li>
                </ul>
                <p className="group-feature-text">{flagship.blurb}</p>
                <div className="group-feature-actions">
                  <a
                    href={flagship.href}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-primary"
                  >
                    {flagship.ctaLabel}
                  </a>
                  <Link href="/contact" className="btn btn-outline">
                    Ask About This Group
                  </Link>
                </div>
              </div>
            </article>
          )}

          <div className="group-cta-card">
            <div>
              <h3>Running your own group?</h3>
              <p>
                Reunions, birthdays, clubs, corporate trips: bring 8 cabins or
                more and unlock group pricing, perks, and a dedicated agent who
                handles the whole block.
              </p>
            </div>
            <Link href="/group-rates" className="btn btn-primary">
              Start a Group
            </Link>
          </div>
        </div>
      </section>

      {/* Why book */}
      <section className="section section--muted">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Why book with us</p>
            <h2>One line, done right</h2>
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

      {/* CTA */}
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
