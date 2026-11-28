import Link from "next/link";
import data from "../../data/trends.json";
import { itineraries, ITINERARIES_UPDATED } from "../data/itineraries.js";
import { futureDates, tripTitle, longDate, shortDate, dowName, todayISO } from "../lib/guide.js";
import { cityOf, sailingPath, uniquePorts } from "../lib/sailingPages.js";

// Every dated sailing from one homeport, with the lowest fare from the daily price
// check. Dates and ports come from itineraries.js, fares from data/trends.json, so the
// page can never disagree with the sailings pages or the price trends page. A sailing
// the daily check does not cover yet says "Ask for the fare" instead of guessing.

const FIRST = 12;
const money = (n) =>
  "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// itinerary id + date -> the lowest fare on that sailing
const lowest = new Map();
data.fares.forEach(([ship, itin, sail, room, price]) => {
  const id = data.guides[ship + "|" + itin + "|" + sail];
  if (!id) return;
  const k = id + "|" + sail;
  const cur = lowest.get(k);
  if (!cur || price < cur.price) lowest.set(k, { room, price });
});

function Row({ r, groupRates }) {
  const gr = groupRates ? groupRates[r.date] : null;
  const p = lowest.get(r.it.id + "|" + r.date) || gr;
  return (
    <li className="hs-row">
      <div className="hs-date">
        <b>{shortDate(r.date)}</b>
        <span>
          {dowName(r.date)}, {r.date.slice(0, 4)}
        </span>
      </div>
      <div className="hs-trip">
        <Link href={sailingPath(r.it)}>{tripTitle(r.it)}</Link>
        {r.it.note ? <span className="hs-note">{r.it.note}</span> : null}
        {gr && !lowest.get(r.it.id + "|" + r.date) ? <span className="hs-note">{gr.note}</span> : null}
        <p>{uniquePorts(r.it).join(", ")}</p>
      </div>
      <div className="hs-price">
        {p ? (
          <>
            <b>{money(p.price)}</b>
            <span>{p.room}</span>
          </>
        ) : (
          <span>Ask for the fare</span>
        )}
      </div>
      <Link className="hs-go" href={sailingPath(r.it)}>
        Details
      </Link>
    </li>
  );
}

// groupRates: optional { "YYYY-MM-DD": { price, room, note } } for a sailing the daily check does not
// cover but that has a published group rate on this site.
export default function HomeportSailings({ city, ship, groupRates }) {
  const today = todayISO();
  const rows = itineraries
    .filter((it) => cityOf(it.frm) === city)
    .flatMap((it) => futureDates(it, today).map((date) => ({ it, date })))
    .sort((a, b) => a.date.localeCompare(b.date) || a.it.nights - b.it.nights);
  if (rows.length === 0) return null;

  const priced = rows.map((r) => lowest.get(r.it.id + "|" + r.date) || (groupRates && groupRates[r.date])).filter(Boolean);
  const cheapest = priced.length ? Math.min(...priced.map((p) => p.price)) : null;
  const first = rows.slice(0, FIRST);
  const rest = rows.slice(FIRST);

  return (
    <section className="section" id="sailings">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">Every date from {city}</p>
          <h2>
            {ship} sailings from {city}
          </h2>
          <p className="section-lede">
            {rows.length} {rows.length === 1 ? "sailing" : "sailings"}
            {cheapest !== null
              ? ", with fares as low as " + money(cheapest) + " per person. Tap a sailing for its ports, the price history, and a free price alert."
              : ". Tap a sailing for its ports, or ask me for the fare."}
          </p>
        </div>
        <ul className="hs-list">
          {first.map((r) => (
            <Row key={r.it.id + r.date} r={r} groupRates={groupRates} />
          ))}
        </ul>
        {rest.length > 0 && (
          <details className="hs-more">
            <summary>Show the other {rest.length} sailings</summary>
            <ul className="hs-list">
              {rest.map((r) => (
                <Row key={r.it.id + r.date} r={r} groupRates={groupRates} />
              ))}
            </ul>
          </details>
        )}
        <p className="hs-fine">
          Fares are the lowest cabin on sale for that sailing, per person with two guests in a cabin, taxes and fees
          included, gratuities additional, from the price check on {longDate(data.meta.snapshotDate, { year: true })}. A
          sailing without a price is not in the daily check yet, so ask me for the fare. Dates and ports are from the
          cruise line&apos;s reservations site as of {longDate(ITINERARIES_UPDATED, { year: true })}; confirm yours before
          you book. See today&apos;s moves on the <Link href="/trends/">price trends page</Link>.
        </p>
      </div>
    </section>
  );
}
