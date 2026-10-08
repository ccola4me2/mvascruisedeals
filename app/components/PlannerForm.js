"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { plannerRecords, todayISO, longDate, shortDate } from "../lib/guide.js";
import { quoteHref } from "../lib/quote";
import { track } from "../lib/track";

const HOMEPORTS = ["All", "Palm Beach", "Tampa", "Miami", "Galveston"];
const PAGE = 8;

// Pick a cruise, pick a date, drop in an email: the guide is built from the
// same data as the sailings pages and emailed through /api/plan.
export default function PlannerForm() {
  const [records, setRecords] = useState(null);
  const [q, setQ] = useState("");
  const [hp, setHp] = useState("All");
  const [limit, setLimit] = useState(PAGE);
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
      const rec = recs.find((r) => r.id === params.get("s"));
      if (rec) {
        setSel(rec.id);
        const d = params.get("d");
        setDate(rec.dates.indexOf(d) !== -1 ? d : rec.dates[0]);
      }
    } catch {
      /* nothing preselected */
    }
  }, []);

  const matches = useMemo(() => {
    if (!records) return [];
    const toks = q.toLowerCase().split(/\s+/).filter(Boolean);
    return records.filter(
      (r) => (hp === "All" || r.from === hp) && toks.every((t) => r.haystack.indexOf(t) !== -1)
    );
  }, [records, q, hp]);

  const rec = records && sel ? records.find((r) => r.id === sel) : null;
  const guideHref = rec ? "/guide/?s=" + encodeURIComponent(rec.id) + "&d=" + date : "#";

  function pick(r) {
    setSel(r.id);
    setDate(r.dates[0]);
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
        setErr(data.error || "Something went wrong. Please call or text (561) 777-9911.");
        setStatus("error");
      }
    } catch {
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
          placeholder="Try Cozumel, Key West, 7 night, October 2027..."
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
          <select id="pl-date" className="pl-select" value={date} onChange={(e) => setDate(e.target.value)}>
            {rec.dates.map((d) => (
              <option key={d} value={d}>
                {longDate(d, { dow: true, year: true })}
              </option>
            ))}
          </select>
        </div>
      )}

      {rec && status !== "done" && (
        <form className="pl-step" onSubmit={onSubmit} noValidate>
          <h2 className="pl-step-h">
            <span>3</span> Where should I send it?
          </h2>
          <div className="qf-grid">
            <label className="qf-field">
              <span>Your name *</span>
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
            <span>Also email me deals on this sailing if the price drops</span>
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
          <p>
            <a className="btn btn-primary btn-lg" href={guideHref}>
              Open my guide
            </a>
          </p>
          <p className="pl-done-next">
            Want to hold a cabin?{" "}
            <Link
              href={quoteHref({
                ship: rec.ship,
                cruise: rec.nights + "-Night " + rec.name,
                when: longDate(date, { year: true }),
              })}
            >
              Get a free quote
            </Link>{" "}
            or call or text <a href="tel:+15617779911">(561) 777-9911</a>.
          </p>
        </div>
      )}
    </div>
  );
}
