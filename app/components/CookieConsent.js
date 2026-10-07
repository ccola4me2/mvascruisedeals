"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ANALYTICS_ENABLED } from "../lib/analyticsConfig";
import {
  OPEN_SETTINGS_EVENT,
  globalPrivacyControl,
  readConsent,
  saveConsent,
} from "../lib/consent";

// The first-visit banner appears only when there is something optional to
// consent to (analytics). The settings panel can always be opened from the
// "Cookie settings" link in the footer, and says plainly when nothing optional
// is in use.
export default function CookieConsent() {
  const [decided, setDecided] = useState(true); // hidden until we have checked
  const [panel, setPanel] = useState(false);
  const [choice, setChoice] = useState(false);

  useEffect(() => {
    const c = readConsent();
    setChoice(Boolean(c && c.analytics));
    setDecided(Boolean(c) || globalPrivacyControl());
    const open = () => {
      const cur = readConsent();
      setChoice(Boolean(cur && cur.analytics));
      setPanel(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  useEffect(() => {
    if (!panel) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setPanel(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel]);

  function decide(analytics) {
    saveConsent(analytics);
    setChoice(analytics);
    setDecided(true);
    setPanel(false);
  }

  const showBanner = ANALYTICS_ENABLED && !decided && !panel;

  return (
    <>
      {showBanner && (
        <div className="cc-banner" role="region" aria-label="Cookie notice">
          <p>
            I use a small number of optional cookies to understand how people use
            this site and improve it. Nothing loads unless you say yes.{" "}
            <Link href="/cookies/">Cookie policy</Link>
          </p>
          <div className="cc-actions">
            <button type="button" className="cc-btn cc-btn--ghost" onClick={() => decide(false)}>
              Decline
            </button>
            <button type="button" className="cc-btn cc-btn--primary" onClick={() => decide(true)}>
              Accept analytics
            </button>
          </div>
        </div>
      )}

      {panel && (
        <div className="cc-overlay" onClick={() => setPanel(false)}>
          <div
            className="cc-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cc-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="cc-title">Cookie settings</h2>
            <div className="cc-row">
              <div>
                <strong>Strictly necessary</strong>
                <p>
                  Keeps the site working and secure. This site does not need to
                  set any cookies for that today.
                </p>
              </div>
              <span className="cc-pill">Always on</span>
            </div>
            <div className="cc-row">
              <div>
                <strong>Analytics</strong>
                {ANALYTICS_ENABLED ? (
                  <p>
                    Google Analytics counts visits and shows which pages help
                    people. It is off unless you turn it on.
                  </p>
                ) : (
                  <p>No analytics or other optional cookies are in use on this site right now.</p>
                )}
              </div>
              {ANALYTICS_ENABLED ? (
                <label className="cc-switch">
                  <input
                    type="checkbox"
                    checked={choice}
                    onChange={(e) => setChoice(e.target.checked)}
                  />
                  <span>{choice ? "On" : "Off"}</span>
                </label>
              ) : (
                <span className="cc-pill cc-pill--off">Not used</span>
              )}
            </div>
            {globalPrivacyControl() && (
              <p className="cc-note">
                Your browser is sending a Global Privacy Control signal, so I treat
                analytics as off.
              </p>
            )}
            <div className="cc-actions cc-actions--end">
              <Link href="/cookies/" className="cc-link">
                Cookie policy
              </Link>
              {ANALYTICS_ENABLED ? (
                <button type="button" className="cc-btn cc-btn--primary" onClick={() => decide(choice)}>
                  Save choices
                </button>
              ) : (
                <button type="button" className="cc-btn cc-btn--primary" onClick={() => setPanel(false)}>
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
