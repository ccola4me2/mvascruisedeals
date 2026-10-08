import { BRENT } from "../../data/guideContent.js";
import { quoteHref } from "../../lib/quote";
import { excursionUrl, portExcursionUrl, EXCURSION_DISCLOSURE } from "../../lib/excursions";

// The six Letter-size pages of a guide. Pure presentation: every string comes
// from buildGuide() in app/lib/guide.js.

const Foot = ({ n }) => (
  <footer className="gd-foot">
    <span>
      {BRENT.name} &middot; Call or text {BRENT.phone} &middot; {BRENT.site}
    </span>
    <b>{n} of 6</b>
  </footer>
);

const PageHead = ({ eyebrow, title, size }) => (
  <header className="gd-hero gd-hero--page">
    <div className="gd-eyebrow">{eyebrow}</div>
    <h1 style={size ? { fontSize: size } : undefined}>{title}</h1>
  </header>
);

const Items = ({ items, className }) => (
  <ul className={"gd-list" + (className ? " " + className : "")}>
    {items.map(([b, t]) => (
      <li key={b}>
        <b>{b}</b> {t}
      </li>
    ))}
  </ul>
);

export function Page1({ g }) {
  const where = g.oneWay
    ? "FROM " + g.hp.city.toUpperCase() + " TO " + g.arriveHp.city.toUpperCase()
    : "FROM " + g.hp.city.toUpperCase() + ", " + g.hp.state.toUpperCase();
  return (
    <section className="gd-page" data-page="1">
      <header className="gd-hero">
        <div className="gd-eyebrow">
          MARGARITAVILLE AT SEA {g.ship.toUpperCase()} &middot; {where}
        </div>
        <h1 style={{ fontSize: g.headSize }}>{g.title}.</h1>
        <p className="gd-lede">{g.lede}</p>
      </header>
      <div className="gd-stats">
        {g.stats.map((s) => (
          <div key={s.small}>
            <strong>{s.big}</strong>
            <span>{s.small}</span>
          </div>
        ))}
      </div>
      <div className="gd-body gd-cols">
        <div>
          <h2>Your route</h2>
          <ol className="gd-route">
            {g.route.map((r, i) => (
              <li key={i}>
                <span className={"gd-dot gd-dot--" + r.kind}>{r.tag}</span>
                <div>
                  <b>{r.title}</b>
                  <p>{r.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="gd-callout gd-callout--teal">
            <b>Time onboard</b>
            <p>{g.seaNote}</p>
          </div>
        </div>
        <div>
          <h2>The ship at a glance</h2>
          {g.glance.map(([h, t]) => (
            <div className="gd-glance" key={h}>
              <b>{h}</b>
              <p>{t}</p>
            </div>
          ))}
          <div className="gd-callout gd-callout--navy">
            <b>A note from Brent</b>
            <p>{g.note}</p>
          </div>
        </div>
      </div>
      <div className="gd-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={"/deals/" + g.ship.toLowerCase() + ".jpg"} alt="" />
      </div>
      <Foot n={1} />
    </section>
  );
}

export function Page2({ g }) {
  return (
    <section className={"gd-page gd-ports gd-ports--" + g.density} data-page="2">
      <PageHead eyebrow="YOUR PORTS OF CALL" title={g.portsHead} />
      <div className="gd-body">
        {g.ports.map((p) => (
          <article className="gd-port" key={p.n}>
            <div className="gd-port-top">
              <h3>
                {p.n}. {p.name}
              </h3>
              <span>
                {p.mood}
                {p.overnight ? " (overnight)" : ""}
              </span>
              <a
                className="gd-seg-btn"
                href={portExcursionUrl(p.key)}
                target="_blank"
                rel="noopener"
              >
                Book excursions &rarr;
              </a>
            </div>
            <div className="gd-port-grid">
              <ul>
                {p.bullets.slice(0, g.bulletsPer).map(([b, t]) => (
                  <li key={b}>
                    <b>{b}</b> {t}
                  </li>
                ))}
              </ul>
              <div className="gd-tip">
                <b>Good to know:</b> {p.tip}
              </div>
            </div>
          </article>
        ))}
        <div className="gd-callout gd-callout--gold gd-two">
          <div>
            <b>{g.season.h}</b>
            <p>{g.season.t}</p>
          </div>
          <div>
            <b>{g.passport.h}</b>
            <p>{g.passport.t}</p>
          </div>
        </div>
        <p className="gd-seg-note">
          <a href={excursionUrl("/")} target="_blank" rel="noopener">
            Browse every shore excursion
          </a>{" "}
          for your ports. {EXCURSION_DISCLOSURE}
        </p>
      </div>
      {g.density === "spare" && (
        <div className="gd-photo gd-photo--ports">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={"/deals/" + g.ship.toLowerCase() + ".jpg"} alt="" />
        </div>
      )}
      <Foot n={2} />
    </section>
  );
}

export function Page3({ g }) {
  const o = g.onboard;
  return (
    <section className="gd-page gd-onboard" data-page="3">
      <PageHead eyebrow={o.eyebrow.toUpperCase()} title={o.title} />
      <div className="gd-body gd-cols">
        <div>
          <h2>Where to eat</h2>
          <div className="gd-label">Included in your fare</div>
          <Items items={o.eat.included} />
          <div className="gd-label gd-label--warm">Specialty and extra cost</div>
          <Items items={o.eat.specialty} />
          <div className="gd-tip gd-tip--wide">
            <b>Foodie tip:</b> {o.eat.tip}
          </div>
        </div>
        <div>
          <h2>Drinks and live music</h2>
          <Items items={o.drinks} />
          <h2 className="gd-h2-gap">Pools and play</h2>
          <Items items={o.play} />
        </div>
      </div>
      <div className="gd-nights">
        <h2>Nights worth staying up for</h2>
        <div className="gd-nights-grid">
          {o.nights.map(([h, t]) => (
            <div key={h}>
              <b>{h}</b>
              <p>{t}</p>
            </div>
          ))}
        </div>
        <p className="gd-small">{o.nightsNote}</p>
      </div>
      <Foot n={3} />
    </section>
  );
}

export function Page4({ g }) {
  const c = g.covers;
  return (
    <section className="gd-page gd-covers" data-page="4">
      <PageHead eyebrow="BEFORE YOU BOOK" title="What your fare covers." />
      <div className="gd-body">
        <div className="gd-two gd-two--cards">
          <div className="gd-card gd-card--yes">
            <div className="gd-label">Included</div>
            <ul className="gd-ticks">
              {c.included.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="gd-card gd-card--no">
            <div className="gd-label gd-label--warm">Not included</div>
            <ul className="gd-ticks gd-ticks--no">
              {c.extra.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="gd-two gd-two--stats">
          <div className="gd-bignum">
            <strong>$22 / $25</strong>
            <span>
              Daily gratuity per person, per night (staterooms / suites), added to
              your onboard account.
            </span>
          </div>
          <div className="gd-bignum">
            <strong>20%</strong>
            <span>
              Service charge on drinks, specialty dining, in-room dining and spa.
            </span>
          </div>
        </div>
        {c.fuelNote && <p className="gd-small gd-small--center">{c.fuelNote}</p>}
        <p className="gd-small gd-small--center">
          Some of my rates already include gratuities. I spell out exactly what is
          included in your quote.
        </p>
        <div className="gd-two">
          <div>
            <h2>Packages worth a look</h2>
            <Items items={g.packages} />
          </div>
          <div>
            <h2>Choosing your stateroom</h2>
            <Items items={g.staterooms} />
            <div className="gd-tip gd-tip--wide">
              <b>Suite perk:</b> suite guests get the earliest arrival windows and
              the VIP check-in lane. Not sure which category? Tell me how you like
              to cruise and I'll match you.
            </div>
          </div>
        </div>
      </div>
      <Foot n={4} />
    </section>
  );
}

export function Page5({ g }) {
  const r = g.ready;
  return (
    <section className="gd-page gd-ready" data-page="5">
      <PageHead
        eyebrow={"SAILING FROM " + g.hp.city.toUpperCase()}
        title="Getting ready to sail."
      />
      <div className="gd-body gd-cols">
        <div>
          <h2>Your countdown</h2>
          <ol className="gd-count">
            {r.countdown.map((c) => (
              <li key={c.h + c.date}>
                <span className="gd-count-date">
                  <b>{c.date}</b>
                  {c.sub && <i>{c.sub}</i>}
                </span>
                <div>
                  <b>{c.h}</b>
                  <p>{c.t}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2>Bring to the terminal</h2>
          <ul className="gd-ticks">
            {r.bring.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="gd-callout gd-callout--teal">
            <b>Parking</b>
            <p>{r.parking}</p>
          </div>
        </div>
      </div>
      <div className="gd-tips">
        <h2>{g.brent.experience ? "Tips from " + g.brent.experience : "Tips from Brent"}</h2>
        <div className="gd-tips-grid">
          {r.tips.map((t, i) => (
            <div key={t.h}>
              <span className="gd-dot gd-dot--port">{i + 1}</span>
              <b>{t.h}</b>
              <p>{t.t}</p>
            </div>
          ))}
        </div>
      </div>
      <Foot n={5} />
    </section>
  );
}

export function Page6({ g }) {
  const when = g.depLong.replace(/^\w+, /, "");
  const quoteUrl =
    "https://" + BRENT.site + quoteHref({ ship: g.ship, cruise: g.fullTitle, when });
  const textUrl =
    "sms:" + BRENT.phoneHref.replace("tel:", "") + "?&body=" +
    encodeURIComponent("Hi Brent, I'd like to book the " + g.fullTitle + " on " + when + ".");
  return (
    <section className="gd-page gd-book" data-page="6">
      <PageHead eyebrow="READY TO BOOK?" title="Let's get you on board." />
      <div className="gd-body">
        <div className="gd-bookhero">
          <div className="gd-bookhero-main">
            <div className="gd-label gd-label--gold">Book with Brent</div>
            <h3>The same cruise, with a real person on your side.</h3>
            <ul className="gd-ticks gd-ticks--light">
              <li>$0 booking fees, from first question to gangway.</li>
              <li>Onboard credit on most sailings, up to $100.</li>
              <li>I watch fares and flag price drops and new promos for you.</li>
              <li>I track every deadline, from deposits to final payment to documents.</li>
              <li>I handle the changes that need a phone call, so you never wait on hold.</li>
            </ul>
          </div>
          <div className="gd-bookhero-next">
            <div className="gd-label">Your next step</div>
            <a className="gd-bigphone" href={BRENT.phoneHref}>
              {BRENT.phone}
            </a>
            <p className="gd-next-sub">Call or text any time.</p>
            <p className="gd-next-ask">
              Tell me you want the <b>{g.fullTitle}</b> on <b>{when}</b> and how many
              are traveling. I will hold your cabin and send your quote.
            </p>
            <div className="gd-next-btns">
              <a className="gd-next-link" href={textUrl}>
                Text me to book
              </a>
              <a className="gd-next-link gd-next-link--alt" href={quoteUrl}>
                Quote online
              </a>
            </div>
            <span className="gd-next-mail">{BRENT.email}</span>
          </div>
        </div>
        <div className="gd-callout gd-callout--teal">
          <b>Already booked?</b>
          <p>
            Booked directly with the cruise line? Send me your booking. I may still be
            able to save you money or add onboard credit. This applies to direct
            bookings only, not GOVX, casino offers, or bookings made through another
            travel advisor.
          </p>
        </div>
        <h2>Ways to sail for less, and with more friends</h2>
        <div className="gd-two gd-two--cards">
          <div className="gd-card">
            <h3>Bring the crew</h3>
            <p>
              Reunions, birthdays, clubs or work trips. Book 6 or more cabins and
              unlock group pricing and perks, with one agent running the whole block.
            </p>
          </div>
          <div className="gd-card">
            <h3>Lock it in early</h3>
            <p>
              Cabins and rates change. Reserve now and I will keep watching the fare
              for drops and new promos after you book.
            </p>
          </div>
        </div>
        <p className="gd-small gd-small--center">
          After you book, you also get the cruise line's Cruise Control portal to review
          your itinerary and add packages. I handle anything that needs a phone call.
        </p>
        <p className="gd-fine">
          Ship and port details as published by Margaritaville at Sea; itineraries,
          pricing and policies are subject to change. Prepared for the {g.depLong}{" "}
          sailing. Independent travel advisor, not affiliated with or endorsed by
          Margaritaville at Sea. {BRENT.cred}.
        </p>
      </div>
      <Foot n={6} />
    </section>
  );
}

export default function GuidePages({ g }) {
  return (
    <>
      <Page1 g={g} />
      <Page2 g={g} />
      <Page3 g={g} />
      <Page4 g={g} />
      <Page5 g={g} />
      <Page6 g={g} />
    </>
  );
}
