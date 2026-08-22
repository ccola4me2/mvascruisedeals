import Image from "next/image";
import Link from "next/link";
import { quoteHref } from "../lib/quote";

export default function WeeklyDealCard({ deal }) {
  return (
    <article className="wdeal-card">
      <div className="wdeal-media">
        <Image
          src={deal.image}
          alt={deal.ship}
          width={520}
          height={300}
          className="wdeal-img"
        />
        {deal.tag && <span className="wdeal-tag">{deal.tag}</span>}
      </div>

      {deal.banner && (
        <div className="wdeal-banner">
          <span className="shamrock" aria-hidden="true">
            &#9752;
          </span>
          {deal.banner}
          <span className="shamrock" aria-hidden="true">
            &#9752;
          </span>
        </div>
      )}

      <div className="wdeal-body">
        <p className="wdeal-ship">{deal.ship}</p>
        <h3 className="wdeal-title">{deal.title}</h3>
        <p className="wdeal-meta">
          {deal.when}
          <br />
          {deal.ports}
        </p>

        <div className="wdeal-price">
          <span className="wdeal-fare">{deal.fare}</span>
          <span className="wdeal-fare-unit">{deal.fareUnit}</span>
        </div>

        {deal.onboardCredit && (
          <span className="wdeal-obc">+{deal.onboardCredit} onboard credit</span>
        )}

        {deal.urgency && <p className="wdeal-urgency">{deal.urgency}</p>}

        <div className="wdeal-actions">
          <Link
            href={quoteHref({
              ship: deal.ship,
              cruise: deal.title,
              when: deal.when,
            })}
            className="btn btn-primary"
          >
            {deal.cta.label}
          </Link>
          <a href="tel:+15617779911" className="wdeal-call">
            Call or text Brent
          </a>
        </div>
      </div>
    </article>
  );
}
