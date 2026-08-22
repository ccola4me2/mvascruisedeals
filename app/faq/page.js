import Link from "next/link";

export const metadata = {
  title: "Margaritaville at Sea FAQ",
  description:
    "Common questions about booking Margaritaville at Sea: whether an advisor costs more, what's included, ships and ports, group rates, deposits, and how to get a quote.",
  alternates: { canonical: "/faq/" },
};

const faqs = [
  {
    q: "Does it cost more to book with a travel advisor?",
    a: "No. You pay the same cruise fare as booking direct, and often less once we apply current promotions, group rates, and onboard credit. Our help is free, with no booking fees, and you get a real person from quote to gangway.",
  },
  {
    q: "Which ships and homeports does Margaritaville at Sea sail?",
    a: "Three ships: Paradise from the Port of Palm Beach (Bahamas, Key West, and new Cozumel sailings), Islander from Port Tampa Bay (4 to 10-night Western and Southern Caribbean), and Beachcomber from PortMiami (Eastern and Southern Caribbean, now sailing its inaugural season).",
  },
  {
    q: "What's included in the cruise fare?",
    a: "Your fare covers your stateroom, most main dining, onboard entertainment, and the sailing itself. Drink packages, specialty dining, gratuities, shore excursions, and Wi-Fi are typically extra. We'll spell out exactly what's included for your specific sailing in your quote.",
  },
  {
    q: "How far in advance should I book?",
    a: "Earlier is usually better for cabin choice and price, especially on holidays, short getaways, and the new Beachcomber sailings. That said, we watch for last-minute deals too. Send us your dates and we'll tell you honestly whether to book now or wait.",
  },
  {
    q: "Do you handle group cruises?",
    a: "Yes, that's a specialty. Groups typically start around 6 cabins (12 guests) and unlock group pricing, perks, and flexible deposits. We hold the cabin block, manage every guest's booking and payments, and handle the details to sail day. See our Group Rates page.",
  },
  {
    q: "How do deposits and payments work?",
    a: "Most sailings book with a deposit and a final payment due closer to sailing; some promotions offer reduced deposits. For groups, guests can book and pay their own way against the held block. We'll lay out the exact schedule for your sailing before you commit.",
  },
  {
    q: "Can I get onboard credit or other perks?",
    a: "Often, yes. Many sailings carry onboard credit or promotional offers, and group bookings can add amenity perks. Available offers change by sailing and date, so we'll confirm what yours qualifies for in the quote.",
  },
  {
    q: "How do I get a quote?",
    a: "Send your preferred ship, dates, and party size through our request form, or just call or text (561) 777-9911. We'll reply with the best available fare or group rate, usually within one business day. No fees, no obligation.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Good to know</p>
          <h1>Margaritaville at Sea FAQ</h1>
          <p className="page-lede">
            Straight answers on booking Margaritaville at Sea, from what&apos;s
            included to how group rates and deposits work. Still have a question?
            We&apos;re one call or text away.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="faq-list">
            {faqs.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>Still have questions?</h2>
          <p>
            Ask us anything about Margaritaville at Sea, ships, ports, cabins, or
            group rates. We&apos;ll get you an honest answer and the best
            available fare.
          </p>
          <Link href="/contact/" className="btn btn-primary btn-lg">
            Get My Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
