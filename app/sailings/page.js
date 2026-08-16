import SailingsExplorer from "../components/SailingsExplorer";

export const metadata = {
  title: "All Margaritaville at Sea Sailings",
  description:
    "Browse and filter every Margaritaville at Sea itinerary by ship, departure port, length, and destination. Bahamas, Western and Southern Caribbean, and Eastern Caribbean sailings from Palm Beach, Tampa, and Miami.",
  alternates: { canonical: "/sailings/" },
};

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
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SailingsExplorer />
        </div>
      </section>
    </>
  );
}
