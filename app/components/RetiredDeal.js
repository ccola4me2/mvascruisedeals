import Link from "next/link";
import Image from "next/image";
import QuoteSection from "./QuoteSection";
import { featuredDeals } from "../data/featuredDeals";

const homeportCity = (h) => h.split(",")[0];
const PORT_PAGES = {
  Galveston: "/galveston-cruises/",
  Miami: "/miami-cruises/",
  Tampa: "/tampa-cruises/",
  "Palm Beach": "/palm-beach-cruises/",
};

// Shown at the old address of a deal that has been taken down (see retiredDeals in
// app/data/featuredDeals.js). Same-homeport deals are listed first.
export default function RetiredDeal({ deal }) {
  const city = homeportCity(deal.homeport);
  const current = featuredDeals.filter((d) => d.landing);
  const related = [
    ...current.filter((d) => homeportCity(d.landing.homeport) === city),
    ...current.filter((d) => homeportCity(d.landing.homeport) !== city),
  ].slice(0, 3);

  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">This offer has ended</p>
          <h1>The {deal.title} is no longer available</h1>
          <p className="page-lede">
            The group rate on the {deal.ship} sailing from {city} ({deal.when}) has
            closed. Fares and cabins change every day, so there is a good chance a
            similar sailing is open right now. Take a look at what is available, or
            tell me what you have in mind and I will find it for you.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
            <Link href="/deals/" className="btn btn-primary btn-lg">
              See current cruise deals
            </Link>
            <Link href="/sailings/" className="btn btn-outline btn-lg">
              Browse every sailing
            </Link>
            <a href="tel:+15617779911" className="btn btn-outline btn-lg">
              Call or text (561) 777-9911
            </a>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head section-head--center">
              <p className="eyebrow">Still open</p>
              <h2>Featured cruises you might like</h2>
            </div>
            <div className="dl-related">
              {related.map((o) => (
                <Link href={`/deals/${o.landing.slug}/`} className="dl-related-card" key={o.landing.slug}>
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
              {" "}
              {PORT_PAGES[city] && <Link href={PORT_PAGES[city]}>More cruises from {city} &rarr;</Link>}
            </p>
          </div>
        </section>
      )}

      <QuoteSection
        eyebrow="Free quote, no obligation"
        title="Tell me what you are looking for"
        lede="Share your dates, ship, and party size and I will find the best open fares, usually within one business day. No booking fees."
      />
    </>
  );
}
