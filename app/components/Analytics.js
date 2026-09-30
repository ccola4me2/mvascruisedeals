import Script from "next/script";

// TO ENABLE ANALYTICS: paste your Google Analytics 4 Measurement ID here
// (looks like "G-XXXXXXXXXX"). While empty, no tracking script is loaded.
//
// Once set, these conversion events fire automatically (wired in
// AnalyticsEvents.js and QuoteForm.js). Mark them as "key events" in GA4 to
// count them as conversions:
//   generate_lead   - a quote form was submitted successfully
//   contact_call    - a Call (tel:) link was tapped
//   contact_text    - a Text (sms:) link was tapped
//   contact_email   - an email (mailto:) link was tapped
const GA_ID = "";

export default function Analytics() {
  if (!GA_ID) return null;
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
