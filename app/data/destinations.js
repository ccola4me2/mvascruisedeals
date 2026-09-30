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
  {
    slug: "san-juan",
    port: "San Juan",
    name: "San Juan, Puerto Rico",
    region: "Eastern Caribbean",
    intro:
      "Blue-cobblestone streets, seaside forts, and Puerto Rican rhythm. San Juan headlines the new Beachcomber Eastern Caribbean sailings from Miami.",
    highlights: [
      {
        title: "Old San Juan and El Morro",
        text: "Wander 500-year-old streets and the clifftop Castillo San Felipe del Morro fortress overlooking the sea.",
      },
      {
        title: "Beaches and El Yunque",
        text: "Condado beach sits minutes away, and El Yunque is the only tropical rainforest in the U.S. forest system.",
      },
      {
        title: "Food, rum, and salsa",
        text: "Mofongo, local rum, and live music in the plazas of the old city.",
      },
    ],
    faqs: [
      {
        q: "Which ship visits San Juan?",
        a: "Beachcomber from Miami, on 7-night Eastern Caribbean itineraries alongside St. Thomas, St. Maarten, and Puerto Plata.",
      },
      {
        q: "Do I need a passport for San Juan?",
        a: "San Juan is in Puerto Rico, a U.S. territory, but these sailings also visit foreign ports, so a passport is recommended. We'll confirm the documents for your exact itinerary.",
      },
    ],
  },
  {
    slug: "st-thomas",
    port: "St. Thomas",
    name: "St. Thomas, USVI",
    region: "Eastern Caribbean",
    intro:
      "Duty-free shopping, Magens Bay, and hilltop harbor views. St. Thomas is a signature stop on Beachcomber's Eastern Caribbean sailings from Miami.",
    highlights: [
      {
        title: "Magens Bay Beach",
        text: "A calm, heart-shaped bay of soft sand consistently ranked among the world's most beautiful beaches.",
      },
      {
        title: "Skyride and Charlotte Amalie",
        text: "Ride to Paradise Point for sweeping harbor views, then shop duty-free in town.",
      },
      {
        title: "Snorkel and sail",
        text: "Clear water, Coral World, and easy day sails make St. Thomas a snorkeler's favorite.",
      },
    ],
    faqs: [
      {
        q: "Which ship visits St. Thomas?",
        a: "Beachcomber from Miami, on 7-night Eastern Caribbean itineraries.",
      },
      {
        q: "Is St. Thomas good for beaches?",
        a: "Yes. Magens Bay and Sapphire Beach are among the Caribbean's best, a short ride from the pier.",
      },
    ],
  },
  {
    slug: "st-maarten",
    port: "St. Maarten",
    name: "St. Maarten",
    region: "Eastern Caribbean",
    intro:
      "Two nations on one island, French cuisine and Dutch buzz, and the famous Maho Beach. St. Maarten anchors Beachcomber's longer Eastern Caribbean sailings from Miami.",
    highlights: [
      {
        title: "Maho Beach",
        text: "Watch jets skim the sand on their approach to the runway at this one-of-a-kind beach.",
      },
      {
        title: "Philipsburg and Orient Bay",
        text: "Boardwalk shopping on the Dutch side, French cafes and beaches on the other.",
      },
      {
        title: "Coves and day sails",
        text: "Calm snorkeling coves and short sails to nearby islets.",
      },
    ],
    faqs: [
      {
        q: "Which ship visits St. Maarten?",
        a: "Beachcomber from Miami, on select 7-night Eastern Caribbean itineraries.",
      },
      {
        q: "What is St. Maarten known for?",
        a: "A split French and Dutch island famous for its beaches, dining, and the plane-spotting at Maho Beach.",
      },
    ],
  },
  {
    slug: "aruba",
    port: "Aruba",
    name: "Aruba",
    region: "Southern Caribbean",
    intro:
      "Constant trade winds, white-sand beaches, and desert-island landscapes. Aruba features on the Southern Caribbean and ABC Islands sailings from Tampa and Miami.",
    highlights: [
      {
        title: "Eagle and Palm Beach",
        text: "Wide, calm, powder-soft beaches lined with the island's iconic divi-divi trees.",
      },
      {
        title: "Arikok National Park",
        text: "Rugged desert, natural pools, and windswept coast cover nearly a fifth of the island.",
      },
      {
        title: "Oranjestad",
        text: "Pastel Dutch-colonial streets, shopping, and casinos near the pier.",
      },
    ],
    faqs: [
      {
        q: "Which ships visit Aruba?",
        a: "Islander from Tampa and Beachcomber from Miami, on 8 to 10-night Southern Caribbean itineraries.",
      },
      {
        q: "When is the best time to cruise to Aruba?",
        a: "Aruba sits below the hurricane belt and stays dry and breezy year-round, so any season works.",
      },
    ],
  },
  {
    slug: "bonaire",
    port: "Bonaire",
    name: "Bonaire",
    region: "Southern Caribbean",
    intro:
      "A diver's and snorkeler's dream ringed by protected reef. Bonaire joins the ABC Islands Southern Caribbean sailings on Beachcomber from Miami.",
    highlights: [
      {
        title: "Shore diving and snorkeling",
        text: "The entire coast is a marine park, with vivid reef reachable straight from the shore.",
      },
      {
        title: "Flamingos and salt flats",
        text: "Pink flamingos, historic salt pans, and Washington Slagbaai National Park.",
      },
      {
        title: "Kralendijk",
        text: "A tiny, colorful Dutch capital and a laid-back waterfront.",
      },
    ],
    faqs: [
      {
        q: "Which ship visits Bonaire?",
        a: "Beachcomber from Miami, on 8-night ABC Islands Southern Caribbean itineraries.",
      },
      {
        q: "Is Bonaire good for snorkeling?",
        a: "It is among the best in the Caribbean. The whole coastline is a protected marine park with easy reef access.",
      },
    ],
  },
  {
    slug: "curacao",
    port: "Curacao",
    name: "Curacao",
    region: "Southern Caribbean",
    intro:
      "Dutch-colonial color, hidden coves, and reef right off the beach. Curacao rounds out the Southern Caribbean and ABC Islands sailings from Tampa and Miami.",
    highlights: [
      {
        title: "Willemstad",
        text: "The UNESCO-listed pastel waterfront of Handelskade and the floating Queen Emma Bridge.",
      },
      {
        title: "Hidden cove beaches",
        text: "Clear, calm coves like Cas Abao and Playa Kenepa dot the coast.",
      },
      {
        title: "Snorkel and the Blue Room",
        text: "Easy reef access and the famous Blue Room sea cave.",
      },
    ],
    faqs: [
      {
        q: "Which ships visit Curacao?",
        a: "Islander from Tampa and Beachcomber from Miami, on 8 to 10-night Southern Caribbean itineraries.",
      },
      {
        q: "What is Curacao known for?",
        a: "Its colorful Dutch capital Willemstad, quiet cove beaches, and excellent snorkeling.",
      },
    ],
  },
  {
    slug: "bimini",
    port: "Bimini",
    name: "Bimini, Bahamas",
    region: "The Bahamas",
    intro:
      "The closest Bahamian island to Florida, with gin-clear water and Hemingway history. Bimini appears on short Paradise and Beachcomber Bahamas sailings.",
    highlights: [
      {
        title: "Radio Beach and clear water",
        text: "Soft sand near the pier and some of the clearest water in the Bahamas.",
      },
      {
        title: "Big-game fishing",
        text: "The sportfishing capital that once drew Ernest Hemingway.",
      },
      {
        title: "Snorkel and swim",
        text: "Reefs, wrecks, and wild dolphin encounters just offshore.",
      },
    ],
    faqs: [
      {
        q: "Which ships visit Bimini?",
        a: "Paradise from Palm Beach and Beachcomber from Miami, on short Bahamas getaways.",
      },
      {
        q: "What's the shortest cruise to Bimini?",
        a: "A 3 or 4-night Bahamas itinerary that pairs Bimini with Nassau or Grand Bahama.",
      },
    ],
  },
  {
    slug: "montego-bay",
    port: "Montego Bay",
    name: "Montego Bay, Jamaica",
    region: "Jamaica",
    intro:
      "Jamaica's beach-resort heart, with Doctor's Cave Beach and reggae warmth. Montego Bay features on the Western Caribbean and Jamaica sailings from Tampa and Miami.",
    highlights: [
      {
        title: "Doctor's Cave Beach",
        text: "The famous crescent of white sand and clear water at the heart of the Hip Strip.",
      },
      {
        title: "Raft the Great River",
        text: "Bamboo rafting and river tubing through lush countryside.",
      },
      {
        title: "Jerk and reggae",
        text: "Authentic jerk, rum, and live island music.",
      },
    ],
    faqs: [
      {
        q: "Which ships visit Montego Bay?",
        a: "Islander from Tampa and Beachcomber from Miami, on 7 to 10-night Western and Southern Caribbean itineraries.",
      },
      {
        q: "Is Montego Bay the same as Ocho Rios?",
        a: "Both are Jamaican ports. Some itineraries call on one, some the other, and we'll tell you which your sailing visits.",
      },
    ],
  },
  {
    slug: "grand-turk",
    port: "Grand Turk",
    name: "Grand Turk",
    region: "Turks & Caicos",
    intro:
      "A tiny island with a giant reef wall just offshore and powder beaches by the pier. Grand Turk features on select Paradise Bahamas sailings from Palm Beach.",
    highlights: [
      {
        title: "Beach by the pier",
        text: "Soft sand and calm, clear water just steps from the ship.",
      },
      {
        title: "Wall diving and snorkeling",
        text: "A dramatic reef wall drops off close to shore, world-class for divers.",
      },
      {
        title: "History and Gibbs Cay",
        text: "Historic salt ponds ashore and stingray sandbars on nearby Gibbs Cay.",
      },
    ],
    faqs: [
      {
        q: "Which ship visits Grand Turk?",
        a: "Paradise from Palm Beach, on a 5-night Grand Turk & Bahamas itinerary.",
      },
      {
        q: "Is Grand Turk good for first-time snorkelers?",
        a: "Yes. Calm, shallow water sits right by the pier, with the famous wall nearby for experienced divers.",
      },
    ],
  },
  {
    slug: "veracruz",
    port: "Veracruz",
    name: "Veracruz, Mexico",
    region: "Mexico",
    intro:
      "Historic Gulf-coast Mexico with marimba plazas and Spanish-colonial history. Veracruz is a highlight of the new Beachcomber Mexico sailings from Galveston, Texas.",
    highlights: [
      {
        title: "Historic center and malecon",
        text: "The lively zocalo, marimba music, and a breezy seaside malecon.",
      },
      {
        title: "San Juan de Ulua",
        text: "A centuries-old fortress guarding the historic harbor.",
      },
      {
        title: "Aquarium and seafood",
        text: "One of Latin America's top aquariums and a famous Gulf seafood scene.",
      },
    ],
    faqs: [
      {
        q: "Which ship visits Veracruz?",
        a: "Beachcomber from the Port of Galveston, Texas, on a 7-night Mexico Trio with Cozumel and Progreso, starting January 2028.",
      },
      {
        q: "Where does the Veracruz cruise leave from?",
        a: "The new Beachcomber sailings depart round-trip from Galveston, Texas.",
      },
    ],
  },
];

export function getDestination(slug) {
  return destinations.find((d) => d.slug === slug);
}
