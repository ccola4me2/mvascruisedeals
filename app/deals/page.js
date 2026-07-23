import DealCard from "../components/DealCard";
import { deals } from "../data/deals";

export const metadata = {
  title: "Margaritaville at Sea Cruise Deals",
  description:
    "Browse Margaritaville at Sea sailings from MVAS Cruise Deals: Bahamas, Key West, and Cozumel from Palm Beach, Western Caribbean from Tampa, and new Eastern Caribbean sailings from Miami. Request current rates.",
  alternates: { canonical: "/deals/" },
};

export default function DealsPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Current sailings</p>
          <h1>Margaritaville at Sea Cruise Deals</h1>
          <p className="page-lede">
            Sailings across all three Margaritaville at Sea ships, from quick
            Bahamas and Key West getaways to week-long Caribbean escapes. Fares
            change often and cabins sell out, so request a current quote and
            we&apos;ll send the best available rate for your dates.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="deal-grid">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
