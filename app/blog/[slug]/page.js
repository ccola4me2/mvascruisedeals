import { notFound } from "next/navigation";
import Link from "next/link";
import PostBody from "../../components/PostBody";
import PostCard from "../../components/PostCard";
import { BLOG_NAME, posts, getPost, sortedPosts, readMinutes } from "../../data/posts";
import { BRENT } from "../../data/guideContent";

const fmt = (iso) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getPost(params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      url: `/blog/${p.slug}/`,
      publishedTime: p.date,
      modifiedTime: p.updated || p.date,
      authors: [BRENT.name],
      images: [{ url: p.image }],
    },
  };
}

export default function PostPage({ params }) {
  const p = getPost(params.slug);
  if (!p) notFound();

  const more = sortedPosts().filter((x) => x.slug !== p.slug).slice(0, 3);
  const url = `https://mvascruisedeals.com/blog/${p.slug}/`;

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    image: "https://mvascruisedeals.com" + p.image,
    datePublished: p.date,
    dateModified: p.updated || p.date,
    author: { "@type": "Person", name: BRENT.name },
    publisher: { "@id": "https://mvascruisedeals.com/#agency" },
    mainEntityOfPage: url,
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mvascruisedeals.com/" },
      { "@type": "ListItem", position: 2, name: BLOG_NAME, item: "https://mvascruisedeals.com/blog/" },
      { "@type": "ListItem", position: 3, name: p.short, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <article>
        <section className="page-head post-head">
          <div className="container">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog/">{BLOG_NAME}</Link>
              <span aria-hidden="true">/</span>
              <span>{p.short}</span>
            </nav>
            <p className="eyebrow">{p.category}</p>
            <h1>{p.title}</h1>
            <div className="post-by">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brent-beasley.jpg" alt="" width={44} height={44} />
              <p>
                <b>{BRENT.name}</b>
                <span>
                  {fmt(p.date)}
                  {p.updated && p.updated !== p.date ? `, updated ${fmt(p.updated)}` : ""}
                  {" · "}
                  {readMinutes(p)} min read
                </span>
              </p>
            </div>
          </div>
        </section>

        <div className="container post-wrap">
          <div className="post-hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.imageAlt}
              style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
            />
          </div>
          <PostBody body={p.body} />
          <p className="post-fine">
            Written by {BRENT.name}, independent travel advisor, {BRENT.cred}.
            Information comes from the cruise line&apos;s published materials and
            can change, so confirm details for your sailing before you book.
            This site is not affiliated with or endorsed by Margaritaville at Sea.
          </p>
        </div>
      </article>

      {more.length > 0 && (
        <section className="section section--muted">
          <div className="container">
            <div className="section-head section-head--center">
              <p className="eyebrow">Keep reading</p>
              <h2>More from {BLOG_NAME}</h2>
            </div>
            <div className="blog-grid">
              {more.map((x) => (
                <PostCard key={x.slug} p={x} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
