const items = [
  { big: "$0", small: "Booking fees, ever" },
  { big: "Best", small: "Available fares & group rates" },
  { big: "1 day", small: "Typical reply time" },
  { big: "1-on-1", small: "A real agent, quote to gangway" },
  { big: "FL", small: "Seller of Travel #TI128169" },
];

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Why book with us">
      <div className="container trust-strip-inner">
        {items.map((it) => (
          <div className="trust-item" key={it.small}>
            <span className="trust-big">{it.big}</span>
            <span className="trust-small">{it.small}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
