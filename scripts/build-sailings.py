#!/usr/bin/env python3
"""Regenerate app/data/sailings.js (the /sailings page, destination pages and
Galveston page) from app/data/itineraries.js, so the two can never disagree.

Run after refreshing itineraries.js:  python3 scripts/build-sailings.py [YYYY-MM-DD]
The optional date is "today" (default: the system date); past departures are dropped.
Variants with the same ship, homeport, length, name, note and port SET are merged
(a different port order is the same card); the first variant's order is shown.
"""
import json, re, sys, datetime, os

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = open(os.path.join(root, "app/data/itineraries.js")).read()
rows = [json.loads(l.strip().rstrip(",")) for l in src.splitlines() if l.strip().startswith('{"ship"')]
updated = re.search(r'ITINERARIES_UPDATED = "([\d-]+)"', src).group(1)
today = sys.argv[1] if len(sys.argv) > 1 else datetime.date.today().isoformat()

SHIP_ORDER = {"Islander": 0, "Paradise": 1, "Beachcomber": 2}
HOME_ORDER = ["Tampa, FL", "Palm Beach, FL", "Miami, FL", "Galveston, TX"]


def slug(s):
    s = s.lower().replace("&", "and")
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def join_ports(ports):
    if len(ports) == 1:
        return ports[0]
    if len(ports) == 2:
        return ports[0] + " and " + ports[1]
    return ", ".join(ports[:-1]) + ", and " + ports[-1]


merged = {}
for r in rows:
    key = (r["ship"], r["frm"], r["nights"], r["name"], r["note"], r.get("arrive"), tuple(sorted(set(r["ports"]))))
    m = merged.setdefault(key, {"r": r, "dates": set()})
    m["dates"].update(d for d in r["dates"] if d >= today)

out = []
for key, m in merged.items():
    if not m["dates"]:
        continue
    r = m["r"]
    ports = []
    for p in r["ports"]:
        if p not in ports:
            ports.append(p)
    city = r["frm"].split(",")[0]
    if r.get("arrive"):
        lead = "One-way from %s to %s." % (city, r["arrive"].split(",")[0])
    else:
        lead = "Round-trip from %s." % city
    out.append({
        "ship": r["ship"], "frm": r["frm"], "nights": r["nights"], "route": r["name"],
        "ports": ports, "dates": sorted(m["dates"]), "note": r["note"],
        "desc": "%s Ports of call: %s." % (lead, join_ports(ports)),
    })

out.sort(key=lambda e: (SHIP_ORDER[e["ship"]], HOME_ORDER.index(e["frm"]), e["nights"], e["dates"][0], e["route"]))

used = {}
for e in out:
    base = "%s-%d-%s" % (e["ship"].lower(), e["nights"], slug(e["route"]))
    if e["frm"] == "Galveston, TX":
        base += "-galveston"
    n = used.get(base, 0) + 1
    used[base] = n
    e["id"] = base if n == 1 else "%s-%d" % (base, n)

js = json.dumps
lines = []
for e in out:
    ent = [
        "  {",
        "    id: %s," % js(e["id"]),
        "    ship: %s," % js(e["ship"]),
        "    departure_port: %s," % js(e["frm"]),
        "    nights: %d," % e["nights"],
        "    route: %s," % js(e["route"]),
        "    ports_of_call: %s," % js(e["ports"]),
        "    departures: %s," % js(e["dates"]),
        "    description: %s," % js(e["desc"]),
        "    image: %s," % js("/deals/%s.jpg" % e["ship"].lower()),
    ]
    if e["note"]:
        ent.append("    note: %s," % js(e["note"]))
    ent.append("  },")
    lines.append("\n".join(ent))

head = open(os.path.join(root, "app/data/sailings.js")).read()
head = head[: head.index("export const SAILINGS_UPDATED")]
body = 'export const SAILINGS_UPDATED = "%s";\n\nexport const sailings = [\n%s\n];\n' % (today, "\n".join(lines))
open(os.path.join(root, "app/data/sailings.js"), "w").write(head + body)
print("itineraries.js pulled %s; wrote %d cards, %d departures, dates from %s" % (updated, len(out), sum(len(e["dates"]) for e in out), today))
