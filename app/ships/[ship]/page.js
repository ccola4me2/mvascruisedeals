import { notFound } from "next/navigation";
import Link from "next/link";
import { itineraries } from "../../data/itineraries.js";
import { SHIPS } from "../../data/guideContent.js";
import { futureDates, longDate, todayISO, tripTitle } from "../../lib/guide.js";
import {
  SHIP_ORDER,
  cityOf,
  destinationForPort,
  glanceText,
  homeportOf,
  joinList,
  sailingPath,
  shipFromSlug,
  shipSlug,
  uniquePorts,
} from "../../lib/sailingPages.js";

export const dynamicParams = false;
export function generateStaticParams() {
  return SHIP_ORDER.map((s) => ({ ship: shipSlug(s) }));
}

function shipData(name, today) {
  const mine = itineraries
    .filter((it) => it.ship === name && futureDates(it, today).length)
    .sort((a, b) => futureDates(a, today)[0].localeCompare(futureDates(b, today)[0]));
  const homeports = mine.map((it) => cityOf(it.frm)).filter((c, i, a) => a.indexOf(c) === i);
  const ports = mine.flatMap((it) => uniquePorts(it)).filter((p, i, a) => a.indexOf(p) === i);
  const nights = mine.map((it) => it.nights);
  const sailings = mine.reduce((n, it) => n + futureDates(it, today).length, 0);
  return { mine, homeports, ports, nights, sailings };
}

export function generateMetadata({ params }) {
  const name = shipFromSlug(params.ship);
  if (!name) return {};
  const { homeports, nights, sailings } = shipData(name, todayISO());
  const description =
    "Margaritaville at Sea " + name + ": sails from " + joinList(homeports) + ", " + Math.min(...nights) + " to " + Math.max(...nights) +
    " nights, " + sailings + " upcoming sailings with dates, ports and starting fares, plus a free cruise guide.";
  return {
    title: "Margaritaville at Sea " + name + ": Sailings, Ports and Fares",
    description,
    alternates: { canonical: "/ships/" + params.ship + "/" },
    openGraph: { title: "Margaritaville at Sea " + name, description, url: "/ships/" + params.ship + "/" },
  };
}

export default function ShipPage({ params }) {
  const name = shipFromSlug(params.ship);
  if (!name) notFound();
  const today = todayISO();
  const { mine, homeports, ports, nights, sailings } = shipData(name, today);
  const ship = SHIPS[name];
  const byHomeport = homeports.map((c) => ({ city: c, list: mine.filter((it) => cityOf(it.frm) === c) }));

  const faqs = [
    {
      q: "Where does Margaritaville at Sea " + name + " sail from?",
      a: name + " sails from " + joinList(byHomeport.map((h) => homeportOf(h.list[0]).port)) + ".",
    },
    {
      q: "How long are " + name + " cruises?",
      a: name + " cruises run from " + Math.min(...nights) + " to " + Math.max(...nights) + " nights.",
    },
    {
      q: "Which ports does " + name + " visit?",
      a: "Upcoming " + name + " itineraries call on " + joinList(ports) + ".",
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
      { "@type": "ListItem", position: 2, name: "Ships", item: "https://mvascruisedeals.com/ships/" },
      { "@type": "ListItem", position: 3, name, item: "https://mvascruisedeals.com/ships/" + params.ship + "/" },
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
            <Link href="/ships/">Ships</Link>
            <span aria-hidden="true">/</span>
            <span>{name}</span>
          </nav>
          <p className="eyebrow">Margaritaville at Sea</p>
          <h1>{name}: sailings, ports and fares</h1>
          <p className="page-lede">
            {name} sails from {joinList(homeports)} on {Math.min(...nights)} to {Math.max(...nights)}-night cruises, with {sailings} upcoming
            sailings across {mine.length} itineraries.
          </p>
          <div className="hero-actions">
            <Link href={"/plan/?q=" + name} className="btn btn-primary btn-lg">
              Get my free guide
            </Link>
            <Link href="/contact/" className="btn btn-outline btn-lg">
              Get a free quote
            </Link>
          </div>
          <dl className="dest-facts">
            <div>
              <dt>Sails from</dt>
              <dd>{joinList(homeports)}</dd>
            </div>
            <div>
              <dt>Trip length</dt>
              <dd>
                {Math.min(...nights)} to {Math.max(...nights)} nights
              </dd>
            </div>
            <div>
              <dt>On board</dt>
              <dd>
                {ship.shortStat.big} {ship.shortStat.small}
              </dd>
            </div>
            <div>
              <dt>Next sailing</dt>
              <dd>{longDate(mine[0] ? futureDates(mine[0], today)[0] : today, { year: true })}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">What stands out</p>
            <h2>Why people pick {name}</h2>
          </div>
          <div className="feature-grid">
            {ship.glance.map((g) => (
              <div className="feature" key={g[0]}>
                <h3>{g[0]}</h3>
                <p>{glanceText(g, today)}</p>
              </div>
            ))}
          </div>
          <p className="sp-more">
            <Link href="/blog/which-margaritaville-at-sea-ship-is-right-for-you/">Compare all three ships &rarr;</Link>
          </p>
        </div>
      </section>

      {byHomeport.map((h) => (
        <section className="section" key={h.city}>
          <div className="container">
            <div className="section-head section-head--center">
              <p className="eyebrow">{name} from {h.city}</p>
              <h2>Every {name} cruise from {h.city}</h2>
            </div>
            <ul className="sp-list">
              {h.list.map((it) => {
                const ds = futureDates(it, today);
                return (
                  <li key={it.id}>
                    <Link href={sailingPath(it)}>
                      <b>{tripTitle(it)}</b>
                      <span>{joinList(uniquePorts(it))}</span>
                      <span>
                        {ds.length} sailing{ds.length === 1 ? "" : "s"}, next {longDate(ds[0], { year: true })}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <section className="section section--muted">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Ports of call</p>
            <h2>Where {name} goes</h2>
          </div>
          <div className="dest-chips">
            {ports.map((p) => {
              const d = destinationForPort(p);
              return d ? (
                <Link key={p} href={"/cruises/" + d.slug + "/"} className="dest-chip">
                  {p}
                </Link>
              ) : (
                <span key={p} className="dest-chip">
                  {p}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Good to know</p>
            <h2>{name} questions</h2>
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

      <section className="cta">
        <div className="container cta-inner">
          <h2>Get a free guide for your {name} cruise</h2>
          <p>Pick your sailing and I will build you a guide with the ports, what to pack and how boarding day works. Free, with no booking fees if you book with me.</p>
          <Link href={"/plan/?q=" + name} className="btn btn-primary btn-lg">
            Build my free guide
          </Link>
        </div>
      </section>
    </>
  );
}
