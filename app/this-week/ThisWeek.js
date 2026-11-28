"use client";

import { useEffect, useState } from "react";
import { quoteHref } from "../lib/quote";
import { WATCH_ENABLED } from "../lib/watchConfig.js";

// The "Sailing this week" list. The rows are built at deploy time from the daily
// price check (data/trends.json). The browser then drops any sailing that has
// already left and keeps a window of the next WINDOW_DAYS, so the page stays
// right between deploys. A sailing counts from tomorrow on: nobody can book a
// ship that leaves today.

const WINDOW_DAYS = 14;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOWS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const parts = (iso) => iso.split("-").map(Number);
const dayNum = (iso) => {
  const [y, m, d] = parts(iso);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
};
const shortDate = (iso) => {
  const [, m, d] = parts(iso);
  return MONTHS[m - 1] + " " + d;
};
const longDate = (iso) => {
  const [y, m, d] = parts(iso);
  return MONTHS[m - 1] + " " + d + ", " + y;
};
const withDow = (iso) => {
  const [y, m, d] = parts(iso);
  return DOWS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()] + ", " + shortDate(iso);
};
const money = (n) =>
  "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const localToday = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
};

export default function ThisWeek({ rows, snapshot }) {
  // Start from the day of the price check so the server and the browser agree on
  // the first paint, then move to the visitor's own date.
  const [today, setToday] = useState(snapshot);
  useEffect(() => {
    const t = localToday();
    if (t > snapshot) setToday(t);
  }, [snapshot]);

  const t0 = dayNum(today);
  const list = rows
    .filter((r) => dayNum(r.sail) > t0 && dayNum(r.sail) <= t0 + WINDOW_DAYS)
    .map((r) => ({ ...r, perNight: r.price / r.nights, days: dayNum(r.sail) - t0 }))
    .sort((a, b) => a.perNight - b.perNight || a.sail.localeCompare(b.sail));

  const stale = t0 - dayNum(snapshot) >= 3;
  const cheapest = list[0];
  const first = list.reduce((m, r) => (r.days < m ? r.days : m), 999);

  return (
    <>
      <div className="tw-stats">
        <div className="tw-stat">
          <b>{list.length}</b>
          <span>{list.length === 1 ? "sailing" : "sailings"} in the next {WINDOW_DAYS} days</span>
        </div>
        <div className="tw-stat">
          <b>{cheapest ? money(cheapest.perNight) : "None"}</b>
          <span>{cheapest ? "lowest price per night" : "no sailings in this window"}</span>
        </div>
        <div className="tw-stat">
          <b>{list.length ? (first === 1 ? "Tomorrow" : first + " days") : "Not yet"}</b>
          <span>{list.length ? "until the first one leaves" : "check back after the next update"}</span>
        </div>
      </div>

      {stale && (
        <p className="tw-fine">
          These fares were last checked on {longDate(snapshot)}. Call or text (561) 777-9911 for today&apos;s price.
        </p>
      )}

      {list.length === 0 ? (
        <div className="tw-empty">
          <p>
            Nothing on this list right now. See <a href="/sailings/">every sailing</a> or the full{" "}
            <a href="/trends/">price trends</a>.
          </p>
        </div>
      ) : (
        <ul className="tw-list">
          {list.map((s) => (
            <li key={s.ship + s.itin + s.sail}>
              <p className="tr-soon-date">{withDow(s.sail)}</p>
              {s.days <= 3 && (
                <span className="tw-soon-tag">{s.days === 1 ? "Leaves tomorrow" : "Leaves in " + s.days + " days"}</span>
              )}
              <p className="tr-soon-title">{s.itin}</p>
              <p className="tr-soon-meta">
                <span className={"tr-ship tr-ship--" + s.ship.toLowerCase()}>{s.ship}</span> {s.nights}{" "}
                {s.nights === 1 ? "night" : "nights"}
                {s.from ? " from " + s.from : ""}
              </p>
              {s.ports.length > 0 && <p className="tw-ports">{s.ports.join(", ")}</p>}
              <p className="tr-soon-price">
                from <b>{money(s.price)}</b> <span>{s.room}</span>
              </p>
              <p className="tw-pn">{money(s.perNight)} a night</p>
              <span className="tr-links">
                <a
                  className="tr-ask"
                  href={quoteHref({
                    ship: s.ship,
                    cruise: s.nights + "-Night " + s.itin.replace(/^\d+-Night\s*/, "") + " (" + s.room + ")",
                    when: longDate(s.sail),
                  })}
                >
                  Ask Brent
                </a>
                <a className="tr-guide" href={s.id ? "/plan/?s=" + encodeURIComponent(s.id) + "&d=" + s.sail : "/plan/"}>
                  Free guide
                </a>
                {WATCH_ENABLED && s.id && (
                  <a className="tr-guide" href={"/sailings/" + s.id + "/#watch"}>
                    Watch price
                  </a>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
