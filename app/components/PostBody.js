import Link from "next/link";
import { PORTS } from "../data/guideContent";
import { portExcursionUrl, EXCURSION_DISCLOSURE } from "../lib/excursions";

// Inline markup: **bold** and [text](url). Internal urls use next/link.
function Inline({ text }) {
  const out = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(<strong key={i++}>{m[1]}</strong>);
    } else if (m[3].startsWith("/")) {
      out.push(
        <Link key={i++} href={m[3]}>
          {m[2]}
        </Link>
      );
    } else {
      out.push(
        <a key={i++} href={m[3]} target="_blank" rel="noopener">
          {m[2]}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export default function PostBody({ body }) {
  return (
    <div className="post-body">
      {body.map((b, i) => {
        switch (b.t) {
          case "h2":
            return <h2 key={i}>{b.x}</h2>;
          case "p":
            return (
              <p key={i}>
                <Inline text={b.x} />
              </p>
            );
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>
                    <Inline text={it} />
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <aside className="post-callout" key={i}>
                <b>{b.h}</b>
                <p>
                  <Inline text={b.x} />
                </p>
              </aside>
            );
          case "ports":
            return (
              <div className="post-ports" key={i}>
                {b.keys.map((k) => {
                  const p = PORTS[k];
                  if (!p) return null;
                  return (
                    <article className="post-port" key={k}>
                      <div className="post-port-head">
                        <h3>{p.name}</h3>
                        <span>{p.mood}</span>
                      </div>
                      <p className="post-port-blurb">{p.blurb}</p>
                      <ul>
                        {p.bullets.slice(0, 3).map(([bold, t]) => (
                          <li key={bold}>
                            <strong>{bold}</strong> {t}
                          </li>
                        ))}
                      </ul>
                      <p className="post-port-tip">
                        <strong>Good to know:</strong> {p.tip}
                      </p>
                      <a
                        className="btn btn-gold"
                        href={portExcursionUrl(k)}
                        target="_blank"
                        rel="noopener"
                      >
                        Book {p.name.split(",")[0]} excursions
                      </a>
                    </article>
                  );
                })}
                <p className="post-ports-note">{EXCURSION_DISCLOSURE}</p>
              </div>
            );
          case "cta":
            return (
              <div className="post-cta" key={i}>
                <div>
                  <h3>Ready to sail?</h3>
                  <p>
                    I will check availability and send a quote, with no booking
                    fees. Or build a free personal guide to any sailing.
                  </p>
                </div>
                <div className="post-cta-btns">
                  <Link href="/contact/" className="btn btn-primary">
                    Get a free quote
                  </Link>
                  <Link href="/plan/" className="btn btn-gold">
                    Build my free guide
                  </Link>
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
