"use client";

import { useState } from "react";
import { CONTACT } from "../lib/quote";

// TO CONNECT A REAL EMAIL LIST: paste your form-handler URL here (Mailchimp,
// Web3Forms, Formspree, etc.). While empty, the form opens a prefilled email to
// Brent so no signup is lost.
const NEWSLETTER_ENDPOINT = "";

export default function DealAlerts() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!email) return;
    if (NEWSLETTER_ENDPOINT) {
      try {
        await fetch(NEWSLETTER_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source: "mvascruisedeals" }),
        });
        setDone(true);
        return;
      } catch (err) {
        // fall through to mailto
      }
    }
    const body = `Please add me to MVAS deal alerts. My email: ${email}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      "Deal alerts signup"
    )}&body=${encodeURIComponent(body)}`;
    setDone(true);
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
        {done ? (
          <p className="alerts-done">
            Thanks! You&apos;re on the list. Watch your inbox for the next deal.
          </p>
        ) : (
          <form className="alerts-form" onSubmit={onSubmit}>
            <label htmlFor="alert-email" className="sr-only">
              Email address
            </label>
            <input
              id="alert-email"
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Notify me
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
