"use client";

import { useState, useEffect } from "react";

const PHRASES = [
  "Fins up, fares down.",
  "No booking fees, no bad days.",
  "Your Margaritaville at Sea insider.",
  "Quick escapes to week-long adventures.",
];

// Every phrase sits in the same grid cell and they crossfade, so the box is always as tall as
// the longest phrase. (One swapped-in phrase used to wrap to a second line on a phone and
// push the buttons down each time it changed.) Screen readers get only the visible phrase.
export default function HeroTagline() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setI((p) => (p + 1) % PHRASES.length), 3400);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="hero-rotator">
      {PHRASES.map((t, k) => (
        <span key={t} className={`hero-rot${k === i ? " in" : " out"}`} aria-hidden={k !== i}>
          {t}
        </span>
      ))}
    </p>
  );
}
