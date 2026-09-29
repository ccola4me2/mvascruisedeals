"use client";

import { useState, useEffect } from "react";

const PHRASES = [
  "Fins up, fares down.",
  "No booking fees, no bad days.",
  "Your Margaritaville at Sea insider.",
  "Quick escapes to week-long adventures.",
];

export default function HeroTagline() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((p) => (p + 1) % PHRASES.length);
        setShow(true);
      }, 340);
    }, 3400);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="hero-rotator">
      <span className={`hero-rot${show ? " in" : " out"}`}>{PHRASES[i]}</span>
    </p>
  );
}
