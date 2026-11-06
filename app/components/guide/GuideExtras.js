"use client";

import { useEffect, useState } from "react";
import { diffDays } from "../../lib/guide.js";

// Two screen-only cards above the guide pages: how long until sailing (with the
// arrival-day details once it is a week away), and a nudge to keep the guide on
// a phone's home screen. Neither prints and neither is part of the six pages.

export function TodayCard({ g, today }) {
  const n = diffDays(g.dep, today);
  const next = g.ready.countdown.find((c) => c.iso && c.iso >= today && c.iso < g.dep);
  const head = n <= 0 ? "Sailing day" : n === 1 ? "Tomorrow you sail" : n + " days to sail";
  return (
    <div className="gd-today gd-noprint">
      <div className="gd-today-card">
        <div>
          <div className="gd-today-count">{head}</div>
          <p className="gd-today-sub">{g.fullTitle}, {g.depLong}</p>
        </div>
        {next && n > 1 && (
          <p>
            <b>Next up:</b> {next.h}, {next.iso === today ? "today" : "by " + next.date}. {next.t}
          </p>
        )}
        {n <= 7 && (
          <div className="gd-today-arrival">
            <b>Arrival day</b>
            <ul>
              <li>
                Board at {g.hp.terminalLine}. {g.hp.hoursLine ? g.hp.hoursLine + " " : ""}Arrive in your assigned window.
              </li>
              <li>{g.ready.parking}</li>
              {g.ready.bring.slice(0, 3).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Phones only, and only until it is dismissed or the guide is already installed.
export function HomeScreenTip() {
  const [kind, setKind] = useState(null);
  useEffect(() => {
    try {
      if (window.localStorage.getItem("gd-a2hs") === "1") return;
    } catch {
      /* show the tip */
    }
    const standalone =
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      window.navigator.standalone;
    if (standalone) return;
    const ua = window.navigator.userAgent;
    const ios =
      /iPhone|iPad|iPod/.test(ua) ||
      (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
    const android = /Android/.test(ua);
    if (!ios && !android) return;
    if (/FBAN|FBAV|Instagram|Messenger/.test(ua)) setKind("app");
    else setKind(ios ? "ios" : "android");
  }, []);
  if (!kind) return null;
  const text = {
    ios: "Keep this guide on your phone. In Safari, tap the Share button, then Add to Home Screen. It will open straight to this cruise.",
    android:
      "Keep this guide on your phone. Tap the browser menu (the three dots), then Add to Home screen. It will open straight to this cruise.",
    app: "To keep this guide on your phone, open this page in your phone's browser first (the menu has Open in Safari or Open in Chrome), then choose Add to Home Screen.",
  }[kind];
  return (
    <div className="gd-a2hs gd-noprint">
      <div className="gd-a2hs-card">
        <p>{text}</p>
        <button
          type="button"
          onClick={() => {
            setKind(null);
            try {
              window.localStorage.setItem("gd-a2hs", "1");
            } catch {
              /* it just comes back next visit */
            }
          }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
