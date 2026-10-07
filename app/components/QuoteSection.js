import { Suspense } from "react";
import QuoteForm from "./QuoteForm";

const REASSURE = [
  "No booking fees, ever",
  "Best available fares and group rates",
  "A reply within one business day",
];

// Server component that drops the inline quote form into a page section.
// QuoteForm uses useSearchParams, so it must sit under a Suspense boundary.
export default function QuoteSection({
  eyebrow = "Free quote, no obligation",
  title = "Get your free quote",
  lede = "Tell me a few details and I'll reply with the best available fare or group rate, usually within one business day.",
  id = "quote",
  prefill,
}) {
  return (
    <section className="section quote-section" id={id}>
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="section-lede">{lede}</p>
        </div>

        <ul className="quote-reassure" aria-label="Why book with me">
          {REASSURE.map((r) => (
            <li key={r}>
              <span className="qr-check" aria-hidden="true">
                &#10003;
              </span>
              {r}
            </li>
          ))}
        </ul>

        <div className="quote-shell">
          <Suspense fallback={<div className="quote-form" />}>
            <QuoteForm prefill={prefill} />
          </Suspense>
        </div>

        <p className="quote-byline">
          Brent Beasley, your independent Margaritaville at Sea specialist.{" "}
          <span className="quote-byline-cred">
            FL Seller of Travel #TI128169
          </span>
        </p>
      </div>
    </section>
  );
}
