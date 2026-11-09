"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { flashSale } from "../data/flashSale";
import { quoteHref } from "../lib/quote";

// Two views of the same limited-time sale. Both render during the sale (so the
// built HTML shows them) and hide themselves in the browser once the end time
// has passed. See app/data/flashSale.js for the dates and the removal steps.
function useOver() {
  const [over, setOver] = useState(false);
  useEffect(() => {
    const end = new Date(flashSale.endsAt);
    if (!Number.isNaN(end.getTime()) && Date.now() > end.getTime()) setOver(true);
  }, []);
  return over;
}

const dayLabel = (() => {
  const [y, m, d] = flashSale.ends.split("-").map(Number);
  return new Date(y, m - 1, d, 12).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
})();

const href = quoteHref({
  cruise: flashSale.name + " (" + flashSale.headline.toLowerCase() + ")",
});

// Slim strip across the top of every page.
export function SaleBar() {
  const over = useOver();
  if (over) return null;
  return (
    <div className="sale-bar" role="status">
      <div className="container sale-bar-inner">
        <p>
          <strong>{flashSale.name}:</strong> {flashSale.headline}. New
          reservations through {dayLabel}.
        </p>
        <Link href={href} className="sale-bar-link">
          Get a quote
        </Link>
      </div>
    </div>
  );
}

// Full card on the Deals page, with the credit table and the offer terms.
export function SaleCard() {
  const over = useOver();
  if (over) return null;
  return (
    <section className="section sale-section" id="flash-sale">
      <div className="container">
        <div className="sale-card">
          <div className="sale-card-head">
            <p className="eyebrow">Limited time</p>
            <h2>{flashSale.name}</h2>
            <p className="sale-card-lede">
              {flashSale.headline} on new Margaritaville at Sea reservations
              made {flashSale.window}. The longer the sailing, the bigger the
              credit, for guests 1 to 4 in the cabin.
            </p>
            <p className="sale-card-ends">Offer ends {dayLabel}.</p>
            <Link href={href} className="btn btn-primary">
              Get a Quote
            </Link>
          </div>
          <div className="sale-card-table" role="table" aria-label="Onboard credit per person">
            <div className="sale-row sale-row--head" role="row">
              <span role="columnheader">Sailing length</span>
              <span role="columnheader">Credit per person</span>
            </div>
            {flashSale.credits.map((c) => (
              <div className="sale-row" role="row" key={c.length}>
                <span role="cell">{c.length}</span>
                <strong role="cell">{c.amount}</strong>
              </div>
            ))}
            <p className="sale-card-note">
              A family of four on an 8 to 10 night sailing can earn up to
              $1,000.
            </p>
          </div>
        </div>
        <p className="sale-terms">
          <strong>Offer terms.</strong> {flashSale.terms}
        </p>
      </div>
    </section>
  );
}
