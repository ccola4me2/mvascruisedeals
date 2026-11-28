import Link from "next/link";
import Image from "next/image";
import HomeportFaqs from "../components/HomeportFaqs";
import GuideCta from "../components/GuideCta";
import HomeportSailings from "../components/HomeportSailings";

const faqs = [
  {
    q: "Which ship sails from Tampa?",
    a: "Margaritaville at Sea Islander, on 4 to 10-night cruises from Port Tampa Bay to Mexico, Key West, the Bahamas, and the Western and Southern Caribbean.",
  },
  {
    q: "Where does Islander sail from Tampa?",
    a: "Cozumel and Progreso in Mexico, Key West, Nassau, Grand Bahama, and Bimini, Grand Cayman, Belize, Roatan, and Jamaica (Ocho Rios and Montego Bay), and New Orleans on some sailings, plus Aruba, Curacao, and Central America on the longest cruises. The exact ports for each date are listed above.",
  },
  {
    q: "What's the shortest cruise from Tampa?",
    a: "A 4-night Cozumel Express aboard Islander, with 5 to 10-night options when you want more time and more ports.",
  },
];

export const metadata = {
  title: "Caribbean Cruises from Tampa",
  description:
    "Every Margaritaville at Sea sailing from Port Tampa Bay aboard the Islander, with dates, ports, and the lowest fare from the daily price check. 4 to 10-night cruises to Mexico, Key West, the Bahamas, and the Western and Southern Caribbean.",
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
            departs Port Tampa Bay for Mexico, Key West, the Bahamas, and the
            Western and Southern Caribbean. Below is every date, with the lowest
            fare from the daily price check. I find you the best fare and group
            rate and take care of everything from quote to gangway.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Get a Free Quote
            </Link>
            <Link href="#sailings" className="btn btn-outline btn-lg">
              See Every Tampa Sailing
            </Link>
          </div>
        </div>
      </section>

      <HomeportSailings city="Tampa" ship="Islander" />

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
                Progreso, Key West, the Bahamas, Grand Cayman, Roatan, Jamaica,
                and the Southern Caribbean. More than a dozen dining venues, bars, and kids&apos;
                clubs make the ship as much fun as the destinations.
              </p>
              <ul className="citypage-facts">
                <li>
                  <span>Homeport</span>Terminal 6, Port Tampa Bay (1333 McKay
                  Street)
                </li>
                <li>
                  <span>Ports</span>Cozumel, Key West, Nassau, Grand Cayman,
                  Aruba, and more
                </li>
                <li>
                  <span>Boarding</span>The terminal opens at 9:30 am and doors
                  close promptly at 2:30 pm
                </li>
                <li>
                  <span>Good for</span>Longer Caribbean getaways and groups
                </li>
              </ul>
              <div className="group-feature-actions">
                <Link href="#sailings" className="btn btn-primary">
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

      <HomeportFaqs port="Tampa" faqs={faqs} />

      <GuideCta q="Tampa" />

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
