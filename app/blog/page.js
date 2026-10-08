import Link from "next/link";
import PostCard from "../components/PostCard";
import { BLOG_NAME, BLOG_TAGLINE, sortedPosts } from "../data/posts";

export const metadata = {
  title: "The MVAS Insider",
  description:
    "The MVAS Insider: ships, ports, and planning tips for Margaritaville at Sea cruisers, from an independent travel advisor. Guides to every ship, homeport, and port of call.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "The MVAS Insider",
    description: BLOG_TAGLINE,
    url: "/blog/",
  },
};

export default function BlogIndex() {
  const [first, ...rest] = sortedPosts();
  const ld = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: BLOG_NAME,
    description: BLOG_TAGLINE,
    url: "https://mvascruisedeals.com/blog/",
    publisher: { "@id": "https://mvascruisedeals.com/#agency" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">The blog</p>
          <h1>{BLOG_NAME}</h1>
          <p className="page-lede">
            {BLOG_TAGLINE} Plain-English guides from Brent Beasley, an
            independent travel advisor, built from the cruise line&apos;s own
            published information.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {first && <PostCard p={first} big />}
          {rest.length > 0 && (
            <div className="blog-grid">
              {rest.map((p) => (
                <PostCard key={p.slug} p={p} />
              ))}
            </div>
          )}
          <p className="blog-feed">
            <a href="/blog/feed.xml">Subscribe with RSS</a>
          </p>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>Get a guide built for your sailing</h2>
          <p>
            Pick any Margaritaville at Sea cruise and I will build you a free
            six-page guide: ports, life onboard, what your fare covers, and a
            countdown with your real dates.
          </p>
          <Link href="/plan/" className="btn btn-primary btn-lg">
            Build my free guide
          </Link>
        </div>
      </section>
    </>
  );
}
