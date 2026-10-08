import Link from "next/link";
import { readMinutes } from "../data/posts";

const fmt = (iso) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

// big: the wide featured card. compact: title and meta only (related posts).
export default function PostCard({ p, big, compact }) {
  const href = `/blog/${p.slug}/`;
  return (
    <article className={"blog-card" + (big ? " blog-card--big" : "")}>
      <Link href={href} className="blog-card-media" tabIndex={-1} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt=""
          loading={big ? "eager" : "lazy"}
          style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
        />
      </Link>
      <div className="blog-card-body">
        <p className="blog-card-meta">
          <span className="blog-cat">{p.category}</span>
          {!compact && <span>{fmt(p.date)}</span>}
          <span>{readMinutes(p)} min read</span>
        </p>
        <h2>
          <Link href={href}>{compact ? p.short : p.title}</Link>
        </h2>
        {!compact && <p>{p.excerpt}</p>}
        {!compact && (
          <Link href={href} className="blog-more">
            Read the article &rarr;
          </Link>
        )}
      </div>
    </article>
  );
}
