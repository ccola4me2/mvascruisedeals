import Link from "next/link";
import Image from "next/image";
import HomeportFaqs from "../components/HomeportFaqs";
import { sailings } from "../data/sailings";
import { quoteHref } from "../lib/quote";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
function fmt(iso) {
  const [y, m, d] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}

// Everything that sails from Galveston, straight from the sailings data, so the
// counts and dates below can never go stale against the schedule.
const galveston = sailings
  .filter((s) => s.departure_port === "Galveston, TX")
  .sort(
    (a, b) =>
      (a.departures[0] || "").localeCompare(b.departures[0] || "") ||
      a.nights - b.nights
  );
const departureCount = galveston.reduce((n, s) => n + s.departures.length, 0);
const soonest = galveston
  .map((s) => s.departures[0])
  .filter(Boolean)
  .sort()[0];
const nights = galveston.map((s) => s.nights);
const nightsLabel =
  Math.min(...nights) === Math.max(...nights)
    ? `${nights[0]} nights`
    : `${Math.min(...nights)} to ${Math.max(...nights)} nights`;

const faqs = [
  {
    q: "Which ship sails from Galveston?",
    a: "Margaritaville at Sea Beachcomber, on 4 and 7-night round-trips from the Port of Galveston, Texas, to Mexico, Belize, the Western Caribbean, Key West, and the Bahamas.",
  },
  {
    q: "Where do the Galveston cruises go?",
    a: "Cozumel, Progreso, and Veracruz in Mexico, plus Belize City, Roatan, Grand Cayman, Montego Bay, Key West, and the Bahamas (Nassau, Bimini, and Grand Bahama), depending on the itinerary.",
  },
  {
    q: "When do the Galveston sailings start?",
    a: "October 2027. It's a brand-new homeport, so the earliest cabins are the ones to grab.",
  },
];

export const metadata = {
  title: "Cruises from Galveston, Texas",
  description:
    "Margaritaville at Sea sails from the Port of Galveston, Texas, starting October 2027: Beachcomber 4 and 7-night cruises to Mexico, Belize, Jamaica, Grand Cayman, Key West, and the Bahamas. Lock in your fare with MVAS Cruise Deals.",
  alternates: { canonical: "/galveston-cruises/" },
};

export default function GalvestonCruisesPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Port of Galveston, TX</p>
          <h1>Cruises from Galveston, Texas</h1>
          <p className="page-lede">
            Margaritaville at Sea comes to Texas. Starting October 2027,
            Beachcomber sails from the Port of Galveston to Mexico, Belize, the
            Western Caribbean, Key West, and the Bahamas. It&apos;s a brand-new
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

          <dl className="dest-facts">
            <div>
              <dt>Ship</dt>
              <dd>Beachcomber</dd>
            </div>
            <div>
              <dt>Itineraries</dt>
              <dd>{galveston.length}</dd>
            </div>
            <div>
              <dt>Trip length</dt>
              <dd>{nightsLabel}</dd>
            </div>
            <div>
              <dt>Departures</dt>
              <dd>
                {departureCount}
                {soonest ? `, from ${fmt(soonest)}` : ""}
              </dd>
            </div>
          </dl>
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
                The largest ship in the fleet brings island time to the Gulf.
                From the Port of Galveston, Beachcomber sails to the reefs of
                Cozumel, the Yucatan gateway of Progreso, Belize City, Roatan,
                Grand Cayman, Jamaica, Key West, and the Bahamas, with more than
                15 venues on board.
              </p>
              <ul className="citypage-facts">
                <li>
                  <span>Homeport</span>Port of Galveston, TX
                </li>
                <li>
                  <span>Ports</span>Cozumel, Progreso, Veracruz, Belize City,
                  Roatan, Grand Cayman, Montego Bay, Key West, Nassau
                </li>
                <li>
                  <span>Sailing</span>{nightsLabel} &middot; from October 2027
                </li>
              </ul>
              <div className="group-feature-actions">
                <Link href="/deals" className="btn btn-primary">
                  Galveston Deals
                </Link>
                <Link href="/#fleet" className="btn btn-outline">
                  Meet the Fleet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">
              {galveston.length} itineraries from Galveston
            </p>
            <h2>Sailings from Galveston</h2>
          </div>
          <div className="deal-grid">
            {galveston.map((s) => (
              <article className="deal-card" key={s.id}>
                <div className="deal-media">
                  <Image
                    src={s.image}
                    alt={`Margaritaville at Sea ${s.ship}`}
                    width={480}
                    height={280}
                    className="deal-image"
                  />
                  <span className="deal-badge">{s.nights} nights</span>
                </div>
                <div className="deal-body">
                  <p className="deal-line">Margaritaville at Sea {s.ship}</p>
                  <h3 className="deal-title">
                    {s.nights}-Night {s.route}
                  </h3>
                  <p className="deal-meta">Departs {s.departure_port}</p>
                  <ul className="deal-ports">
                    {s.ports_of_call.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <div className="sailing-dates">
                    <p className="sailing-dates-head">
                      {s.departures.length} departure
                      {s.departures.length === 1 ? "" : "s"}
                      {s.departures[0] ? ` from ${fmt(s.departures[0])}` : ""}
                    </p>
                  </div>
                  <div className="deal-footer">
                    <Link
                      href={quoteHref({
                        ship: s.ship,
                        cruise: `${s.nights}-Night ${s.route}`,
                        when: s.departures[0] ? fmt(s.departures[0]) : undefined,
                      })}
                      className="btn btn-outline"
                    >
                      Get a Quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HomeportFaqs port="Galveston" faqs={faqs} />

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
