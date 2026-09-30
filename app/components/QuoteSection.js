import { Suspense } from "react";
import QuoteForm from "./QuoteForm";

// Server component that drops the inline quote form into a page section.
// QuoteForm uses useSearchParams, so it must sit under a Suspense boundary.
export default function QuoteSection({
  eyebrow = "Free quote, no obligation",
  title = "Get your free quote",
  lede = "Tell me a few details and I'll reply with the best available fare or group rate, usually within one business day.",
  id = "quote",
}) {
  return (
    <section className="section quote-section" id={id}>
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="section-lede">{lede}</p>
        </div>
        <div className="quote-shell">
          <Suspense fallback={<div className="quote-form" />}>
            <QuoteForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
