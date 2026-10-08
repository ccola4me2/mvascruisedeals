import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { destinations, getDestination } from "../../data/destinations";
import { sailings } from "../../data/sailings";
import { quoteHref, CONTACT } from "../../lib/quote";
import { portExcursionUrl, EXCURSION_DISCLOSURE } from "../../lib/excursions";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
function fmt(iso) {
  const [y, m, d] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}
const shortPort = (p) => p.split(",")[0];
const uniq = (arr) => [...new Set(arr)];

export function generateStaticParams() {
  return destinations.map((d) => ({ destination: d.slug }));
}

export function generateMetadata({ params }) {
  const d = getDestination(params.destination);
  if (!d) return {};
  const short = shortPort(d.name);
  return {
    title: `Margaritaville at Sea Cruises to ${d.name}`,
    description: `Margaritaville at Sea cruises to ${short}: which ships and homeports sail there, itineraries and dates, top things to do, and a free quote with $0 booking fees from MVAS Cruise Deals.`,
    alternates: { canonical: `/cruises/${d.slug}/` },
    openGraph: {
      title: `Margaritaville at Sea Cruises to ${d.name}`,
      description: `Itineraries, dates, and things to do in ${short}, plus a free quote and group rates.`,
      url: `/cruises/${d.slug}/`,
    },
  };
}

export default function DestinationPage({ params }) {
  const d = getDestination(params.destination);
  if (!d) notFound();

  const short = shortPort(d.name);

  const matches = sailings
    .filter((s) => s.ports_of_call.includes(d.port))
    .sort(
      (a, b) =>
        (a.departures[0] || "").localeCompare(b.departures[0] || "") ||
        a.nights - b.nights
    );

  // Facts computed live from the matching sailings, so they never go stale.
  const ships = uniq(matches.map((s) => s.ship));
  const homeports = uniq(matches.map((s) => shortPort(s.departure_port)));
  const nightsList = matches.map((s) => s.nights);
  const minN = Math.min(...nightsList);
  const maxN = Math.max(...nightsList);
  const nightsLabel =
    matches.length === 0
      ? null
      : minN === maxN
      ? `${minN} nights`
      : `${minN} to ${maxN} nights`;
  const departureCount = matches.reduce((n, s) => n + s.departures.length, 0);
  const soonest = matches
    .map((s) => s.departures[0])
    .filter(Boolean)
    .sort()[0];

  const facts = [
    homeports.length && { label: "Sails from", value: homeports.join(", ") },
    ships.length && { label: "Ships", value: ships.join(", ") },
    nightsLabel && { label: "Trip length", value: nightsLabel },
    departureCount && {
      label: "Departures",
      value: `${departureCount}${soonest ? `, from ${fmt(soonest)}` : ""}`,
    },
  ].filter(Boolean);

  const others = destinations.filter((x) => x.slug !== d.slug).slice(0, 8);

  const faqLd = d.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: d.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mvascruisedeals.com/" },
      { "@type": "ListItem", position: 2, name: "Destinations", item: "https://mvascruisedeals.com/cruises/" },
      { "@type": "ListItem", position: 3, name: d.name, item: `https://mvascruisedeals.com/cruises/${d.slug}/` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <section className="page-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/cruises/">Destinations</Link>
            <span aria-hidden="true">/</span>
            <span>{short}</span>
          </nav>
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

          {facts.length > 0 && (
            <dl className="dest-facts">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* Things to do */}
      {d.highlights?.length > 0 && (
        <section className="section section--muted">
          <div className="container">
            <div className="section-head section-head--center">
              <p className="eyebrow">Ashore in {short}</p>
              <h2>Top things to do in {short}</h2>
            </div>
            <div className="feature-grid">
              {d.highlights.map((h) => (
                <div className="feature" key={h.title}>
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>

            <div className="dest-excursions">
              <div>
                <p className="eyebrow eyebrow--light">Plan your day ashore</p>
                <h3>Book your own {short} excursion</h3>
                <p>
                  Browse tours and shore excursions for {short} and book them
                  yourself, from your computer or your phone. Not sure which one
                  fits your sailing? Call or text{" "}
                  <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>.
                </p>
                <a
                  href={portExcursionUrl(d.port)}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-gold btn-lg"
                >
                  See {short} excursions
                </a>
                <p className="dest-excursions-note">{EXCURSION_DISCLOSURE}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sailings */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">
              {matches.length} itinerar{matches.length === 1 ? "y" : "ies"} visit{" "}
              {short}
            </p>
            <h2>Sailings that call on {short}</h2>
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

      {/* FAQ */}
      {d.faqs?.length > 0 && (
        <section className="section section--muted">
          <div className="container">
            <div className="section-head section-head--center">
              <p className="eyebrow">Good to know</p>
              <h2>{short} cruise questions</h2>
            </div>
            <div className="faq-list">
              {d.faqs.map((f) => (
                <details className="faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Explore more destinations */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Keep exploring</p>
            <h2>More Margaritaville at Sea destinations</h2>
          </div>
          <div className="dest-chips">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/cruises/${o.slug}/`}
                className="dest-chip"
              >
                {shortPort(o.name)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>Sail to {short} for less</h2>
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
