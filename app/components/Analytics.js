"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GA_ID } from "../lib/analyticsConfig";
import { analyticsAllowed, clearAnalyticsCookies } from "../lib/consent";

// Loads Google Analytics 4 only after a visitor accepts analytics, and stops it
// again if they withdraw. With no GA_ID set (the case today) this renders
// nothing and the site sets no cookies at all.
//
// Once loaded, these conversion events fire (see AnalyticsEvents.js and
// QuoteForm.js). Mark them as "key events" in GA4 to count them as conversions:
//   generate_lead   a quote form or cruise guide request was submitted
//   contact_call    a Call (tel:) link was tapped
//   contact_text    a Text (sms:) link was tapped
//   contact_email   an email (mailto:) link was tapped
export default function Analytics() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!GA_ID) return undefined;
    const sync = () => {
      const allowed = analyticsAllowed();
      setOk(allowed);
      if (!allowed) clearAnalyticsCookies();
      else window["ga-disable-" + GA_ID] = false;
    };
    sync();
    window.addEventListener("mvas-consent", sync);
    return () => window.removeEventListener("mvas-consent", sync);
  }, []);

  if (!GA_ID || !ok) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
