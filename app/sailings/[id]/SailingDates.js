"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FARES, FARES_AS_OF } from "../../data/fares.js";
import { futureDates, diffDays, longDate, todayISO } from "../../lib/guide.js";
import { quoteHref } from "../../lib/quote";

const ROOMS = [
  ["Interior", "Interior"],
  ["Ocean View", "Ocean view"],
  ["Balcony", "Balcony"],
  ["Suite", "Suite"],
];
const FARES_FRESH_DAYS = 4;
const usd = (n) => "$" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// The dates and starting fares for one itinerary. The page is built with the day
// it was published; once the browser has its own date, sailings that have left
// drop off, and fares older than a few days are not shown at all.
export default function SailingDates({ it, buildToday }) {
  const [today, setToday] = useState(buildToday);
  useEffect(() => setToday(todayISO()), []);

  const dates = futureDates(it, today);
  const fresh = diffDays(today, FARES_AS_OF) <= FARES_FRESH_DAYS;
  const rows = dates.map((d) => ({ d, f: fresh ? FARES[it.id + "|" + d] || null : null }));
  const anyFares = rows.some((r) => r.f);
  const title = it.nights + "-Night " + it.name;

  if (!dates.length) {
    return (
      <p>
        This itinerary has no upcoming dates. <Link href="/sailings/">See every sailing</Link>.
      </p>
    );
  }

  return (
    <div className="sp-dates">
      <div className="sp-table-wrap">
        <table className="sp-table">
          <caption className="sr-only">Sailing dates for {title}</caption>
          <thead>
            <tr>
              <th scope="col">Sails</th>
              {anyFares && ROOMS.map(([, label]) => <th scope="col" key={label}>{label}</th>)}
              <th scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ d, f }) => (
              <tr key={d}>
                <th scope="row">{longDate(d, { dow: true, year: true })}</th>
                {anyFares &&
                  ROOMS.map(([key, label]) => (
                    <td key={key} data-label={label}>
                      {f && f[key] ? usd(f[key][0]) : <span className="sp-na">Ask</span>}
                    </td>
                  ))}
                <td className="sp-actions">
                  <Link href={"/plan/?s=" + encodeURIComponent(it.id) + "&d=" + d} className="btn btn-primary btn-sm">
                    Free guide
                  </Link>
                  <Link
                    href={quoteHref({ ship: it.ship, cruise: title, when: longDate(d, { year: true }) })}
                    className="btn btn-outline btn-sm"
                  >
                    Get a quote
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {anyFares ? (
        <p className="sp-note">
          Starting fares per person, taxes and fees included, from my daily tracking as of{" "}
          {longDate(FARES_AS_OF, { year: true })}. Sold-out categories show Ask. Fares change daily, so call or text
          for today&apos;s price. <Link href="/trends/">See all price trends</Link>.
        </p>
      ) : (
        <p className="sp-note">
          Fares change daily, so ask for today&apos;s price and any group rate. <Link href="/trends/">See price trends</Link>.
        </p>
      )}
    </div>
  );
}
