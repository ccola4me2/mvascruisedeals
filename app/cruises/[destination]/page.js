import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { destinations, getDestination } from "../../data/destinations";
import { sailings } from "../../data/sailings";
import { quoteHref } from "../../lib/quote";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
function fmt(iso) {
  const [y, m, d] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}

export function generateStaticParams() {
  return destinations.map((d) => ({ destination: d.slug }));
}

export function generateMetadata({ params }) {
  const d = getDestination(params.destination);
  if (!d) return {};
  return {
    title: `Margaritaville at Sea Cruises to ${d.name}`,
    description: `Margaritaville at Sea sailings that visit ${d.name}. Browse itineraries, dates, and ports, then get a free quote and group rate from MVAS Cruise Deals.`,
    alternates: { canonical: `/cruises/${d.slug}/` },
  };
}

export default function DestinationPage({ params }) {
  const d = getDestination(params.destination);
  if (!d) notFound();

  const matches = sailings
    .filter((s) => s.ports_of_call.includes(d.port))
    .sort(
      (a, b) =>
        (a.departures[0] || "").localeCompare(b.departures[0] || "") ||
        a.nights - b.nights
    );

  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">{d.region}</p>
          <h1>Margaritaville at Sea Cruises to {d.name}</h1>
          <p className="page-lede">{d.intro}</p>
          <div className="hero-actions">
            <Link href="/contact/" className="btn btn-primary btn-lg">
              Get a Free Quote
            </Link>
            <Link href="/sailings/" className="btn btn-outline btn-lg">
              Browse All Sailings
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">
              {matches.length} itinerar{matches.length === 1 ? "y" : "ies"} visit{" "}
              {d.name.split(",")[0]}
            </p>
            <h2>Sailings that call on {d.name.split(",")[0]}</h2>
          </div>

          {matches.length === 0 ? (
            <p style={{ textAlign: "center" }}>
              No current itineraries list this port.{" "}
              <Link href="/sailings/">See all sailings</Link>.
            </p>
          ) : (
            <div className="deal-grid">
              {matches.map((s) => (
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
                        <li
                          key={p}
                          className={p === d.port ? "port-hit" : undefined}
                        >
                          {p}
                        </li>
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
          )}
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>Sail to {d.name.split(",")[0]} for less</h2>
          <p>
            Tell us your dates and party size and we&apos;ll send the best
            available fare or group rate, usually within one business day. No
            fees, no obligation.
          </p>
          <Link href="/contact/" className="btn btn-primary btn-lg">
            Get My Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
