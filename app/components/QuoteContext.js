"use client";

import { useSearchParams } from "next/navigation";
import { CONTACT, shortShip, smsHref, mailtoHref } from "../lib/quote";

export default function QuoteContext() {
  const sp = useSearchParams();
  const cruise = sp.get("cruise");
  const ship = sp.get("ship");
  const when = sp.get("when");

  if (!cruise && !ship) return null;

  const sel = { cruise, ship, when };
  const title = cruise || `Margaritaville at Sea ${shortShip(ship)}`;
  const formHref = cruise
    ? `${CONTACT.form}?cruise=${encodeURIComponent([cruise, when].filter(Boolean).join(", "))}`
    : CONTACT.form;

  return (
    <div className="quote-context">
      <p className="quote-context-label">You&apos;re asking about</p>
      <p className="quote-context-cruise">{title}</p>
      <p className="quote-context-meta">
        {when ? when : ""}
        {when && ship ? " · " : ""}
        {ship ? `Margaritaville at Sea ${shortShip(ship)}` : ""}
      </p>
      <div className="quote-context-actions">
        <a href={smsHref(sel)} className="btn btn-primary">
          Text Brent about this
        </a>
        <a href={mailtoHref(sel)} className="btn btn-outline">
          Email this cruise
        </a>
        <a
          href={formHref}
          target="_blank"
          rel="noopener"
          className="btn btn-outline"
        >
          Open the request form
        </a>
      </div>
      <p className="quote-context-note">
        Prefer to talk? Call or text{" "}
        <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>.
      </p>
    </div>
  );
}
