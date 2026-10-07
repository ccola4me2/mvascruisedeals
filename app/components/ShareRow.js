"use client";

import { useState } from "react";

// Share this deal with friends or a travel group. The sms and mailto links opt
// out of contact tracking (data-no-track): sharing a page is not a lead.
export default function ShareRow({ url, title }) {
  const [copied, setCopied] = useState(false);
  const text = `${title}: ${url}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <div className="dl-share" aria-label="Share this cruise">
      <span className="dl-share-label">Share this cruise</span>
      <div className="dl-share-btns">
        <button type="button" className="dl-share-btn" onClick={copy}>
          {copied ? "Link copied" : "Copy link"}
        </button>
        <a
          className="dl-share-btn"
          data-no-track
          href={`sms:?&body=${encodeURIComponent(text)}`}
        >
          Text it
        </a>
        <a
          className="dl-share-btn"
          data-no-track
          href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
            `Take a look at this Margaritaville at Sea cruise:\n\n${url}`
          )}`}
        >
          Email it
        </a>
        <a
          className="dl-share-btn"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>
    </div>
  );
}
