"use client";

import { useEffect, useMemo, useState } from "react";
import { quoteHref } from "../lib/quote";
import { featuredDeals } from "../data/featuredDeals";

// The daily Cruise Price Trends page. Everything it shows comes from
// data/trends.json, built by scripts/build-trends.py from the daily snapshots
// and the change log. No numbers are typed in here.

const SHIPS = ["Paradise", "Islander", "Beachcomber"];
const ROOMS = ["Interior", "Ocean View", "Balcony", "Suite"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOWS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Brent's own deals (app/data/featuredDeals.js). A fare gets the "Brent's deal"
// tag ONLY when Brent's price for that cabin is lower than today's public fare
// from the tracker. Both are per person, double occupancy. A deal quoted as a
// total for two is halved; a deal that is not cheaper in a cabin is not tagged
// for that cabin, so the tag always means a saving you can point to.
const num = (str) => Number(String(str).replace(/[$,]/g, ""));
const roomName = (t) => (/^ocean/i.test(t) ? "Ocean View" : t);
const DEALS = featuredDeals
  .filter((d) => d.landing)
  .map((d) => {
    const rates = {};
    (d.cabins || []).forEach((c) => {
      rates[roomName(c.type)] = num(c.price);
    });
    if (!d.cabins && d.compare && /total for two/i.test(d.compare.basis || "")) {
      d.compare.rows.forEach((r) => {
        rates[roomName(r.cabin)] = Math.round((num(r.ours) / 2) * 100) / 100;
      });
    }
    return {
      ship: SHIPS.find((s) => d.ship.endsWith(s)),
      sail: d.landing.departs,
      slug: d.landing.slug,
      title: d.title,
      when: d.when,
      rates,
    };
  });

// The cabins where Brent beats the public fare, with the saving per person.
function betterRooms(deal, fares) {
  const out = [];
  Object.keys(deal.rates).forEach((room) => {
    const pub = fares.find((f) => f[0] === deal.ship && f[2] === deal.sail && f[3] === room);
    if (pub && deal.rates[room] < pub[4]) {
      out.push({ room, brent: deal.rates[room], pub: pub[4], save: Math.round((pub[4] - deal.rates[room]) * 100) / 100 });
    }
  });
  return out;
}

// room given: tag only if that cabin is cheaper with Brent. No room (a whole
// sailing): tag if any cabin is.
function DealTag({ ship, sail, room, fares }) {
  const d = DEALS.find((x) => x.ship === ship && x.sail === sail);
  if (!d) return null;
  const better = betterRooms(d, fares);
  const hit = room ? better.find((b) => b.room === room) : better[0];
  if (!hit) return null;
  return (
    <a
      className="tr-deal"
      href={"/deals/" + d.slug + "/"}
      title={"My rate is " + money(hit.save) + " per person below today's public " + hit.room + " fare"}
    >
      Brent&apos;s deal
    </a>
  );
}

// The free guide for a sailing: /plan/ opens with that cruise and date already
// picked when we know it, otherwise it opens the plain builder.
const guideLink = (guides, ship, itin, sail) => {
  const id = guides && guides[ship + "|" + itin + "|" + sail];
  return id ? "/plan/?s=" + encodeURIComponent(id) + "&d=" + sail : "/plan/";
};

const parts = (iso) => iso.split("-").map(Number);
const shortDate = (iso) => {
  const [, m, d] = parts(iso);
  return MONTHS[m - 1] + " " + d;
};
const longDate = (iso) => {
  const [y, m, d] = parts(iso);
  return MONTHS[m - 1] + " " + d + ", " + y;
};
const withDow = (iso) => {
  const [y, m, d] = parts(iso);
  return DOWS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()] + ", " + shortDate(iso);
};
const dayNum = (iso) => {
  const [y, m, d] = parts(iso);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
};
const money = (n) =>
  "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const signed = (n) => (n > 0 ? "+" : n < 0 ? "-" : "") + money(Math.abs(n));
const signedPct = (n) => (n > 0 ? "+" : n < 0 ? "-" : "") + Math.abs(n).toFixed(1) + "%";
const plural = (n, one, many) => n + " " + (n === 1 ? one : many || one + "s");

function Spark({ hist, up }) {
  if (!hist || hist.length < 2) return null;
  const w = 88;
  const h = 28;
  const xs = hist.map((p) => dayNum(p[0]));
  const ys = hist.map((p) => p[1]);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const y0 = Math.min(...ys);
  const y1 = Math.max(...ys);
  const px = (x) => 3 + ((x - x0) / Math.max(x1 - x0, 1)) * (w - 6);
  const py = (y) => h - 4 - ((y - y0) / Math.max(y1 - y0, 1)) * (h - 8);
  const d = hist.map((p, i) => (i ? "L" : "M") + px(dayNum(p[0])).toFixed(1) + " " + py(p[1]).toFixed(1)).join("");
  const last = hist[hist.length - 1];
  return (
    <svg className="tr-spark" viewBox={"0 0 " + w + " " + h} width={w} height={h} role="img"
      aria-label={"Price history, " + money(hist[0][1]) + " to " + money(last[1])}>
      <path d={d} fill="none" stroke={up ? "var(--coral)" : "var(--teal)"} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={px(dayNum(last[0]))} cy={py(last[1])} r="3" fill={up ? "var(--coral)" : "var(--teal)"} />
    </svg>
  );
}

function MoveRow({ m, fares, guides }) {
  const up = m.diff > 0;
  const cruise = m.nights + "-Night " + m.itin.replace(/^\d+-Night\s*/, "");
  return (
    <li className="tr-row">
      <div className="tr-row-main">
        <p className="tr-row-top">
          <span className={"tr-ship tr-ship--" + m.ship.toLowerCase()}>{m.ship}</span>
          <span className="tr-row-room">{m.room}</span>
          <DealTag ship={m.ship} sail={m.sail} room={m.room} fares={fares} />
        </p>
        <h3>{m.itin}</h3>
        <p className="tr-row-meta">
          Sails {longDate(m.sail)} &middot; {plural(m.nights, "night")} &middot; detected {shortDate(m.date)}
        </p>
      </div>
      <div className="tr-row-price">
        <p className="tr-was-now">
          <s>{money(m.old)}</s> <b>{money(m.new)}</b>
        </p>
        <p className={"tr-chip " + (up ? "tr-chip--up" : "tr-chip--down")}>
          {signed(m.diff)} ({signedPct(m.pct)})
        </p>
        {m.now === null && <p className="tr-gone">Not on sale at the latest check</p>}
      </div>
      <div className="tr-row-side">
        <Spark hist={m.hist} up={up} />
        <span className="tr-links">
          <a
            className="tr-ask"
            href={quoteHref({ ship: m.ship, cruise: cruise + " (" + m.room + ")", when: longDate(m.sail) })}
          >
            Ask Brent
          </a>
          <a className="tr-guide" href={guideLink(guides, m.ship, m.itin, m.sail)}>
            Free guide
          </a>
        </span>
      </div>
    </li>
  );
}

function ActivityChart({ timeline }) {
  const rows = timeline.slice(-30);
  const max = Math.max(1, ...rows.map((r) => r.drops + r.increases));
  const w = 720;
  const h = 200;
  const left = 8;
  const bottom = 26;
  const bw = (w - left * 2) / rows.length;
  const y = (v) => ((h - bottom - 8) * v) / max;
  return (
    <svg className="tr-chart" viewBox={"0 0 " + w + " " + h} role="img"
      aria-label="Price changes detected per day, drops and increases">
      {[0.5, 1].map((t) => (
        <line key={t} x1={left} x2={w - left} y1={h - bottom - y(max * t)} y2={h - bottom - y(max * t)} stroke="var(--line)" strokeDasharray="3 4" />
      ))}
      <line x1={left} x2={w - left} y1={h - bottom} y2={h - bottom} stroke="var(--line)" />
      {rows.map((r, i) => {
        const x = left + i * bw + bw * 0.14;
        const bwi = bw * 0.72;
        const hu = y(r.increases);
        const hd = y(r.drops);
        return (
          <g key={r.date}>
            <title>{longDate(r.date) + ": " + r.drops + " drops, " + r.increases + " increases"}</title>
            <rect x={x} y={h - bottom - hu} width={bwi} height={hu} fill="var(--coral)" rx="2" />
            <rect x={x} y={h - bottom - hu - hd} width={bwi} height={hd} fill="var(--teal)" rx="2" />
            {(i % 5 === 0 || i === rows.length - 1) && (
              <text x={x + bwi / 2} y={h - 8} textAnchor="middle" fontSize="11" fill="var(--slate)">
                {shortDate(r.date)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function TrendsView({ data }) {
  const { meta, last, listing, byShip, moves, lowest, soon, watch, timeline, totals, fares, guides } = data;
  // Open on the narrowest window that has at least three drops, so a quiet day
  // does not greet people with an almost empty list.
  const [win, setWin] = useState(() => {
    const drops = moves.filter((m) => m.diff < 0);
    if (drops.filter((m) => m.date === meta.lastChangeDate).length >= 3) return "latest";
    if (drops.filter((m) => dayNum(meta.snapshotDate) - dayNum(m.date) <= 7).length >= 3) return "week";
    return "month";
  });
  const [dir, setDir] = useState("drops");
  const [ship, setShip] = useState("All");
  const [room, setRoom] = useState("All");
  const [sort, setSort] = useState("dollars");
  const [all, setAll] = useState(false);

  // Menu links like /trends/#week and /trends/#price-watch: switch the list to
  // the 7 day view when asked, then scroll to the section.
  useEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace("#", "");
      if (!h) return;
      if (h === "week") {
        setWin("week");
        setDir("drops");
        setShip("All");
        setRoom("All");
        setAll(false);
      }
      const id = h === "week" ? "moves" : h;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ block: "start" });
      }, 80);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const snap = meta.snapshotDate;
  const list = useMemo(() => {
    let rows = moves.filter((m) => (dir === "drops" ? m.diff < 0 : m.diff > 0));
    if (win === "latest") rows = rows.filter((m) => m.date === meta.lastChangeDate);
    if (win === "week") rows = rows.filter((m) => dayNum(snap) - dayNum(m.date) <= 7);
    if (ship !== "All") rows = rows.filter((m) => m.ship === ship);
    if (room !== "All") rows = rows.filter((m) => m.room === room);
    const by = {
      dollars: (a, b) => Math.abs(b.diff) - Math.abs(a.diff),
      percent: (a, b) => Math.abs(b.pct) - Math.abs(a.pct),
      soonest: (a, b) => a.sail.localeCompare(b.sail),
    }[sort];
    return [...rows].sort(by);
  }, [moves, win, dir, ship, room, sort, snap, meta.lastChangeDate]);

  const shown = all ? list : list.slice(0, 10);
  const winLabel = win === "latest" ? "Latest moves, " + shortDate(meta.lastChangeDate) : win === "week" ? "Past 7 days" : "Past " + meta.windowDays + " days";
  const quiet = meta.quiet;
  // Only deals where Brent's price beats the public fare, cabin by cabin.
  const dealStrip = DEALS.filter((d) => d.ship && d.sail >= snap)
    .map((d) => ({ ...d, better: betterRooms(d, fares) }))
    .filter((d) => d.better.length > 0);
  const best = last.biggestDrop;
  const newN = listing.newFares.length;
  const goneN = listing.soldOut.length;

  return (
    <>
      {/* Hero */}
      <section className="page-head tr-hero">
        <div className="container">
          <p className="eyebrow">Margaritaville at Sea price tracker</p>
          <h1>Cruise price trends</h1>
          <p className="page-lede">
            What changed on Paradise, Islander, and Beachcomber fares, checked every day.
            Updated {withDow(snap)}, {meta.fares} fares across {SHIPS.length} ships.
          </p>

          <div className={"tr-status" + (quiet ? " tr-status--quiet" : "")}>
            <div className="tr-status-head">
              <p className="tr-status-label">{withDow(snap)}</p>
              <h2>
                {quiet
                  ? "No fares changed price today."
                  : plural(last.drops + last.increases, "fare") + " changed price today."}
              </h2>
              <p>
                {quiet
                  ? "The last price moves were detected " + withDow(meta.lastChangeDate) + ". "
                  : ""}
                {newN > 0 || goneN > 0
                  ? plural(newN, "fare") + " newly listed, " + goneN + " sold out since the " + shortDate(listing.comparedWith) + " check."
                  : "Nothing was newly listed or sold out."}
              </p>
            </div>

            <dl className="tr-tiles">
              <div className="tr-tile tr-tile--down">
                <dt>Price drops</dt>
                <dd>{last.drops}</dd>
                <p>{shortDate(last.date)}</p>
              </div>
              <div className="tr-tile tr-tile--up">
                <dt>Price increases</dt>
                <dd>{last.increases}</dd>
                <p>{shortDate(last.date)}</p>
              </div>
              <div className="tr-tile">
                <dt>Newly listed</dt>
                <dd>{newN}</dd>
                <p>vs {shortDate(listing.comparedWith)}</p>
              </div>
              <div className="tr-tile">
                <dt>Sold out</dt>
                <dd>{goneN}</dd>
                <p>vs {shortDate(listing.comparedWith)}</p>
              </div>
            </dl>

            {best && (
              <div className="tr-best">
                <p className="tr-best-label">Biggest drop on {shortDate(last.date)}</p>
                <p className="tr-best-title">
                  {best.ship} {best.itin}
                </p>
                <p className="tr-best-meta">
                  {best.room} &middot; sails {longDate(best.sail)}
                </p>
                <p className="tr-best-price">
                  <s>{money(best.old)}</s> <b>{money(best.new)}</b>
                  <span className="tr-chip tr-chip--down">
                    {signed(best.diff)} ({signedPct(best.pct)})
                  </span>
                </p>
                <a
                  className="btn btn-gold"
                  href={quoteHref({ ship: best.ship, cruise: best.nights + "-Night " + best.itin.replace(/^\d+-Night\s*/, "") + " (" + best.room + ")", when: longDate(best.sail) })}
                >
                  Ask Brent about this fare
                </a>
              </div>
            )}
          </div>
          <p className="tr-basis">{meta.basis}</p>
        </div>
      </section>

      {/* Brent's deals that beat the public fare today */}
      {dealStrip.length > 0 && (
        <section className="tr-deals">
          <div className="container">
            <p className="tr-deals-label">My rate beats today&apos;s public fare</p>
            <ul>
              {dealStrip.map((d) => (
                <li key={d.slug}>
                  <div className="tr-deals-info">
                    <p className="tr-deals-title">{d.title}</p>
                    <p className="tr-deals-meta">{d.ship} &middot; {d.when}</p>
                    <ul className="tr-deals-cabins">
                      {d.better.map((b) => (
                        <li key={b.room}>
                          <b>{b.room}</b> my rate {money(b.brent)} vs public {money(b.pub)}
                          <span className="tr-deals-save">save {money(b.save)} per person</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a className="btn btn-gold" href={"/deals/" + d.slug + "/"}>See my deal</a>
                </li>
              ))}
            </ul>
            <p className="tr-deals-note">
              Per person, double occupancy. Public fares are today&apos;s sale price on the cruise line&apos;s booking
              site. Rates and availability can change, so ask me to confirm before you book.
            </p>
          </div>
        </section>
      )}

      {/* Free guide band */}
      <section className="tr-guideband">
        <div className="container">
          <div className="tr-guideband-in">
          <div>
            <p className="tr-guideband-label">Free for every sailing</p>
            <h2>Watching a cruise? Get a free guide to it.</h2>
            <p>
              Pick any Margaritaville at Sea sailing and I will email you a six-page guide: ports and what to do ashore,
              what your fare covers, and a countdown with your real dates. Tick the box on the next page and I will also
              send you updates for that cruise, like guide improvements and price changes. Every fare below links to its
              own guide.
            </p>
          </div>
          <a className="btn btn-gold btn-lg" href="/plan/">Build my free guide</a>
          </div>
        </div>
      </section>

      {/* Moves */}
      <section className="section" id="moves">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">What moved</p>
              <h2>{winLabel}</h2>
            </div>
          </div>

          <div className="tr-controls">
            <div className="tr-seg" role="tablist" aria-label="Time window">
              {[["latest", "Latest day"], ["week", "7 days"], ["month", meta.windowDays + " days"]].map(([k, l]) => (
                <button key={k} type="button" className={win === k ? "is-on" : ""} onClick={() => { setWin(k); setAll(false); }}>{l}</button>
              ))}
            </div>
            <div className="tr-seg" role="tablist" aria-label="Direction">
              <button type="button" className={"tr-dn" + (dir === "drops" ? " is-on" : "")} onClick={() => { setDir("drops"); setAll(false); }}>Drops</button>
              <button type="button" className={"tr-up" + (dir === "increases" ? " is-on" : "")} onClick={() => { setDir("increases"); setAll(false); }}>Increases</button>
            </div>
            <label className="tr-sort">
              <span>Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="dollars">Biggest dollar change</option>
                <option value="percent">Biggest percent change</option>
                <option value="soonest">Sailing soonest</option>
              </select>
            </label>
          </div>
          <div className="tr-chips" aria-label="Filters">
            {["All", ...SHIPS].map((s) => (
              <button key={s} type="button" className={"tr-fchip" + (ship === s ? " is-on" : "")} onClick={() => { setShip(s); setAll(false); }}>{s === "All" ? "All ships" : s}</button>
            ))}
            <span className="tr-chips-gap" aria-hidden="true" />
            {["All", ...ROOMS].map((r) => (
              <button key={r} type="button" className={"tr-fchip" + (room === r ? " is-on" : "")} onClick={() => { setRoom(r); setAll(false); }}>{r === "All" ? "All cabins" : r}</button>
            ))}
          </div>

          {list.length === 0 ? (
            <p className="tr-empty">
              No {dir === "drops" ? "price drops" : "price increases"} match these filters
              {win === "latest" ? " on " + shortDate(meta.lastChangeDate) : ""}.{" "}
              {win === "latest" ? "Try the 7 or 30 day view." : "Try clearing a filter."}
            </p>
          ) : (
            <>
              <p className="tr-count">{plural(list.length, "fare")}</p>
              <ul className="tr-list">
                {shown.map((m, i) => (
                  <MoveRow key={m.date + m.ship + m.itin + m.sail + m.room + i} m={m} fares={fares} guides={guides} />
                ))}
              </ul>
              {list.length > 10 && (
                <p className="tr-more">
                  <button type="button" className="btn btn-outline" onClick={() => setAll(!all)}>
                    {all ? "Show fewer" : "Show all " + list.length}
                  </button>
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Sailing soon */}
      {soon.length > 0 && (
        <section className="section section--muted" id="sailing-soon">
          <div className="container">
            <div className="section-head section-head--center">
              <p className="eyebrow">Leaving in the next 30 days</p>
              <h2>Sailing soon</h2>
              <p className="section-lede">The lowest fare still on sale for each departure coming up.</p>
            </div>
            <ul className="tr-soon">
              {soon.map((s) => (
                <li key={s.ship + s.itin + s.sail}>
                  <p className="tr-soon-date">{withDow(s.sail)}</p>
                  <p className="tr-soon-title">{s.itin}</p>
                  <p className="tr-soon-meta">
                    <span className={"tr-ship tr-ship--" + s.ship.toLowerCase()}>{s.ship}</span> {plural(s.nights, "night")}{" "}
                    <DealTag ship={s.ship} sail={s.sail} room={s.room} fares={fares} />
                  </p>
                  <p className="tr-soon-price">
                    from <b>{money(s.price)}</b> <span>{s.room}</span>
                  </p>
                  <span className="tr-links">
                    <a className="tr-ask" href={quoteHref({ ship: s.ship, cruise: s.nights + "-Night " + s.itin.replace(/^\d+-Night\s*/, ""), when: longDate(s.sail) })}>Ask Brent</a>
                    <a className="tr-guide" href={guideLink(guides, s.ship, s.itin, s.sail)}>Free guide</a>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Price watch + lowest */}
      <section className="section">
        <div className="container tr-two">
          <div id="price-watch">
            <div className="section-head">
              <div>
                <p className="eyebrow">Most active, past {meta.windowDays} days</p>
                <h2>Price watch</h2>
              </div>
            </div>
            <p className="tr-note">Sailings whose fares have changed the most. A busy sailing is one where waiting can pay, or cost you.</p>
            <ol className="tr-watch">
              {watch.map((w) => (
                <li key={w.ship + w.itin + w.sail}>
                  <div>
                    <p className="tr-watch-title">{w.itin}</p>
                    <p className="tr-watch-meta">
                      <span className={"tr-ship tr-ship--" + w.ship.toLowerCase()}>{w.ship}</span> sails {longDate(w.sail)}{" "}
                      <DealTag ship={w.ship} sail={w.sail} fares={fares} />
                    </p>
                  </div>
                  <div className="tr-watch-n">
                    <b>{w.moves}</b>
                    <span>{w.drops} down, {w.increases} up</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div id="lowest-per-night">
            <div className="section-head">
              <div>
                <p className="eyebrow">Interior cabins</p>
                <h2>Lowest per night</h2>
              </div>
            </div>
            <p className="tr-note">The cheapest interior fares today, ranked by price per person per night.</p>
            <ol className="tr-watch">
              {lowest.slice(0, 8).map((r) => (
                <li key={r.ship + r.itin + r.sail}>
                  <div>
                    <p className="tr-watch-title">{r.itin}</p>
                    <p className="tr-watch-meta">
                      <span className={"tr-ship tr-ship--" + r.ship.toLowerCase()}>{r.ship}</span> sails {longDate(r.sail)}{" "}
                      <DealTag ship={r.ship} sail={r.sail} room={r.room} fares={fares} />
                    </p>
                  </div>
                  <div className="tr-watch-n">
                    <b>{money(r.perNight)}</b>
                    <span>per night &middot; {money(r.price)} total</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* By ship */}
      <section className="section section--muted">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Fleet snapshot</p>
            <h2>The three ships today</h2>
          </div>
          <div className="tr-ships">
            {SHIPS.map((s) => {
              const b = byShip[s];
              const c = b.cheapestInteriorPerNight;
              return (
                <article className="tr-shipcard" key={s}>
                  <p className={"tr-ship tr-ship--" + s.toLowerCase()}>{s}</p>
                  <h3>Sails from {b.port}</h3>
                  <dl>
                    <div><dt>Sailings priced</dt><dd>{b.sailings}</dd></div>
                    <div><dt>Fares tracked</dt><dd>{b.fares}</dd></div>
                    <div><dt>Median interior</dt><dd>{b.medianInterior ? money(b.medianInterior) : "n/a"}</dd></div>
                  </dl>
                  {c && (
                    <p className="tr-shipcard-low">
                      Lowest interior per night: <b>{money(c.perNight)}</b>, {c.itin}, {shortDate(c.sail)}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Activity */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow">Since {longDate(meta.firstTracked)}</p>
            <h2>Daily price activity</h2>
            <p className="section-lede">
              {totals.drops} drops and {totals.increases} increases recorded in the change log.
            </p>
          </div>
          <div className="tr-chart-wrap">
            <ActivityChart timeline={timeline} />
            <p className="tr-legend">
              <span><i className="tr-key tr-key--down" /> Drops</span>
              <span><i className="tr-key tr-key--up" /> Increases</span>
              <span className="tr-legend-note">Last 30 days with changes. Days with no check show no bar.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Reading it right */}
      <section className="section section--muted">
        <div className="container tr-read">
          <h2>How to read this page</h2>
          <ul>
            <li><b>Prices are per person, double occupancy,</b> with taxes and fees included, at the sale price shown on the cruise line&apos;s booking site.</li>
            <li><b>A drop is not always a bargain.</b> Cabins sell out, and a fare that rose last week may still be below where it will be next month.</li>
            <li><b>Group rates and special offers are not shown here.</b> They can be lower. Ask for a quote on any sailing.</li>
            <li><b>This is an independent tracker,</b> not the cruise line, and fares can change at any time. Check the final price before you book.</li>
          </ul>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <h2>See a fare you like?</h2>
          <p>Tell me the sailing and cabin and I will check availability and send your quote, with no booking fees.</p>
          <p className="tr-cta-btns">
            <a href="/contact/" className="btn btn-primary btn-lg">Get my free quote</a>
            <a href="/plan/" className="btn btn-gold btn-lg">Or build a free guide</a>
          </p>
        </div>
      </section>
    </>
  );
}
