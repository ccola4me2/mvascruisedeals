"use client";

import { useEffect, useState } from "react";
import { track } from "../lib/track";

// Sends a guide link to the rest of the travel party. Uses the phone's share sheet
// when there is one; otherwise copies the link (or renders nothing when
// copyFallback is off and the page already has a Copy link button).
export default function ShareGuide({ href, text, className, label = "Share with my group", copyFallback = true }) {
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  if (!canShare && !copyFallback) return null;

  async function onClick() {
    let url = href;
    try {
      url = new URL(href, window.location.href).toString();
    } catch {
      /* use the link as given */
    }
    if (canShare) {
      try {
        await navigator.share({ title: "Margaritaville at Sea cruise guide", text, url });
        track("guide_share", { method: "share_sheet" });
      } catch {
        /* the share sheet was closed */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      track("guide_share", { method: "copy" });
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <>
      <button type="button" className={className} onClick={onClick}>
        {copied ? "Link copied" : label}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Link copied to the clipboard" : ""}
      </span>
    </>
  );
}
