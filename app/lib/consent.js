// Visitor consent for optional cookies (analytics). Stored in localStorage, so
// no cookie is needed to remember a choice. Every call is wrapped because
// storage can be blocked (private windows, strict browser settings).

import { GA_ID } from "./analyticsConfig";

const KEY = "mvas-consent-v1";

export function readConsent() {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY));
    if (v && typeof v.analytics === "boolean") return v;
  } catch {
    /* no stored choice */
  }
  return null;
}

// A browser's Global Privacy Control signal counts as "decline".
export function globalPrivacyControl() {
  return typeof navigator !== "undefined" && navigator.globalPrivacyControl === true;
}

export function analyticsAllowed() {
  if (globalPrivacyControl()) return false;
  const c = readConsent();
  return Boolean(c && c.analytics);
}

export function saveConsent(analytics) {
  const value = { analytics: Boolean(analytics), ts: Date.now() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* choice applies to this visit only */
  }
  window.dispatchEvent(new CustomEvent("mvas-consent", { detail: value }));
  return value;
}

// When someone withdraws consent, stop collection and remove the cookies.
export function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;
  if (GA_ID) window["ga-disable-" + GA_ID] = true;
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = ["", host, "." + host, parts.length > 2 ? "." + parts.slice(-2).join(".") : ""];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (name === "_ga" || name.indexOf("_ga_") === 0 || name === "_gid") {
      domains.forEach((d) => {
        document.cookie =
          name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + (d ? "; domain=" + d : "");
      });
    }
  });
}

export const OPEN_SETTINGS_EVENT = "mvas-open-cookie-settings";
