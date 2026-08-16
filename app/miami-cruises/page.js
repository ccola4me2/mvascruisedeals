import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Eastern Caribbean Cruises from Miami",
  description:
    "Sail Margaritaville at Sea from PortMiami aboard the new Beachcomber. 4 to 8-night Eastern Caribbean itineraries to St. Maarten, St. Thomas, San Juan, and the Dominican Republic. Book the inaugural season with MVAS Cruise Deals.",
  alternates: { canonical: "/miami-cruises/" },
};

export default function MiamiCruisesPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">PortMiami, FL</p>
          <h1>Eastern Caribbean Cruises from Miami</h1>
          <p className="page-lede">
            The biggest ship in the fleet sails from Miami. Margaritaville at Sea
            Beachcomber launches early 2027 with longer Eastern Caribbean
            escapes, and inaugural-season cabins are booking now. We lock in your
            best fare and handle every detail.
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
              <p className="eyebrow">The Miami ship</p>
              <h2>Margaritaville at Sea Beachcomber</h2>
              <p>
                At over 102,000 gross tons, Beachcomber is the largest ship in
                the Margaritaville at Sea fleet, built for longer escapes. From
                PortMiami it sails 4 to 8-night Eastern Caribbean journeys to St.
                Maarten, St. Thomas, San Juan, and the Dominican Republic, with
                more than 15 brand-new venues on board.
              </p>
              <ul className="citypage-facts">
                <li>
                  <span>Homeport</span>PortMiami, FL
                </li>
                <li>
                  <span>Ports</span>St. Maarten, St. Thomas, San Juan, Dominican
                  Republic
                </li>
                <li>
                  <span>Sailing</span>Early 2027 &middot; inaugural season now
                  booking
                </li>
              </ul>
              <div className="group-feature-actions">
                <Link href="/deals" className="btn btn-primary">
                  Miami Sailings
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
          <h2>Ready to sail from Miami?</h2>
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
