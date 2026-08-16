"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { sailings } from "../data/sailings";

const uniq = (arr) => [...new Set(arr)];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// "2026-09-05" -> "Sep 5"
function shortDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${Number(d)}`;
}
// "2026-09" -> "Sep 2026"
function monthLabel(key) {
  const [y, m] = key.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

const MAX_CHIPS = 8;

export default function SailingsExplorer() {
  const [ship, setShip] = useState("All");
  const [port, setPort] = useState("All");
  const [nights, setNights] = useState("All");
  const [dest, setDest] = useState("All");
  const [month, setMonth] = useState("All");

  const ships = useMemo(() => uniq(sailings.map((s) => s.ship)).sort(), []);
  const ports = useMemo(
    () => uniq(sailings.map((s) => s.departure_port)).sort(),
    []
  );
  const nightOptions = useMemo(
    () => uniq(sailings.map((s) => s.nights)).sort((a, b) => a - b),
    []
  );
  const destinations = useMemo(
    () => uniq(sailings.flatMap((s) => s.ports_of_call)).sort(),
    []
  );
  const months = useMemo(
    () =>
      uniq(sailings.flatMap((s) => s.departures.map((d) => d.slice(0, 7)))).sort(),
    []
  );

  const filtered = sailings.filter(
    (s) =>
      (ship === "All" || s.ship === ship) &&
      (port === "All" || s.departure_port === port) &&
      (nights === "All" || String(s.nights) === nights) &&
      (dest === "All" || s.ports_of_call.includes(dest)) &&
      (month === "All" || s.departures.some((d) => d.startsWith(month)))
  );

  const active =
    ship !== "All" ||
    port !== "All" ||
    nights !== "All" ||
    dest !== "All" ||
    month !== "All";
  const reset = () => {
    setShip("All");
    setPort("All");
    setNights("All");
    setDest("All");
    setMonth("All");
  };

  return (
    <>
      <div className="sailings-filters">
        <div className="filter">
          <label htmlFor="f-ship">Ship</label>
          <select id="f-ship" value={ship} onChange={(e) => setShip(e.target.value)}>
            <option>All</option>
            {ships.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="f-port">Departure port</label>
          <select id="f-port" value={port} onChange={(e) => setPort(e.target.value)}>
            <option>All</option>
            {ports.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="f-month">Departure month</label>
          <select
            id="f-month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="All">All</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {monthLabel(m)}
              </option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="f-nights">Length</label>
          <select
            id="f-nights"
            value={nights}
            onChange={(e) => setNights(e.target.value)}
          >
            <option value="All">All</option>
            {nightOptions.map((n) => (
              <option key={n} value={String(n)}>
                {n} nights
              </option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="f-dest">Destination</label>
          <select id="f-dest" value={dest} onChange={(e) => setDest(e.target.value)}>
            <option>All</option>
            {destinations.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        {active && (
          <button type="button" className="filter-reset" onClick={reset}>
            Reset filters
          </button>
        )}
      </div>

      <p className="sailings-count">
        Showing {filtered.length} of {sailings.length} itineraries
      </p>

      {filtered.length === 0 ? (
        <p className="sailings-empty">
          No sailings match those filters.{" "}
          <button type="button" className="linklike" onClick={reset}>
            Clear filters
          </button>
        </p>
      ) : (
        <div className="deal-grid">
          {filtered.map((s) => {
            const shown =
              month === "All"
                ? s.departures
                : s.departures.filter((d) => d.startsWith(month));
            const chips = shown.slice(0, MAX_CHIPS);
            const extra = shown.length - chips.length;
            return (
              <article className="deal-card" key={s.id}>
                <div className="deal-media">
                  <Image
                    src={s.image}
                    alt={`Margaritaville at Sea ${s.ship}`}
                    width={480}
                    height={280}
                    className="deal-image"
                  />
                  <span className="deal-badge">{s.nights} nights</span>
                </div>
                <div className="deal-body">
                  <p className="deal-line">Margaritaville at Sea {s.ship}</p>
                  <h3 className="deal-title">
                    {s.nights}-Night {s.route}
                  </h3>
                  <p className="deal-meta">Departs {s.departure_port}</p>
                  <ul className="deal-ports">
                    {s.ports_of_call.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  {s.note && <p className="sailing-note">{s.note}</p>}
                  <div className="sailing-dates">
                    <p className="sailing-dates-head">
                      {shown.length} departure{shown.length === 1 ? "" : "s"}
                      {month === "All" ? "" : ` in ${monthLabel(month)}`}
                    </p>
                    <ul className="date-chips">
                      {chips.map((d) => (
                        <li key={d} className="date-chip">
                          {shortDate(d)}
                          <span className="date-chip-yr">
                            {" "}
                            {d.slice(0, 4)}
                          </span>
                        </li>
                      ))}
                      {extra > 0 && (
                        <li className="date-chip date-chip-more">
                          +{extra} more
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="deal-footer">
                    <Link href="/contact" className="btn btn-outline">
                      Get a Quote
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
