import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div className="brand brand--footer">
            <span className="brand-mark">MVA</span>
            <span className="brand-text">Cruise Deals</span>
          </div>
          <p className="footer-tagline">
            Deals and group rates on Margaritaville at Sea cruises.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/deals">Cruise Deals</Link>
          <Link href="/group-rates">Group Rates</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <div className="container footer-legal">
        <p>&copy; {year} MVA Cruise Deals. All rights reserved.</p>
        <p>
          Independent travel agency. Not affiliated with or endorsed by
          Margaritaville at Sea. Rates and itineraries are subject to change and
          availability.
        </p>
      </div>
    </footer>
  );
}
