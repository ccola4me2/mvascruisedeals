import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Caribbean Cruises from Tampa",
  description:
    "Sail Margaritaville at Sea from Port Tampa Bay. The Islander cruises 4 to 10-night Western and Southern Caribbean itineraries to Cozumel, Grand Cayman, Aruba, and more. Best fares and group rates from MVAS Cruise Deals.",
  alternates: { canonical: "/tampa-cruises/" },
};

export default function TampaCruisesPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Port Tampa Bay, FL</p>
          <h1>Caribbean Cruises from Tampa</h1>
          <p className="page-lede">
            Sailing from Florida&apos;s Gulf Coast? Margaritaville at Sea Islander
            departs Port Tampa Bay for the Western and Southern Caribbean. We
            find you the best fare and group rate and take care of everything
            from quote to gangway.
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
                src="/deals/islander.jpg"
                alt="Margaritaville at Sea Islander"
                fill
                sizes="(max-width: 860px) 100vw, 46vw"
                className="citypage-img"
              />
            </div>
            <div className="citypage-body">
              <p className="eyebrow">The Tampa ship</p>
              <h2>Margaritaville at Sea Islander</h2>
              <p>
                The feature-packed Islander sails 4 to 10-night Caribbean
                itineraries right out of Port Tampa Bay, calling on Cozumel,
                Grand Cayman, Key West, Roatan, Jamaica, and the Southern
                Caribbean. More than a dozen dining venues, bars, and kids&apos;
                clubs make the ship as much fun as the destinations.
              </p>
              <ul className="citypage-facts">
                <li>
                  <span>Homeport</span>Port Tampa Bay, FL
                </li>
                <li>
                  <span>Ports</span>Cozumel, Grand Cayman, Aruba, and more
                </li>
                <li>
                  <span>Good for</span>Longer Caribbean getaways and groups
                </li>
              </ul>
              <div className="group-feature-actions">
                <Link href="/deals" className="btn btn-primary">
                  Tampa Sailings
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
          <h2>Ready to sail from Tampa?</h2>
          <p>
            Tell us your dates and party size and we&apos;ll send the best
            available Islander fare or group rate, usually within one business
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
