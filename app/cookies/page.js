import Link from "next/link";
import { ANALYTICS_ENABLED } from "../lib/analyticsConfig";
import CookieSettingsButton from "../components/CookieSettingsButton";

export const metadata = {
  title: "Cookie Policy",
  description:
    "What cookies, local storage, and caching this site uses, and how to control them.",
  alternates: { canonical: "/cookies/" },
};

const UPDATED = "October 7, 2026";

export default function CookiesPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Your information</p>
          <h1>Cookie Policy</h1>
          <p className="page-lede">
            What this site stores on your device, why, and how to control it,
            including cookies, local storage, and the cache.
          </p>
          <p className="legal-updated">Last updated {UPDATED}</p>
        </div>
      </section>

      <section className="section">
        <div className="container prose legal">
          <h2>The short version</h2>
          {ANALYTICS_ENABLED ? (
            <p>
              This site uses no cookies to run. If you choose to allow analytics,
              Google Analytics will set cookies to count visits. It stays off unless
              you accept, and you can change your mind at any time.
            </p>
          ) : (
            <p>
              This site does <strong>not</strong> currently set cookies, and it does
              not use analytics or advertising trackers. If that ever changes,
              optional cookies will only run if you say yes.
            </p>
          )}
          <p>
            <CookieSettingsButton className="legal-btn" />
          </p>

          <h2>What these terms mean</h2>
          <ul>
            <li>
              <strong>Cookies</strong> are small files a website saves in your
              browser.
            </li>
            <li>
              <strong>Local storage</strong> is a similar spot in your browser where
              a site can save a small note, such as a choice you made.
            </li>
            <li>
              <strong>The cache</strong> is a saved copy of site files, like pages,
              images, and fonts, kept so repeat visits load faster.
            </li>
          </ul>

          <h2>What this site uses</h2>
          <div className="legal-table-wrap">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Purpose</th>
                  <th>How long</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>mvas-consent</td>
                  <td>
                    Local storage, necessary
                    {ANALYTICS_ENABLED ? "" : " (not created today)"}
                  </td>
                  <td>Remembers your cookie choice so I do not ask again.</td>
                  <td>Until you clear it or change your choice</td>
                </tr>
                {ANALYTICS_ENABLED ? (
                  <tr>
                    <td>_ga, _ga_*</td>
                    <td>Cookie, analytics (optional)</td>
                    <td>
                      Google Analytics counts visits and shows which pages are
                      useful. Set only if you accept.
                    </td>
                    <td>Up to 2 years</td>
                  </tr>
                ) : (
                  <tr>
                    <td>Analytics cookies</td>
                    <td>Not used</td>
                    <td>No analytics or advertising cookies are set on this site.</td>
                    <td>Not applicable</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {ANALYTICS_ENABLED ? (
            <p>
              The small note in local storage is created only when you make a
              choice. This site uses no session storage and no advertising cookies.
            </p>
          ) : (
            <p>
              Today this site stores nothing on your device apart from the normal
              browser cache described below. The choice note is only created if
              optional analytics is ever switched on and you make a choice. This
              site uses no session storage and no advertising cookies.
            </p>
          )}

          <h2>Security and delivery</h2>
          <p>
            This site is delivered through Cloudflare. To deliver pages and protect
            the site from bots and attacks, Cloudflare may use short-lived technical
            cookies or request headers. They exist to keep the site working and
            secure and are not used to track you across other sites.
          </p>

          <h2>Cache</h2>
          <p>
            Two kinds of caching make this site fast:
          </p>
          <ul>
            <li>
              <strong>Your browser cache.</strong> Your browser keeps copies of the
              pages, images, fonts, and scripts it has already loaded, so the next
              visit is quicker.
            </li>
            <li>
              <strong>Cloudflare&apos;s network cache.</strong> Copies of the
              site&apos;s public pages are kept on servers close to visitors so they
              load faster.
            </li>
          </ul>
          <p>
            These caches hold the same public site files everyone sees. They do not
            hold the details you type into forms, and I do not use them to identify
            you. If a page ever looks out of date, clear your browser&apos;s cache or
            do a hard refresh. Clearing it will not affect any quote request or
            booking.
          </p>

          <h2>Third parties</h2>
          <p>
            This site does not load third-party scripts, fonts, or embeds. If you
            click a link to another site, such as a Facebook share button or the
            cruise line, that site may set its own cookies under its own policy.
          </p>

          <h2>How to control cookies and storage</h2>
          <ul>
            <li>
              Use <strong>Cookie settings</strong> in the footer to change your choice
              at any time.
            </li>
            <li>
              Your browser lets you block or delete cookies and local storage, and
              clear the cache. Blocking everything will not stop this site from
              working.
            </li>
            <li>
              If your browser sends a Global Privacy Control signal, I treat
              optional analytics as off.
            </li>
          </ul>

          <h2>More information</h2>
          <p>
            See the <Link href="/privacy/">Privacy Policy</Link> for how I handle
            personal information. Questions? Email{" "}
            <a href="mailto:brentb@cruisestoursandtravel.com">
              brentb@cruisestoursandtravel.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
