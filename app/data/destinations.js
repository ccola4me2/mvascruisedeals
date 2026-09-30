// Destination landing pages ("Margaritaville at Sea cruises to <place>").
// Each pulls the real sailings that call on `port` (must match a label used in
// app/data/sailings.js ports_of_call) and lists them with a prefilled quote CTA.
//
// To add a destination: copy an object, set a unique `slug`, a `port` that
// matches the port label in sailings.js, write a short honest intro, and give
// it a few `highlights` (real, verifiable things to do) and a couple `faqs`.
// The ships/homeports/trip-length facts shown on the page are computed live
// from the matching sailings, so they never go stale, do not hardcode them.

export const destinations = [
  {
    slug: "cozumel",
    port: "Cozumel",
    name: "Cozumel",
    region: "Mexico",
    intro:
      "Crystal water, world-class reefs, and beach clubs a short ride from the pier. Margaritaville at Sea calls on Cozumel from both Tampa and Palm Beach on a range of itineraries.",
    highlights: [
      {
        title: "Snorkel or dive the reef",
        text: "Palancar, Colombia, and Paradise reefs sit on the Mesoamerican Reef, some of the clearest, most colorful water in the Caribbean.",
      },
      {
        title: "Beach clubs and Chankanaab",
        text: "A quick taxi ride reaches palm-lined beach clubs, swim-up bars, and Chankanaab Park with its lagoon and snorkeling.",
      },
      {
        title: "Mayan history at San Gervasio",
        text: "The island's own ruins were once a pilgrimage site to the Mayan goddess Ixchel, an easy half-day trip.",
      },
    ],
    faqs: [
      {
        q: "Which Margaritaville at Sea ship visits Cozumel?",
        a: "Islander sails to Cozumel round-trip from Tampa, and Paradise reaches it on select Key West & Mexico sailings from Palm Beach. Itineraries run from a 4-night Cozumel Express up to week-long Western Caribbean loops.",
      },
      {
        q: "How long is the cruise to Cozumel?",
        a: "Anywhere from 4 nights round-trip Tampa up to 7 or 8 nights when Cozumel is paired with Progreso, Belize, or Grand Cayman. Tell us your dates and we'll match you to the length that fits.",
      },
    ],
  },
  {
    slug: "key-west",
    port: "Key West",
    name: "Key West",
    region: "Florida Keys",
    intro:
      "Conch Republic sunsets, Duval Street, and the southernmost point in the continental U.S. Key West is a favorite stop on Margaritaville at Sea sailings from the Florida homeports.",
    highlights: [
      {
        title: "Duval Street and Mallory Square",
        text: "Walk the bars and galleries of Duval, then join the nightly sunset celebration at Mallory Square.",
      },
      {
        title: "Southernmost Point and Hemingway Home",
        text: "Snap the famous buoy 90 miles from Cuba and tour Hemingway's house and its six-toed cats.",
      },
      {
        title: "Snorkel the only living barrier reef in the U.S.",
        text: "The reef off Key West is the continental United States' only living coral barrier reef, a short catamaran ride out.",
      },
    ],
    faqs: [
      {
        q: "Which ships stop in Key West?",
        a: "All three ships call on Key West: Paradise from Palm Beach, Islander from Tampa, and Beachcomber from Miami, on a range of 4 to 7-night itineraries.",
      },
      {
        q: "Do I need a passport for a Key West cruise?",
        a: "Key West is a domestic U.S. port, but most Margaritaville at Sea sailings pair it with the Bahamas or Mexico, so a passport is strongly recommended. We'll confirm the exact documents for your sailing.",
      },
    ],
  },
  {
    slug: "nassau",
    port: "Nassau",
    name: "Nassau, Bahamas",
    region: "The Bahamas",
    intro:
      "Powder-soft beaches, Junkanoo color, and the classic Bahamas escape. Nassau anchors many Margaritaville at Sea itineraries from Palm Beach and Miami.",
    highlights: [
      {
        title: "Cable Beach and Junkanoo Beach",
        text: "Soft sand and calm water right near the port, with beach bars and water sports steps from the ship.",
      },
      {
        title: "Queen's Staircase and Fort Fincastle",
        text: "Climb the 66 hand-cut steps to the hilltop fort for history and harbor views.",
      },
      {
        title: "Straw Market and Bay Street",
        text: "Browse local crafts, sample conch, and shop duty-free in the heart of downtown.",
      },
    ],
    faqs: [
      {
        q: "Which ships sail to Nassau?",
        a: "Paradise from Palm Beach on 2 to 5-night Bahamas itineraries, plus Beachcomber from Miami on Bahamas and Eastern Caribbean sailings.",
      },
      {
        q: "What's the shortest cruise to Nassau?",
        a: "A 2-night Nassau Getaway round-trip from Palm Beach aboard Paradise, ideal for a first cruise or a quick weekend escape.",
      },
    ],
  },
  {
    slug: "grand-bahama",
    port: "Grand Bahama",
    name: "Grand Bahama (Freeport)",
    region: "The Bahamas",
    intro:
      "The quick-getaway island: beaches, snorkeling, and island time just off Florida. Grand Bahama is a staple of the short Margaritaville at Sea Paradise sailings.",
    highlights: [
      {
        title: "Lucayan National Park and Gold Rock Beach",
        text: "One of the Bahamas' most beautiful beaches, backed by mangroves and one of the world's largest underwater cave systems.",
      },
      {
        title: "Snorkel straight off the sand",
        text: "Reefs sit close to shore, so you can snorkel colorful fish without a long boat ride.",
      },
      {
        title: "Straw markets and conch shacks",
        text: "Sample fresh conch salad and browse local crafts for an easy, laid-back port day.",
      },
    ],
    faqs: [
      {
        q: "Which ship visits Grand Bahama?",
        a: "Paradise from Palm Beach on 2 to 4-night getaways, with Grand Bahama also appearing on select Islander and Beachcomber Bahamas itineraries.",
      },
      {
        q: "Is Grand Bahama good for a first cruise?",
        a: "Yes. The 2-night Grand Bahama Getaway is one of the easiest and most affordable ways to try cruising before booking something longer.",
      },
    ],
  },
  {
    slug: "grand-cayman",
    port: "Grand Cayman",
    name: "Grand Cayman",
    region: "Western Caribbean",
    intro:
      "Seven Mile Beach, Stingray City, and some of the clearest water in the Caribbean. Grand Cayman features on the longer Western Caribbean Margaritaville at Sea itineraries.",
    highlights: [
      {
        title: "Seven Mile Beach",
        text: "A long stretch of powder-soft sand and calm turquoise water, consistently ranked among the Caribbean's best.",
      },
      {
        title: "Stingray City sandbar",
        text: "Wade waist-deep on a sandbar and meet friendly southern stingrays, a bucket-list snorkel excursion.",
      },
      {
        title: "Reef walls and the turtle centre",
        text: "World-class diving and snorkeling, plus the Cayman Turtle Centre for an easy family stop.",
      },
    ],
    faqs: [
      {
        q: "Which ships reach Grand Cayman?",
        a: "Islander from Tampa and Beachcomber from Miami, on 5 to 10-night Western and Southern Caribbean itineraries.",
      },
      {
        q: "Is Grand Cayman a tender port?",
        a: "Yes. Ships anchor off George Town and tender guests ashore, so allow a little extra time getting to and from the pier.",
      },
    ],
  },
  {
    slug: "progreso",
    port: "Progreso",
    name: "Progreso",
    region: "Mexico",
    intro:
      "Gateway to the Yucatan and the Mayan ruins, with a laid-back Gulf-coast beach town at the pier. Progreso pairs with Cozumel on several Margaritaville at Sea Mexico sailings from Tampa.",
    highlights: [
      {
        title: "Mayan ruins at Uxmal and Dzibilchaltun",
        text: "Progreso is the gateway to some of the Yucatan's great archaeological sites, an easy shore excursion inland.",
      },
      {
        title: "Merida, the colonial capital",
        text: "Tour the plazas, markets, and cathedral of the Yucatan's cultural hub, about 45 minutes from the pier.",
      },
      {
        title: "Beach town and cenotes",
        text: "A long Gulf beach sits right at the world's longest pier, with swimmable limestone cenotes nearby.",
      },
    ],
    faqs: [
      {
        q: "Which ship visits Progreso?",
        a: "Islander from Tampa, usually paired with Cozumel or Key West on 5 to 8-night Mexico itineraries.",
      },
      {
        q: "What is there to do in Progreso?",
        a: "It's the gateway to the Yucatan: Mayan ruins, cenotes, and the colonial city of Merida, plus a relaxed beach town right at the pier.",
      },
    ],
  },
  {
    slug: "ocho-rios",
    port: "Ocho Rios",
    name: "Ocho Rios, Jamaica",
    region: "Jamaica",
    intro:
      "Dunn's River Falls, lush hills, and Jamaican rhythm. Ocho Rios is a highlight of the Western Caribbean and Jamaica-focused Margaritaville at Sea itineraries.",
    highlights: [
      {
        title: "Climb Dunn's River Falls",
        text: "Jamaica's iconic 600-foot terraced waterfall, which you can climb hand-in-hand right up to the top.",
      },
      {
        title: "Mystic Mountain and the Blue Hole",
        text: "Bobsled and zipline through the rainforest, or swim the cool cascades of the Blue Hole.",
      },
      {
        title: "Beaches and Jamaican flavor",
        text: "Relax on the sand, sample jerk and Red Stripe, and soak up the island's easygoing pace.",
      },
    ],
    faqs: [
      {
        q: "Which ships visit Ocho Rios?",
        a: "Islander from Tampa and Beachcomber from Miami, on 6 to 10-night Western and Southern Caribbean itineraries.",
      },
      {
        q: "How long are cruises that stop in Ocho Rios?",
        a: "Typically 6 to 10 nights, often alongside Grand Cayman, Cozumel, and Nassau. We'll find the sailing that lines up with your dates.",
      },
    ],
  },
  {
    slug: "belize",
    port: "Belize",
    name: "Belize City, Belize",
    region: "Western Caribbean",
    intro:
      "Barrier-reef snorkeling, jungle rivers, and Mayan history. Belize appears on the longer Islander Western Caribbean sailings from Tampa.",
    highlights: [
      {
        title: "Snorkel the Belize Barrier Reef",
        text: "The second-largest barrier reef in the world and a UNESCO World Heritage site, teeming with marine life.",
      },
      {
        title: "Cave tubing and jungle rivers",
        text: "Float through ancient limestone caves the Maya considered sacred, a signature Belize adventure.",
      },
      {
        title: "Altun Ha and Lamanai ruins",
        text: "Explore jungle-wrapped Mayan temples on a guided excursion inland.",
      },
    ],
    faqs: [
      {
        q: "Which ship visits Belize?",
        a: "Islander from Tampa, on 6 to 8-night Western Caribbean and Mexico itineraries with stops like Cozumel, Roatan, and Grand Cayman.",
      },
      {
        q: "Is Belize a tender port?",
        a: "Yes. Ships anchor offshore and tender guests to Belize City, so a booked excursion is the easy way to reach the reef and ruins.",
      },
    ],
  },
  {
    slug: "roatan",
    port: "Roatan",
    name: "Roatan, Honduras",
    region: "Western Caribbean",
    intro:
      "A diver's paradise on the Mesoamerican Reef, with easygoing island beaches. Roatan rounds out several Margaritaville at Sea Western Caribbean itineraries from Tampa.",
    highlights: [
      {
        title: "Dive and snorkel the reef",
        text: "Roatan sits on the Mesoamerican Reef, the world's second-largest, with vivid coral straight off the beach.",
      },
      {
        title: "West Bay Beach",
        text: "Powder sand and calm, clear water make West Bay one of the Caribbean's prettiest beaches.",
      },
      {
        title: "Ziplines and animal encounters",
        text: "Zip the jungle canopy or meet sloths, monkeys, and macaws at an island nature park.",
      },
    ],
    faqs: [
      {
        q: "Which ship visits Roatan?",
        a: "Islander from Tampa, on 6 to 8-night Western Caribbean itineraries usually paired with Cozumel, Belize, and Grand Cayman.",
      },
      {
        q: "Is Roatan good for snorkeling?",
        a: "Excellent. It sits on the world's second-largest barrier reef, with reef access right off West Bay Beach.",
      },
    ],
  },
  {
    slug: "puerto-plata",
    port: "Puerto Plata",
    name: "Puerto Plata, Dominican Republic",
    region: "Eastern & Southern Caribbean",
    intro:
      "Amber-coast beaches, cable-car mountain views, and DR warmth. Puerto Plata anchors many of the new Beachcomber Eastern and Southern Caribbean sailings from Miami.",
    highlights: [
      {
        title: "Cable car up Mount Isabel de Torres",
        text: "Ride the Caribbean's only aerial tramway to a mountaintop garden and sweeping coastal views.",
      },
      {
        title: "Amber Cove and Playa Dorada",
        text: "Relax on golden beaches and resort-style pool areas a short ride from the pier.",
      },
      {
        title: "27 Waterfalls of Damajagua",
        text: "Hike, climb, and jump through a chain of jungle waterfalls, one of the DR's top adventures.",
      },
    ],
    faqs: [
      {
        q: "Which ship visits Puerto Plata?",
        a: "Beachcomber from Miami on 4 to 8-night Eastern and Southern Caribbean sailings, plus select Paradise Dominican Republic & Bahamas itineraries from Palm Beach.",
      },
      {
        q: "What's the shortest cruise to Puerto Plata?",
        a: "A 4-night Dominican Republic Express round-trip from Miami aboard Beachcomber.",
      },
    ],
  },
];

export function getDestination(slug) {
  return destinations.find((d) => d.slug === slug);
}
