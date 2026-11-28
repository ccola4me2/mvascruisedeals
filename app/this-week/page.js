import ThisWeek from "./ThisWeek";
import DigestSignup from "../components/DigestSignup";
import QuoteSection from "../components/QuoteSection";
import { DIGEST_ENABLED } from "../lib/digestConfig.js";
import data from "../../data/trends.json";
import { itineraries } from "../data/itineraries";

export const metadata = {
  title: "Margaritaville at Sea Cruises Leaving in the Next 14 Days",
  description:
    "The cheapest Margaritaville at Sea cruises that sail in the next two weeks, from the daily price check. Last-minute Bahamas, Mexico, and Caribbean sailings from Palm Beach, Tampa, and Miami, sorted by price per night.",
  alternates: { canonical: "/this-week/" },
  openGraph: {
    title: "Margaritaville at Sea cruises leaving in the next 14 days",
    description: "Last-minute sailings, sorted by price per night, checked daily.",
    url: "/this-week/",
    images: [{ url: "/og/trends.jpg", width: 1200, height: 630, alt: "Margaritaville at Sea sailings this week" }],
  },
};

const byId = new Map(itineraries.map((i) => [i.id, i]));

export default function ThisWeekPage() {
  const snapshot = data.meta.snapshotDate;
  // Every departure in the price check's own window, with its ports. The page
  // trims this to the next 14 days in the browser, so it stays right between deploys.
  const rows = data.soon.map((s) => {
    const id = data.guides[s.ship + "|" + s.itin + "|" + s.sail] || null;
    const it = id ? byId.get(id) : null;
    return {
      ship: s.ship,
      itin: s.itin,
      nights: s.nights,
      sail: s.sail,
      room: s.room,
      price: s.price,
      id,
      ports: it ? it.ports : [],
      from: it ? it.frm.replace(/,.*$/, "") : "",
    };
  });

  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Margaritaville at Sea cruises leaving in the next 14 days",
    url: "https://mvascruisedeals.com/this-week/",
    dateModified: snapshot,
    isPartOf: { "@id": "https://mvascruisedeals.com/#agency" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Updated every day</p>
          <h1>Margaritaville at Sea cruises leaving in the next 14 days</h1>
          <p className="page-lede">
            The cheapest sailings you can still make, sorted by price per night. Fares come from the daily price check
            on all three ships and were last checked on{" "}
            {new Date(snapshot + "T12:00:00Z").toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            })}
            .
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ThisWeek rows={rows} snapshot={snapshot} />
          <p className="tw-fine">
            Each fare is the lowest cabin on sale for that sailing, per person with two guests in a cabin, taxes and
            fees included, gratuities additional. A cabin can sell out between checks, so ask me to confirm before you
            plan around it. See the full history on the <a href="/trends/">price trends page</a>.
          </p>
        </div>
      </section>

      {DIGEST_ENABLED && <DigestSignup where="week" />}

      <QuoteSection
        eyebrow="Found one that fits?"
        title="Get your free quote"
        lede="Tell me the sailing and how many guests, and I will check the cabin and send the best available fare, usually within one business day."
      />
    </>
  );
}
