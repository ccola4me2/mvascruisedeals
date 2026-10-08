// Content for the personalized cruise guide (/guide/). Everything here is a
// fact checked against the cruise line's own ship, port, and policy pages
// (research date: 2026-10-07), written in our own words. Prices of optional
// extras are left out on purpose because they change; gratuities, the service
// charge, and arrival rules are the cruise line's published policy.
//
// Keep it honest: if a detail is not published, leave it out and let the guide
// say "details come with your booking" instead of guessing.

export const BRENT = {
  name: "Brent Beasley",
  phone: "561-777-9911",
  phoneHref: "tel:+15617779911",
  email: "brentb@cruisestoursandtravel.com",
  site: "mvascruisedeals.com",
  cred: "FL Seller of Travel #TI128169",
  // A first-person line for Beachcomber guides, shown only until its date.
  // Edit or remove when it stops being true.
  beachcomberNote: {
    until: "2027-01-09",
    text: "I'm sailing Beachcomber's inaugural cruise from Miami on January 9, 2027, and I'll update this guide with firsthand tips when I'm back.",
  },
  // Set to something like "60+ cruises" to show "Tips from 60+ cruises".
  experience: null,
};

// Where each guide starts and ends. `stat` is the third number on page 1.
export const HOMEPORTS = {
  Galveston: {
    city: "Galveston",
    state: "Texas",
    port: "Port of Galveston",
    stat: { big: "Galveston", small: "Port of Galveston" },
    since: "2027-10-04",
    terminalLine: "the Port of Galveston. Terminal and check-in details come with your booking once the cruise line publishes them",
    hoursLine: null,
    airportLine: "Come in the night before. Houston's airports are an hour or more from the Port of Galveston.",
    parking: "Parking details come with your booking once the cruise line publishes them.",
  },
  Tampa: {
    city: "Tampa",
    state: "Florida",
    port: "Port Tampa Bay",
    stat: { big: "Terminal 6", small: "Port Tampa Bay" },
    terminalLine: "Terminal 6 at Port Tampa Bay, 1331 McKay Street",
    hoursLine: "The terminal opens at 9:30 am and doors close promptly at 2:30 pm.",
    airportLine: "Come in the night before. Tampa International is the closest airport to the port.",
    parking: "Choose pre-paid self-parking, pre-paid valet, or pay on arrival. Pre-paying gets you the closer spaces.",
  },
  Miami: {
    city: "Miami",
    state: "Florida",
    port: "PortMiami",
    stat: { big: "Terminal C", small: "PortMiami" },
    since: "2027-01-09",
    terminalLine: "Terminal C at PortMiami, 1751 N Cruise Blvd. Some sailings use Terminal E, so confirm in your pre-arrival email",
    hoursLine: "The terminal opens at 9:30 am and you cannot enter after 2:30 pm.",
    airportLine: "Come in the night before. Miami International is the closest airport to the port.",
    parking: "Check PortMiami's parking page for current options and rates before you go.",
  },
  "Palm Beach": {
    city: "Palm Beach",
    state: "Florida",
    port: "Port of Palm Beach",
    stat: { big: "Riviera Beach", small: "Port of Palm Beach" },
    terminalLine: "the main terminal at the Port of Palm Beach, 1 East 11th Street, Riviera Beach",
    hoursLine: "The port opens at 9:30 am and doors close promptly at 3:00 pm.",
    airportLine: "Come in the night before. Palm Beach International is the closest airport to the port.",
    parking: "Self-parking is available at the port. Cash is not accepted, so bring a card.",
  },
};

// One entry per port of call. `place` feeds the "Mexico and Belize" line.
export const PORTS = {
  Cozumel: {
    name: "Cozumel, Mexico",
    place: "Mexico",
    blurb: "Turquoise water, reefs and beach clubs.",
    mood: "Beach and reef day",
    bullets: [
      ["Snorkel or dive", "some of the clearest water in the Caribbean."],
      ["Chankanaab Park", "for lagoon swimming, beaches and snorkeling in one stop."],
      ["A beach club day pass", "for loungers, pools and a cold drink."],
      ["Downtown San Miguel", "for shopping, tacos and the waterfront."],
    ],
    tip: "pack reef-safe, biodegradable sunscreen. Cozumel's marine parks ask for it.",
  },
  Belize: {
    name: "Belize City, Belize",
    place: "Belize",
    blurb: "Jungle, Maya ruins and the barrier reef.",
    mood: "Jungle and adventure day",
    bullets: [
      ["Cave tubing", "through underground rivers, the classic Belize excursion."],
      ["Altun Ha", "Maya temples, an easy half-day trip."],
      ["Zip lining", "over the rainforest canopy."],
      ["Snorkel the Belize Barrier Reef,", "the second-largest reef system in the world."],
    ],
    tip: "this is a tender port, so small boats carry you ashore. Book excursions early and keep an eye on the last tender back.",
  },
  Progreso: {
    name: "Progreso, Mexico",
    place: "Mexico",
    blurb: "Your gateway to the Yucatán and Chichén Itzá.",
    mood: "History and culture day",
    bullets: [
      ["Chichén Itzá,", "one of the New Seven Wonders of the World."],
      ["Mérida,", "the Yucatán's colorful colonial capital."],
      ["Maya ruins and cenotes", "closer to port, for a shorter day."],
      ["Progreso's beach and malecón", "for an easy, laid-back afternoon."],
    ],
    tip: "the pier is famously long, with a shuttle into town. Chichén Itzá is a full day, so book a tour that gets you back on time.",
  },
  "Key West": {
    name: "Key West, Florida",
    place: "the Florida Keys",
    blurb: "Duval Street, sunsets and the southernmost point.",
    mood: "Walk-around island day",
    bullets: [
      ["Duval Street", "for shops, bars and people-watching."],
      ["The Southernmost Point", "buoy for the classic photo."],
      ["Hemingway Home", "and its famous six-toed cats."],
      ["Snorkel or sail", "out to the reef off Key West."],
    ],
    tip: "wear comfortable shoes. Most of Old Town is easy to cover on foot.",
  },
  Nassau: {
    name: "Nassau, Bahamas",
    place: "the Bahamas",
    blurb: "Beaches, history and island color.",
    mood: "Beach and history day",
    bullets: [
      ["Junkanoo Beach", "for soft sand and calm water close to the port."],
      ["Cable Beach", "a longer stretch with bars and water sports, a short ride away."],
      ["Queen's Staircase and Fort Fincastle,", "66 steps up to harbor views."],
      ["Bay Street and the Straw Market", "for crafts, conch and shopping."],
    ],
    tip: "taxis use set rates, so confirm the fare before you ride.",
  },
  "Grand Bahama": {
    name: "Freeport, Grand Bahama",
    place: "the Bahamas",
    blurb: "Easy beaches and island time.",
    mood: "Easy beach day",
    bullets: [
      ["Gold Rock Beach", "in Lucayan National Park, one of the prettiest in the Bahamas."],
      ["Snorkel", "reefs sit close to shore."],
      ["Port Lucaya Marketplace", "for shopping, live music and a casual lunch."],
      ["Straw markets", "for conch salad and local crafts."],
    ],
    tip: "Gold Rock Beach is a taxi or excursion ride away, so arrange your ride back before you go.",
  },
  "Grand Cayman": {
    name: "George Town, Grand Cayman",
    place: "the Cayman Islands",
    blurb: "Seven Mile Beach and Stingray City.",
    mood: "Sea and sand day",
    bullets: [
      ["Seven Mile Beach", "for powder-soft sand and calm turquoise water."],
      ["Stingray City,", "wade a sandbar with friendly southern stingrays."],
      ["Snorkel and dive", "reef walls and some of the clearest water around."],
      ["Cayman Turtle Centre,", "an easy family stop."],
    ],
    tip: "this is a tender port, so small boats carry you ashore. Allow extra time for the trip back.",
  },
  "Ocho Rios": {
    name: "Ocho Rios, Jamaica",
    place: "Jamaica",
    blurb: "Waterfalls, jungle and island rhythm.",
    mood: "Waterfalls and adventure day",
    bullets: [
      ["Dunn's River Falls,", "Jamaica's iconic terraced waterfall you can climb."],
      ["Mystic Mountain", "for bobsled and zipline rides through the rainforest."],
      ["The Blue Hole", "for cool cascades and swimming holes."],
      ["Beaches and jerk,", "sand, sun and the island's famous flavor."],
    ],
    tip: "wear water shoes at the falls, and go early to beat the crowds.",
  },
  "Montego Bay": {
    name: "Montego Bay, Jamaica",
    place: "Jamaica",
    blurb: "Beaches, reggae and the Hip Strip.",
    mood: "Beach and culture day",
    bullets: [
      ["Doctor's Cave Beach,", "a crescent of white sand and clear water."],
      ["Great River", "for bamboo rafting and river tubing."],
      ["Historic great houses", "for a look at Jamaica's past."],
      ["The Hip Strip", "for shopping, rum and live music."],
    ],
    tip: "popular excursions fill up, so pre-book the ones you really want.",
  },
  Roatan: {
    name: "Roatan, Honduras",
    place: "Honduras",
    blurb: "Reef, beaches and island wildlife.",
    mood: "Reef and beach day",
    bullets: [
      ["West Bay Beach", "for powder sand and calm, clear water."],
      ["Snorkel or dive", "Roatan sits on the Mesoamerican Reef."],
      ["Ziplines and animal parks", "to meet monkeys, sloths and macaws."],
      ["Island cafes", "for an easy, relaxed lunch."],
    ],
    tip: "pack reef-safe sunscreen. West Bay is the favorite beach, so arrange your ride there ahead of time.",
  },
  Bimini: {
    name: "Bimini, Bahamas",
    place: "the Bahamas",
    blurb: "Clear water and a laid-back island.",
    mood: "Clear water day",
    bullets: [
      ["Radio Beach", "for soft sand and shallow, clear water."],
      ["Snorkel and swim", "reefs, wrecks and, on some tours, wild dolphins."],
      ["Fishing heritage,", "a favorite spot of Ernest Hemingway."],
      ["Wander", "it's a small island that is easy to explore."],
    ],
    tip: "it's a small island, so keep it simple: beach, swim, wander.",
  },
  "Grand Turk": {
    name: "Grand Turk, Turks and Caicos",
    place: "Turks and Caicos",
    blurb: "Powder-soft sand by the pier.",
    mood: "Beach and snorkel day",
    bullets: [
      ["The beach by the port,", "soft sand and calm, clear water close to the ship."],
      ["Wall snorkeling and diving,", "a dramatic reef wall close to shore."],
      ["Cockburn Town", "for a look at the island's history."],
      ["Gibbs Cay", "stingray sandbar trips by boat."],
    ],
    tip: "Gibbs Cay stingray trips are popular, so reserve early.",
  },
  "Amber Cove": {
    name: "Amber Cove, Dominican Republic",
    place: "the Dominican Republic",
    blurb: "Pools, beach and shops at the port.",
    mood: "Resort-style port day",
    bullets: [
      ["Stay at the port", "for pools, beach and shops right by the ship."],
      ["27 Waterfalls of Damajagua,", "hike, climb and jump through jungle falls."],
      ["Puerto Plata", "for a longer trip to the city and its cable car."],
      ["Local flavors", "rum, cocoa and Dominican coffee."],
    ],
    tip: "staying at the port makes an easy, low-stress day. Book longer excursions with a guaranteed return to the ship.",
  },
  "Puerto Plata": {
    name: "Puerto Plata, Dominican Republic",
    place: "the Dominican Republic",
    blurb: "Mountain views and amber-coast beaches.",
    mood: "Mountains and beach day",
    bullets: [
      ["The cable car", "up Pico Isabel de Torres for a mountaintop garden and coast views."],
      ["27 Waterfalls of Damajagua,", "a jungle adventure."],
      ["Amber coast beaches", "like Playa Dorada."],
      ["Local rum and cocoa", "for a taste of the Dominican Republic."],
    ],
    tip: "the cable car is popular, so go early or book a tour that includes it.",
  },
  "San Juan": {
    name: "San Juan, Puerto Rico",
    place: "Puerto Rico",
    blurb: "Blue cobblestones and centuries of history.",
    mood: "History and food day",
    bullets: [
      ["Old San Juan", "for colorful streets and plazas on foot."],
      ["El Morro,", "the clifftop fortress over the sea."],
      ["Local food and rum,", "mofongo and a stroll through the old city."],
      ["Condado Beach", "for an easy beach stop."],
    ],
    tip: "Old San Juan is hilly and cobblestoned, so wear comfortable shoes.",
  },
  "St. Thomas": {
    name: "St. Thomas, U.S. Virgin Islands",
    place: "the U.S. Virgin Islands",
    blurb: "Beaches, views and duty-free shopping.",
    mood: "Beach and views day",
    bullets: [
      ["Magens Bay,", "a calm, sweeping bay and one of the prettiest beaches in the Caribbean."],
      ["The Skyride to Paradise Point", "for harbor views from above."],
      ["Charlotte Amalie", "for duty-free shopping and history."],
      ["Snorkel", "clear water close to shore."],
    ],
    tip: "Magens Bay is a taxi ride from the port. Go early, and arrange your ride back.",
  },
  "St. Maarten": {
    name: "Philipsburg, St. Maarten",
    place: "St. Maarten",
    blurb: "Two nations, one island.",
    mood: "Beach and island-hopping day",
    bullets: [
      ["Maho Beach,", "where big jets land low over the sand."],
      ["Philipsburg", "for boardwalk shopping and beaches on the Dutch side."],
      ["Orient Bay", "for the French side's beach and cafes."],
      ["Day sails", "to snorkel coves and nearby islets."],
    ],
    tip: "check landing times for the big jets at Maho and plan your beach time around them.",
  },
  Aruba: {
    name: "Oranjestad, Aruba",
    place: "Aruba",
    blurb: "Trade winds, white sand and desert views.",
    mood: "Beach and desert day",
    bullets: [
      ["Eagle Beach and Palm Beach,", "wide, white-sand beaches with calm water."],
      ["Arikok National Park", "for rugged desert, caves and natural pools."],
      ["Oranjestad", "for Dutch-colonial streets, shopping and cafes near the port."],
      ["Snorkel", "shipwrecks and reefs by boat."],
    ],
    tip: "it's sunny and breezy, so bring sun protection even when it feels cooler.",
  },
  Bonaire: {
    name: "Kralendijk, Bonaire",
    place: "Bonaire",
    blurb: "A snorkeler's paradise.",
    mood: "Snorkel and nature day",
    bullets: [
      ["Shore snorkeling,", "the coast is a protected marine park with reef near the beach."],
      ["Flamingos and salt flats,", "pink birds and historic salt pans."],
      ["Washington Slagbaai National Park", "for rugged scenery in the island's north."],
      ["Kralendijk", "a tiny, colorful capital for an easy stroll."],
    ],
    tip: "Bonaire's reef is protected, so reef-safe sunscreen is a good idea.",
  },
  Curacao: {
    name: "Willemstad, Curacao",
    place: "Curacao",
    blurb: "Dutch color and hidden coves.",
    mood: "Color and coves day",
    bullets: [
      ["Willemstad,", "a UNESCO-listed pastel waterfront with a floating bridge."],
      ["Cove beaches", "like Cas Abao and Playa Kenepa."],
      ["Snorkel", "reef access right off the beach."],
      ["Waterfront cafes", "for a relaxed lunch in town."],
    ],
    tip: "bring water shoes for the rocky cove beaches.",
  },
  "Cabo Rojo": {
    name: "Cabo Rojo, Dominican Republic",
    place: "the Dominican Republic",
    blurb: "A newer port on the quiet southwest coast.",
    mood: "Quiet coast day",
    bullets: [
      ["A newer port of call", "on the Dominican Republic's quiet southwestern coast."],
      ["Remote beaches,", "the Pedernales coast has some of the country's least-developed shoreline."],
      ["Local excursions", "to be confirmed as your sailing gets closer."],
    ],
    tip: "this is a newer port, so I'll send current excursion options as your sailing gets closer.",
  },
  "New Orleans": {
    name: "New Orleans, Louisiana",
    place: "Louisiana",
    blurb: "Jazz, beignets and the French Quarter.",
    mood: "City and music day",
    bullets: [
      ["The French Quarter", "for historic streets, shops and street musicians."],
      ["Live jazz", "on Frenchmen Street and beyond."],
      ["Beignets and coffee,", "a New Orleans morning ritual."],
      ["The streetcar to the Garden District", "for mansions and tree-lined streets."],
    ],
    tip: "walk the Quarter in comfortable shoes, and save room for beignets.",
  },
  Limon: {
    name: "Limon, Costa Rica",
    place: "Costa Rica",
    blurb: "Rainforest canals and sloths.",
    mood: "Rainforest and wildlife day",
    bullets: [
      ["Tortuguero canals,", "jungle waterways known for monkeys, birds and nesting sea turtles."],
      ["Cahuita National Park", "for coastal rainforest trails and beaches."],
      ["A sloth sanctuary", "to meet sloths and other native animals."],
      ["A canopy tram or zipline", "over the rainforest."],
    ],
    tip: "the best excursions are long days, so book one with a guaranteed return to the ship.",
  },
  Colon: {
    name: "Colon, Panama",
    place: "Panama",
    blurb: "The Caribbean door to the Panama Canal.",
    mood: "Canal and history day",
    bullets: [
      ["The Panama Canal,", "watch ships pass through the locks."],
      ["Portobelo and San Lorenzo,", "UNESCO-listed Spanish colonial forts."],
      ["An Embera village", "to visit an indigenous community in the rainforest."],
      ["Panama City", "for a longer excursion to the capital."],
    ],
    tip: "Panama City is a long day trip, so book a tour with a guaranteed return to the ship.",
  },
  Veracruz: {
    name: "Veracruz, Mexico",
    place: "Mexico",
    blurb: "Marimba plazas and Spanish history.",
    mood: "History and music day",
    bullets: [
      ["The historic center,", "the zócalo, marimba music and lively cafes."],
      ["San Juan de Ulúa,", "a centuries-old fortress guarding the harbor."],
      ["The Veracruz Aquarium,", "one of the largest in Latin America."],
      ["The malecón", "a breezy seaside promenade."],
    ],
    tip: "try the local coffee. Veracruz is famous for its coffee culture.",
  },
};

// Ports with reef water, for the packing list.
export const REEF_PORTS = [
  "Cozumel", "Belize", "Roatan", "Bonaire", "Grand Cayman", "Curacao",
  "Aruba", "Grand Turk", "Bimini", "Grand Bahama", "St. Thomas",
];

// Ports where a long excursion is the headline, for the "book early" tip.
export const BIG_EXCURSION = {
  Belize: "cave tubing in Belize",
  Progreso: "Chichén Itzá tours from Progreso",
  Limon: "rainforest tours in Limon",
  Colon: "Panama Canal tours from Colon",
  "Grand Cayman": "Stingray City",
  "Ocho Rios": "Dunn's River Falls",
  "Grand Turk": "Gibbs Cay stingray trips",
};

// Per-ship content. Page 1 "glance", page 3 "life onboard", page 4 staterooms.
export const SHIPS = {
  Beachcomber: {
    shortStat: { big: "102,000+", small: "gross tons, biggest in the fleet" },
    glance: [
      ["The newest and largest in the fleet", "Beachcomber has 10 stateroom types, from cozy interiors to corner suites."],
      ["Zac Brown's Same Boat", "The first artist-curated live music venue at sea, co-created with Zac Brown."],
      ["Three all-new original shows", "Friday Night Country, Red, White & Margaritaville and Club Fuego."],
      ["The World's Largest 5 o'Clock Somewhere", "An open-air bar with Boat Drinks and island-inspired bites."],
    ],
    onboard: {
      title: "Eat, drink, repeat.",
      eyebrow: "Life onboard Beachcomber",
      eat: {
        included: [
          ["High Tide Market.", "Five food-hall stations: Kickin' & Pickin' Chicken, Sun Baked BBQ, Provisions Salads & More, Slice of Paradise and Frank & Lola's Pizzeria."],
          ["Fins & Beachcomber Main Dining.", "Multi-course dinners with ocean views."],
          ["Cheeseburger in Paradise.", "Build-your-own burgers with a toppings bar."],
          ["Mexican Cutie Cantina.", "Street-style tacos and rice bowls."],
          ["License to Chill Sandwich Shack.", "Paninis, hot dogs and deli favorites."],
        ],
        specialty: [
          ["JWB Prime Steakhouse.", "Hand-cut steaks and fresh seafood."],
          ["Far Side Sushi.", "Rolls, sashimi, ramen and rice bowls."],
          ["F&L Trattoria.", "Beachcomber exclusive. Classic Italian with velvet booths."],
          ["Floridays.", "Beachcomber exclusive. Florida tapas, seafood and sangria pitchers."],
          ["Treats and convenience.", "Dreamsicle Ice Cream, Margaritaville Coffee Shop, in-room dining and late-night pizza delivery."],
        ],
        tip: "dining packages can bundle a JWB Prime dinner with brunch and more, and pre-purchasing usually costs less than onboard.",
      },
      drinks: [
        ["Same Boat by Zac Brown.", "Nightly live music and craft cocktails."],
        ["5 o'Clock Somewhere.", "The big open-air bar, with Boat Drinks and bites."],
        ["License to Chill Bar and Daiquiri Shack.", "Frozen drinks by the pool."],
        ["Hidden gems.", "Tiki drinks at Polynesian Lounge and the secret Cowboy in the Jungle speakeasy."],
        ["Flip Flop Bar and Hemisphere Dancer.", "Live music, then quiet craft cocktails."],
        ["Club Fuego.", "Latin music and dancing, plus adults-only Fuego After Dark."],
      ],
      play: [
        ["License to Chill Pool.", "Stadium-style loungers, a waterslide and private cabanas."],
        ["Original production shows.", "Three all-new shows, each running several times a cruise."],
        ["Heroes Hall.", "A space honoring those who serve."],
        ["The Front Yard.", "A relaxed lawn-style bar for spritzes and slow afternoons."],
        ["Kids, teens and the spa.", "A Teen Club, plus the spa and the Lah De Dah juice bar."],
      ],
      nights: [
        ["Red, White & Margaritaville", "Wear red, white and blue. Visit Heroes Hall."],
        ["Friday Night Country", "Denim and boots. Start at Same Boat."],
        ["Polynesian Night", "Tropical prints and full island-time style."],
        ["Club Fuego Night", "Bright colors made for the dance floor."],
      ],
      nightsNote: "Theme nights vary by sailing length.",
    },
    staterooms: [
      ["Interior.", "Cozy Interior, the best value when you're rarely in the room."],
      ["Ocean view.", "Partial, Picturesque, Wake and St. Somewhere Premium Ocean View."],
      ["Balcony.", "Breezy Balcony and Wake View Balcony, your own private sea breeze."],
      ["Suites.", "Serene Junior, Grand Terrace and Signature Grand Suites, plus The Captain and the Kid and Son of a Son of a Sailor."],
    ],
    fuelNote: null,
  },
  Islander: {
    shortStat: { big: "5", small: "included restaurants, plus a dozen-plus bars" },
    glance: [
      ["The first three-story poolside LandShark Bar", "A lookout tower with 360-degree views and a big outdoor screen."],
      ["A soaring 14-story tropical atrium", "With the Flip Flop Atrium Bar right in the middle."],
      ["Caribbean Amphibian Splash and Slide", "Pool-deck fun for every age."],
      ["The Tiki Bar, adults only", "A covered pavilion at the back of the ship with wake views."],
    ],
    onboard: {
      title: "Island time, all day.",
      eyebrow: "Life onboard Islander",
      eat: {
        included: [
          ["Fins Dining.", "The main dining room, with island-inspired dishes and Shrimp and Grits."],
          ["Port of Indecision Buffet.", "Breakfast, lunch and dinner with chef-attended stations."],
          ["Cheeseburger in Paradise Burger Bar.", "Build your own at the 5 o'Clock Somewhere Pool."],
          ["Mexican Cutie Cantina.", "Street-style tacos and breakfast burritos."],
          ["Frank & Lola's Pizzeria.", "Hand-tossed slices, and whole pizzas by delivery for a fee."],
        ],
        specialty: [
          ["JWB Prime Steakhouse.", "A two-story steakhouse and lounge."],
          ["Far Side Sushi.", "Asian-fusion rolls, sea-cuterie boards and more."],
          ["Island Eats and Tiki Grill.", "Adults-only seafood shack and grill at The Tiki Bar."],
          ["Sparkling Brunch.", "Brunch favorites with a first mimosa, bellini or sparkling wine."],
          ["Treats and convenience.", "Margaritaville Coffee Shop and in-room dining."],
        ],
        tip: "dining packages can bundle a JWB Prime dinner with brunch and more, and pre-purchasing usually costs less than onboard.",
      },
      drinks: [
        ["LandShark Bar and Lookout.", "Three stories of shaded seating on the pool deck."],
        ["5 o'Clock Somewhere Bar.", "Hurricanes, margaritas and the Six String music stage."],
        ["The Tiki Bar.", "Adults only, with wake views at sunset."],
        ["Hemisphere Dancer and Bubbles Up.", "A craft-spirits lounge and a champagne bar."],
        ["Havana Daydreamin' Sports Bar.", "Live Latin beats, craft beer and a big rum menu."],
        ["Coral Reef Lounge and Far Side Lounge.", "Family karaoke and comedy, then boba by day and sake by night."],
      ],
      play: [
        ["Caribbean Amphibian Splash and Slide.", "The pool-deck play zone."],
        ["Margaritaville Casino.", "Slots, table games and sports betting."],
        ["Hot, Hot, Hot Night Club.", "A two-story club with a DJ."],
        ["Kids' clubs.", "Jolly Mon and Parakeets, on Deck 4."],
        ["St. Somewhere Spa and Salon.", "Massages, facials and more."],
      ],
      nights: [
        ["Sail Away Party", "Music, dancing and a parrot friend or two as you leave port."],
        ["Conky Tonkin' at Sea", "A boot-stomping trip to Nashville and back."],
        ["Caribbean Heat Remix", "Dancers and acrobats touring the islands."],
        ["White Hot Neon Nights", "Wear white. Glow paint and a live DJ."],
      ],
      nightsNote: "Entertainment varies by sailing length.",
    },
    staterooms: [
      ["Interior.", "Cozy Interior, the best value when you're rarely in the room."],
      ["Ocean view.", "Partial Ocean View, near the kids' clubs, and Picturesque Ocean View."],
      ["Balcony.", "Breezy, Extended, Premium Extended and Wake View Balconies, plus Partial View Balconies."],
      ["Suites.", "Serene Junior, Grand Terrace, Grand Terrace Corner and Signature Grand Suites."],
    ],
    fuelNote: "The fuel supplement on Islander is $0 per person, per night (as of June 1, 2024).",
  },
  Paradise: {
    shortStat: { big: "1,316", small: "guests aboard, an easy-breezy ship" },
    glance: [
      ["Palm Beach's easy escape", "Two- to five-night getaways to the Bahamas, Key West and beyond."],
      ["All-new High Tide Market", "A market-style food hall with five included stations."],
      ["Far Side Sushi", "A bamboo-accented sushi and ramen spot, new to Paradise."],
      ["12 Volt Bar and the adults-only pool", "The best views and breezes on board, at the back of the ship."],
    ],
    onboard: {
      title: "Easy days, cold drinks.",
      eyebrow: "Life onboard Paradise",
      eat: {
        included: [
          ["High Tide Market.", "Mexican Cutie Cantina, License to Chill Sandwich Shack, Slice of Paradise, Provisions Salads & More and Frank & Lola's Pizzeria."],
          ["Fins Dining.", "The main dining room, with a rotating island-inspired menu."],
          ["Cheeseburger in Paradise.", "Build-your-own burgers at the 5 o'Clock Somewhere Bar and Grill."],
        ],
        specialty: [
          ["JWB Prime Steakhouse.", "Prime steaks and fresh seafood."],
          ["Far Side Sushi.", "Inventive rolls, small plates, rice and ramen bowls."],
          ["Treats and convenience.", "Margaritaville Coffee Shop and in-room dining."],
        ],
        tip: "dining packages can bundle a JWB Prime dinner with brunch and more, and pre-purchasing usually costs less than onboard.",
      },
      drinks: [
        ["5 o'Clock Somewhere Bar and Grill.", "Burgers, drinks and ocean views."],
        ["License to Chill Bar.", "Frozen margaritas by the main pool."],
        ["12 Volt Bar.", "Electric margaritas above the adults-only pool."],
        ["Euphoria Lounge.", "Live entertainment, trivia and adult game shows on Deck 8."],
        ["Hemisphere Dancer Craft Spirits.", "A leather-bound piano lounge for craft cocktails."],
        ["Hemisphere Nightclub and Keys on the Water.", "DJs and dancing, then karaoke."],
      ],
      play: [
        ["The main pool and adults-only pool.", "Two spots to splash, sun and sip."],
        ["Margaritaville Casino.", "Slots, table games and sports betting."],
        ["Sun deck music.", "Caribbean bands, steel drums and DJ sets."],
        ["Game shows and bingo.", "Trivia, scavenger hunts and the Love and Marriage show."],
      ],
      nights: [
        ["Sail Away Party", "Music, dancing and a parrot friend or two as you leave port."],
        ["Caribbean Heat", "Dancers and acrobats touring the islands."],
        ["Mixology and flair", "Learn the secrets behind a great drink."],
        ["White Hot Neon Nights", "Wear white. Glow paint and a live DJ."],
      ],
      nightsNote: "Entertainment varies by sailing length.",
    },
    staterooms: [
      ["Interior.", "Cozy Interior, the best value when you're rarely in the room."],
      ["Ocean view.", "Picturesque Oceanview, one of the most popular rooms aboard."],
      ["Suites.", "Serene Junior Suites, and Grand Terrace Suites with a private balcony."],
    ],
    fuelNote: "The fuel supplement on Paradise is $15 per person, per night (as of June 1, 2024).",
  },
};

// Cruise-line package types worth knowing about (no prices on purpose).
export const PACKAGES = [
  ["Drinks.", "The Ultimate Beverage Chill package, or an Unlimited Soda Package."],
  ["Wi-Fi.", "Coconut Telegraph plans, from social scrolling to business-grade."],
  ["Dining.", "Prime and specialty dining packages, or single JWB Prime dinners."],
  ["Priority boarding.", "Express Pass and Signature Packages get the earliest arrival windows."],
  ["Cabanas, spa and photos.", "Private cabana rentals, spa packages and photo sessions."],
  ["Buy before you sail.", "Pre-purchase prices are usually lower than onboard."],
];
