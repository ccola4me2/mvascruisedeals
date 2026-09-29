"use client";

import { useEffect, useRef } from "react";

const NS = "http://www.w3.org/2000/svg";

// Draw a palm frond: a curved stem with leaflets radiating along it.
function buildFrond(svg) {
  if (!svg || svg.dataset.built) return;
  const len = 300;
  const leaflets = 17;
  const p0 = { x: 6, y: 2 };
  const p1 = { x: len * 0.5, y: -len * 0.02 };
  const p2 = { x: len * 0.98, y: len * 0.3 };
  const bez = (t) => {
    const m = 1 - t;
    return {
      x: m * m * p0.x + 2 * m * t * p1.x + t * t * p2.x,
      y: m * m * p0.y + 2 * m * t * p1.y + t * t * p2.y,
    };
  };
  const dbez = (t) => {
    const m = 1 - t;
    return {
      x: 2 * m * (p1.x - p0.x) + 2 * t * (p2.x - p1.x),
      y: 2 * m * (p1.y - p0.y) + 2 * t * (p2.y - p1.y),
    };
  };
  const stem = document.createElementNS(NS, "path");
  stem.setAttribute("d", `M${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`);
  stem.setAttribute("stroke", "currentColor");
  stem.setAttribute("stroke-width", "3.4");
  stem.setAttribute("fill", "none");
  stem.setAttribute("stroke-linecap", "round");
  svg.appendChild(stem);
  for (let i = 1; i <= leaflets; i++) {
    const t = i / (leaflets + 1);
    const base = bez(t);
    const dir = dbez(t);
    const mag = Math.hypot(dir.x, dir.y) || 1;
    const ux = dir.x / mag;
    const uy = dir.y / mag;
    const llen = (1 - t) * len * 0.46 + 10;
    [1, -1].forEach((side) => {
      const a = side * 1.12;
      const rx = ux * Math.cos(a) - uy * Math.sin(a);
      const ry = ux * Math.sin(a) + uy * Math.cos(a);
      const tip = { x: base.x + rx * llen, y: base.y + ry * llen };
      const px = -ry;
      const py = rx;
      const w = llen * 0.14;
      const c1 = {
        x: base.x + rx * llen * 0.5 + px * w,
        y: base.y + ry * llen * 0.5 + py * w,
      };
      const c2 = {
        x: base.x + rx * llen * 0.5 - px * w,
        y: base.y + ry * llen * 0.5 - py * w,
      };
      const leaf = document.createElementNS(NS, "path");
      leaf.setAttribute(
        "d",
        `M${base.x} ${base.y} Q ${c1.x} ${c1.y} ${tip.x} ${tip.y} Q ${c2.x} ${c2.y} ${base.x} ${base.y} Z`
      );
      leaf.setAttribute("fill", "currentColor");
      svg.appendChild(leaf);
    });
  }
  svg.dataset.built = "1";
}

export default function HeroPalms() {
  const l = useRef(null);
  const r = useRef(null);
  useEffect(() => {
    buildFrond(l.current);
    buildFrond(r.current);
  }, []);
  return (
    <>
      <svg
        ref={l}
        className="hero-palm hero-palm-l"
        viewBox="0 0 360 300"
        aria-hidden="true"
      />
      <svg
        ref={r}
        className="hero-palm hero-palm-r"
        viewBox="0 0 360 300"
        aria-hidden="true"
      />
    </>
  );
}
