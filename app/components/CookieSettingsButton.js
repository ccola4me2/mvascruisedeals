"use client";

import { OPEN_SETTINGS_EVENT } from "../lib/consent";

// Footer link that opens the cookie settings panel.
export default function CookieSettingsButton({ className }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
    >
      Cookie settings
    </button>
  );
}
