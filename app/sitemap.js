import { destinations } from "./data/destinations";

const BASE = "https://mvascruisedeals.com";

export default function sitemap() {
  const staticPaths = [
    { path: "/", priority: 1 },
    { path: "/deals/", priority: 0.9 },
    { path: "/sailings/", priority: 0.9 },
    { path: "/group-rates/", priority: 0.8 },
    { path: "/cruises/", priority: 0.7 },
    { path: "/palm-beach-cruises/", priority: 0.7 },
    { path: "/tampa-cruises/", priority: 0.7 },
    { path: "/miami-cruises/", priority: 0.7 },
    { path: "/faq/", priority: 0.6 },
    { path: "/about/", priority: 0.5 },
    { path: "/contact/", priority: 0.6 },
  ];

  const dest = destinations.map((d) => ({
    path: `/cruises/${d.slug}/`,
    priority: 0.6,
  }));

  return [...staticPaths, ...dest].map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly",
    priority,
  }));
}
