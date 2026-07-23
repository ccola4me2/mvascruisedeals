export const metadata = {
  title: "Contact & Free Quote",
  description:
    "Get a free cruise quote from MVA Cruise Deals. Tell us your destination and budget and a cruise specialist will reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Get in touch</p>
          <h1>Request a free quote</h1>
          <p className="page-lede">
            Share a few details about your ideal cruise and a specialist will get
            back to you within one business day. No fees, no obligation.
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
              <label htmlFor="destination">Preferred destination</label>
              <select id="destination" name="destination" defaultValue="">
                <option value="" disabled>
                  Choose a region
                </option>
                <option>Caribbean</option>
                <option>Alaska</option>
                <option>Mediterranean</option>
                <option>Bahamas</option>
                <option>Mexican Riviera</option>
                <option>Hawaii</option>
                <option>Somewhere else</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="budget">Budget per person (USD)</label>
              <input id="budget" name="budget" type="number" min="0" step="50" />
            </div>
            <div className="field">
              <label htmlFor="message">Tell us more</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Travel dates, number of guests, must-see ports…"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg">
              Send My Request
            </button>
            <p className="form-note">
              This demo form is not yet wired to a backend. Connect it to your CRM or
              email service before going live.
            </p>
          </form>

          <aside className="contact-aside">
            <h2>Prefer to talk?</h2>
            <p>Our cruise specialists are here to help.</p>
            <ul className="contact-list">
              <li>
                <span className="contact-label">Phone</span>
                <a href="tel:+18005550123">(800) 555-0123</a>
              </li>
              <li>
                <span className="contact-label">Email</span>
                <a href="mailto:hello@mvacruisedeals.com">hello@mvacruisedeals.com</a>
              </li>
              <li>
                <span className="contact-label">Hours</span>
                <span>Mon–Fri, 9am–7pm ET</span>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
