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
            Your trusted partner for unforgettable cruise vacations.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/deals">Deals</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <div className="container footer-legal">
        <p>&copy; {year} MVA Cruise Deals. All rights reserved.</p>
        <p>Prices are per person, based on double occupancy, and subject to change.</p>
      </div>
    </footer>
  );
}
