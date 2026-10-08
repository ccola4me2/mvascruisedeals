import Link from "next/link";
import CookieSettingsButton from "./CookieSettingsButton";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <span className="footer-logo">
            <img
              src="/margaritaville-at-sea-logo.png"
              alt="Margaritaville at Sea"
              width={150}
              height={44}
            />
          </span>
          <p className="footer-tagline">
            Cruise deals and group rates on Margaritaville at Sea.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/deals">Cruise Deals</Link>
          <Link href="/sailings">All Sailings</Link>
          <Link href="/cruises">Destinations</Link>
          <Link href="/plan">Free Cruise Guide</Link>
          <Link href="/group-rates">Group Rates</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <div className="container footer-legal">
        <p>&copy; {year} MVAS Cruise Deals. All rights reserved.</p>
        <p className="footer-policy">
          <Link href="/privacy/">Privacy Policy</Link>
          <Link href="/cookies/">Cookie Policy</Link>
          <CookieSettingsButton className="footer-policy-btn" />
        </p>
        <p>
          Brent Beasley, independent travel advisor. FL Seller of Travel
          #TI128169. Not affiliated with or endorsed by Margaritaville at Sea. Rates and
          itineraries are subject to change and availability. GOVX program rates
          do not qualify for advertised deals or onboard credit.
        </p>
      </div>
    </footer>
  );
}
