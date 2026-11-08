"use client";

import { useEffect } from "react";
import { track } from "../lib/track";

// Site-wide tracking. One delegated listener catches every Call (tel:), Text
// (sms:), and Email (mailto:) link, wherever it lives, so individual components
// do not each need wiring. It also records which buttons send people toward the
// guide builder, the guide and the quote page (cta_click) and which links leave
// the site (outbound_click), so the funnel can be read page by page. The quote
// form and the guide builder fire their own generate_lead events on submit.
export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      // Share links also use sms: and mailto:, but they are not contact
      // conversions, so they opt out with data-no-track.
      if (a.hasAttribute("data-no-track")) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        track("contact_call", { link_url: href });
      } else if (href.startsWith("sms:")) {
        track("contact_text", { link_url: href });
      } else if (href.startsWith("mailto:")) {
        track("contact_email", { link_url: href });
      } else {
        let u = null;
        try {
          u = new URL(href, window.location.href);
        } catch {
          /* not a link we can read */
        }
        if (!u) return;
        const label = (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 40);
        if (u.origin !== window.location.origin) {
          if (/^https?:$/.test(u.protocol)) track("outbound_click", { domain: u.hostname, label, page_path: window.location.pathname });
        } else if (/^\/(plan|guide|contact)\/?$/.test(u.pathname)) {
          track("cta_click", { destination: u.pathname, label, page_path: window.location.pathname });
        }
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
