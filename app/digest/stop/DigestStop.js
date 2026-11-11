"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// The page behind "Unsubscribe" and "switch to weekly/daily" in every price-drop email.
// The buttons post, rather than the link itself changing anything, so a mail scanner that
// opens links cannot unsubscribe someone by accident.
export default function DigestStop() {
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [result, setResult] = useState(""); // stopped | weekly | daily
  const [err, setErr] = useState("");

  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get("t") || "");
  }, []);

  async function send(frequency) {
    setStatus("sending");
    setErr("");
    try {
      const res = await fetch("/api/digest/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(frequency ? { token, frequency } : { token }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setResult(frequency || "stopped");
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
        <h1>Manage the price-drop email</h1>
        <p>That link is missing its code. Use the link at the bottom of one of my price-drop emails, or reply to the email and I will change it by hand.</p>
      </>
    );
  }
  if (status === "done") {
    return (
      <>
        <h1>Done</h1>
        <p>
          {result === "stopped" && "You are unsubscribed. I will not send you another price-drop email."}
          {result === "weekly" && "You are on the weekly email now. It comes on Mondays."}
          {result === "daily" && "You are on the daily email now. It comes after each daily price check, on days fares dropped."}
        </p>
        <p>
          <Link href="/trends/">See today&apos;s price trends</Link>
        </p>
      </>
    );
  }
  return (
    <>
      <h1>Manage the price-drop email</h1>
      <p>Pick how often you want it, or stop it altogether.</p>
      {status === "error" && (
        <p className="qf-error" role="alert">
          {err}
        </p>
      )}
      <p className="sp-stop-btns">
        <button type="button" className="btn btn-primary btn-lg" disabled={status === "sending"} onClick={() => send("weekly")}>
          Weekly, on Mondays
        </button>
        <button type="button" className="btn btn-primary btn-lg" disabled={status === "sending"} onClick={() => send("daily")}>
          Daily
        </button>
        <button type="button" className="btn btn-outline btn-lg" disabled={status === "sending"} onClick={() => send(null)}>
          Unsubscribe
        </button>
      </p>
    </>
  );
}
