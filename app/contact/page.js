export const metadata = {
  title: "Contact & Free Quote",
  description:
    "Request a free quote or group rate on a Margaritaville at Sea cruise. Tell us your ship, dates, and party size and an MVA Cruise Deals specialist will reply within one business day.",
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
          <form className="contact-form" action="#" method="post">
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone (optional)</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className="field">
              <label htmlFor="ship">Which ship?</label>
              <select id="ship" name="ship" defaultValue="">
                <option value="" disabled>
                  Choose a ship
                </option>
                <option>Margaritaville at Sea Paradise (Bahamas)</option>
                <option>Margaritaville at Sea Islander (Caribbean)</option>
                <option>Not sure yet</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="party">Party size</label>
              <input id="party" name="party" type="number" min="1" step="1" />
            </div>
            <div className="field">
              <label htmlFor="message">Tell us more</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Preferred dates, cabin type, group details, questions..."
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg">
              Send My Request
            </button>
            <p className="form-note">
              This form is not yet connected to a backend. Wire it to your email
              service or CRM before going live.
            </p>
          </form>

          <aside className="contact-aside">
            <h2>Prefer to talk?</h2>
            <p>Your Margaritaville at Sea specialist is here to help.</p>
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
                <a href="mailto:brent.beasley@cruiseplanners.com">
                  brent.beasley@cruiseplanners.com
                </a>
              </li>
              <li>
                <span className="contact-label">Hours</span>
                <span>Mon&ndash;Fri, 9am&ndash;7pm ET</span>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
