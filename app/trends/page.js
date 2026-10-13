import TrendsView from "./TrendsView";
import data from "../../data/trends.json";

export const metadata = {
  title: "Margaritaville at Sea Price Trends",
  description:
    "Daily price moves on Margaritaville at Sea cruises: which fares dropped, which rose, what is sailing soon, and the lowest fares per night on Paradise, Islander, and Beachcomber.",
  alternates: { canonical: "/trends/" },
  openGraph: {
    title: "Margaritaville at Sea Price Trends",
    description: "What changed on Margaritaville at Sea fares today, checked daily.",
    url: "/trends/",
    images: [{ url: "/og/trends.jpg", width: 1200, height: 630, alt: "Margaritaville at Sea price trends" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Margaritaville at Sea Price Trends",
    description: "What changed on Margaritaville at Sea fares today, checked daily.",
    images: ["/og/trends.jpg"],
  },
};

export default function TrendsPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Margaritaville at Sea Price Trends",
    url: "https://mvascruisedeals.com/trends/",
    dateModified: data.meta.snapshotDate,
    isPartOf: { "@id": "https://mvascruisedeals.com/#agency" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <TrendsView data={data} />
    </>
  );
}
