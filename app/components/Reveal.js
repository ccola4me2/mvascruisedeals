"use client";

import { useEffect } from "react";

// Subtle fade/rise as cards scroll into view. Below-the-fold elements only, so
// nothing above the fold flashes. Respects prefers-reduced-motion.
const SELECTOR =
  ".deal-card, .wdeal-card, .ship-card, .fdeal, .dest-card, .feature, .testimonial, .citypage, .group-feature, .trust-item";

export default function Reveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const els = Array.from(document.querySelectorAll(SELECTOR));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("reveal-in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.9) {
        el.classList.add("reveal");
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);

  return null;
}
