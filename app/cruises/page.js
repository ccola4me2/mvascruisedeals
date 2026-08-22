import Link from "next/link";
import { destinations } from "../data/destinations";
import { sailings } from "../data/sailings";

export const metadata = {
  title: "Margaritaville at Sea Cruise Destinations",
  description:
    "Explore Margaritaville at Sea cruise destinations: Cozumel, Key West, Nassau, Grand Cayman, Grand Bahama, Progreso, Ocho Rios, and more. Find sailings that visit each and get a free quote.",
  alternates: { canonical: "/cruises/" },
};

export default function CruisesIndexPage() {
  const counts = Object.fromEntries(
    destinations.map((d) => [
      d.slug,
      sailings.filter((s) => s.ports_of_call.includes(d.port)).length,
    ])
  );

  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Where do you want to wake up?</p>
          <h1>Margaritaville at Sea Cruise Destinations</h1>
          <p className="page-lede">
            Pick a port and see every Margaritaville at Sea itinerary that stops
            there, with dates and a quick path to a free quote. From quick
            Bahamas beaches to Western and Southern Caribbean escapes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="dest-grid">
            {destinations.map((d) => (
              <Link
                key={d.slug}
                href={`/cruises/${d.slug}/`}
                className="dest-card"
              >
                <span className="dest-region">{d.region}</span>
                <span className="dest-name">{d.name}</span>
                <span className="dest-count">
                  {counts[d.slug]} itinerar{counts[d.slug] === 1 ? "y" : "ies"}
                  {" →"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>Not sure where to go?</h2>
          <p>
            Tell us the vibe: quick beach escape, week-long adventure, or a group
            trip, and we&apos;ll match you to the right ship, itinerary, and the
            best available rate.
          </p>
          <Link href="/contact/" className="btn btn-primary btn-lg">
            Get My Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
