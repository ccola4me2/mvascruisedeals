import Link from "next/link";

export const metadata = {
  title: "Margaritaville at Sea Group Rates",
  description:
    "Group rates on Margaritaville at Sea cruises for reunions, weddings, birthdays, corporate trips, and clubs. Group perks, easy deposits, and a dedicated agent. Request a group quote.",
  alternates: { canonical: "/group-rates/" },
};

const perks = [
  {
    title: "Reduced group pricing",
    body: "Book enough cabins together and everyone in your group can sail for less than booking on their own.",
  },
  {
    title: "Onboard perks & amenities",
    body: "Group amenity points can go toward onboard credit, a cocktail party, or other extras for your group.",
  },
  {
    title: "Flexible deposits",
    body: "Hold a block of cabins with a group deposit and let guests pay their own way before the final due date.",
  },
];

const occasions = [
  "Family reunions",
  "Birthdays & milestones",
  "Weddings & honeymoons",
  "Bachelor & bachelorette trips",
  "Corporate & team incentives",
  "Clubs & friend groups",
];

export default function GroupRatesPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Sail together, save together</p>
          <h1>Margaritaville at Sea Group Rates</h1>
          <p className="page-lede">
            Bringing a crew? Groups typically start at 5 cabins (10 guests) and
            unlock pricing and perks you can&apos;t get on your own. We handle the
            block, the paperwork, and every guest, so you just enjoy the trip.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Request a Group Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <h2>What groups get</h2>
          </div>
          <div className="feature-grid">
            {perks.map((perk) => (
              <div className="feature" key={perk.title}>
                <h3>{perk.title}</h3>
                <p>{perk.body}</p>
              </div>
            ))}
          </div>
          <p className="form-note" style={{ textAlign: "center", marginTop: "18px" }}>
            Exact group thresholds, credits, and amenities are set by the cruise
            line and vary by sailing. We&apos;ll confirm what your specific group
            qualifies for in your quote.
          </p>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section-head section-head--center">
            <h2>Perfect for</h2>
          </div>
          <div className="deal-grid">
            {occasions.map((occasion) => (
              <div className="feature" key={occasion}>
                <h3 style={{ margin: 0 }}>{occasion}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <h2>How group booking works</h2>
          </div>
          <div className="prose" style={{ margin: "0 auto" }}>
            <ol>
              <li>
                <strong>Tell us about your group.</strong> Ship, dates, and rough
                headcount are enough to start.
              </li>
              <li>
                <strong>We secure your rate and cabin block.</strong> You get group
                pricing and a set of held cabins with a group deposit.
              </li>
              <li>
                <strong>Guests book individually.</strong> Everyone reserves their
                own cabin from your block and pays on their own schedule.
              </li>
              <li>
                <strong>We manage the details.</strong> Payments, changes, and
                perks are handled all the way to sail day.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>Let&apos;s get your group on board</h2>
          <p>
            Send us your ship, dates, and estimated party size. We&apos;ll put
            together a group rate and a plan, with no obligation.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Request a Group Quote
          </Link>
        </div>
      </section>
    </>
  );
}
