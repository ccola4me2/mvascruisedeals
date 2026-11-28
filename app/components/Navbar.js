"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTACT } from "../lib/quote";

const NAV = [
  { href: "/deals", label: "Cruise Deals" },
  {
    href: "/sailings",
    label: "Find a Cruise",
    allLabel: "All sailings",
    children: [
      { href: "/cruises", label: "Destinations" },
      { heading: "Departure port" },
      { href: "/miami-cruises", label: "Miami" },
      { href: "/tampa-cruises", label: "Tampa" },
      { href: "/palm-beach-cruises", label: "Palm Beach" },
      { href: "/galveston-cruises", label: "Galveston" },
      { heading: "Ship" },
      { href: "/ships/paradise", label: "Paradise" },
      { href: "/ships/islander", label: "Islander" },
      { href: "/ships/beachcomber", label: "Beachcomber" },
    ],
  },
  {
    href: "/trends",
    label: "Price Trends",
    children: [
      { href: "/this-week", label: "Sailing this week" },
      { href: "/trends/#week", label: "Past 7 days" },
      { href: "/trends/#sailing-soon", label: "Sailing soon" },
      { href: "/trends/#price-watch", label: "Price watch" },
      { href: "/trends/#lowest-per-night", label: "Lowest price per night" },
    ],
  },
  { href: "/group-rates", label: "Group Rates" },
  { href: "/plan", label: "Free Guide" },
  {
    label: "About",
    children: [
      { href: "/about", label: "About Me" },
      { href: "/blog", label: "The MVAS Insider" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
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
          {NAV.map((item) =>
            item.children ? (
              <div className="nav-item" key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="nav-trigger"
                    aria-haspopup="true"
                    onClick={close}
                  >
                    {item.label}
                    <span className="nav-caret" aria-hidden="true">
                      ▾
                    </span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="nav-trigger"
                    aria-haspopup="true"
                  >
                    {item.label}
                    <span className="nav-caret" aria-hidden="true">
                      ▾
                    </span>
                  </button>
                )}
                <div className="nav-menu">
                  {item.children.map((c) =>
                    c.heading ? (
                      <span className="nav-menu-label" key={c.heading}>
                        {c.heading}
                      </span>
                    ) : (
                      <Link key={c.href} href={c.href}>
                        {c.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        <a
          href={`tel:${CONTACT.phone}`}
          className="nav-phone"
          aria-label={`Call or text ${CONTACT.phoneDisplay}`}
        >
          <span aria-hidden="true">📞</span> {CONTACT.phoneDisplay}
        </a>

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
          {NAV.map((item) =>
            item.children ? (
              <div className="mobile-group" key={item.label}>
                <p className="mobile-group-label">{item.label}</p>
                {item.href && (
                  <Link
                    href={item.href}
                    className="mobile-sub"
                    onClick={close}
                  >
                    {item.allLabel || "All " + item.label.toLowerCase()}
                  </Link>
                )}
                {item.children.map((c) =>
                  c.heading ? (
                    <p className="mobile-subhead" key={c.heading}>
                      {c.heading}
                    </p>
                  ) : (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="mobile-sub"
                      onClick={close}
                    >
                      {c.label}
                    </Link>
                  )
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href} onClick={close}>
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="btn btn-primary mobile-menu-cta"
            onClick={close}
          >
            Get a Quote
          </Link>
          <a
            href={`tel:${CONTACT.phone}`}
            className="mobile-menu-phone"
            onClick={close}
          >
            <span aria-hidden="true">📞</span> Call or text {CONTACT.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
