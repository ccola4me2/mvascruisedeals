"use client";

import { useEffect } from "react";
import { track } from "../lib/track";

// Site-wide conversion tracking for contact taps. One delegated listener
// catches every Call (tel:), Text (sms:), and Email (mailto:) link, wherever
// it lives, so individual components do not each need wiring. The quote form
// fires its own generate_lead event on a successful submit.
export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        track("contact_call", { link_url: href });
      } else if (href.startsWith("sms:")) {
        track("contact_text", { link_url: href });
      } else if (href.startsWith("mailto:")) {
        track("contact_email", { link_url: href });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
