"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// A static export cannot know today's date at request time, so this checks in
// the browser. Once a sailing's departure date has passed, the page says so
// and points people at current deals instead of quietly staying live.
export default function DealClosedNotice({ departs }) {
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const d = new Date(`${departs}T23:59:59`);
    if (!Number.isNaN(d.getTime()) && Date.now() > d.getTime()) setClosed(true);
  }, [departs]);

  if (!closed) return null;
  return (
    <div className="dl-closed" role="status">
      <strong>This sailing has departed.</strong> Rates and cabins below are no
      longer available.{" "}
      <Link href="/deals/">See current deals</Link> or{" "}
      <Link href="/sailings/">browse every sailing</Link>.
    </div>
  );
}
