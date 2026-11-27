"use client";

import { usePathname } from "next/navigation";

// The footer's legal line. The deal pages (/deals/ and every deal landing page)
// are run under Cruises Tours and Travel, LLC; the rest of the site keeps the
// independent advisor wording. Both versions are in the static HTML, picked by path.
export default function FooterLegal() {
  const path = usePathname() || "";
  const ctt = path === "/deals" || path.startsWith("/deals/");
  return (
    <p>
      {ctt
        ? "Brent Beasley, Cruises Tours and Travel, LLC. FL Seller of Travel #ST150140."
        : "Brent Beasley, independent travel advisor. FL Seller of Travel #TI128169."}{" "}
      Not affiliated with or endorsed by Margaritaville at Sea. Rates and
      itineraries are subject to change and availability. GOVX program or Casino
      rates do not qualify for advertised deals or onboard credit.
    </p>
  );
}
