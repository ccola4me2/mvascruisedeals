export const metadata = {
  title: "About Us",
  description:
    "MVAS Cruise Deals is an independent travel agency specializing in Margaritaville at Sea cruises, matching travelers and groups with the best available fares.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Who we are</p>
          <h1>About MVAS Cruise Deals</h1>
          <p className="page-lede">
            We&apos;re an independent travel agency with one focus: Margaritaville
            at Sea. Whether it&apos;s a couple&apos;s quick getaway or a 200-guest
            group, we get you the best available rate and handle the details.
          </p>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container about-brent">
          <div className="about-brent-head">
            <img
              src="/cruise-planners-logo.png"
              alt="Cruise Planners"
              className="about-cp-logo"
              width={200}
              height={64}
            />
            <p className="eyebrow">Meet your advisor</p>
            <h2>Hi, I&apos;m Brent Beasley</h2>
            <p className="about-credentials">
              Independent advisor, Cruise Planners
              <br />
              FL Seller of Travel #TI128169
            </p>
          </div>
          <div className="about-brent-body">
            <p>
              I&apos;m an independent travel advisor with Cruise Planners, and
              Margaritaville at Sea is my specialty. I sail these ships, I know
              their cabins and itineraries, and there&apos;s nothing I enjoy more
              than helping people trade the everyday grind for a little island
              time.
            </p>
            <p>
              I&apos;m also part of the Parrothead community and help lead the
              International Parrot Head Day Cruise, so I&apos;ve seen firsthand how
              a Margaritaville at Sea sailing brings people together, whether
              it&apos;s two travelers or a whole crew of friends.
            </p>
            <p>
              <strong>My mission is simple:</strong> get you the best value on
              the right sailing, with no booking fees and a real person in your
              corner from your first question to the moment you step off the
              ship. When you book with me, your trip gets the same care I would
              give my own.
            </p>
            <p className="about-signature">Brent Beasley</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Margaritaville at Sea is all we do</h2>
          <p>
            Because we book one cruise line, we know it inside out: all three
            ships, every cabin category, the itineraries, and the sailings that
            deliver the most island time for your money. When there&apos;s a fare
            drop or a promotion worth grabbing, we spot it and pass it along.
          </p>

          <h2>Individuals and groups</h2>
          <p>
            Booking for two? We&apos;ll find your best fare and cabin. Booking for
            a crowd? Group rates on Margaritaville at Sea can unlock reduced
            pricing, perks, and amenities you can&apos;t get on your own, and we
            manage the whole block so every guest is taken care of.
          </p>

          <h2>How we work</h2>
          <ol>
            <li>
              <strong>Tell us your trip.</strong> Ship, dates, party size, and any
              must-haves.
            </li>
            <li>
              <strong>We find your rate.</strong> We check every matching sailing
              and, for groups, secure group pricing and a cabin block.
            </li>
            <li>
              <strong>You sail.</strong> We book it, apply every perk you qualify
              for, and support you all the way to the port.
            </li>
          </ol>

          <h2>Our promise</h2>
          <p>
            No booking fees and no pressure, just honest advice from people who
            love Margaritaville at Sea as much as you do.
          </p>

          <p className="form-note">
            MVAS Cruise Deals is operated by Brent Beasley, an independent agent
            with Cruise Planners (FL Seller of Travel #TI128169). We are not
            affiliated with or endorsed by Margaritaville at Sea; all trademarks
            belong to their respective owners.
          </p>
        </div>
      </section>
    </>
  );
}
