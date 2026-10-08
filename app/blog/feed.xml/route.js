import { BLOG_NAME, BLOG_TAGLINE, sortedPosts } from "../../data/posts";

export const dynamic = "force-static";

const BASE = "https://mvascruisedeals.com";
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function GET() {
  const posts = sortedPosts();
  const items = posts
    .map(
      (p) => `<item>
<title>${esc(p.title)}</title>
<link>${BASE}/blog/${p.slug}/</link>
<guid isPermaLink="true">${BASE}/blog/${p.slug}/</guid>
<pubDate>${new Date(p.date + "T12:00:00Z").toUTCString()}</pubDate>
<category>${esc(p.category)}</category>
<description>${esc(p.excerpt)}</description>
</item>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(BLOG_NAME)}</title>
<link>${BASE}/blog/</link>
<description>${esc(BLOG_TAGLINE)}</description>
<language>en-us</language>
${items}
</channel></rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
