"use client";

import { useState } from "react";
import { track } from "../lib/track";

// Deal alerts signup. Posts to the site's own /api/alerts Worker endpoint, which
// files the person in CTT (the "MVAS Deal Alerts" form) so they land on the
// advisor's Clients list and lead board. CTT needs a first and last name to
// make a client record, so the form asks for both.
export default function DealAlerts() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrMsg("");
    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: first,
          last_name: last,
          email,
          company_website: e.currentTarget.company_website.value,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        track("generate_lead", {
          method: "deal_alerts",
          form_location:
            typeof window !== "undefined" ? window.location.pathname : undefined,
          filed: Boolean(data.filed),
        });
        setStatus("done");
      } else {
        setErrMsg(data.error || "Something went wrong. Please call or text (561) 777-9911.");
        setStatus("error");
      }
    } catch {
      setErrMsg("Network error. Please call or text (561) 777-9911.");
      setStatus("error");
    }
  }

  return (
    <section className="alerts">
      <div className="container alerts-inner">
        <div className="alerts-copy">
          <h2>Get new Margaritaville at Sea deals</h2>
          <p>
            Fresh fares, onboard-credit offers, and group sailings, straight to
            your inbox. No spam, unsubscribe anytime.
          </p>
        </div>
        {status === "done" ? (
          <p className="alerts-done">
            Thanks{first ? `, ${first}` : ""}! You&apos;re on the list. Watch
            your inbox for the next deal.
          </p>
        ) : (
          <form className="alerts-form" onSubmit={onSubmit}>
            <label htmlFor="alert-first" className="sr-only">
              First name
            </label>
            <input
              id="alert-first"
              type="text"
              required
              autoComplete="given-name"
              placeholder="First name"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
            <label htmlFor="alert-last" className="sr-only">
              Last name
            </label>
            <input
              id="alert-last"
              type="text"
              required
              autoComplete="family-name"
              placeholder="Last name"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
            <label htmlFor="alert-email" className="sr-only">
              Email address
            </label>
            <input
              id="alert-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Honeypot: hidden from people, catches bots. */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              className="qf-hp"
              aria-hidden="true"
            />
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Notify me"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="qf-error" role="alert">
            {errMsg}
          </p>
        )}
        {status !== "done" && (
          <p className="form-privacy alerts-privacy">
            I use your name and email only to send you deals. See my{" "}
            <a href="/privacy/">Privacy Policy</a>.
          </p>
        )}
      </div>
    </section>
  );
}
