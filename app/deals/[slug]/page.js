import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { featuredDeals, getLandingDeal } from "../../data/featuredDeals";
import { destinations } from "../../data/destinations";
import QuoteSection from "../../components/QuoteSection";
import DealClosedNotice from "../../components/DealClosedNotice";
import ShareRow from "../../components/ShareRow";

const SITE = "https://mvascruisedeals.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return featuredDeals
    .filter((d) => d.landing)
    .map((d) => ({ slug: d.landing.slug }));
}

const shortShip = (s) => s.replace(/^Margaritaville at Sea\s+/i, "");
const homeportCity = (h) => h.split(",")[0];

// "Taxes, fees, and gratuities"
function sentence(list) {
  const items = list.map((x, i) => (i === 0 ? x : x.toLowerCase()));
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

// What we can honestly say about each ship, from the fleet facts already on
// the site. Nothing here is specific to one sailing.
const SHIPS = {
  Beachcomber: {
    line: "The largest ship in the Margaritaville at Sea fleet, with more than 15 venues on board.",
    facts: [["Size", "Over 102,000 gross tons"], ["Fleet", "Largest ship"]],
  },
  Islander: {
    line: "The feature-packed ship that debuted in 2024, with more than a dozen dining venues, bars, and kids' clubs.",
    facts: [["Debuted", "2024"], ["On board", "12+ dining and bar venues"]],
  },
};

export function generateMetadata({ params }) {
  const deal = getLandingDeal(params.slug);
  if (!deal) return {};
  const L = deal.landing;
  const title = `${deal.title} from ${homeportCity(L.homeport)}, ${deal.when}`;
  const description = `${L.lede} Get a free quote, no booking fees.`;
  const url = `/deals/${L.slug}/`;
  const image = {
    url: `/og/${L.slug}.jpg`,
    width: 1200,
    height: 630,
    alt: `${deal.title}, ${deal.when}, aboard ${deal.ship}`,
  };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "MVAS Cruise Deals", url, title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

function buildFaqs(deal) {
  const L = deal.landing;
  const perCabin = L.group || (deal.compare && deal.compare.rows.length > 1);
  const hasGratuities = (deal.includes || []).includes("Gratuities");
  const faqs = [...(L.faqs || [])];

  faqs.push(
    L.group
      ? {
          q: "Who can reserve a cabin at this group rate?",
          a: "Anyone can. Send me a request and I'll reserve your cabin or cabins at the group rate while the group's cabins last. Group reservations are submitted by your travel advisor, so the way to book is through me.",
        }
      : {
          q: "How do I get this rate?",
          a: "Send me a request with your party size and I'll confirm this fare is available for your dates and reserve it for you. Fares and availability change, so I confirm everything in writing.",
        }
  );

  if (L.group) {
    faqs.push({
      q: "How many cabins are available?",
      a: "This is a limited group block, and availability changes as cabins book. Send a request and I'll confirm what is open for your dates.",
    });
  }

  faqs.push({
    q: "What is included in the price?",
    a: `${sentence(deal.includes || [])} ${
      (deal.includes || []).length > 1 ? "are" : "is"
    } included in the price shown${
      hasGratuities ? "" : ", and gratuities are additional"
    }. Your fare also covers your stateroom, most main dining, and onboard entertainment. Airfare, shore excursions, drink packages, specialty dining, and Wi-Fi are typically extra.`,
  });

  if (deal.onboardCredit) {
    faqs.push({
      q: "Is there onboard credit?",
      a: `Yes. ${
        perCabin ? "Each cabin receives" : "This sailing includes"
      } a ${deal.onboardCredit} onboard credit.`,
    });
  }

  faqs.push(
    {
      q: "Do I need a passport?",
      a: "A passport is strongly recommended for any cruise that visits another country. I will confirm exactly which documents your sailing requires before you book.",
    },
    {
      q: "How do deposits and final payment work?",
      a: "I'll lay out your exact deposit and final payment dates in your quote before you commit, and I'll send reminders as each one comes up.",
    },
    {
      q: "What if I need to cancel?",
      a: "Cruise reservations carry cancellation fees that grow as the sailing gets closer. I'll send the exact schedule that applies to your booking with your quote.",
    }
  );

  if (L.group) {
    faqs.push({
      q: "Can I bring my own group?",
      a: "Yes. Booking six cabins or more unlocks group pricing and perks. See the Group Rates page, or ask me and I'll build your block.",
    });
  }
  return faqs;
}

export default function DealLandingPage({ params }) {
  const deal = getLandingDeal(params.slug);
  if (!deal) notFound();
  const L = deal.landing;

  const ship = shortShip(deal.ship);
  const shipInfo = SHIPS[ship];
  const perCabin = L.group || (deal.compare && deal.compare.rows.length > 1);
  const url = `${SITE}/deals/${L.slug}/`;
  const faqs = buildFaqs(deal);

  const base = deal.image.replace(/\.jpg$/, "");
  const heroSet = `${base}-mobile.jpg 800w, ${base}-1200.jpg 1200w, ${deal.image} 1600w`;

  const ports = L.ports
    .map((p) => destinations.find((d) => d.port === p))
    .filter(Boolean);
  const others = featuredDeals.filter((d) => d.landing && d.landing !== L).slice(0, 3);

  const included = [
    ...(deal.includes || []).map((i) => `${i}`),
    "Your stateroom",
    "Most main dining",
    "Onboard entertainment",
    ...(deal.onboardCredit
      ? [`${deal.onboardCredit} onboard credit${perCabin ? " per cabin" : ""}`]
      : []),
  ];
  const extra = [
    ...((deal.includes || []).includes("Gratuities") ? [] : ["Gratuities"]),
    "Airfare to the port",
    "Shore excursions",
    "Drink packages and specialty dining",
    "Wi-Fi",
  ];

  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Cruise Deals", item: `${SITE}/deals/` },
      { "@type": "ListItem", position: 3, name: deal.title, item: url },
    ],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const facts = [
    { label: "Departs", value: L.homeport },
    { label: "Dates", value: deal.when },
    { label: "Length", value: deal.nights },
    { label: "Ship", value: ship },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero */}
      <section className="dl-hero">
        <div className="dl-hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={deal.image}
            srcSet={heroSet}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="dl-hero-img"
          />
        </div>
        <div className="dl-hero-overlay" />
        <div className="container dl-hero-inner">
          <nav className="dl-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/deals/">Cruise Deals</Link>
            <span aria-hidden="true">/</span>
            <span>{deal.title}</span>
          </nav>
          <div className="dl-badges">
            {deal.tag && <span className="dl-badge dl-badge--gold">{deal.tag}</span>}
            {L.group && <span className="dl-badge">Group rate</span>}
          </div>
          <h1>{deal.title}</h1>
          <p className="dl-hero-sub">
            Margaritaville at Sea {ship} &middot; {deal.when}
          </p>
          <p className="dl-hero-lede">{L.lede}</p>
          <div className="dl-hero-actions">
            <a href="#quote" className="btn btn-primary btn-lg">
              {L.group ? "Reserve your cabin" : "Get this fare"}
            </a>
            <a href="tel:+15617779911" className="btn btn-glass btn-lg">
              Call or text (561) 777-9911
            </a>
          </div>
        </div>
      </section>

      {/* Fact bar */}
      <div className="container dl-factbar-wrap">
        <div className="dl-factbar">
          <dl className="dl-facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="dl-from">
            <span className="dl-from-label">From</span>
            <strong>{L.from}</strong>
            <em>{L.fromUnit}</em>
          </div>
        </div>
      </div>

      <div className="container">
        <DealClosedNotice departs={L.departs} />
      </div>

      {/* In-page navigation (desktop) */}
      <nav className="dl-nav" aria-label="On this page">
        <div className="container dl-nav-inner">
          <a href="#overview">Overview</a>
          <a href="#cabins">Cabins and pricing</a>
          <a href="#ports">Ports</a>
          <a href="#ship">The ship</a>
          <a href="#how">How to reserve</a>
          <a href="#faq">Questions</a>
          <a href="#quote" className="dl-nav-cta">Reserve</a>
        </div>
      </nav>

      <div className="container dl-layout">
        <div className="dl-content">
          {/* Overview */}
          <section className="dl-section" id="overview">
            <p className="eyebrow">Why this sailing</p>
            <h2>{deal.title}</h2>
            <p className="dl-lede">{deal.itinerary}.</p>
            <div className="dl-why">
              {L.why.map((w) => (
                <div className="dl-why-card" key={w.title}>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              ))}
            </div>
            {deal.limited && (
              <p className="fdeal-limited dl-limited">
                <span className="fdeal-limited-dot" aria-hidden="true" />
                {deal.limited}
              </p>
            )}
          </section>

          {/* Cabins and pricing */}
          <section className="dl-section" id="cabins">
            <p className="eyebrow">Cabins and pricing</p>
            <h2>Choose your cabin</h2>
            {deal.cabins && (
              <>
                <div className="dl-cabins">
                  {deal.cabins.map((c) => (
                    <div
                      className={`dl-cabin${c.type === "Suite" ? " dl-cabin--suite" : ""}${
                        c.tag ? " dl-cabin--hot" : ""
                      }`}
                      key={c.name}
                    >
                      {c.tag && <span className="dl-cabin-ribbon">{c.tag}</span>}
                      <span className="dl-cabin-type">{c.type}</span>
                      <span className="dl-cabin-name">{c.name}</span>
                      <span className="dl-cabin-price">{c.price}</span>
                      <span className="dl-cabin-unit">per guest</span>
                    </div>
                  ))}
                </div>
                {deal.priceBasis && <p className="dl-note">{deal.priceBasis}</p>}
              </>
            )}
            {deal.compare && (
              <div className="compare dl-compare">
                <div className="compare-row compare-head">
                  <span />
                  <span>Book Direct</span>
                  <span>With Brent</span>
                </div>
                {deal.compare.rows.map((r) => (
                  <div className="compare-row" key={r.cabin}>
                    <span className="compare-cabin">{r.cabin}</span>
                    <span className="compare-direct">
                      <s>{r.direct}</s>
                    </span>
                    <span className="compare-ours">{r.ours}</span>
                  </div>
                ))}
                {deal.compare.basis && <p className="compare-basis">{deal.compare.basis}</p>}
              </div>
            )}
            <div className="dl-perks">
              {deal.savings && (
                <div className="value-tag value-save">
                  <span>You Save</span>
                  <strong>{deal.savings}</strong>
                  {deal.savingsNote && <em>{deal.savingsNote}</em>}
                </div>
              )}
              {deal.onboardCredit && (
                <div className="value-tag value-obc">
                  <strong>{deal.onboardCredit}</strong>
                  <span>Onboard credit{perCabin ? " per cabin" : ""}</span>
                </div>
              )}
            </div>

            <div className="dl-incl">
              <div>
                <h3>Included</h3>
                <ul className="dl-list dl-list--yes">
                  {included.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Typically extra</h3>
                <ul className="dl-list dl-list--no">
                  {extra.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Ports */}
          <section className="dl-section" id="ports">
            <p className="eyebrow">Ports of call</p>
            <h2>Where you&apos;ll go</h2>
            <p className="dl-note dl-note--top">
              Round-trip from {L.homeport}. Exact port order can vary by date, and I
              confirm the schedule for your sailing in your quote.
            </p>
            <div className="dl-ports">
              {ports.map((p) => (
                <article className="dl-port" key={p.slug}>
                  <span className="dl-port-region">{p.region}</span>
                  <h3>{p.name}</h3>
                  <ul>
                    {p.highlights.slice(0, 3).map((h) => (
                      <li key={h.title}>{h.title}</li>
                    ))}
                  </ul>
                  <Link href={`/cruises/${p.slug}/`} className="dl-port-link">
                    Explore {p.name.split(",")[0]} &rarr;
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Ship */}
          <section className="dl-section" id="ship">
            <p className="eyebrow">Your ship</p>
            <h2>Margaritaville at Sea {ship}</h2>
            <div className="dl-ship">
              <div className="dl-ship-media">
                <Image
                  src={deal.image}
                  alt={`Margaritaville at Sea ${ship}`}
                  fill
                  sizes="(max-width: 860px) 100vw, 40vw"
                  className="dl-ship-img"
                />
              </div>
              <div className="dl-ship-body">
                {shipInfo && <p>{shipInfo.line}</p>}
                <ul className="dl-shipfacts">
                  <li>
                    <span>Homeport</span>
                    {L.homeport}
                  </li>
                  {shipInfo &&
                    shipInfo.facts.map(([k, v]) => (
                      <li key={k}>
                        <span>{k}</span>
                        {v}
                      </li>
                    ))}
                </ul>
                <Link href="/#fleet" className="dl-port-link">
                  Meet the fleet &rarr;
                </Link>
              </div>
            </div>
          </section>

          {/* How to reserve */}
          <section className="dl-section" id="how">
            <p className="eyebrow">How to reserve</p>
            <h2>Three easy steps</h2>
            <ol className="dl-steps">
              <li>
                <span className="dl-step-n">1</span>
                <h3>Send your request</h3>
                <p>Tell me your party size and the cabin you have in mind. It takes a minute and costs nothing.</p>
              </li>
              <li>
                <span className="dl-step-n">2</span>
                <h3>I confirm and reserve</h3>
                <p>I check availability, confirm the rate in writing, and send your deposit and final payment dates.</p>
              </li>
              <li>
                <span className="dl-step-n">3</span>
                <h3>You sail</h3>
                <p>I keep an eye on every detail and stay in touch right up until you board.</p>
              </li>
            </ol>
          </section>

          {/* Host */}
          <section className="dl-section">
            <div className="dl-host">
              <img
                src="/brent-beasley.jpg"
                alt="Brent Beasley"
                className="dl-host-photo"
                width={308}
                height={398}
              />
              <div>
                <p className="eyebrow">Your host</p>
                <h3>Brent Beasley</h3>
                <p className="dl-host-cred">
                  Independent travel advisor &middot; FL Seller of Travel #TI128169
                </p>
                <p>
                  Margaritaville at Sea is my specialty. I sail these ships, I know
                  the cabins and itineraries, and I handle every detail from your
                  first question to the moment you step off the ship. No booking
                  fees, ever.
                </p>
                <div className="dl-host-actions">
                  <a href="tel:+15617779911" className="btn btn-outline">
                    Call or text (561) 777-9911
                  </a>
                  <a href="#quote" className="btn btn-primary">
                    Request a quote
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="dl-section" id="faq">
            <p className="eyebrow">Good to know</p>
            <h2>Questions about this cruise</h2>
            <div className="faq-list">
              {faqs.map((f) => (
                <details className="faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <ShareRow url={url} title={`${deal.title}, ${deal.when}`} />
        </div>

        {/* Sticky reserve card (desktop) */}
        <aside className="dl-aside" aria-label="Reserve this cruise">
          <div className="dl-reserve">
            <span className="dl-reserve-kicker">
              {L.group ? "Group rate" : "Featured fare"}
            </span>
            <div className="dl-reserve-price">
              <span>From</span>
              <strong>{L.from}</strong>
            </div>
            <p className="dl-reserve-unit">{L.fromUnit}</p>
            <ul className="dl-reserve-list">
              <li>{deal.when}</li>
              <li>Round-trip {homeportCity(L.homeport)}</li>
              {deal.onboardCredit && (
                <li>
                  {deal.onboardCredit} onboard credit{perCabin ? " per cabin" : ""}
                </li>
              )}
              {deal.includes && <li>{sentence(deal.includes)} included</li>}
            </ul>
            {deal.limited && <p className="dl-reserve-limited">{deal.limited}</p>}
            <a href="#quote" className="btn btn-primary btn-lg">
              {L.group ? "Reserve your cabin" : "Get this fare"}
            </a>
            <a href="tel:+15617779911" className="dl-reserve-call">
              Or call or text (561) 777-9911
            </a>
            <p className="dl-reserve-foot">No booking fees. Reply within one business day.</p>
          </div>
        </aside>
      </div>

      {/* Quote form, prefilled for this sailing */}
      <QuoteSection
        eyebrow="Reserve your cabin"
        title={`Get your free ${L.group ? "group rate" : "fare"} quote`}
        lede={`Tell me your party size and the cabin you want and I'll confirm availability for the ${deal.title} sailing, usually within one business day. No fees, no obligation.`}
        prefill={{ cruise: deal.title, ship, when: deal.when }}
      />

      {/* More deals */}
      {others.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head section-head--center">
              <p className="eyebrow">More to consider</p>
              <h2>Other featured cruises</h2>
            </div>
            <div className="dl-related">
              {others.map((o) => (
                <Link
                  href={`/deals/${o.landing.slug}/`}
                  className="dl-related-card"
                  key={o.landing.slug}
                >
                  <div className="dl-related-media">
                    <Image
                      src={o.image}
                      alt={o.ship}
                      fill
                      sizes="(max-width: 860px) 100vw, 30vw"
                      className="dl-related-img"
                    />
                  </div>
                  <div className="dl-related-body">
                    <span className="dl-related-tag">{o.tag}</span>
                    <h3>{o.title}</h3>
                    <p>
                      {o.when} &middot; {homeportCity(o.landing.homeport)}
                    </p>
                    <strong>
                      From {o.landing.from} <em>{o.landing.fromUnit}</em>
                    </strong>
                  </div>
                </Link>
              ))}
            </div>
            <p className="dl-more">
              <Link href="/deals/">See every cruise deal &rarr;</Link>
            </p>
          </div>
        </section>
      )}
    </>
  );
}
