"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FARES, FARES_AS_OF } from "../../data/fares.js";
import { diffDays, futureDates, longDate, todayISO } from "../../lib/guide.js";
import { DROP_MIN, FARES_FRESH_DAYS, WATCH_ROOMS, usd } from "../../lib/watch.js";
import { WATCH_ENABLED } from "../../lib/watchConfig.js";
import { track } from "../../lib/track";

// "Email me if this fare drops": pick a date and a room category, leave a name and
// an email. The Worker (src/watch.js) checks the fares after every update and
// writes only when a fare falls by DROP_MIN or more.
export default function PriceWatch({ it, buildToday }) {
  const [today, setToday] = useState(buildToday);
  useEffect(() => setToday(todayISO()), []);
  const [date, setDate] = useState("");
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [err, setErr] = useState("");
  const [result, setResult] = useState(null);

  const fresh = diffDays(today, FARES_AS_OF) <= FARES_FRESH_DAYS;
  const dates = futureDates(it, today).filter((d) => FARES[it.id + "|" + d]);
  if (!WATCH_ENABLED || !fresh || !dates.length) return null;

  const chosen = dates.indexOf(date) !== -1 ? date : dates.length === 1 ? dates[0] : "";
  const fares = chosen ? FARES[it.id + "|" + chosen] : null;
  const rooms = fares ? WATCH_ROOMS.filter((r) => fares[r]) : [];
  const picked = rooms.indexOf(room) !== -1 ? room : "";

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    if (!chosen || !picked) {
      setErr("Please choose a sailing date and a stateroom category.");
      setStatus("error");
      return;
    }
    if (name.trim().split(/\s+/).length < 2) {
      setErr("Please add your first and last name.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErr("");
    try {
      const res = await fetch("/api/watch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          sailing: it.id,
          date: chosen,
          room: picked,
          company_website: e.currentTarget.company_website.value,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setResult(data);
        track("generate_lead", { method: "price_watch", form_location: window.location.pathname, sailing: it.id });
        track("price_watch", { sailing: it.id, date: chosen, room: picked });
        setStatus("done");
      } else {
        track("watch_error", { message: String(data.error || "server").slice(0, 60) });
        setErr(data.error || "Something went wrong. Please call or text (561) 777-9911.");
        setStatus("error");
      }
    } catch {
      setErr("Network error. Please call or text (561) 777-9911.");
      setStatus("error");
    }
  }

  return (
    <section className="section section--muted" id="watch">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">Price alert</p>
          <h2>Watch this price</h2>
          <p className="sp-watch-lede">
            Not ready to book? Pick a date and a stateroom category and I will email you if the fare drops by {usd(DROP_MIN)} or more. Free, and one click stops it.
          </p>
        </div>
        {status === "done" ? (
          <div className="sp-watch sp-watch--done" role="status">
            <h3>You are watching this price.</h3>
            <p>
              The {picked.toLowerCase()} fare for {longDate(chosen, { year: true })} is {usd(result.price)} per person today. I just emailed a note to {email}. Check your spam
              folder if it does not show up.
            </p>
          </div>
        ) : (
          <form className="sp-watch" onSubmit={onSubmit} noValidate>
            <div className="qf-grid">
              {dates.length > 1 && (
                <label className="qf-field">
                  <span>Sailing date *</span>
                  <select value={chosen} onChange={(e) => setDate(e.target.value)}>
                    <option value="">Choose a date</option>
                    {dates.map((d) => (
                      <option key={d} value={d}>
                        {longDate(d, { dow: true, year: true })}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <label className="qf-field">
                <span>Stateroom *</span>
                <select value={picked} onChange={(e) => setRoom(e.target.value)} disabled={!rooms.length}>
                  <option value="">{chosen ? "Choose a category" : "Pick a date first"}</option>
                  {rooms.map((r) => (
                    <option key={r} value={r}>
                      {r}, {usd(fares[r][0])} now
                    </option>
                  ))}
                </select>
              </label>
              <label className="qf-field">
                <span>First and last name *</span>
                <input type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label className="qf-field">
                <span>Email *</span>
                <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="qf-hp" aria-hidden="true" />
            {status === "error" && (
              <p className="qf-error" role="alert">
                {err}
              </p>
            )}
            <button type="submit" className="btn btn-primary btn-lg" disabled={status === "sending"}>
              {status === "sending" ? "Setting it up..." : "Watch this price"}
            </button>
            <p className="form-privacy">
              Fares are per person, taxes and fees included, from my tracking as of {longDate(FARES_AS_OF, { year: true })}. I only email when the fare drops. See my{" "}
              <Link href="/privacy/">Privacy Policy</Link>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
