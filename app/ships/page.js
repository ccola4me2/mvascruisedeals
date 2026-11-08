import Link from "next/link";
import { itineraries } from "../data/itineraries.js";
import { SHIPS } from "../data/guideContent.js";
import { futureDates, todayISO } from "../lib/guide.js";
import { SHIP_ORDER, cityOf, joinList, shipSlug } from "../lib/sailingPages.js";

export const metadata = {
  title: "Margaritaville at Sea Ships: Paradise, Islander and Beachcomber",
  description:
    "The three Margaritaville at Sea ships, where each one sails from, how long its cruises are and every sailing with dates and starting fares.",
  alternates: { canonical: "/ships/" },
};

export default function ShipsPage() {
  const today = todayISO();
  return (
    <>
      <section className="page-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Ships</span>
          </nav>
          <p className="eyebrow">The fleet</p>
          <h1>Margaritaville at Sea ships</h1>
          <p className="page-lede">
            Three ships, four U.S. homeports. Pick a ship to see where it sails, the ports it visits and every upcoming sailing.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="feature-grid">
            {SHIP_ORDER.map((name) => {
              const mine = itineraries.filter((it) => it.ship === name && futureDates(it, today).length);
              const homeports = mine.map((it) => cityOf(it.frm)).filter((c, i, a) => a.indexOf(c) === i);
              const nights = mine.map((it) => it.nights);
              return (
                <div className="feature" key={name}>
                  <h3>
                    <Link href={"/ships/" + shipSlug(name) + "/"}>{name}</Link>
                  </h3>
                  <p>
                    {SHIPS[name].shortStat.big} {SHIPS[name].shortStat.small}.
                  </p>
                  <p>
                    Sails from {joinList(homeports)}, {Math.min(...nights)} to {Math.max(...nights)} nights, {mine.length} itineraries.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
