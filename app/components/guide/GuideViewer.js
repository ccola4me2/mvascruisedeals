"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import "./guide.css";
import GuidePages from "./GuidePages";
import {
  buildGuide,
  findItinerary,
  futureDates,
  longDate,
  todayISO,
  tripTitle,
} from "../../lib/guide.js";
import { itineraries } from "../../data/itineraries.js";
import { quoteHref } from "../../lib/quote";
import { track } from "../../lib/track";

const PAGE_W = 816;
const PAGE_H = 1056;
const GAP = 28;
const TOTAL_H = PAGE_H * 6 + GAP * 5;

export default function GuideViewer() {
  const [query, setQuery] = useState(null);
  const [view, setView] = useState(null); // { it, date, today } | { missing } | { past }
  const [fit, setFit] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [debug, setDebug] = useState(null);
  const wrapRef = useRef(null);

  // Read ?s= (itinerary) and ?d= (sailing date) once, in the browser.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setQuery({ s: q.get("s"), d: q.get("d"), debug: q.get("debug"), pick: q.get("pick") });
  }, []);

  useEffect(() => {
    if (!query || query.debug === "all") return;
    const today = todayISO();
    const it = findItinerary(query.s);
    if (!it) return setView({ missing: true });
    const dates = futureDates(it, today);
    if (!dates.length) return setView({ past: true, it });
    setView({ it, date: dates.indexOf(query.d) !== -1 ? query.d : dates[0], today });
  }, [query]);

  // Hidden self-check (?debug=all): render every itinerary and report any page
  // whose content is taller than a Letter page.
  useEffect(() => {
    if (!query || query.debug !== "all") return undefined;
    let stop = false;
    (async () => {
      const today = todayISO();
      const issues = [];
      let checked = 0;
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      for (const it of itineraries) {
        const ds = futureDates(it, today);
        const picks = query.pick === "both" ? ds.filter((d, i) => i === 0 || i === ds.length - 1) : ds.slice(0, 1);
        for (const date of picks) {
          if (stop) return;
          setView({ it, date, today });
          await new Promise((r) => setTimeout(r, 70));
          document.querySelectorAll(".gd-page").forEach((p, i) => {
            const over = p.scrollHeight - p.clientHeight;
            if (over > 1) issues.push(it.id + " " + date + " page " + (i + 1) + " over by " + over + "px");
          });
          checked += 1;
          setDebug({ checked, issues, done: false });
        }
      }
      setDebug({ checked, issues, done: true });
    })();
    return () => {
      stop = true;
    };
  }, [query]);

  const guide = useMemo(
    () => (view && view.it && view.date ? buildGuide(view.it, view.date, view.today) : null),
    [view]
  );
  const dates = useMemo(
    () => (view && view.it && view.today ? futureDates(view.it, view.today) : []),
    [view]
  );

  // Scale the page stack to the window; printing resets it in CSS.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const measure = () => setFit(Math.min(1, el.clientWidth / PAGE_W));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [guide]);

  const changeDate = useCallback(
    (date) => {
      setView((v) => ({ ...v, date }));
      try {
        const q = new URLSearchParams(window.location.search);
        q.set("d", date);
        window.history.replaceState(null, "", window.location.pathname + "?" + q.toString());
      } catch {
        /* the date still changes on screen */
      }
    },
    []
  );

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy this link:", window.location.href);
    }
  }

  if (!query || !view) {
    return (
      <div className="gd-root">
        <div className="gd-message">
          <h1>Building your guide</h1>
          <p>One moment...</p>
          <noscript>This guide needs JavaScript to display.</noscript>
        </div>
      </div>
    );
  }
  if (view.missing) {
    return (
      <div className="gd-root">
        <div className="gd-message">
          <h1>We couldn&apos;t find that cruise</h1>
          <p>
            That link may be old, since sailings are updated as the schedule changes.
            Pick your cruise again and I&apos;ll build a fresh guide.
          </p>
          <p>
            <Link href="/plan/" className="btn btn-primary">
              Build my guide
            </Link>
          </p>
        </div>
      </div>
    );
  }
  if (view.past) {
    return (
      <div className="gd-root">
        <div className="gd-message">
          <h1>This sailing has departed</h1>
          <p>
            {tripTitle(view.it)} has no upcoming dates. Pick another cruise and I&apos;ll
            build you a new guide.
          </p>
          <p>
            <Link href="/plan/" className="btn btn-primary">
              Build my guide
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const g = guide;
  const small = fit < 0.8;
  // On phones the page stack fits the width by default; "Zoom" switches to a
  // readable size you scroll sideways.
  const scale = zoomed && small ? Math.max(fit, 0.9) : fit;
  return (
    <div className="gd-root">
      <div className="gd-toolbar gd-noprint">
        <div className="gd-toolbar-inner">
          <div className="gd-toolbar-title">
            <b>{g.fullTitle}</b>
            <span>
              Margaritaville at Sea {g.ship} &middot; from {g.hp.city}
            </span>
          </div>
          <label className="sr-only" htmlFor="gd-date">
            Sailing date
          </label>
          <select id="gd-date" value={view.date} onChange={(e) => changeDate(e.target.value)}>
            {dates.map((d) => (
              <option key={d} value={d}>
                {longDate(d, { dow: true, year: true })}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="gd-tb-btn gd-tb-btn--primary"
            onClick={() => {
              track("guide_print", { sailing: view.it.id });
              window.print();
            }}
          >
            Save as PDF
          </button>
          {small && (
            <button type="button" className="gd-tb-btn" onClick={() => setZoomed((z) => !z)}>
              {zoomed ? "Fit to screen" : "Zoom in"}
            </button>
          )}
          <button type="button" className="gd-tb-btn" onClick={copyLink}>
            {copied ? "Link copied" : "Copy link"}
          </button>
          <Link
            className="gd-tb-btn gd-tb-btn--gold"
            href={quoteHref({
              ship: g.ship,
              cruise: g.fullTitle,
              when: longDate(view.date, { year: true }),
            })}
          >
            Book with Brent
          </Link>
        </div>
      </div>

      <div className="gd-viewport">
        <div className="gd-outer" ref={wrapRef}>
          <div
            className="gd-frame"
            style={{ width: PAGE_W * scale, height: TOTAL_H * scale }}
          >
            <div className="gd-sheet" style={{ transform: "scale(" + scale + ")" }}>
              <GuidePages g={g} />
            </div>
          </div>
        </div>
      </div>

      {debug && <pre id="gd-debug">{JSON.stringify(debug)}</pre>}
    </div>
  );
}
