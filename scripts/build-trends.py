#!/usr/bin/env python3
"""Build data/trends.json for the /trends/ page from the files in data/raw/.

Feed it new files each day:
  1. Drop the day's "MVAS Price Snapshot YYYY-MM-DD[ (suffix)].json" into data/raw/
  2. Replace the change log with a fresh CSV export of the "MVAS Price Change Log"
     sheet (one file, named like "MVAS Price Change Log ... .csv"; the newest
     export contains every older row, so delete the old export)
  3. python3 scripts/build-trends.py
  4. Commit data/raw and data/trends.json

The change log is the source of price history: each fare's price over time is
rebuilt from its Old Price and New Price rows. Snapshots supply today's full
fare list (and what was newly listed or sold out between two snapshots).

Standard library only, idempotent, safe in CI. The snapshot "note" and "run"
fields are internal, so this script strips them from the archived copies in
data/raw/ on every run, and they never reach trends.json.
"""
import csv, glob, json, os, re, statistics, sys
from collections import defaultdict
from datetime import date, timedelta

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "data", "raw")
OUT = os.path.join(ROOT, "data", "trends.json")

PORTS = {"Paradise": "Port of Palm Beach", "Islander": "Port Tampa Bay", "Beachcomber": "PortMiami"}
ROOMS = ["Interior", "Ocean View", "Balcony", "Suite"]
WINDOW_DAYS = 30          # how far back the page lists moves
MIN_LOG_ROWS = 1000       # refuse to build on a truncated change log


def iso_sail(mdy):
    m, d, y = mdy.split("/")
    return "20%s-%s-%s" % (y, m.zfill(2), d.zfill(2))


def nights(itin):
    m = re.match(r"(\d+)-Night", itin)
    return int(m.group(1)) if m else None


def day(s):
    return date.fromisoformat(s)


def load_snapshots():
    """One snapshot per date. A file with a suffix, such as "(midday)", is a
    rerun and beats the plain morning file; otherwise the later file name wins.
    Also strips the internal note and run fields from the archived copy."""
    best = {}
    for f in glob.glob(os.path.join(RAW, "*Price Snapshot*.json")):
        try:
            d = json.load(open(f, encoding="utf-8"))
        except Exception as e:
            print("skip unreadable", os.path.basename(f), e, file=sys.stderr)
            continue
        if not isinstance(d.get("fares"), dict) or not d.get("date"):
            continue
        if "note" in d or "run" in d:  # keep the archive free of internal text
            clean = {"date": d["date"], "fares": d["fares"]}
            with open(f, "w", encoding="utf-8") as fh:
                json.dump(clean, fh, indent=1)
                fh.write("\n")
        name = os.path.basename(f)
        has_suffix = bool(re.search(r"\d{4}-\d{2}-\d{2}\s*\(", name))
        rank = (has_suffix, name)
        if d["date"] not in best or rank > best[d["date"]][0]:
            best[d["date"]] = (rank, d)
    snaps = []
    for dt in sorted(best):
        fares = {}
        for k, v in best[dt][1]["fares"].items():
            p = k.split(" :: ")
            if len(p) != 4 or not isinstance(v, (int, float)) or v <= 0:
                continue
            fares[(p[0], p[1], iso_sail(p[2]), p[3])] = int(v)
        snaps.append((dt, fares))
    return snaps


def load_log():
    """Every row of the change log, in file order. Uses the newest export if
    several are present (the newest holds all older rows)."""
    files = glob.glob(os.path.join(RAW, "*Price Change Log*.csv"))
    if not files:
        sys.exit("No change log CSV in data/raw/")
    best = None
    for f in files:
        with open(f, encoding="utf-8-sig", newline="") as fh:
            rows = list(csv.DictReader(fh))
        last = max((r["Date Detected"] for r in rows), default="")
        if best is None or (last, len(rows)) > (best[0], len(best[1])):
            best = (last, rows, f)
    _, rows, f = best
    if len(rows) < MIN_LOG_ROWS:
        sys.exit("Change log has only %d rows (%s). A Drive read can truncate it; re-export the full sheet." % (len(rows), os.path.basename(f)))
    out = []
    for r in rows:
        try:
            out.append({
                "date": r["Date Detected"], "ship": r["Ship"], "itin": r["Itinerary"],
                "sail": iso_sail(r["Sailing Date"]) if r["Sailing Date"].count("/") == 2 else None,
                "room": r["Room Type"],
                "old": int(float(r["Old Price"])), "new": int(float(r["New Price"])),
            })
        except Exception:
            continue
    return out, os.path.basename(f)


def pct(old, new):
    return round((new - old) / old * 100, 1)


def main():
    snaps = load_snapshots()
    if not snaps:
        sys.exit("Need at least one snapshot in data/raw/")
    log, log_name = load_log()
    snap_day, latest = snaps[-1]
    prev_day, prev = snaps[-2] if len(snaps) > 1 else (None, {})
    last_change = max(r["date"] for r in log)
    if last_change > snap_day:
        print("warning: change log runs past the newest snapshot", file=sys.stderr)

    # Rebuild each fare's price history from the log.
    events = defaultdict(list)
    undated = sum(1 for r in log if r["sail"] is None)
    for r in log:
        if r["sail"]:
            events[(r["ship"], r["itin"], r["sail"], r["room"])].append(r)
    series, breaks = {}, 0
    for k, evs in events.items():
        evs = sorted(evs, key=lambda e: e["date"])  # stable: file order within a day
        pts = [[(day(evs[0]["date"]) - timedelta(days=1)).isoformat(), evs[0]["old"]]]
        for e in evs:
            if pts[-1][1] != e["old"]:
                # The log missed a change between two checks. Show the step.
                breaks += 1
                before = (day(e["date"]) - timedelta(days=1)).isoformat()
                if before > pts[-1][0]:
                    pts.append([before, e["old"]])
                else:
                    pts[-1][1] = e["old"]
            if pts[-1][0] == e["date"]:
                pts[-1][1] = e["new"]
            else:
                pts.append([e["date"], e["new"]])
        cur = latest.get(k)
        if cur is not None and cur != pts[-1][1] and snap_day > pts[-1][0]:
            pts.append([snap_day, cur])
        series[k] = pts

    # Moves inside the window, newest first, each with its price history.
    cutoff = (day(snap_day) - timedelta(days=WINDOW_DAYS)).isoformat()
    moves = []
    for r in log:
        if r["date"] < cutoff or r["old"] == r["new"] or not r["sail"]:
            continue
        k = (r["ship"], r["itin"], r["sail"], r["room"])
        if r["sail"] < snap_day:  # already sailed
            continue
        now = latest.get(k)
        moves.append({
            "date": r["date"], "ship": r["ship"], "itin": r["itin"], "sail": r["sail"],
            "room": r["room"], "nights": nights(r["itin"]), "old": r["old"], "new": r["new"],
            "diff": r["new"] - r["old"], "pct": pct(r["old"], r["new"]),
            "now": now,            # None means not on sale at the latest check
            "hist": series[k],
        })
    moves.sort(key=lambda m: (m["date"], abs(m["diff"])), reverse=True)

    last = [m for m in moves if m["date"] == last_change]
    ld = [m for m in last if m["diff"] < 0]
    lu = [m for m in last if m["diff"] > 0]

    # What was newly listed or sold out between the last two snapshots.
    new_fares = sorted(k for k in latest if k not in prev and k[2] >= snap_day) if prev else []
    gone = sorted(k for k in prev if k not in latest and k[2] >= snap_day)

    def fare_row(k, price):
        return {"ship": k[0], "itin": k[1], "sail": k[2], "room": k[3], "nights": nights(k[1]), "price": price}

    # Market snapshot by ship.
    by_ship = {}
    for ship in PORTS:
        fs = {k: v for k, v in latest.items() if k[0] == ship}
        interior = [v for k, v in fs.items() if k[3] == "Interior"]
        best_pn = None
        for k, v in fs.items():
            n = nights(k[1])
            if k[3] == "Interior" and n and (best_pn is None or v / n < best_pn["perNight"]):
                best_pn = dict(fare_row(k, v), perNight=round(v / n, 2))
        by_ship[ship] = {
            "port": PORTS[ship], "fares": len(fs),
            "sailings": len({(k[1], k[2]) for k in fs}),
            "medianInterior": int(statistics.median(interior)) if interior else None,
            "cheapestInteriorPerNight": best_pn,
        }

    # Lowest interior fares per night, one row per sailing.
    per_sailing = {}
    for k, v in latest.items():
        n = nights(k[1])
        if k[3] != "Interior" or not n:
            continue
        sk = (k[0], k[1], k[2])
        if sk not in per_sailing or v < per_sailing[sk]["price"]:
            per_sailing[sk] = dict(fare_row(k, v), perNight=round(v / n, 2))
    lowest = sorted(per_sailing.values(), key=lambda r: (r["perNight"], r["sail"]))[:10]

    # Sailing soon: departures in the next 30 days, cheapest fare per sailing.
    horizon = (day(snap_day) + timedelta(days=30)).isoformat()
    soon = {}
    for k, v in latest.items():
        if snap_day <= k[2] <= horizon:
            sk = (k[0], k[1], k[2])
            if sk not in soon or v < soon[sk]["price"]:
                soon[sk] = fare_row(k, v)
    soon = sorted(soon.values(), key=lambda r: (r["sail"], r["ship"]))

    # Price watch: sailings with the most moves in the window.
    activity = defaultdict(lambda: {"moves": 0, "drops": 0, "increases": 0})
    for m in moves:
        a = activity[(m["ship"], m["itin"], m["sail"])]
        a["moves"] += 1
        a["drops" if m["diff"] < 0 else "increases"] += 1
    watch = []
    for sk, a in activity.items():
        interior = latest.get(sk + ("Interior",))
        watch.append(dict(ship=sk[0], itin=sk[1], sail=sk[2], nights=nights(sk[1]),
                          interior=interior, **a))
    watch.sort(key=lambda w: (-w["moves"], w["sail"]))
    watch = watch[:8]

    # Daily counts across the whole log, for the activity chart.
    daily = defaultdict(lambda: {"drops": 0, "increases": 0})
    for r in log:
        if r["old"] != r["new"]:
            daily[r["date"]]["drops" if r["new"] < r["old"] else "increases"] += 1
    timeline = [{"date": d, "drops": v["drops"], "increases": v["increases"]} for d, v in sorted(daily.items())]

    dp = [m["pct"] for m in ld]
    out = {
        "meta": {
            "snapshotDate": snap_day,
            "previousSnapshot": prev_day,
            "lastChangeDate": last_change,
            "quiet": last_change < snap_day,
            "windowDays": WINDOW_DAYS,
            "firstTracked": min(r["date"] for r in log),
            "logRows": len(log),
            "logUndated": undated,
            "logFile": log_name,
            "snapshots": [d for d, _ in snaps],
            "fares": len(latest),
            "basis": "Per person, double occupancy, sale price, taxes and fees included. A fare missing from a check is sold out or waitlist only.",
        },
        "last": {
            "date": last_change, "drops": len(ld), "increases": len(lu),
            "avgDropPct": round(statistics.mean(dp), 1) if dp else 0,
            "biggestDrop": min(ld, key=lambda m: m["diff"]) if ld else None,
            "biggestIncrease": max(lu, key=lambda m: m["diff"]) if lu else None,
        },
        "listing": {
            "newFares": [fare_row(k, latest[k]) for k in new_fares],
            "soldOut": [fare_row(k, prev[k]) for k in gone],
            "comparedWith": prev_day,
        },
        "byShip": by_ship,
        "moves": moves,
        "lowest": lowest,
        "soon": soon,
        "watch": watch,
        "timeline": timeline,
        "totals": {"drops": sum(1 for r in log if r["new"] < r["old"]),
                   "increases": sum(1 for r in log if r["new"] > r["old"])},
    }
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(out, fh, separators=(",", ":"), sort_keys=True)
        fh.write("\n")
    print("wrote", os.path.relpath(OUT, ROOT), "%d KB" % (os.path.getsize(OUT) // 1024))
    print("snapshot %s (%d fares) | last change %s | log rows %d (%d with no sailing date) | skipped steps %d" % (
        snap_day, len(latest), last_change, len(log), undated, breaks))
    print("last-change day: %d drops, %d increases | moves in window: %d | new %d, sold out %d (vs %s)" % (
        len(ld), len(lu), len(moves), len(new_fares), len(gone), prev_day))


if __name__ == "__main__":
    main()
