import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="MVA Cruise Deals home">
          <img
            src="/margaritaville-at-sea-logo.png"
            alt="Margaritaville at Sea"
            className="brand-logo"
            width={137}
            height={40}
          />
          <span className="brand-tag">Cruise Deals &amp; Group Rates</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href="/deals">Cruise Deals</Link>
          <Link href="/group-rates">Group Rates</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link href="/contact" className="btn btn-primary nav-cta">
          Get a Quote
        </Link>
      </div>
    </header>
  );
}
