// The MVAS Insider: blog posts.
//
// Every fact here comes from the cruise line's own published information
// (checked 2026-10-07) or from the itinerary data behind this site. Keep it that
// way: no invented prices, dates, reviews, or "I sailed this" stories. If a
// detail is not published, say so.
//
// HOW TO ADD A POST: copy an object, give it a unique `slug`, set `date`
// (YYYY-MM-DD) and `updated` if you revise it, pick a `category`, and write
// `body` as a list of blocks:
//   { t: "p", x: "Text. Supports **bold** and [links](/path)." }
//   { t: "h2", x: "Heading" }
//   { t: "ul", items: ["Item with **bold**", ...] }
//   { t: "callout", h: "Heading", x: "Text" }
//   { t: "ports", keys: ["Cozumel", ...] }   cards from app/data/guideContent.js
//                                            PORTS, each with a tagged
//                                            Book excursions link
//   { t: "cta" }                             the planner and quote buttons
// No em dashes or en dashes anywhere.

export const BLOG_NAME = "The MVAS Insider";
export const BLOG_TAGLINE =
  "Ships, ports, and planning tips for Margaritaville at Sea cruisers.";

export const posts = [
  {
    slug: "which-margaritaville-at-sea-ship-is-right-for-you",
    title: "Paradise, Islander, or Beachcomber: which Margaritaville at Sea ship is right for you?",
    short: "Which ship is right for you?",
    category: "Ships",
    date: "2026-10-08",
    image: "/deals/beachcomber-1200.jpg",
    imageAlt: "Margaritaville at Sea Beachcomber at sea",
    excerpt:
      "Three ships, four U.S. homeports, and trips from 2 to 10 nights. Here is how Paradise, Islander, and Beachcomber differ, and how to pick the one that fits your trip.",
    body: [
      {
        t: "p",
        x: "Margaritaville at Sea sails three ships, and they are not interchangeable. Where you live, how many nights you have, and what you want to do onboard all point toward one ship more than the others. Here is the plain-English version.",
      },
      {
        t: "h2",
        x: "The quick answer",
      },
      {
        t: "ul",
        items: [
          "**Paradise** sails from the Port of Palm Beach on short getaways of 2 to 5 nights. It is the easiest first taste of Margaritaville at Sea.",
          "**Islander** sails from Port Tampa Bay on trips of 4 to 10 nights. It is the pick for Western and Southern Caribbean itineraries, with the widest choice of week-long trips.",
          "**Beachcomber** is the newest and largest ship in the fleet. It sails from PortMiami starting January 9, 2027 (4 to 9 nights) and from the Port of Galveston starting October 4, 2027 (4 and 7 nights).",
        ],
      },
      {
        t: "h2",
        x: "Paradise: the easy escape",
      },
      {
        t: "p",
        x: "Paradise carries about 1,316 guests, which makes it the most intimate ship in the fleet. Its short trips from Palm Beach head to the Bahamas, Key West, and beyond. Onboard you will find the market-style High Tide Market food hall with five included stations, Fins Dining, and Cheeseburger in Paradise. Far Side Sushi is a specialty option, and the adults-only pool and 12 Volt Bar sit at the back of the ship with the best views and breezes.",
      },
      {
        t: "p",
        x: "Choose Paradise if you want a long weekend, you are testing the Margaritaville at Sea vibe, or you live near South Florida and want to skip the airport.",
      },
      {
        t: "h2",
        x: "Islander: the full week",
      },
      {
        t: "p",
        x: "Islander is built for longer sailings. Its showpieces are a 14-story tropical atrium with the Flip Flop Atrium Bar in the middle and the first three-story poolside LandShark Bar, with a lookout tower and a big outdoor screen. It has five included restaurants, including Fins Dining, the Port of Indecision Buffet, and Mexican Cutie Cantina, plus a dozen-plus bars, a casino, kids' clubs, and an adults-only Tiki Bar with wake views.",
      },
      {
        t: "p",
        x: "Choose Islander if you want 7 nights or more, you are bringing kids or a multigenerational group, or you want a ship with plenty to do on sea days.",
      },
      {
        t: "h2",
        x: "Beachcomber: the newest ship",
      },
      {
        t: "p",
        x: "Beachcomber is the largest ship in the fleet, at more than 102,000 gross tons, with 10 stateroom types from cozy interiors to corner suites. Its headline venue is Zac Brown's Same Boat, billed by the cruise line as the first artist-curated live music venue at sea. It also debuts three original shows (Friday Night Country, Red, White & Margaritaville, and Club Fuego) and the World's Largest 5 o'Clock Somewhere bar. Two specialty restaurants, F&L Trattoria and Floridays, are exclusive to Beachcomber.",
      },
      {
        t: "p",
        x: "Choose Beachcomber if you want the newest ship, you love live music, or you are sailing from Miami or Galveston. Galveston is a first for Margaritaville at Sea, so Texas and Gulf Coast cruisers can sail without flying. See [cruises from Galveston](/galveston-cruises/) for every date we have.",
      },
      {
        t: "h2",
        x: "One cost difference to know about",
      },
      {
        t: "p",
        x: "The cruise line publishes a fuel supplement that differs by ship. As of June 1, 2024, it was $0 per person, per night on Islander and $15 per person, per night on Paradise. Supplements can change, so ask for the current figure for your sailing before you book.",
      },
      {
        t: "callout",
        h: "Not sure which one?",
        x: "Tell me where you would like to sail from and how many nights you have, and I will point you to the sailing that fits. Or build a free guide for any sailing and compare them side by side.",
      },
      { t: "cta" },
    ],
  },
  {
    slug: "whats-included-in-a-margaritaville-at-sea-fare",
    title: "What is included in a Margaritaville at Sea fare, and what costs extra",
    short: "What your fare covers",
    category: "Planning",
    date: "2026-10-08",
    image: "/deals/islander-1200.jpg",
    imageAlt: "Margaritaville at Sea Islander",
    excerpt:
      "Your stateroom, most dining, shows, and pools are in the fare. Drinks, specialty dining, Wi-Fi, and excursions are extra. Here is the full picture, so nothing surprises you.",
    body: [
      {
        t: "p",
        x: "A cruise fare covers a lot, but not everything. Knowing the line between included and extra is the single best way to budget a trip honestly. This is how it works on Margaritaville at Sea, based on the cruise line's published information.",
      },
      {
        t: "h2",
        x: "What your fare includes",
      },
      {
        t: "ul",
        items: [
          "**Your stateroom** for the length of the sailing.",
          "**Included dining.** Every ship has a main dining room (Fins), casual spots such as Cheeseburger in Paradise and Mexican Cutie Cantina, and a market-style food hall or buffet, depending on the ship.",
          "**Entertainment.** Production shows, live music, and theme nights around the ship.",
          "**The pools and pool-deck fun.**",
          "**Kids' clubs**, though some activities may carry a fee.",
        ],
      },
      {
        t: "h2",
        x: "What costs extra",
      },
      {
        t: "ul",
        items: [
          "**Bar drinks and soft drinks**, unless you add a beverage package.",
          "**Specialty dining**, such as JWB Prime Steakhouse and Far Side Sushi, plus in-room dining.",
          "**Wi-Fi**, with plans from light social use to business-grade.",
          "**Shore excursions**, spa treatments, casino play, and photos.",
          "**Parking at the port**, paid directly to the port.",
          "**Gratuities and service charges**, on a standard fare. Many promotions, including some of the deals listed on this site, include gratuities, so read what your specific fare says.",
        ],
      },
      {
        t: "h2",
        x: "Packages worth knowing about",
      },
      {
        t: "ul",
        items: [
          "**Drinks:** the Ultimate Beverage Chill package, or an Unlimited Soda Package.",
          "**Dining:** prime and specialty dining packages, or single JWB Prime dinners.",
          "**Wi-Fi:** the Coconut Telegraph plans.",
          "**Priority boarding:** Express Pass and Signature Packages get the earliest arrival windows.",
          "**Cabanas, spa, and photos:** private cabana rentals, spa packages, and photo sessions.",
        ],
      },
      {
        t: "p",
        x: "The cruise line notes that buying packages before you sail is usually less expensive than buying them onboard, so decide what you will actually use and add it ahead of time.",
      },
      {
        t: "h2",
        x: "Taxes, fees, and the fuel supplement",
      },
      {
        t: "p",
        x: "Always compare fares on the same footing. Some fares quote the cabin price before taxes and fees, and some, like many group rates, include them. Ask for the total for your party. A fuel supplement can also apply by ship: as of June 1, 2024 it was $0 per person, per night on Islander and $15 on Paradise. Confirm the current amount for your sailing.",
      },
      {
        t: "callout",
        h: "Ask for the total, not the headline",
        x: "When I send a quote, I list what is and is not included, so you can compare it fairly against any other price you have seen.",
      },
      { t: "cta" },
    ],
  },
  {
    slug: "cruising-from-galveston-on-margaritaville-at-sea",
    title: "Cruising from Galveston on Margaritaville at Sea: everything we know so far",
    short: "Cruising from Galveston",
    category: "Homeports",
    date: "2026-10-08",
    image: "/deals/beachcomber-1200.jpg",
    imageAlt: "Margaritaville at Sea Beachcomber",
    excerpt:
      "Beachcomber begins sailing round-trip from the Port of Galveston on October 4, 2027. Here are the itineraries, the ports, and what is still unannounced.",
    body: [
      {
        t: "p",
        x: "For the first time, Margaritaville at Sea is sailing from Texas. Starting October 4, 2027, Beachcomber will sail round-trip from the Port of Galveston, which puts Mexico, Belize, and the Western Caribbean within driving distance for much of the Gulf Coast.",
      },
      {
        t: "h2",
        x: "What is scheduled",
      },
      {
        t: "ul",
        items: [
          "**Ship:** Margaritaville at Sea Beachcomber, the newest and largest in the fleet.",
          "**First sailing:** October 4, 2027, a 4-night Cozumel Express.",
          "**Lengths:** 4 and 7 nights.",
          "**Ports of call:** Cozumel, Belize, Progreso, Roatan, Grand Cayman, Montego Bay, Key West, Nassau, Grand Bahama, Bimini, and Veracruz.",
          "**Scale:** 13 itinerary variants and 56 departures through October 2028 at the time of writing.",
        ],
      },
      {
        t: "h2",
        x: "The kinds of trips on offer",
      },
      {
        t: "ul",
        items: [
          "**Belize and Mexico:** Cozumel, Belize, and Progreso in different orders, for reefs, Maya ruins, and Chichen Itza.",
          "**Jamaica and Western Caribbean:** Cozumel, Grand Cayman, and Montego Bay.",
          "**Mexico and Western Caribbean:** Cozumel with Roatan and Belize.",
          "**Key West and Bahamas:** Key West with Nassau and Grand Bahama or Bimini.",
          "**Mexico Trio:** Cozumel, Progreso, and historic Veracruz.",
        ],
      },
      {
        t: "p",
        x: "Dates and itineraries are set by the cruise line and can change, so check the [full list of Galveston sailings](/galveston-cruises/) for the current picture.",
      },
      {
        t: "h2",
        x: "What has not been published yet",
      },
      {
        t: "p",
        x: "The cruise line has not yet published terminal details or parking information for Galveston, so I am not going to guess. Those come with your booking once they are announced. I will update this post when they are.",
      },
      {
        t: "h2",
        x: "Getting there",
      },
      {
        t: "p",
        x: "If you are flying in, plan to arrive the night before. Houston's airports are an hour or more from the Port of Galveston, and embarkation day is not the day to cut it close. If you are driving, a night in Galveston or nearby takes the pressure off the morning.",
      },
      {
        t: "callout",
        h: "Want first pick of cabins?",
        x: "New homeport sailings tend to be popular early. Send me your dates and party size and I will check availability and send a quote with no booking fees.",
      },
      { t: "cta" },
    ],
  },
  {
    slug: "do-you-need-a-passport-for-a-margaritaville-at-sea-cruise",
    title: "Do you need a passport for a Margaritaville at Sea cruise?",
    short: "Do you need a passport?",
    category: "Planning",
    date: "2026-10-08",
    image: "/signpost.jpg",
    imageAlt: "Key West mile-marker signpost pointing to island destinations",
    imagePosition: "center 40%",
    excerpt:
      "The cruise line strongly recommends one for every sailing. Here is why, what to check before you book, and what to bring to the terminal.",
    body: [
      {
        t: "p",
        x: "Short answer: bring one. Margaritaville at Sea strongly recommends a passport for every guest, and it is the simplest way to avoid trouble if your plans change mid-trip.",
      },
      {
        t: "h2",
        x: "Why a passport is the safe choice",
      },
      {
        t: "p",
        x: "Many itineraries visit foreign ports, such as Mexico, Belize, the Bahamas, Jamaica, and the Dominican Republic. Even sailings that include a U.S. port, such as Key West or San Juan, Puerto Rico, often call on foreign ports too. And if you ever have to leave the ship early or fly home from a foreign port, a passport makes that far easier.",
      },
      {
        t: "h2",
        x: "Check these before you book",
      },
      {
        t: "ul",
        items: [
          "**Validity.** The cruise line advises a passport valid for 6 months after your cruise ends. If yours is close to expiring, renew early.",
          "**The name must match.** The name on your reservation has to match your travel document exactly.",
          "**Everyone needs documents.** That includes children and infants.",
          "**Allow time.** Passport processing times change. Do not leave a renewal to the last month.",
        ],
      },
      {
        t: "h2",
        x: "What to bring to the terminal",
      },
      {
        t: "ul",
        items: [
          "**Original travel documents** for everyone. Photocopies and phone photos do not work.",
          "**Your boarding pass**, printed or digital. One per stateroom.",
          "**A credit card** for your onboard account.",
          "**Luggage tags** on every bag.",
        ],
      },
      {
        t: "p",
        x: "Entry rules are set by governments and the cruise line, and they can change. I will confirm the documents for your exact itinerary before you pay, and the cruise line's own pre-cruise instructions are the final word.",
      },
      {
        t: "callout",
        h: "A free cruise guide has your checklist",
        x: "Every personal guide I build includes a passport check and a dated countdown to sailing day, based on your actual sailing.",
      },
      { t: "cta" },
    ],
  },
  {
    slug: "western-caribbean-ports-on-margaritaville-at-sea",
    title: "Your Western Caribbean ports, explained: what to do in Cozumel, Belize, Roatan, and more",
    short: "Western Caribbean ports, explained",
    category: "Ports",
    date: "2026-10-08",
    image: "/deals/islander-1200.jpg",
    imageAlt: "Margaritaville at Sea Islander",
    excerpt:
      "A first-timer's cheat sheet to the Western Caribbean ports Margaritaville at Sea visits, with what to do ashore and a link to book excursions for each.",
    body: [
      {
        t: "p",
        x: "Western Caribbean itineraries are the heart of Margaritaville at Sea's Tampa and Galveston sailings. Each port has a different personality, so here is a quick read on six of them, with ideas for your day ashore.",
      },
      {
        t: "ports",
        keys: ["Cozumel", "Belize", "Roatan", "Progreso", "Grand Cayman", "Montego Bay"],
      },
      {
        t: "h2",
        x: "How to plan a port day",
      },
      {
        t: "ul",
        items: [
          "**Pick one headline activity per port.** A relaxed beach day and a full-day tour are very different, so decide which kind of day you want.",
          "**Book the big ones early.** Cave tubing in Belize, Chichen Itza from Progreso, and Stingray City at Grand Cayman fill up.",
          "**Watch the all-aboard time.** Be back on the ship with room to spare. It sails on schedule.",
          "**Know your tender ports.** At a tender port, small boats carry you ashore, which adds time on both ends.",
          "**Pack for the water.** Reef-safe sunscreen and water shoes are worth bringing for the snorkel ports.",
        ],
      },
      {
        t: "p",
        x: "Want the exact ports, in order, for the sailing you are considering? Build a [free personal cruise guide](/plan/) and it will list each port for your dates, with what to do ashore.",
      },
      { t: "cta" },
    ],
  },
  {
    slug: "how-group-rates-work-on-margaritaville-at-sea",
    title: "How group rates work on Margaritaville at Sea, and when it pays to book a group",
    short: "How group rates work",
    category: "Groups",
    date: "2026-10-08",
    image: "/deals/paradise.jpg",
    imageAlt: "Margaritaville at Sea Paradise",
    imagePosition: "center 62%",
    excerpt:
      "Reunions, birthdays, weddings, and clubs can sail together for less. Here is how a group block works, what the perks are, and how deposits are handled.",
    body: [
      {
        t: "p",
        x: "If you are planning a trip with family or friends, a group booking can lower the price for everyone and make the planning far easier. Here is how it works on Margaritaville at Sea.",
      },
      {
        t: "h2",
        x: "What counts as a group",
      },
      {
        t: "p",
        x: "Groups typically start around 6 cabins, which is 12 guests. Everyone books under one group, so the cruise line prices the block together and your guests sail on the same itinerary.",
      },
      {
        t: "h2",
        x: "What you get",
      },
      {
        t: "ul",
        items: [
          "**Reduced group pricing.** Book enough cabins together and everyone can sail for less than booking on their own.",
          "**Onboard perks and amenities.** Group amenity points can go toward onboard credit, a cocktail party, or other extras for your group.",
          "**Flexible deposits.** Hold a block of cabins with a group deposit, and let guests pay their own way before the final due date.",
        ],
      },
      {
        t: "h2",
        x: "Who books this way",
      },
      {
        t: "ul",
        items: [
          "Family reunions",
          "Birthdays and milestones",
          "Weddings and honeymoons",
          "Bachelor and bachelorette trips",
          "Corporate and team incentives",
          "Clubs and friend groups",
        ],
      },
      {
        t: "h2",
        x: "How it works in practice",
      },
      {
        t: "ul",
        items: [
          "**You tell me the sailing and a rough headcount.**",
          "**I hold the block** and set up the group with the cruise line.",
          "**Guests book and pay their own way** against the held block, so you are not collecting money from friends.",
          "**I handle the details** up to sailing day.",
        ],
      },
      {
        t: "p",
        x: "Group rates and perks vary by sailing and change over time. See the [group rates page](/group-rates/) for the details, or look at the [current group cruises](/deals/) already open for booking.",
      },
      {
        t: "callout",
        h: "Thinking about a group?",
        x: "Tell me the occasion, rough headcount, and a few dates that could work. I will tell you honestly which sailings make sense.",
      },
      { t: "cta" },
    ],
  },
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export function sortedPosts() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

// Plain-text word count of a post, for the reading time.
export function wordCount(post) {
  const words = [];
  post.body.forEach((b) => {
    if (b.x) words.push(b.x);
    if (b.h) words.push(b.h);
    if (b.items) words.push(...b.items);
  });
  return words.join(" ").replace(/[*\[\]()]/g, " ").split(/\s+/).filter(Boolean).length;
}

export function readMinutes(post) {
  // Port cards are short; count each as about 60 words.
  const extra = post.body
    .filter((b) => b.t === "ports")
    .reduce((n, b) => n + b.keys.length * 60, 0);
  return Math.max(2, Math.round((wordCount(post) + extra) / 210));
}
