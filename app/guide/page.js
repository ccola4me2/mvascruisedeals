import GuideViewer from "../components/guide/GuideViewer";

// Each guide is personal to the sailing someone picked, so it stays out of
// search results. Pages are built in the browser from ?s=<itinerary>&d=<date>.
export const metadata = {
  title: "Your cruise guide",
  description:
    "A personalized Margaritaville at Sea cruise guide: route, ports, life onboard, what your fare covers, and how to get ready.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/guide/" },
};

export default function GuidePage() {
  return <GuideViewer />;
}
