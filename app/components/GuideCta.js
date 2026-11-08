import Link from "next/link";

// A soft ask for people who are not ready to request a quote: the free guide
// is built from the same sailing data, and the search box opens already filled in.
export default function GuideCta({ q, heading = "Not ready to book? Start with a free guide", text }) {
  return (
    <section className="section guide-cta-wrap">
      <div className="container">
        <div className="guide-cta">
          <div>
            <h2>{heading}</h2>
            <p>
              {text ||
                "Pick your cruise and date and I will build you a guide with the ports, what to do ashore, what to pack and how boarding day works. Free, and I email it to you."}
            </p>
          </div>
          <Link href={q ? "/plan/?q=" + encodeURIComponent(q) : "/plan/"} className="btn btn-gold btn-lg">
            Build my free guide
          </Link>
        </div>
      </div>
    </section>
  );
}
