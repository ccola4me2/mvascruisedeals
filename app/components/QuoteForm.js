"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

// Inline quote form. Posts to the site's own /api/quote Worker endpoint, which
// files the lead into the CTT portal and emails a copy. Prefills the cruise,
// ship, and timing from the URL when a deal's "Get a Quote" link carries them.
export default function QuoteForm() {
  const params = useSearchParams();
  const preCruise = params.get("cruise") || "";
  const preShip = params.get("ship") || "";
  const preWhen = params.get("when") || "";

  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [errMsg, setErrMsg] = useState("");
  const [firstName, setFirstName] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setFirstName((payload.name || "").trim().split(" ")[0] || "");
    setStatus("sending");
    setErrMsg("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("done");
        form.reset();
      } else {
        setErrMsg(
          data.error ||
            "Something went wrong. Please call or text (561) 777-9911."
        );
        setStatus("error");
      }
    } catch {
      setErrMsg("Network error. Please call or text (561) 777-9911.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="quote-form quote-form--done">
        <div className="qf-check" aria-hidden="true">
          &#10003;
        </div>
        <h3>Thanks{firstName ? `, ${firstName}` : ""}! Your request is in.</h3>
        <p>
          I&apos;ll reply with the best available fare or group rate, usually
          within one business day. Prefer to talk now? Call or text{" "}
          <a href="tel:+15617779911">(561) 777-9911</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={onSubmit} noValidate>
      <div className="qf-grid">
        <label className="qf-field">
          <span>Name *</span>
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label className="qf-field">
          <span>Email *</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label className="qf-field">
          <span>Mobile *</span>
          <input name="phone" type="tel" required autoComplete="tel" />
        </label>
        <label className="qf-field">
          <span>City &amp; state *</span>
          <input
            name="address"
            type="text"
            required
            autoComplete="address-level2"
            placeholder="e.g. Tampa, FL"
          />
        </label>
        <label className="qf-field">
          <span>Cruise you&apos;re interested in</span>
          <input
            name="cruise"
            type="text"
            defaultValue={preCruise}
            placeholder="Ship, itinerary, or not sure yet"
          />
        </label>
        <label className="qf-field">
          <span>When</span>
          <input
            name="when"
            type="text"
            defaultValue={preWhen}
            placeholder="e.g. Spring 2027"
          />
        </label>
        <label className="qf-field">
          <span>Party size</span>
          <select name="party" defaultValue="2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n}
                {n === 8 ? "+" : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="qf-field qf-field--full">
        <span>Anything else?</span>
        <textarea
          name="notes"
          rows={3}
          placeholder="Cabin type, budget, occasion, questions..."
        />
      </label>

      <input type="hidden" name="ship" defaultValue={preShip} />
      {/* Honeypot: hidden from people, catches bots. */}
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
          {errMsg}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-lg"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send my request"}
      </button>
      <p className="qf-note">
        No fees, no obligation. Prefer to talk? Call or text{" "}
        <a href="tel:+15617779911">(561) 777-9911</a>.
      </p>
    </form>
  );
}
