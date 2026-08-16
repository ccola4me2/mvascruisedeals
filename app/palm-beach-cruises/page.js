import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Bahamas Cruises from Palm Beach",
  description:
    "Sail Margaritaville at Sea from the Port of Palm Beach, FL. The Paradise ship cruises to Nassau, Key West, and Cozumel. Get the best fares and group rates from MVAS Cruise Deals.",
  alternates: { canonical: "/palm-beach-cruises/" },
};

export default function PalmBeachCruisesPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Port of Palm Beach, FL</p>
          <h1>Bahamas Cruises from Palm Beach</h1>
          <p className="page-lede">
            Live close to South Florida? The easiest island escape leaves right
            from the Port of Palm Beach aboard Margaritaville at Sea Paradise. We
            find you the best fare and handle every detail, so you just show up
            and go your own wave.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Get a Free Quote
            </Link>
            <Link href="/deals" className="btn btn-outline btn-lg">
              See Current Deals
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="citypage">
            <div className="citypage-media">
              <Image
                src="/deals/paradise.jpg"
                alt="Margaritaville at Sea Paradise"
                fill
                sizes="(max-width: 860px) 100vw, 46vw"
                className="citypage-img"
              />
            </div>
            <div className="citypage-body">
              <p className="eyebrow">The Palm Beach ship</p>
              <h2>Margaritaville at Sea Paradise</h2>
              <p>
                Paradise is the easy-breezy resort at sea, sailing right out of
                the Port of Palm Beach to Nassau in The Bahamas and Key West,
                and starting summer 2026, to Cozumel, Mexico. Short, affordable
                getaways with island-time vibes the moment you step aboard.
              </p>
              <ul className="citypage-facts">
                <li>
                  <span>Homeport</span>Port of Palm Beach, FL
                </li>
                <li>
                  <span>Ports</span>Nassau, Key West, Cozumel
                </li>
                <li>
                  <span>Good for</span>Quick weekend escapes and first-timers
                </li>
              </ul>
              <div className="group-feature-actions">
                <Link href="/deals" className="btn btn-primary">
                  Palm Beach Sailings
                </Link>
                <Link href="/#fleet" className="btn btn-outline">
                  Meet the Fleet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>Ready to sail from Palm Beach?</h2>
          <p>
            Tell us your dates and party size and we&apos;ll send the best
            available Paradise fare or group rate, usually within one business
            day. No fees, no obligation.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Get My Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
