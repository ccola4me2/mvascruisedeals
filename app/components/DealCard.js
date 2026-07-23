import Image from "next/image";

export default function DealCard({ deal }) {
  return (
    <article className="deal-card">
      <div className="deal-media">
        <Image
          src={deal.image}
          alt={`${deal.title} aboard ${deal.ship}`}
          width={480}
          height={280}
          className="deal-image"
        />
        <span className="deal-badge">{deal.nights} nights</span>
      </div>
      <div className="deal-body">
        <p className="deal-line">{deal.cruiseLine}</p>
        <h3 className="deal-title">{deal.title}</h3>
        <p className="deal-meta">
          Departs {deal.departurePort} &middot; {deal.ship}
        </p>
        <ul className="deal-ports">
          {deal.ports.map((port) => (
            <li key={port}>{port}</li>
          ))}
        </ul>
        <p className="deal-highlight">{deal.highlight}</p>
        <div className="deal-footer">
          <p className="deal-price">
            <span className="deal-price-label">From</span>
            <span className="deal-price-value">${deal.priceFrom}</span>
            <span className="deal-price-unit">/ person</span>
          </p>
          <a href="/contact" className="btn btn-outline">
            Get Quote
          </a>
        </div>
      </div>
    </article>
  );
}
