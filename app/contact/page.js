import Script from "next/script";

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
          <div className="form-embed">
            <iframe
              src="https://brentbeasley.dreamingtotravel.com/form/CohcX6UGsr"
              style={{ width: "100%", height: "820px", border: "none" }}
              id="inline-CohcX6UGsr"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="MVAS Cruise Deals Request"
              data-height="820"
              data-layout-iframe-id="inline-CohcX6UGsr"
              data-form-id="CohcX6UGsr"
              title="Request a quote"
            />
            <Script
              src="https://link.msgsndr.com/js/form_embed.js"
              strategy="afterInteractive"
            />
          </div>

          <aside className="contact-aside">
            <img
              src="/cruise-planners-logo.png"
              alt="Cruise Planners"
              className="cp-logo"
              width={200}
              height={64}
            />
            <h2>Prefer to talk?</h2>
            <p>
              Brent Beasley, Cruise Planners. Your land and cruise experts, here
              to help you lock in the perfect Margaritaville at Sea sailing.
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
                <a href="mailto:Brent.beasley@cruiseplanners.com">
                  Brent.beasley@cruiseplanners.com
                </a>
              </li>
              <li>
                <span className="contact-label">Website</span>
                <a
                  href="https://brentbeasley.dreamingtotravel.com/"
                  target="_blank"
                  rel="noopener"
                >
                  brentbeasley.dreamingtotravel.com
                </a>
              </li>
              <li>
                <span className="contact-label">Hours</span>
                <span>Mon&ndash;Fri, 9am&ndash;7pm ET</span>
              </li>
            </ul>
            <p className="team-note">FL Seller of Travel #TI128169</p>
          </aside>
        </div>
      </section>
    </>
  );
}
