"use client";

import { useState } from "react";
import Link from "next/link";

const NAV = [
  { href: "/deals", label: "Cruise Deals" },
  { href: "/sailings", label: "All Sailings" },
  { href: "/group-rates", label: "Group Rates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link
          href="/"
          className="brand"
          aria-label="MVAS Cruise Deals home"
          onClick={close}
        >
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
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn btn-primary nav-cta">
          Get a Quote
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`nav-toggle-bars${open ? " is-open" : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        hidden={!open}
      >
        <nav className="mobile-menu-inner" aria-label="Mobile">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={close}>
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn btn-primary mobile-menu-cta"
            onClick={close}
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
