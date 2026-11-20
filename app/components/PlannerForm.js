"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { matchQueryDate, plannerRecords, todayISO, longDate, shortDate, monthYear } from "../lib/guide.js";
import { quoteHref } from "../lib/quote";
import { track } from "../lib/track";
import ShareGuide from "./ShareGuide";

const HOMEPORTS = ["All", "Palm Beach", "Tampa", "Miami", "Galveston"];
const PAGE = 8;
// A typed date such as 2/27/27 must match a whole date, not the tail of 12/27/27.
const DATEISH = /\d[-/]|[-/]\d/;
// Words people add to a search that no cruise has ("Guide 2/27/27 Beachcomber"), left out so they cannot hide a match.
// "Dec 14" or "December 14th 2026" typed as a sailing date: matched as a whole day, so it
// cannot hit a cruise that merely sails some day in December and some other day on the 14th.
const MONTH_DAY = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?,?\s+(\d{1,2})(?:st|nd|rd|th)?\b(?:,?\s+(\d{4})\b)?/g;
const SHIP_ORDER = ["Islander", "Beachcomber", "Paradise"];
const FILLER = ["guide", "cruise", "sailing", "the", "a", "on", "for", "my", "me", "free", "please", "date"];

// Pick a cruise, pick a date, drop in an email: the guide is built from the
// same data as the sailings pages and emailed through /api/plan.
export default function PlannerForm() {
  const [records, setRecords] = useState(null);
  const [q, setQ] = useState("");
  const [hp, setHp] = useState("All");
  const [limit, setLimit] = useState(PAGE);
  // "date": ship, then month, then the sailings that leave that month. "cruise": search and browse.
  const [mode, setMode] = useState("date");
  const [dShip, setDShip] = useState("");
  const [dMonth, setDMonth] = useState("");
  const [sel, setSel] = useState(null);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alerts, setAlerts] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [err, setErr] = useState("");
  const [result, setResult] = useState(null);

  // Dates are filtered against today in the browser, so the list is never stale.
  useEffect(() => {
    const recs = plannerRecords(todayISO());
    setRecords(recs);
    // A link like /plan/?s=<id>&d=<date> preselects a sailing.
    try {
      const params = new URLSearchParams(window.location.search);
      // /plan/?q=Cozumel starts the search for someone coming from a port page.
      const qp = (params.get("q") || "").trim().slice(0, 60);
      if (qp) {
        setQ(qp);
        setMode("cruise");
      }
      const rec = recs.find((r) => r.id === params.get("s"));
      if (rec) {
        setMode("cruise");
        setSel(rec.id);
        const d = params.get("d");
        // Only a date that really belongs to this cruise is kept. Otherwise guests choose,
        // even when the cruise has just one date.
        setDate(rec.dates.indexOf(d) !== -1 ? d : "");
      }
    } catch {
      /* nothing preselected */
    }
  }, []);

  const matches = useMemo(() => {
    if (!records) return [];
    const days = [];
    const rest = q.toLowerCase().replace(MONTH_DAY, (m, mon, day, year) => {
      days.push(mon + " " + Number(day) + (year ? " " + year : ""));
      return " ";
    });
    const toks = rest.split(/\s+/).filter((t) => t && FILLER.indexOf(t) === -1);
    return records.filter((r) => {
      if (hp !== "All" && r.from !== hp) return false;
      const hay = " " + r.haystack + " ";
      if (!days.every((d) => hay.indexOf(" " + d + " ") !== -1)) return false;
      return toks.every((t) => (DATEISH.test(t) ? hay.indexOf(" " + t + " ") : r.haystack.indexOf(t)) !== -1);
    });
  }, [records, q, hp]);

  // Date finder: the ships that have sailings, the months a ship sails, and every sailing in the chosen month.
  const dShips = useMemo(() => (records ? SHIP_ORDER.filter((n) => records.some((r) => r.ship === n)) : []), [records]);
  const dMonths = useMemo(() => {
    if (!records || !dShip) return [];
    const set = {};
    records.forEach((r) => r.ship === dShip && r.dates.forEach((d) => (set[d.slice(0, 7)] = true)));
    return Object.keys(set).sort();
  }, [records, dShip]);
  const dRows = useMemo(() => {
    if (!records || !dShip || !dMonth) return [];
    const rows = [];
    records.forEach((r) => {
      if (r.ship !== dShip) return;
      r.dates.forEach((d) => d.slice(0, 7) === dMonth && rows.push({ r, d }));
    });
    return rows.sort((a, b) => a.d.localeCompare(b.d) || a.r.nights - b.r.nights || a.r.name.localeCompare(b.r.name));
  }, [records, dShip, dMonth]);

  // What people search for, and when nothing matches, is the clearest list of cruises to add or explain.
  useEffect(() => {
    const term = q.trim().toLowerCase();
    if (!records || term.length < 2) return undefined;
    const t = setTimeout(() => track("planner_search", { term: term.slice(0, 40), results: matches.length }), 1500);
    return () => clearTimeout(t);
  }, [q, matches.length, records]);

  const rec = records && sel ? records.find((r) => r.id === sel) : null;
  const guideHref = rec ? "/guide/?s=" + encodeURIComponent(rec.id) + (date ? "&d=" + date : "") : "#";

  function pick(r) {
    track("planner_pick", { sailing: r.id });
    setSel(r.id);
    // No silent default, not even for a cruise with one date: a date nobody chose ends up on
    // their lead as their sailing (a guest sailing in April was filed on the one February
    // cruise with a similar name). The one exception is a date they typed into the search,
    // which they did choose.
    // "December 14th" is read as "dec 14", the spelling matchQueryDate knows.
    const typed = q.toLowerCase().replace(MONTH_DAY, (m, mon, day, year) => " " + mon + " " + Number(day) + (year ? " " + year : "") + " ");
    setDate(matchQueryDate(typed, r.dates));
    setStatus("idle");
    setErr("");
    setResult(null);
    setTimeout(() => {
      const el = document.getElementById("pl-step-2");
      if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  // A sailing chosen by its date: the cruise and the date are both known, so step 2 arrives filled in.
  function pickDate(r, d) {
    track("planner_pick", { sailing: r.id, via: "date" });
    track("planner_date", { sailing: r.id, date: d });
    setSel(r.id);
    setDate(d);
    setStatus("idle");
    setErr("");
    setResult(null);
    setTimeout(() => {
      const el = document.getElementById("pl-step-2");
      if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending" || !rec) return;
    if (!date) {
      track("planner_error", { message: "no date" });
      setErr("Please choose your sailing date.");
      setStatus("error");
      const el = document.getElementById("pl-date");
      if (el) el.focus();
      return;
    }
    if (name.trim().split(/\s+/).length < 2) {
      track("planner_error", { message: "name" });
      setErr("Please add your first and last name.");
      setStatus("error");
      return;
    }
    const form = e.currentTarget;
    const hp2 = form.elements.company_website ? form.elements.company_website.value : "";
    setStatus("sending");
    setErr("");
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          sailing: rec.id,
          date,
          alerts,
          company_website: hp2,
        }),
      });
      const data = await res.json().catch(() => ({}));
      setResult(data);
      if (res.ok && data.ok) {
        track("generate_lead", {
          method: "guide_builder",
          form_location: "/plan/",
          sailing: rec.id,
        });
        setStatus("done");
      } else {
        track("planner_error", { message: String(data.error || "server").slice(0, 60) });
        setErr(data.error || "Something went wrong. Please call or text (561) 777-9911.");
        setStatus("error");
      }
    } catch {
      track("planner_error", { message: "network" });
      setErr("Network error. Please call or text (561) 777-9911.");
      setStatus("error");
    }
  }

  const first = name.trim().split(/\s+/)[0] || "";

  return (
    <div className="pl-card">
      {/* Step 1 */}
      <div className="pl-step">
        <h2 className="pl-step-h">
          <span>1</span> Find your cruise
        </h2>
        <div className="pl-chips pl-modes" role="group" aria-label="How to find your cruise">
          <button
            type="button"
            className={"pl-chip" + (mode === "date" ? " is-on" : "")}
            aria-pressed={mode === "date"}
            onClick={() => setMode("date")}
          >
            I know my ship and date
          </button>
          <button
            type="button"
            className={"pl-chip" + (mode === "cruise" ? " is-on" : "")}
            aria-pressed={mode === "cruise"}
            onClick={() => setMode("cruise")}
          >
            Browse cruises
          </button>
        </div>

        {mode === "date" ? (
          !records ? (
            <p className="pl-empty">Loading cruises...</p>
          ) : (
            <div className="pl-datefind">
              <p className="pl-lab">Which ship are you sailing?</p>
              <div className="pl-chips" role="group" aria-label="Ship">
                {dShips.map((n) => (
                  <button
                    type="button"
                    key={n}
                    className={"pl-chip" + (dShip === n ? " is-on" : "")}
                    aria-pressed={dShip === n}
                    onClick={() => {
                      setDShip(n);
                      setDMonth("");
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {dShip && (
                <>
                  <p className="pl-lab">Which month do you sail?</p>
                  <div className="pl-chips" role="group" aria-label="Month">
                    {dMonths.map((m) => (
                      <button
                        type="button"
                        key={m}
                        className={"pl-chip" + (dMonth === m ? " is-on" : "")}
                        aria-pressed={dMonth === m}
                        onClick={() => setDMonth(m)}
                      >
                        {monthYear(m + "-01")}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {dShip && dMonth && (
                <>
                  <p className="pl-lab">Tap your sailing date</p>
                  <ul className="pl-list">
                    {dRows.map(({ r, d }) => (
                      <li key={r.id + d}>
                        <button
                          type="button"
                          className={"pl-item" + (sel === r.id && date === d ? " is-on" : "")}
                          aria-pressed={sel === r.id && date === d}
                          onClick={() => pickDate(r, d)}
                        >
                          <span className="pl-item-title">{longDate(d, { dow: true, year: true })}</span>
                          <span className="pl-item-meta">
                            {r.nights}-Night {r.name}
                            {r.oneWay ? " (one way)" : ""} &middot; from {r.from}
                          </span>
                          <span className="pl-item-ports">{r.ports.join(" · ")}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className="pl-date-hint">
                    Do not see your sailing? <button type="button" className="pl-link" onClick={() => setMode("cruise")}>Browse every cruise</button>{" "}
                    or call or text <a href="tel:+15617779911">(561) 777-9911</a>.
                  </p>
                </>
              )}
            </div>
          )
        ) : (
          <>
        <label className="sr-only" htmlFor="pl-search">
          Search cruises
        </label>
        <input
          id="pl-search"
          className="pl-search"
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setLimit(PAGE);
          }}
          placeholder="Try your ship and date, like Islander Dec 14, or Cozumel..."
          autoComplete="off"
        />
        <div className="pl-chips" role="group" aria-label="Homeport">
          {HOMEPORTS.map((h) => (
            <button
              type="button"
              key={h}
              className={"pl-chip" + (hp === h ? " is-on" : "")}
              aria-pressed={hp === h}
              onClick={() => {
                setHp(h);
                setLimit(PAGE);
              }}
            >
              {h === "All" ? "All homeports" : h}
            </button>
          ))}
        </div>

        {!records ? (
          <p className="pl-empty">Loading cruises...</p>
        ) : matches.length === 0 ? (
          <p className="pl-empty">No cruises match. Try fewer words or another homeport.</p>
        ) : (
          <>
            <p className="pl-count">
              {matches.length} cruise{matches.length === 1 ? "" : "s"}
              {q || hp !== "All" ? " match" : ""}, soonest first
            </p>
            <ul className="pl-list">
              {matches.slice(0, limit).map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    className={"pl-item" + (sel === r.id ? " is-on" : "")}
                    aria-pressed={sel === r.id}
                    onClick={() => pick(r)}
                  >
                    <span className="pl-item-title">
                      {r.nights}-Night {r.name}
                      {r.oneWay ? " (one way)" : ""}
                    </span>
                    <span className="pl-item-meta">
                      {r.ship} &middot; from {r.from} &middot; {r.dates.length} date
                      {r.dates.length === 1 ? "" : "s"} from {shortDate(r.dates[0], { year: true })}
                    </span>
                    <span className="pl-item-ports">{r.ports.join(" · ")}</span>
                  </button>
                </li>
              ))}
            </ul>
            {matches.length > limit && (
              <button type="button" className="pl-more" onClick={() => setLimit(limit + PAGE)}>
                Show more cruises
              </button>
            )}
          </>
        )}
          </>
        )}
      </div>

      {/* Step 2 and 3 */}
      {rec && (
        <div className="pl-step" id="pl-step-2">
          <h2 className="pl-step-h">
            <span>2</span> Pick your sailing date
          </h2>
          <div className="pl-picked">
            <b>
              {rec.nights}-Night {rec.name}
            </b>
            <span>
              Margaritaville at Sea {rec.ship} &middot; {rec.oneWay ? "one way from " : "round-trip from "}
              {rec.from}
            </span>
          </div>
          <label className="sr-only" htmlFor="pl-date">
            Sailing date
          </label>
          <select
            id="pl-date"
            className="pl-select"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (e.target.value) track("planner_date", { sailing: rec.id, date: e.target.value });
            }}
          >
            <option value="">Choose your sailing date</option>
            {rec.dates.map((d) => (
              <option key={d} value={d}>
                {longDate(d, { dow: true, year: true })}
              </option>
            ))}
          </select>
          {rec.dates.length === 1 && (
            <p className="pl-date-hint">
              This cruise sails once, on {longDate(rec.dates[0], { dow: true, year: true })}. Sailing on a
              different date? Pick another cruise above.
            </p>
          )}
        </div>
      )}

      {rec && status !== "done" && (
        <form className="pl-step" onSubmit={onSubmit} noValidate>
          <h2 className="pl-step-h">
            <span>3</span> Where should I send it?
          </h2>
          <div className="qf-grid">
            <label className="qf-field">
              <span>First and last name *</span>
              <input
                name="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="qf-field">
              <span>Email *</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <label className="pl-check">
            <input type="checkbox" checked={alerts} onChange={(e) => setAlerts(e.target.checked)} />
            <span>Email me if my guide for this cruise is updated or its price drops</span>
          </label>
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            className="qf-hp"
            aria-hidden="true"
          />
          {status === "error" && (
            <p className="qf-error" role="alert">
              {err}{" "}
              {result && result.url && (
                <a href={guideHref}>Open my guide anyway</a>
              )}
            </p>
          )}
          <button type="submit" className="btn btn-primary btn-lg pl-submit" disabled={status === "sending"}>
            {status === "sending" ? "Building your guide..." : "Build my guide"}
          </button>
          <p className="form-privacy">
            I email your guide once. See my <Link href="/privacy/">Privacy Policy</Link>.
          </p>
        </form>
      )}

      {rec && status === "done" && (
        <div className="pl-step pl-done">
          <div className="qf-check" aria-hidden="true">
            &#10003;
          </div>
          <h3>Your guide is ready{first ? ", " + first : ""}.</h3>
          <p>
            {result && result.emailed
              ? "I also emailed a copy to " + email + ". Check your spam folder if it does not show up."
              : "Open it now, and bookmark the page to come back to it."}
          </p>
          <p className="pl-done-btns">
            <a className="btn btn-primary btn-lg" href={guideHref}>
              Open my guide
            </a>
            <Link
              className="btn btn-gold btn-lg"
              href={quoteHref({
                ship: rec.ship,
                cruise: rec.nights + "-Night " + rec.name,
                when: longDate(date, { year: true }),
              })}
            >
              Hold my cabin
            </Link>
          </p>
          <p className="pl-done-share">
            Cruising with family or friends?{" "}
            <ShareGuide
              href={guideHref}
              text="Here is the cruise guide for our Margaritaville at Sea trip."
              className="pl-share-btn"
              label="Send them this guide"
            />
          </p>
          <p className="pl-done-next">
            No booking fees, and I'll check availability for you. Or call or text{" "}
            <a href="tel:+15617779911">(561) 777-9911</a>.
          </p>
        </div>
      )}
    </div>
  );
}
