"use client";

import { useEffect, useState } from "react";
import WeeklyDealCard from "./WeeklyDealCard";
import { picksFor, todayET } from "../lib/weeklyRotation";

// Renders this week's deals. The server passes the day it was built, so the
// first paint matches the built page; then the browser swaps in the current
// week's picks if the week has moved on since the last deploy.
export default function WeeklyRotation({ pool, builtOn }) {
  const [today, setToday] = useState(builtOn);

  useEffect(() => {
    setToday(todayET());
  }, []);

  return (
    <div className="wdeal-grid">
      {picksFor(pool, today).map((deal) => (
        <WeeklyDealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}
