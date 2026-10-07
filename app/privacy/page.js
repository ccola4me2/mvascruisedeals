import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How MVAS Cruise Deals collects, uses, and protects your personal information, who it is shared with, and the choices you have.",
  alternates: { canonical: "/privacy/" },
};

const UPDATED = "October 7, 2026";

export default function PrivacyPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Your information</p>
          <h1>Privacy Policy</h1>
          <p className="page-lede">
            A plain-language explanation of what I collect when you use this site
            or get in touch, what I do with it, and the choices you have.
          </p>
          <p className="legal-updated">Last updated {UPDATED}</p>
        </div>
      </section>

      <section className="section">
        <div className="container prose legal">
          <p>
            MVAS Cruise Deals (mvascruisedeals.com) is operated by Brent Beasley,
            an independent travel advisor (FL Seller of Travel #TI128169). In this
            policy, &quot;I,&quot; &quot;me,&quot; and &quot;my&quot; mean MVAS
            Cruise Deals. This site is for people in the United States.
          </p>

          <h2>1. Information I collect</h2>
          <h3>What you give me</h3>
          <ul>
            <li>
              <strong>Quote requests:</strong> your name, email, phone number, city
              and state, the cruise you are interested in, when you want to travel,
              your party size, and anything you add in the notes.
            </li>
            <li>
              <strong>Cruise guide requests:</strong> your name, email, the sailing
              and date you chose, and whether you want deal alerts.
            </li>
            <li>
              <strong>Deal alerts:</strong> your email address. The signup box on
              this site opens a message in your own email app addressed to me, so
              nothing is stored until you send it.
            </li>
            <li>
              <strong>Calls, texts, and emails:</strong> your contact details and
              whatever you choose to tell me.
            </li>
          </ul>
          <p>
            If you book through me, I will also need details such as each
            traveler&apos;s name exactly as it appears on their travel documents
            and date of birth. I collect those separately and securely, not through
            the quote form. Please do not send passport numbers, payment card
            numbers, or other highly sensitive details by email or through this
            website&apos;s forms. I will give you a secure way to share them.
          </p>

          <h3>What is collected automatically</h3>
          <p>
            Like most websites, this site is delivered through Cloudflare, which
            processes technical information such as your IP address, browser type,
            the pages you request, and the date and time. That is used to deliver
            the site, keep it secure, and block abuse. This site does not currently
            use analytics or advertising cookies. If that changes, optional
            analytics will only run if you say yes. See the{" "}
            <Link href="/cookies/">Cookie Policy</Link>.
          </p>

          <h2>2. How I use it</h2>
          <ul>
            <li>To answer your questions and prepare quotes and group rates.</li>
            <li>To build your cruise guide and email it to you.</li>
            <li>To reserve and manage a booking if you decide to cruise with me.</li>
            <li>To send deal alerts, but only if you ask for them.</li>
            <li>To keep the site secure and prevent spam and abuse.</li>
            <li>To understand, in aggregate, how the site is used and improve it.</li>
            <li>To meet legal, tax, and travel-industry record-keeping duties.</li>
          </ul>

          <h2>3. Emails and texts</h2>
          <p>
            A cruise guide email is a one-time message you asked for. Deal alerts are
            sent only if you ask for them, and you can stop them at any time by
            replying &quot;stop&quot; or emailing me. I only text people who have
            contacted me first or asked to be texted.
          </p>

          <h2>4. Who I share it with</h2>
          <p>I do not sell your personal information. I share it only as follows:</p>
          <ul>
            <li>
              <strong>Service providers that help me run the business.</strong>{" "}
              Cloudflare (hosting and security), Resend (sending email), and the
              client-management system used by my agency, Cruises, Tours &amp;
              Travel, where quote requests and bookings are recorded.
            </li>
            <li>
              <strong>Cruise lines and travel suppliers.</strong> If you book,
              Margaritaville at Sea and other suppliers receive the traveler
              details they need to issue your reservation, such as names, dates of
              birth, and travel document information.
            </li>
            <li>
              <strong>When the law requires it,</strong> or to protect the rights,
              safety, and property of my clients, my business, or others.
            </li>
            <li>
              <strong>A business transfer,</strong> if my business is ever sold or
              reorganized, in which case this policy would continue to apply.
            </li>
          </ul>
          <p>
            I do not share personal information for cross-context behavioral
            advertising.
          </p>

          <h2>5. Cookies and similar technologies</h2>
          <p>
            Cookies, local storage, and caching are explained in the{" "}
            <Link href="/cookies/">Cookie Policy</Link>, including how to change
            your choices at any time.
          </p>

          <h2>6. How long I keep it</h2>
          <p>
            I keep personal information for as long as needed to serve you and to
            meet legal, accounting, and travel-industry record-keeping needs. After
            that, I delete it or remove what identifies you.
          </p>

          <h2>7. Your choices and rights</h2>
          <ul>
            <li>You can ask to see, correct, or delete the information I hold about you.</li>
            <li>You can opt out of emails at any time.</li>
            <li>
              Your browser&apos;s Global Privacy Control signal is treated as a
              request to turn optional analytics off.
            </li>
          </ul>
          <p>
            If you live in California or another state with privacy rights, you may
            have additional rights to know, delete, and correct your information
            and to opt out of its sale or sharing. I do not sell or share it for
            advertising, and I will not treat you differently for using your rights.
            To make a request, email me at the address below. I may need to confirm
            it is you before I act on it.
          </p>

          <h2>8. Children</h2>
          <p>
            This site is not directed to children under 13, and I do not knowingly
            collect their information. If you book travel for a child, you give me
            that information as their parent or guardian. If you believe a child has
            sent me information, contact me and I will delete it.
          </p>

          <h2>9. Security</h2>
          <p>
            I use reasonable safeguards, including encrypted connections, to protect
            your information. No method of transmission or storage is completely
            secure, so I cannot promise absolute security.
          </p>

          <h2>10. Links to other sites</h2>
          <p>
            This site links to other sites, such as the cruise line and Facebook
            groups. They have their own privacy practices, and I am not responsible
            for them.
          </p>

          <h2>11. Changes to this policy</h2>
          <p>
            If I change this policy, I will update the date at the top. Material
            changes will be noted on this page.
          </p>

          <h2>12. Contact</h2>
          <p>
            Brent Beasley, MVAS Cruise Deals
            <br />
            Email:{" "}
            <a href="mailto:brentb@cruisestoursandtravel.com">
              brentb@cruisestoursandtravel.com
            </a>
            <br />
            Phone or text: <a href="tel:+15617779911">(561) 777-9911</a>
          </p>

          <p className="form-note">
            MVAS Cruise Deals is an independent travel advisor and is not
            affiliated with or endorsed by Margaritaville at Sea.
          </p>
        </div>
      </section>
    </>
  );
}
