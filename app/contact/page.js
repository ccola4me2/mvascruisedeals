import { Suspense } from "react";
import QuoteContext from "../components/QuoteContext";

export const metadata = {
  title: "Contact & Free Quote",
  description:
    "Request a free quote or group rate on a Margaritaville at Sea cruise. Tell us your ship, dates, and party size and an MVAS Cruise Deals specialist will reply within one business day.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Get in touch</p>
          <h1>Request a free quote</h1>
          <p className="page-lede">
            Share a few details about your Margaritaville at Sea cruise and a
            specialist will get back to you within one business day. No fees, no
            obligation.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="request-panel">
            <Suspense fallback={null}>
              <QuoteContext />
            </Suspense>
            <h2>Start your free quote</h2>
            <p>
              Tell us your preferred ship, dates, and party size on our quick
              request form, and we&apos;ll reply with the best available fare or
              group rate, usually within one business day. No fees, no
              obligation.
            </p>
            <ul className="request-list">
              <li>Best available fares and group rates</li>
              <li>$0 booking fees</li>
              <li>A real person from quote to gangway</li>
            </ul>
            <a
              href="https://cttagents.com/f/wwwmvascruisedealscom"
              target="_blank"
              rel="noopener"
              className="btn btn-primary btn-lg"
            >
              Open the Request Form
            </a>
            <p className="form-note">
              Opens our secure request form in a new tab. Prefer to talk? Call or
              text (561) 777-9911.
            </p>
          </div>

          <aside className="contact-aside">
            <h2>Prefer to talk?</h2>
            <p>
              Brent Beasley, your independent Margaritaville at Sea specialist,
              here to help you lock in the perfect sailing.
            </p>
            <ul className="contact-list">
              <li>
                <span className="contact-label">Agent</span>
                <span>Brent Beasley</span>
              </li>
              <li>
                <span className="contact-label">Phone</span>
                <a href="tel:+15617779911">(561) 777-9911</a>
              </li>
              <li>
                <span className="contact-label">Email</span>
                <a href="mailto:brentb@cruisestoursandtravel.com">
                  brentb@cruisestoursandtravel.com
                </a>
              </li>
              <li>
                <span className="contact-label">Website</span>
                <span>
                  <a href="https://mvascruisedeals.com/">mvascruisedeals.com</a>
                  <br />
                  <a
                    href="https://cruisestoursandtravel.com/"
                    target="_blank"
                    rel="noopener"
                  >
                    cruisestoursandtravel.com
                  </a>
                </span>
              </li>
            </ul>
            <p className="team-note">FL Seller of Travel #TI128169</p>
          </aside>
        </div>
      </section>
    </>
  );
}
