// Tiny analytics event helper.
//
// Sends a GA4 event when gtag is present, and no-ops safely otherwise (for
// example before a Measurement ID is set in app/components/Analytics.js, or if
// an ad blocker stops the script). Nothing here ever throws into the caller.
export function track(name, params = {}) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
  } catch {
    /* analytics must never break the page */
  }
}
