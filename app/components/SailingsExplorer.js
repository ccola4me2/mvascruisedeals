"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { sailings } from "../data/sailings";

const uniq = (arr) => [...new Set(arr)];

export default function SailingsExplorer() {
  const [ship, setShip] = useState("All");
  const [port, setPort] = useState("All");
  const [nights, setNights] = useState("All");
  const [dest, setDest] = useState("All");

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

  const filtered = sailings.filter(
    (s) =>
      (ship === "All" || s.ship === ship) &&
      (port === "All" || s.departure_port === port) &&
      (nights === "All" || String(s.nights) === nights) &&
      (dest === "All" || s.ports_of_call.includes(dest))
  );

  const active =
    ship !== "All" || port !== "All" || nights !== "All" || dest !== "All";
  const reset = () => {
    setShip("All");
    setPort("All");
    setNights("All");
    setDest("All");
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
        Showing {filtered.length} of {sailings.length} sailings
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
          {filtered.map((s) => (
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
                <p className="sailing-desc">{s.description}</p>
                {s.note && <p className="sailing-note">{s.note}</p>}
                <div className="deal-footer">
                  <Link href="/contact" className="btn btn-outline">
                    Get a Quote
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
