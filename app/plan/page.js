import Image from "next/image";
import Link from "next/link";
import PlannerForm from "../components/PlannerForm";

export const metadata = {
  title: "Free Cruise Guide Builder",
  description:
    "Pick any Margaritaville at Sea cruise and get a free personalized guide: route, ports and what to do ashore, life onboard, what your fare covers, and a dated countdown to sailing day.",
  alternates: { canonical: "/plan/" },
  openGraph: {
    type: "website",
    siteName: "MVAS Cruise Deals",
    url: "/plan/",
    title: "Free Margaritaville at Sea Cruise Guide Builder",
    description:
      "Pick your cruise and get a personalized six-page guide with ports, onboard life, costs, and a countdown to sailing day.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "MVAS Cruise Deals" }],
  },
};

const INSIDE = [
  ["Your sailing", "The route, dates, and ship at a glance."],
  ["Ports of call", "What to do ashore, and what to know before you go."],
  ["Life onboard", "Dining, bars, pools, and shows."],
  ["What your fare covers", "What's included, what costs extra, and the fees."],
  ["Getting ready", "A countdown with your real dates, and what to bring."],
  ["How to book", "Two easy ways, with no booking fees."],
];

export default function PlanPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Free, in about a minute</p>
          <h1>Build your cruise guide.</h1>
          <p className="page-lede">
            Pick any Margaritaville at Sea cruise and I&apos;ll build you a personal
            six-page guide: where you&apos;ll go, what to do ashore, life onboard,
            what your fare covers, and a countdown with your real dates.
          </p>
        </div>
      </section>

      <section className="section pl-section">
        <div className="container pl-wrap">
          <PlannerForm />
          <aside className="pl-aside">
            <Image
              src="/guide-preview.jpg"
              alt="Two pages from a sample cruise guide"
              width={656}
              height={608}
              className="pl-preview"
            />
            <h2>What&apos;s in your guide</h2>
            <ol className="pl-inside">
              {INSIDE.map(([h, t], i) => (
                <li key={h}>
                  <span>{i + 1}</span>
                  <div>
                    <b>{h}</b>
                    <p>{t}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="pl-sample">
              Just curious?{" "}
              <Link href="/guide/?s=beachcomber-galveston-7-belize-and-mexico--coz-bel-pro&d=2027-10-22">
                See a sample guide
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>Rather talk it through?</h2>
          <p>
            Call or text me and I&apos;ll help you pick the right ship, cabin, and
            sailing. No fees, no pressure.
          </p>
          <Link href="/contact/" className="btn btn-primary btn-lg">
            Get My Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
