import { testimonials } from "../data/testimonials";

function Stars({ count = 5 }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {"★".repeat(count)}
      {"☆".repeat(Math.max(0, 5 - count))}
    </span>
  );
}

export default function Testimonials() {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="section section--muted">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">Fins up, five stars</p>
          <h2>What our travelers say</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <figure className="testimonial" key={i}>
              <Stars count={t.rating} />
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <span className="testimonial-name">{t.name}</span>
                {t.location && (
                  <span className="testimonial-loc">{t.location}</span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
