import Link from "next/link";
import { ZBB, ZBB_SAILINGS, ZBB_URL, ZBB_UPDATED_LONG } from "../data/zacBrown";
import { findItinerary, addDays, longDate, tripTitle } from "../lib/guide";
import { quoteHref } from "../lib/quote";
import { BRENT } from "../data/guideContent";

const PATH = "/zac-brown-nassau/";
const DESC =
  "Zac Brown Band plays Nassau on January 28, 2027 for Margaritaville at Sea guests. The three meet-up sailings, concert day schedule, VIP upgrade prices, Bahama Bay Pool Club and onboard watch parties.";

export const metadata = {
  title: "Zac Brown Band Live in Nassau: the 3-Ship Meet-Up Sailings",
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    siteName: "MVAS Cruise Deals",
    url: PATH,
    title: "Zac Brown Band Live in Nassau, January 28, 2027",
    description: DESC,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "MVAS Cruise Deals" }],
  },
};

export default function ZacBrownNassauPage() {
  const sailings = ZBB_SAILINGS.map((s) => {
    const it = findItinerary(s.id);
    return it && { ...s, it, ret: addDays(s.date, it.nights) };
  }).filter(Boolean);

  const faqs = [
    ...ZBB.faqs,
    ["Is this site affiliated with Margaritaville at Sea?", "No. This is an independent travel advisor site. Concert details and prices are as the cruise line published them on " + ZBB_UPDATED_LONG + ", and they can change."],
  ];

  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Three ships, one concert</p>
          <h1>{ZBB.title}</h1>
          <p className="page-lede">
            <b>{ZBB.dateLong}, {ZBB.where}.</b> {ZBB.intro}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Pick your ship</p>
            <h2>The three meet-up sailings</h2>
          </div>
          <div className="zbb-cards">
            {sailings.map(({ id, date, ship, it, ret }) => (
              <article className="zbb-card" key={id}>
                <p className="zbb-ship">Margaritaville at Sea {ship}</p>
                <h3>{tripTitle(it)}</h3>
                <p className="zbb-when">
                  {longDate(date, { dow: true })} to {longDate(ret, { dow: true, year: true })}
                </p>
                <p className="zbb-meta">
                  Round-trip from {it.frm}. Ports: {it.ports.join(", ")}.
                </p>
                <div className="zbb-actions">
                  <Link href={"/plan/?s=" + id + "&d=" + date} className="btn btn-outline">
                    Free guide for this sailing
                  </Link>
                  <Link
                    href={quoteHref({ ship, cruise: tripTitle(it) + " (3-Ship Meet-Up ft. Zac Brown Band)", when: longDate(date, { year: true }) })}
                    className="btn btn-primary"
                  >
                    Get a quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="zbb-note">{ZBB.sameBoat}</p>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container zbb-two">
          <div>
            <div className="section-head">
              <h2>Concert day</h2>
            </div>
            <ul className="zbb-sched">
              {ZBB.schedule.map(([t, w]) => (
                <li key={t}>
                  <b>{t}</b> {w}
                </li>
              ))}
            </ul>
            <p className="zbb-note">{ZBB.scheduleNote}</p>
          </div>
          <div>
            <div className="section-head">
              <h2>Included with your fare</h2>
            </div>
            <div className="zbb-incl">
              <b>{ZBB.included.name}</b>
              <p>{ZBB.included.text}</p>
            </div>
            <div className="section-head zbb-gap">
              <h2>Watch from your ship</h2>
            </div>
            <p className="zbb-note">{ZBB.watch.intro}</p>
            <ul className="zbb-sched">
              {ZBB.watch.parties.map(([n, pool, t]) => (
                <li key={n}>
                  <b>{n}</b> at the {pool}. {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Optional upgrades</p>
            <h2>Concert seating</h2>
          </div>
          <ul className="zbb-list">
            {ZBB.tiers.map(([n, price, t]) => (
              <li key={n}>
                <span className="zbb-price">{price}</span>
                <div>
                  <b>{n}</b>
                  <p>{t}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="zbb-note">{ZBB.tiersNote}</p>

          <div className="section-head zbb-gap">
            <p className="eyebrow">A pool day with the concert on TV</p>
            <h2>Bahama Bay Pool Club</h2>
          </div>
          <p className="zbb-note">{ZBB.bahamaBay.intro}</p>
          <ul className="zbb-list">
            {ZBB.bahamaBay.options.map(([n, price, t]) => (
              <li key={n}>
                <span className="zbb-price">{price}</span>
                <div>
                  <b>{n}</b>
                  <p>{t}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="zbb-know">
            {ZBB.bahamaBay.know.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
          <p className="zbb-note">
            Prices are as the cruise line published them on {ZBB_UPDATED_LONG} and can change. You add upgrades yourself in
            Cruise Control after you book. Call or text me at {BRENT.phone} and I will help you choose.
            Full details on the{" "}
            <a href={ZBB_URL} target="_blank" rel="noopener">
              cruise line&apos;s event pages
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-head">
            <h2>Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details className="faq-item" key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>Want to be in Nassau for the show?</h2>
          <p>
            Tell me which ship and how many are traveling. I will check cabins and
            send your quote, with no booking fees.
          </p>
          <Link href="/contact/" className="btn btn-primary btn-lg">
            Get My Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
