import Link from "next/link";
import { CONTACT, smsHref } from "../lib/quote";

// Fixed action bar shown on phones so Call / Text / Quote is always one tap away.
// Hidden on desktop via CSS (.sticky-cta).
export default function StickyCTA() {
  return (
    <div className="sticky-cta" role="navigation" aria-label="Quick contact">
      <a href={`tel:${CONTACT.phone}`} className="sticky-cta-btn">
        <span aria-hidden="true">📞</span> Call
      </a>
      <a href={smsHref({})} className="sticky-cta-btn">
        <span aria-hidden="true">💬</span> Text
      </a>
      <Link href="/contact/" className="sticky-cta-btn sticky-cta-btn--primary">
        Get a Quote
      </Link>
    </div>
  );
}
