"use client";

import { useEffect, useState } from "react";
import { diffDays } from "../../lib/guide.js";
import { portExcursionUrl, EXCURSION_DISCLOSURE } from "../../lib/excursions";

// Two screen-only cards above the guide pages: how long until sailing (with the
// arrival-day details once it is a week away), and a nudge to keep the guide on
// a phone's home screen. Neither prints and neither is part of the six pages.

// Where a guest on board finds what is happening today. The cruise line posts
// each ship's daily schedule on its own Gateway page (the PDF behind it changes
// name every day, so we link the page). The Chill Compass is an independent
// Margaritaville at Sea blog that lists the same schedule day by day.
const ONBOARD = {
  Paradise: {
    gateway: "https://www.margaritavilleatsea.com/paradise-gateway",
    deck: "https://www.margaritavilleatsea.com/explore-our-ships/paradise/deck-plan",
    chill: "https://thechillcompass.com/onboard/paradise",
  },
  Islander: {
    gateway: "https://www.margaritavilleatsea.com/islander-gateway",
    deck: "https://www.margaritavilleatsea.com/explore-our-ships/islander/deck-plan",
    chill: "https://thechillcompass.com/onboard/islander",
  },
  Beachcomber: {
    gateway: "https://www.margaritavilleatsea.com/beachcomber-gateway",
    deck: "https://www.margaritavilleatsea.com/explore-our-ships/beachcomber/deck-plan",
    chill: "https://thechillcompass.com/onboard/beachcomber",
  },
};

// Shown from sailing day until the ship is back. It counts the day of the cruise
// from the dates, which is certain. It does not say which port the ship is in
// today, because the day-by-day itinerary is not published as data.
function OnBoardCard({ g, today }) {
  const day = diffDays(today, g.dep) + 1;
  const total = g.nights + 1;
  const links = ONBOARD[g.ship];
  const last = day >= total;
  return (
    <div className="gd-today gd-noprint">
      <div className="gd-today-card">
        <div>
          <div className="gd-today-count">
            {last ? "Last day of your cruise" : "Day " + day + " of " + total}
          </div>
          <p className="gd-today-sub">{g.fullTitle}, on board Margaritaville at Sea {g.ship}</p>
        </div>
        <p>
          {last
            ? "You are back in " + g.arriveHp.city + " today. Check the schedule for your disembarkation time."
            : "Open today's schedule to see what is on, from kids club to live music."}
        </p>
        {links && (
          <ul className="gd-today-links">
            <li>
              <a href={links.gateway} target="_blank" rel="noopener">
                Today&apos;s schedule, from the cruise line<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={links.chill} target="_blank" rel="noopener">
                Today on Board, from The Chill Compass blog<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={links.deck} target="_blank" rel="noopener">
                Deck plan<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        )}
        {!last && (
          <div className="gd-today-arrival">
            <b>Your ports, in order</b>
            <ul>
              {g.ports.map((p) => (
                <li key={p.n}>
                  {p.name}{" "}
                  <a href={portExcursionUrl(p.key)} target="_blank" rel="noopener">
                    Book excursions<span className="sr-only"> in {p.name}, opens in a new tab</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="gd-today-fine">{EXCURSION_DISCLOSURE}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function TodayCard({ g, today }) {
  const n = diffDays(g.dep, today);
  if (n < 0) return <OnBoardCard g={g} today={today} />;
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
