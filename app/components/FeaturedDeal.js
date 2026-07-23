import Image from "next/image";
import Link from "next/link";

export default function FeaturedDeal({ deal, flip }) {
  const external = deal.cta && deal.cta.external;
  const perCabin = deal.compare && deal.compare.rows.length > 1;

  return (
    <article className={`fdeal${flip ? " fdeal--flip" : ""}`}>
      <div className="fdeal-media">
        <Image
          src={deal.image}
          alt={deal.ship}
          fill
          sizes="(max-width: 900px) 100vw, 46vw"
          className="fdeal-img"
        />
        {deal.tag && <span className="fdeal-tag">{deal.tag}</span>}
      </div>

      <div className="fdeal-body">
        {deal.logo && (
          <img src={deal.logo} alt="" className="fdeal-logo" width={112} height={95} />
        )}
        <h3 className="fdeal-title">{deal.title}</h3>
        <p className="fdeal-ship">{deal.ship}</p>

        <dl className="fdeal-facts">
          <div>
            <dt>When</dt>
            <dd>{deal.when}</dd>
          </div>
          <div>
            <dt>Length</dt>
            <dd>{deal.nights}</dd>
          </div>
          <div>
            <dt>Itinerary</dt>
            <dd>{deal.itinerary}</dd>
          </div>
        </dl>

        {deal.compare && (
          <div className="compare">
            <div className="compare-row compare-head">
              <span />
              <span>Book Direct</span>
              <span>With Brent</span>
            </div>
            {deal.compare.rows.map((r) => (
              <div className="compare-row" key={r.cabin}>
                <span className="compare-cabin">{r.cabin}</span>
                <span className="compare-direct">
                  <s>{r.direct}</s>
                </span>
                <span className="compare-ours">{r.ours}</span>
              </div>
            ))}
            {deal.compare.basis && (
              <p className="compare-basis">{deal.compare.basis}</p>
            )}
          </div>
        )}

        {deal.fromPrice && (
          <div className="fdeal-from">
            <span>From</span>
            <strong>{deal.fromPrice}</strong>
            <em>{deal.fromUnit}</em>
          </div>
        )}

        {deal.blurb && <p className="fdeal-text">{deal.blurb}</p>}

        {(deal.savings || deal.onboardCredit) && (
          <div className="value-row">
            {deal.savings && (
              <div className="value-tag value-save">
                <span>You Save</span>
                <strong>{deal.savings}</strong>
                {deal.savingsNote && <em>{deal.savingsNote}</em>}
              </div>
            )}
            {deal.onboardCredit && (
              <div className="value-tag value-obc">
                <strong>{deal.onboardCredit}</strong>
                <span>Onboard credit{perCabin ? " per cabin" : ""}</span>
              </div>
            )}
          </div>
        )}

        {deal.includes && (
          <ul className="includes-row">
            {deal.includes.map((i) => (
              <li key={i}>{i} included</li>
            ))}
          </ul>
        )}

        <div className="fdeal-actions">
          {external ? (
            <a
              href={deal.cta.href}
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
            >
              {deal.cta.label}
            </a>
          ) : (
            <Link href={deal.cta.href} className="btn btn-primary">
              {deal.cta.label}
            </Link>
          )}
          <a href="tel:+15617779911" className="fdeal-call">
            Call or text Brent: (561) 777-9911
          </a>
        </div>
      </div>
    </article>
  );
}
