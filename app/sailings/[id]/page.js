import { notFound } from "next/navigation";
import Link from "next/link";
import { itineraries } from "../../data/itineraries.js";
import { SHIPS } from "../../data/guideContent.js";
import { futureDates, findItinerary, longDate, todayISO, tripTitle } from "../../lib/guide.js";
import { quoteHref } from "../../lib/quote";
import {
  cityOf,
  dateSpan,
  glanceText,
  destinationForPort,
  headline,
  homeportOf,
  joinList,
  liveItineraries,
  pageTitle,
  planHref,
  portNotes,
  sailingPath,
  shipSlug,
  uniquePorts,
} from "../../lib/sailingPages.js";
import SailingDates from "./SailingDates";

// Only itineraries that still have a sailing ahead get a page; the rest are not built.
export const dynamicParams = false;
export function generateStaticParams() {
  return liveItineraries(todayISO()).map((it) => ({ id: it.id }));
}

function facts(it, today) {
  const dates = futureDates(it, today);
  const hp = homeportOf(it);
  const overnights = portNotes(it);
  const ports = uniquePorts(it);
  return { dates, hp, overnights, ports };
}

export function generateMetadata({ params }) {
  const it = findItinerary(params.id);
  if (!it) return {};
  const { dates, ports } = facts(it, todayISO());
  const title = pageTitle(it);
  const description =
    tripTitle(it) + " cruise on Margaritaville at Sea " + it.ship + " from " + cityOf(it.frm) + ". Ports: " + joinList(ports) +
    ". " + dates.length + " sailing" + (dates.length === 1 ? "" : "s") + ", " + dateSpan(dates) + ". Dates, starting fares and a free cruise guide.";
  return {
    title,
    description,
    alternates: { canonical: sailingPath(it) },
    openGraph: { title, description, url: sailingPath(it) },
  };
}

export default function SailingPage({ params }) {
  const it = findItinerary(params.id);
  const buildToday = todayISO();
  if (!it) notFound();
  const { dates, hp, overnights, ports } = facts(it, buildToday);
  if (!dates.length) notFound();

  const city = cityOf(it.frm);
  const title = tripTitle(it);
  const ship = SHIPS[it.ship];
  const portsLine = joinList(ports);
  const stay = overnights.length ? " It stays overnight in " + joinList(overnights) + "." : "";
  const lede =
    "Margaritaville at Sea " + it.ship + " sails this " + it.nights + "-night " + it.name + " cruise " +
    (it.arrive ? "one way from " + city + " to " + cityOf(it.arrive) : "round trip from " + city) +
    ", visiting " + portsLine + "." + stay;

  const siblings = itineraries
    .filter((x) => x.id !== it.id && x.ship === it.ship && x.frm === it.frm && futureDates(x, buildToday).length)
    .sort((a, b) => (futureDates(a, buildToday)[0] || "").localeCompare(futureDates(b, buildToday)[0] || ""))
    .slice(0, 6);

  const faqs = [
    {
      q: "Where does the " + title + " on " + it.ship + " sail from?",
      a:
        "It departs from " + hp.port + " in " + hp.city + ", " + hp.state + (it.arrive ? " and ends in " + it.arrive + "." : " and returns there at the end of the cruise."),
    },
    {
      q: "Which ports does this cruise visit?",
      a: "Margaritaville at Sea " + it.ship + " calls on " + portsLine + ", in that order." + stay,
    },
    {
      q: "How long is this cruise?",
      a: "It is " + it.nights + " nights aboard Margaritaville at Sea " + it.ship + ".",
    },
    {
      q: "How do I book it, and what does it cost?",
      a: "Fares change daily and depend on the date and stateroom. Send me the sailing and your party size and I will check availability and send the best fare or group rate, with no booking fees.",
    },
  ];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mvascruisedeals.com/" },
      { "@type": "ListItem", position: 2, name: "All Sailings", item: "https://mvascruisedeals.com/sailings/" },
      { "@type": "ListItem", position: 3, name: pageTitle(it), item: "https://mvascruisedeals.com" + sailingPath(it) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="page-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/sailings/">All Sailings</Link>
            <span aria-hidden="true">/</span>
            <span>{title}</span>
          </nav>
          <p className="eyebrow">
            {it.ship} from {city}
          </p>
          <h1>{headline(it)}</h1>
          <p className="page-lede">{lede}</p>
          {it.note && (
            <p className="sp-tag">
              {it.note}
              {/Zac Brown/.test(it.note) && (
                <>
                  {" "}
                  <Link href="/zac-brown-nassau/">Concert details</Link>
                </>
              )}
            </p>
          )}
          <div className="hero-actions">
            <Link href={planHref(it, dates.length === 1 ? dates[0] : "")} className="btn btn-primary btn-lg">
              Get my free guide
            </Link>
            <Link
              href={quoteHref({ ship: it.ship, cruise: title, when: longDate(dates[0], { year: true }) })}
              className="btn btn-outline btn-lg"
            >
              Get a free quote
            </Link>
          </div>
          <dl className="dest-facts">
            <div>
              <dt>Ship</dt>
              <dd>
                <Link href={"/ships/" + shipSlug(it.ship) + "/"}>{it.ship}</Link>
              </dd>
            </div>
            <div>
              <dt>{it.arrive ? "Sails from" : "Round trip from"}</dt>
              <dd>
                {hp.port}, {hp.city}
              </dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>{it.nights} nights</dd>
            </div>
            <div>
              <dt>Sailings</dt>
              <dd>{dates.length === 1 ? longDate(dates[0], { year: true }) : dates.length + ", from " + longDate(dates[0], { year: true })}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Dates and starting fares</p>
            <h2>
              {dates.length === 1 ? "The sailing date" : "Pick your sailing date"}
            </h2>
          </div>
          <SailingDates it={it} buildToday={buildToday} />
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Ports of call</p>
            <h2>Where this cruise goes</h2>
          </div>
          <ol className="sp-ports">
            {it.ports.map((p, i) => {
              const d = destinationForPort(p);
              const night = i > 0 && it.ports[i - 1] === p;
              return (
                <li key={i}>
                  <span className="sp-port-name">{p}</span>
                  {night && <span className="sp-port-tag">second day, overnight</span>}
                  {d && !night && (
                    <Link href={"/cruises/" + d.slug + "/"} className="sp-port-link">
                      Things to do in {p}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="sp-note">
            Ports are the ones the cruise line lists for these dates. The cruise line can change an itinerary, so confirm before you book.
          </p>
        </div>
      </section>

      {ship && (
        <section className="section">
          <div className="container">
            <div className="section-head section-head--center">
              <p className="eyebrow">Your ship</p>
              <h2>Margaritaville at Sea {it.ship}</h2>
            </div>
            <div className="feature-grid">
              {ship.glance.slice(0, 3).map((g) => (
                <div className="feature" key={g[0]}>
                  <h3>{g[0]}</h3>
                  <p>{glanceText(g, buildToday)}</p>
                </div>
              ))}
            </div>
            <p className="sp-more">
              <Link href={"/ships/" + shipSlug(it.ship) + "/"}>Everything on {it.ship}, with every sailing &rarr;</Link>
            </p>
          </div>
        </section>
      )}

      <section className="cta">
        <div className="container cta-inner">
          <h2>Get a free guide for this cruise</h2>
          <p>
            Your ports, what to do ashore, what to pack and how the day of boarding goes, built for {title} on {it.ship}. Free, and
            I will email it to you.
          </p>
          <Link href={planHref(it, dates.length === 1 ? dates[0] : "")} className="btn btn-primary btn-lg">
            Build my free guide
          </Link>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Good to know</p>
            <h2>About this cruise</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head section-head--center">
              <p className="eyebrow">More from {city}</p>
              <h2>Other {it.ship} cruises from {city}</h2>
            </div>
            <div className="dest-chips">
              {siblings.map((x) => (
                <Link key={x.id} href={sailingPath(x)} className="dest-chip">
                  {tripTitle(x)}
                </Link>
              ))}
            </div>
            <p className="sp-more">
              <Link href="/sailings/">Browse every sailing &rarr;</Link>
            </p>
          </div>
        </section>
      )}
    </>
  );
}
