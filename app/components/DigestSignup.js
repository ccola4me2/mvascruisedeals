"use client";

import { useState } from "react";
import { track } from "../lib/track";

// The price-drop email signup on /trends/: an email, weekly or daily (weekly is the default),
// and a button. Posts to /api/digest, which saves the subscriber in D1 and sends a welcome
// email with the latest numbers. `where` keeps the field ids unique when it appears twice.
export default function DigestSignup({ where = "top" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrMsg("");
    try {
      const res = await fetch("/api/digest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          frequency,
          company_website: e.currentTarget.company_website.value,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        track("digest_signup", { frequency, form_location: where });
        track("generate_lead", { method: "trends_digest", form_location: where, filed: Boolean(data.filed) });
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

  const id = "dg-" + where;
  return (
    <section className="dg" aria-labelledby={id + "-h"}>
      <div className="container dg-inner">
        <div className="dg-copy">
          <p className="dg-label">Free price-drop email</p>
          <h2 id={id + "-h"}>Get the price drops in your inbox</h2>
          <p>
            Margaritaville at Sea fares change every day. I will email you the biggest drops, weekly or daily, whichever
            you pick.
          </p>
        </div>
        {status === "done" ? (
          <p className="dg-done" role="status">
            You&apos;re on the list. Check your inbox for the latest drops. If it is not there in a minute, look in your
            promotions or spam folder.
          </p>
        ) : (
          <form className="dg-form" onSubmit={onSubmit}>
            <label htmlFor={id + "-name"} className="sr-only">
              First and last name
            </label>
            <input
              id={id + "-name"}
              className="dg-field"
              type="text"
              required
              autoComplete="name"
              placeholder="First and last name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor={id + "-email"} className="sr-only">
              Email address
            </label>
            <input
              id={id + "-email"}
              className="dg-field"
              type="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-gold" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Email me the drops"}
            </button>
            <fieldset className="dg-freq">
              <legend className="sr-only">How often</legend>
              <label>
                <input
                  type="radio"
                  name={id + "-freq"}
                  value="weekly"
                  checked={frequency === "weekly"}
                  onChange={() => setFrequency("weekly")}
                />
                Weekly, on Mondays
              </label>
              <label>
                <input
                  type="radio"
                  name={id + "-freq"}
                  value="daily"
                  checked={frequency === "daily"}
                  onChange={() => setFrequency("daily")}
                />
                Daily
              </label>
            </fieldset>
            {/* Honeypot: hidden from people, catches bots. */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              className="qf-hp"
              aria-hidden="true"
            />
          </form>
        )}
        {status === "error" && (
          <p className="qf-error dg-error" role="alert">
            {errMsg}
          </p>
        )}
        {status !== "done" && (
          <p className="form-privacy dg-privacy">
            I use your name and email only to send you these price drops. One click unsubscribes. See my{" "}
            <a href="/privacy/">Privacy Policy</a>.
          </p>
        )}
      </div>
    </section>
  );
}
