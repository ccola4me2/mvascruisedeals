"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// The page behind "Stop watching this price" in every price-alert email. The
// button posts, rather than the link itself stopping the alert, so a mail
// scanner that opens links cannot cancel someone's watch by accident.
export default function StopWatch() {
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [all, setAll] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get("t") || "");
  }, []);

  async function stop(everything) {
    setStatus("sending");
    setErr("");
    try {
      const res = await fetch("/api/watch/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, all: everything }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setAll(everything);
        setStatus("done");
      } else {
        setErr(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErr("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (token === null) return <p>One moment...</p>;
  if (!token) {
    return (
      <>
        <h1>Stop watching a price</h1>
        <p>That link is missing its code. Use the link at the bottom of one of my price-alert emails, or reply to the email and I will stop it by hand.</p>
      </>
    );
  }
  if (status === "done") {
    return (
      <>
        <h1>Done</h1>
        <p>{all ? "I stopped every price watch for your email address." : "I stopped watching that price."} You will not get another alert for it.</p>
        <p>
          <Link href="/sailings/">Browse the sailings</Link>
        </p>
      </>
    );
  }
  return (
    <>
      <h1>Stop watching this price?</h1>
      <p>I will stop emailing you when this fare drops.</p>
      {status === "error" && (
        <p className="qf-error" role="alert">
          {err}
        </p>
      )}
      <p className="sp-stop-btns">
        <button type="button" className="btn btn-primary btn-lg" disabled={status === "sending"} onClick={() => stop(false)}>
          Stop this alert
        </button>
        <button type="button" className="btn btn-outline btn-lg" disabled={status === "sending"} onClick={() => stop(true)}>
          Stop all my price alerts
        </button>
      </p>
    </>
  );
}
