import Link from "next/link";
import Image from "next/image";
import HomeportFaqs from "../components/HomeportFaqs";
import GuideCta from "../components/GuideCta";
import HomeportSailings from "../components/HomeportSailings";

const faqs = [
  {
    q: "Which ship sails from Miami?",
    a: "Margaritaville at Sea Beachcomber, the largest ship in the fleet. She sails round-trip from PortMiami on 4 to 9-night cruises to the Bahamas, Key West, and the Eastern, Western, and Southern Caribbean.",
  },
  {
    q: "Where does Beachcomber sail from Miami?",
    a: "Nassau, Grand Bahama, Bimini, and Key West on the shorter cruises, and Puerto Plata, St. Thomas, San Juan, St. Maarten, Grand Cayman, Ocho Rios, and Montego Bay on the longer ones, plus Aruba, Bonaire, and Curacao on the Southern Caribbean sailings. The exact ports for each date are listed above.",
  },
  {
    q: "When does Beachcomber start sailing from Miami?",
    a: "Her first cruise from Miami is the inaugural sailing on January 9, 2027, with Zac Brown Band. Cabins are booking now.",
  },
];

export const metadata = {
  title: "Margaritaville at Sea Cruises from Miami",
  description:
    "Every Margaritaville at Sea sailing from PortMiami aboard the new Beachcomber, with dates, ports, and the lowest fare from the daily price check. 4 to 9-night cruises to the Bahamas, Key West, and the Eastern, Western, and Southern Caribbean.",
  alternates: { canonical: "/miami-cruises/" },
};

export default function MiamiCruisesPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">PortMiami, FL</p>
          <h1>Margaritaville at Sea Cruises from Miami</h1>
          <p className="page-lede">
            The biggest ship in the fleet sails from Miami. Margaritaville at Sea
            Beachcomber begins round-trip cruises from PortMiami on January 9,
            2027, and cabins are booking now. Below is every date, with the
            lowest fare from the daily price check. I lock in your best fare and
            handle every detail.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Get a Free Quote
            </Link>
            <Link href="#sailings" className="btn btn-outline btn-lg">
              See Every Miami Sailing
            </Link>
          </div>
        </div>
      </section>

      <HomeportSailings city="Miami" ship="Beachcomber" />

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
                the Margaritaville at Sea fleet. From PortMiami she sails 4 to
                9-night cruises to the Bahamas, Key West, and the Eastern,
                Western, and Southern Caribbean, with more than 15 brand-new
                venues on board.
              </p>
              <ul className="citypage-facts">
                <li>
                  <span>Homeport</span>Terminal C, PortMiami (some sailings use
                  Terminal E)
                </li>
                <li>
                  <span>Ports</span>Nassau, Grand Bahama, Key West, Puerto Plata,
                  St. Thomas, San Juan, Grand Cayman, Ocho Rios, and more
                </li>
                <li>
                  <span>Boarding</span>The terminal opens at 9:30 am and closes
                  to boarders at 2:30 pm
                </li>
                <li>
                  <span>Sailing</span>From January 9, 2027
                </li>
              </ul>
              <div className="group-feature-actions">
                <Link href="#sailings" className="btn btn-primary">
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

      <HomeportFaqs port="Miami" faqs={faqs} />

      <GuideCta q="Miami" />

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
