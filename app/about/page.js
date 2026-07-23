export const metadata = {
  title: "About Us",
  description:
    "MVA Cruise Deals is a full-service cruise agency dedicated to matching travelers with the perfect sailing at the best possible price.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Who we are</p>
          <h1>About MVA Cruise Deals</h1>
          <p className="page-lede">
            We&apos;re a team of cruise-obsessed travel advisors on a simple mission:
            get you on the right ship, to the right places, for the right price.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Cruising is all we do</h2>
          <p>
            Unlike general travel sites, MVA Cruise Deals focuses on one thing:
            cruises. That specialization means we know the ships, the itineraries,
            and the promotions inside and out. When a cruise line drops a limited
            fare or adds onboard perks, we spot it first and pass the savings on to
            you.
          </p>

          <h2>How we work</h2>
          <ol>
            <li>
              <strong>Tell us your dream trip.</strong> Destination, dates, budget,
              and who&apos;s coming along.
            </li>
            <li>
              <strong>We do the digging.</strong> We compare every relevant sailing
              across 25+ cruise lines to find your best options.
            </li>
            <li>
              <strong>You choose and sail.</strong> We handle the booking, apply
              every perk you qualify for, and support you all the way to the port.
            </li>
          </ol>

          <h2>Our promise</h2>
          <p>
            No booking fees, no pressure, and a lowest-fare guarantee. If you find a
            better price on the same sailing, we&apos;ll match it. That&apos;s how we&apos;ve
            earned the trust of thousands of happy cruisers.
          </p>
        </div>
      </section>
    </>
  );
}
