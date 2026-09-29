"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { sailings } from "../data/sailings";
import { quoteHref } from "../lib/quote";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
function fmt(iso) {
  const [y, m, d] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}

const LENGTHS = [
  { id: "short", label: "Quick getaway", sub: "2 to 4 nights", test: (n) => n <= 4 },
  { id: "mid", label: "A few days more", sub: "5 to 6 nights", test: (n) => n === 5 || n === 6 },
  { id: "week", label: "A week or more", sub: "7 nights and up", test: (n) => n >= 7 },
];

const VIBES = [
  {
    id: "bahamas",
    label: "Bahamas & beaches",
    sub: "Nassau, Grand Bahama, Bimini",
    ports: ["Nassau", "Grand Bahama", "Bimini"],
  },
  {
    id: "mexico",
    label: "Mexico sun",
    sub: "Cozumel, Progreso",
    ports: ["Cozumel", "Progreso"],
  },
  {
    id: "western",
    label: "Western Caribbean",
    sub: "Grand Cayman, Jamaica, Belize",
    ports: ["Grand Cayman", "Roatan", "Belize", "Ocho Rios", "Montego Bay"],
  },
  {
    id: "eastern",
    label: "Eastern & Southern",
    sub: "San Juan, Aruba, Puerto Plata",
    ports: [
      "San Juan", "St. Thomas", "Puerto Plata", "Aruba", "Bonaire",
      "Curacao", "Amber Cove", "Cabo Rojo", "St. Maarten", "Grand Turk",
    ],
  },
];

const PORTS = [
  { id: "Palm Beach, FL", label: "Palm Beach", sub: "aboard Paradise" },
  { id: "Tampa, FL", label: "Tampa", sub: "aboard Islander" },
  { id: "Miami, FL", label: "Miami", sub: "aboard Beachcomber" },
  { id: "Galveston, TX", label: "Galveston", sub: "aboard Beachcomber" },
  { id: "any", label: "Surprise me", sub: "any homeport" },
];

const soonest = (s) => s.departures[0] || "9999-99-99";

function findMatches(lenId, vibeId, portId) {
  const L = LENGTHS.find((x) => x.id === lenId);
  const V = VIBES.find((x) => x.id === vibeId);
  const byLen = (s) => L.test(s.nights);
  const byVibe = (s) => V.ports.some((p) => s.ports_of_call.includes(p));
  const byPort = (s) => portId === "any" || s.departure_port === portId;

  let list = sailings.filter((s) => byLen(s) && byVibe(s) && byPort(s));
  let note = null;
  if (!list.length && portId !== "any") {
    list = sailings.filter((s) => byLen(s) && byVibe(s));
    if (list.length)
      note = `No ${L.sub} ${V.label.toLowerCase()} sailing from ${
        portId.split(",")[0]
      } right now, but these are a great fit:`;
  }
  if (!list.length) {
    list = sailings.filter((s) => byLen(s) && byPort(s));
    if (list.length) note = "Closest matches for your length:";
  }
  if (!list.length) {
    list = sailings.filter(byVibe);
    if (list.length) note = "A few you might love:";
  }
  if (!list.length) list = [...sailings];

  list = [...list].sort((a, b) => soonest(a).localeCompare(soonest(b)));
  return { list: list.slice(0, 3), total: list.length, note };
}

export default function EscapeFinder() {
  const [step, setStep] = useState(0);
  const [len, setLen] = useState(null);
  const [vibe, setVibe] = useState(null);
  const [port, setPort] = useState(null);

  const reset = () => {
    setStep(0);
    setLen(null);
    setVibe(null);
    setPort(null);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const pick = (which, id) => {
    if (which === "len") setLen(id);
    if (which === "vibe") setVibe(id);
    if (which === "port") setPort(id);
    setStep((s) => s + 1);
  };

  const questions = [
    {
      q: "How long do you want to be away?",
      which: "len",
      value: len,
      options: LENGTHS,
    },
    {
      q: "What's the vibe?",
      which: "vibe",
      value: vibe,
      options: VIBES,
    },
    {
      q: "Where do you want to sail from?",
      which: "port",
      value: port,
      options: PORTS,
    },
  ];

  const result = step === 3 ? findMatches(len, vibe, port) : null;

  return (
    <div className="finder">
      <div className="finder-progress" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`fp-dot${i <= step ? " on" : ""}`} />
        ))}
      </div>

      {step < 3 ? (
        <div className="finder-step" key={step}>
          <p className="finder-q">
            <span className="finder-n">{step + 1} of 3</span>
            {questions[step].q}
          </p>
          <div className="finder-opts">
            {questions[step].options.map((o) => (
              <button
                type="button"
                key={o.id}
                className={`finder-opt${
                  questions[step].value === o.id ? " sel" : ""
                }`}
                onClick={() => pick(questions[step].which, o.id)}
              >
                <span className="fo-label">{o.label}</span>
                <span className="fo-sub">{o.sub}</span>
              </button>
            ))}
          </div>
          {step > 0 && (
            <button type="button" className="finder-back" onClick={back}>
              &larr; Back
            </button>
          )}
        </div>
      ) : (
        <div className="finder-results">
          <p className="finder-result-head">
            {result.total > 0
              ? `We found ${result.total} sailing${
                  result.total === 1 ? "" : "s"
                } for you`
              : "Let's find your fit"}
          </p>
          {result.note && <p className="finder-note">{result.note}</p>}

          <div className="deal-grid finder-grid">
            {result.list.map((s) => (
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
                  <div className="sailing-dates">
                    <p className="sailing-dates-head">
                      {s.departures.length} departure
                      {s.departures.length === 1 ? "" : "s"}
                      {s.departures[0] ? ` from ${fmt(s.departures[0])}` : ""}
                    </p>
                  </div>
                  <div className="deal-footer">
                    <Link
                      href={quoteHref({
                        ship: s.ship,
                        cruise: `${s.nights}-Night ${s.route}`,
                        when: s.departures[0] ? fmt(s.departures[0]) : undefined,
                      })}
                      className="btn btn-outline"
                    >
                      Get a Quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="finder-actions">
            <button type="button" className="btn btn-primary" onClick={reset}>
              Start over
            </button>
            <Link href="/sailings/" className="btn btn-outline">
              Browse all sailings
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
