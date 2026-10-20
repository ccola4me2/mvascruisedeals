"use client";

import { useEffect, useState } from "react";

// A limited-time offer notice. `ends` is the last day, as an ISO date. The page
// is a static export, so it cannot know the date when it is built: it is
// written as "ends <day>" and the browser swaps it for an "ended" line once the
// day has passed (end of that day, Eastern time, which is where the offer is
// run from). Remove the `offerEnds` field from the deal when you are done and
// the notice disappears entirely.
const label = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 12).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

export default function OfferEnds({ ends }) {
  const [over, setOver] = useState(false);

  useEffect(() => {
    // -04:00 is Eastern daylight time, which is in effect on the date this was set.
    const end = new Date(`${ends}T23:59:59-04:00`);
    if (!Number.isNaN(end.getTime()) && Date.now() > end.getTime()) setOver(true);
  }, [ends]);

  return (
    <p className={"offer-ends" + (over ? " offer-ends--over" : "")} role="status">
      {over ? (
        <>
          <strong>This offer has ended.</strong> Call or text{" "}
          <a href="tel:+15617779911">561-777-9911</a> for current rates.
        </>
      ) : (
        <>
          <strong>Offer ends {label(ends)}.</strong> Prices and cabins are not
          guaranteed after that.
        </>
      )}
    </p>
  );
}
