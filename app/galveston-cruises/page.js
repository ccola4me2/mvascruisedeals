import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Mexico Cruises from Galveston, Texas",
  description:
    "Margaritaville at Sea sails from the Port of Galveston, Texas, starting January 2028: a 7-night Mexico Trio aboard Beachcomber to Cozumel, Progreso, and Veracruz. Lock in your fare with MVAS Cruise Deals.",
  alternates: { canonical: "/galveston-cruises/" },
};

export default function GalvestonCruisesPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Port of Galveston, TX</p>
          <h1>Mexico Cruises from Galveston, Texas</h1>
          <p className="page-lede">
            Margaritaville at Sea comes to Texas. Starting January 2028,
            Beachcomber sails a 7-night Mexico Trio round-trip from the Port of
            Galveston to Cozumel, Progreso, and Veracruz. It&apos;s a brand-new
            homeport, and early cabins are the ones to grab. We lock in your best
            fare and handle every detail.
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
                src="/deals/beachcomber.jpg"
                alt="Margaritaville at Sea Beachcomber"
                fill
                sizes="(max-width: 860px) 100vw, 46vw"
                className="citypage-img"
              />
            </div>
            <div className="citypage-body">
              <p className="eyebrow">The Galveston ship</p>
              <h2>Margaritaville at Sea Beachcomber</h2>
              <p>
                The largest ship in the fleet brings a full week of island time
                to the Gulf. From the Port of Galveston, Beachcomber sails a
                7-night Mexico Trio to the reefs of Cozumel, the Yucatan gateway
                of Progreso, and the historic Gulf-coast city of Veracruz, with
                more than 15 venues on board.
              </p>
              <ul className="citypage-facts">
                <li>
                  <span>Homeport</span>Port of Galveston, TX
                </li>
                <li>
                  <span>Ports</span>Cozumel, Progreso, Veracruz
                </li>
                <li>
                  <span>Sailing</span>7 nights &middot; from January 2028
                </li>
              </ul>
              <div className="group-feature-actions">
                <Link href="/deals" className="btn btn-primary">
                  Galveston Sailings
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
          <h2>Ready to sail from Galveston?</h2>
          <p>
            Tell us your dates and party size and we&apos;ll send the best
            available Beachcomber fare or group rate, usually within one business
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
