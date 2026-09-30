import Link from "next/link";
import SailingsExplorer from "../components/SailingsExplorer";
import { SAILINGS_UPDATED } from "../data/sailings";

export const metadata = {
  title: "All Margaritaville at Sea Sailings",
  description:
    "Browse and filter every Margaritaville at Sea itinerary by ship, departure port, length, and destination. Bahamas, Western and Southern Caribbean, and Eastern Caribbean sailings from Palm Beach, Tampa, Miami, and Galveston.",
  alternates: { canonical: "/sailings/" },
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
function updatedLabel(iso) {
  const [y, m] = (iso || "").split("-");
  const name = MONTHS[Number(m) - 1];
  return name ? `${name} ${y}` : null;
}

export default function SailingsPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Every itinerary, one place</p>
          <h1>Find your perfect voyage</h1>
          <p className="page-lede">
            Browse every Margaritaville at Sea itinerary and its upcoming
            departure dates, then filter by ship, homeport, month, length, or
            destination. Found one you love? Hit Get a Quote and we&apos;ll send
            the best available fare and group rate. Exact ports can vary slightly
            by date, so we&apos;ll confirm the specifics when you reach out.
          </p>
          {updatedLabel(SAILINGS_UPDATED) && (
            <p className="freshness">
              <span className="freshness-dot" aria-hidden="true" />
              Schedule updated {updatedLabel(SAILINGS_UPDATED)}
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SailingsExplorer />
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>See one you like?</h2>
          <p>
            Send us the sailing and your party size and we&apos;ll reply with the
            best available fare or group rate, usually within one business day.
            No fees, no obligation.
          </p>
          <Link href="/contact/" className="btn btn-primary btn-lg">
            Get My Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
