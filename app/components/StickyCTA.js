"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT, smsHref } from "../lib/quote";

// Fixed action bar shown on phones so Call / Text / Quote is always one tap away.
// Hidden on desktop via CSS (.sticky-cta).
//
// "Get a Quote" scrolls to the page's own quote form when it has one (the home
// page, the deals page, and every deal landing page do), because jumping to a
// form already filled in for the sailing beats sending someone to another page.
export default function StickyCTA() {
  const pathname = usePathname();
  const [hasQuote, setHasQuote] = useState(false);

  useEffect(() => {
    setHasQuote(Boolean(document.getElementById("quote")));
  }, [pathname]);

  return (
    <div className="sticky-cta" role="navigation" aria-label="Quick contact">
      <a href={`tel:${CONTACT.phone}`} className="sticky-cta-btn">
        <span aria-hidden="true">📞</span> Call
      </a>
      <a href={smsHref({})} className="sticky-cta-btn">
        <span aria-hidden="true">💬</span> Text
      </a>
      {hasQuote ? (
        <a href="#quote" className="sticky-cta-btn sticky-cta-btn--primary">
          Get a Quote
        </a>
      ) : (
        <Link href="/contact/" className="sticky-cta-btn sticky-cta-btn--primary">
          Get a Quote
        </Link>
      )}
    </div>
  );
}
