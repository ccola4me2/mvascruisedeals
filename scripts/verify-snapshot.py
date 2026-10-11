#!/usr/bin/env python3
"""Prove a saved snapshot is faithful before it is committed.

Usage: python3 scripts/verify-snapshot.py data/raw/"MVAS Price Snapshot 2026-10-12.json"

Why: snapshots are copied out of Google Drive by hand (as base64 text), and one
wrong character could change a price without breaking the JSON. The change log
is exported separately and reliably, so every fare can be cross-checked:

  - A fare in both this snapshot and the previous one must either be unchanged,
    or the change log must record its change, ending at this snapshot's price.
  - A fare in this snapshot that the log says changed must end at the log's price.

Exits 0 when every checkable fare agrees, 1 otherwise. New fares (not in the
previous snapshot) cannot be cross-checked and are only format-checked.
"""
import csv, glob, json, os, re, sys
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "data", "raw")


def iso_sail(mdy):
    m, d, y = mdy.split("/")
    return "20%s-%s-%s" % (y, m.zfill(2), d.zfill(2))


def read_snap(path):
    d = json.load(open(path, encoding="utf-8"))
    fares = {}
    for k, v in d["fares"].items():
        p = k.split(" :: ")
        if len(p) != 4 or not isinstance(v, int) or v <= 0:
            raise ValueError("bad fare entry: %r = %r" % (k, v))
        fares[(p[0], p[1], iso_sail(p[2]), p[3])] = v
    return d["date"], fares


def pick(files_by_date):
    # Same rule as build-trends.py: a suffixed rerun beats the plain file.
    out = {}
    for dt, files in files_by_date.items():
        out[dt] = sorted(files, key=lambda f: (bool(re.search(r"\d{4}-\d{2}-\d{2}\s*\(", os.path.basename(f))), os.path.basename(f)))[-1]
    return out


def main():
    target = sys.argv[1]
    this_date, fares = read_snap(target)
    by_date = defaultdict(list)
    for f in glob.glob(os.path.join(RAW, "*Price Snapshot*.json")):
        try:
            by_date[json.load(open(f))["date"]].append(f)
        except Exception:
            pass
    earlier = sorted(d for d in by_date if d < this_date)
    if not earlier:
        print("No earlier snapshot to compare with; format check only.")
        print("OK: %d fares, all well formed" % len(fares))
        return 0
    prev_date = earlier[-1]
    _, prev = read_snap(pick(by_date)[prev_date])

    logs = glob.glob(os.path.join(RAW, "*Price Change Log*.csv"))
    if not logs:
        print("FAIL: no change log in data/raw/")
        return 1
    rows = list(csv.DictReader(open(sorted(logs)[-1], encoding="utf-8-sig", newline="")))
    last = defaultdict(list)
    for r in rows:
        if prev_date < r["Date Detected"] <= this_date and r["Sailing Date"].count("/") == 2:
            last[(r["Ship"], r["Itinerary"], iso_sail(r["Sailing Date"]), r["Room Type"])].append(int(float(r["New Price"])))

    bad, checked = [], 0
    for k, price in fares.items():
        if k in last:
            checked += 1
            if last[k][-1] != price:
                bad.append((k, "log says %s, snapshot says %s" % (last[k][-1], price)))
        elif k in prev:
            checked += 1
            if prev[k] != price:
                bad.append((k, "no logged change, previous snapshot %s, this one %s" % (prev[k], price)))
    new = [k for k in fares if k not in prev and k not in last]
    print("Snapshot %s (%d fares) against %s: %d fares cross-checked, %d new, %d mismatches" % (
        this_date, len(fares), prev_date, checked, len(new), len(bad)))
    for k, why in bad[:15]:
        print("  MISMATCH", " / ".join(k), "-", why)
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
