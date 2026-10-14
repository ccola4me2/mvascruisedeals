// Zac Brown Band Live in Nassau: the three-ship meet-up concert.
//
// Every fact here comes from the cruise line's own event pages, read in full on
// 2026-10-13 (Overview, Concert Access, Bahama Bay, Onboard Watch Parties and
// FAQs tabs): https://www.margaritavilleatsea.com/experiences/zac-brown-band-live-in-nassau
// Prices are what the cruise line published that day, per person unless stated,
// and can change. Do not add anything the event pages do not say.
//
// The concert upgrades and Bahama Bay packages are bought by the guest in
// Cruise Control after booking, never through this site.

export const ZBB_URL =
  "https://www.margaritavilleatsea.com/experiences/zac-brown-band-live-in-nassau";
export const ZBB_UPDATED = "2026-10-13";
export const ZBB_UPDATED_LONG = "October 13, 2026";
export const ZBB_PAGE = "/zac-brown-nassau/";

// The three sailings (ids match app/data/itineraries.js).
export const ZBB_SAILINGS = [
  { id: "beachcomber-miami-7-grand-cayman-jamaica-and-bahamas--gc-or-nas--3-ship-meet-up", date: "2027-01-23", ship: "Beachcomber" },
  { id: "paradise-palm-beach-4-bahamas-duo--gb-nas--3-ship-meet-up", date: "2027-01-25", ship: "Paradise" },
  { id: "islander-tampa-5-bahamas-duo--gb-nas--3-ship-meet-up", date: "2027-01-25", ship: "Islander" },
];

export const ZBB = {
  title: "Zac Brown Band Live in Nassau",
  dateLong: "Thursday, January 28, 2027",
  where: "Nassau Cruise Port Amphitheatre",
  intro:
    "Multi-platinum artist and three-time GRAMMY Award winner Zac Brown takes the stage in Nassau for an exclusive live concert, included only for Margaritaville at Sea guests. General admission is first-come, first-served, and viewing upgrades are available for purchase.",

  schedule: [
    ["7:00am", "Ships arrive in Nassau"],
    ["8:00am", "Pre-concert festivities begin and the concert grounds open"],
    ["10:30am", "Opener: Jessica Rose"],
    ["11:45am", "Main act: Zac Brown Band"],
    ["1:00pm", "Concert ends"],
    ["2:00pm", "All aboard for Islander guests"],
    ["2:30pm", "All aboard for Paradise and Beachcomber guests"],
  ],
  scheduleNote: "The cruise line is still finishing the run of show, and all times are subject to change.",

  included: {
    name: "Homegrown Lawn, General Admission",
    text:
      "Included with your sailing. Every guest gets a general admission ticket to the concert grounds with no purchase or registration. Show your stateroom card at the main gate. Lawn space is first-come, first-served.",
  },

  // Concert upgrades, cheapest first.
  tiers: [
    ["Homegrown Lawn, Early Access", "$49.99 per person", "Guaranteed entry and first access to the General Admission lawn at 8:30am."],
    ["Knee Deep VIP Standing Room", "$299.99 per person", "Grounds access at 8:00am, the VIP Standing Room Only section, VIP bathrooms and a merch bundle."],
    ["Knee Deep VIP Floor Seat (Side)", "$349.99 per person", "Grounds access at 8:00am, a reserved floor seat in the second and third rows, VIP bathrooms, a merch bundle and two bottles of water delivered to your stateroom."],
    ["Knee Deep VIP Floor Seat (Center)", "$399.99 per person", "Same as Floor Seat (Side), in the center section."],
    ["Jump Right In VIP Front Row (Side)", "$449.99 per person", "Grounds access at 8:00am, a reserved front row seat, VIP bathrooms, a merch bundle, access to Wine Bar Hospitality and two bottles of water delivered to your stateroom."],
    ["Jump Right In VIP Front Row (Center)", "$499.99 per person", "Same as Front Row (Side), in the center section."],
    ["Table Reservation at The Grill Hut", "$599.99 for up to four", "A reserved table for up to four with a dedicated server and two rounds of drinks."],
  ],
  tiersNote:
    "With a VIP ticket you choose your section now and your exact seat is assigned once you are on board. ADA seating has dedicated entry, with wood flooring over the grass for wheelchair access. Guests in ADA staterooms, or who made a request through the Access Desk, are placed there automatically. Questions: 1-800-814-7100.",

  bahamaBay: {
    intro:
      "Prefer a pool day? Bahama Bay Pool Club is a short guided walk from the pier (about 10 minutes) and shows the concert on TVs. The Pool Club does not have a clear view of the stage. Every ticket includes entertainment before the concert, lunch and five drinks per person (well cocktails, beer, frozen drinks or non-alcoholic).",
    options: [
      ["All-Inclusive Pool Viewing Party, General Admission", "$149.99 per person", "A first-come, first-served seat, with one main course and five drinks per person."],
      ["Daybed for Two", "$499.99 for two", "A reserved poolside daybed with an umbrella, with one main course and five drinks per person."],
      ["Poolbed for Two", "$499.99 for two", "A reserved round pool bed closest to the pool, with one main course and five drinks per person."],
      ["Cabana for Eight", "$1,499.99 for up to eight", "A private cabana with a jacuzzi and a private TV, light snacks, lunch, five drinks per person and a merch bundle for everyone."],
    ],
    know: [
      "Minimum age is 18 to drink alcohol.",
      "Bring a credit or debit card for extra purchases. Outside food and drink are not allowed, and all bags are inspected.",
      "Wear swimwear. Sunscreen, a hat and sunglasses are recommended. Lockers are limited and first-come, first-served.",
      "Main courses are ordered from a limited cruise menu. You need to be able to walk about 5 to 10 minutes from the terminal.",
    ],
  },

  watch: {
    intro: "Skip the shore and watch the concert streamed live on the pool deck of your own ship. Included with your fare.",
    parties: [
      ["Beachcomber Deck Party", "License to Chill Pool", "Beachcomber's first fleet meet-up, poolside aboard the newest ship."],
      ["Islander Deck Party", "LandShark Pool", "Join fellow fans for the big show, streamed live from Nassau."],
      ["Paradise Deck Party", "License to Chill Pool", "The concert streamed live, surrounded by fellow fans."],
    ],
  },

  faqs: [
    ["Is the concert open to the public?", "No. It is exclusively for Margaritaville at Sea guests, and a valid stateroom card is required at the main gate."],
    ["Do I have to buy a ticket?", "No. General admission to the concert grounds comes with your cruise fare. Upgrades are optional."],
    ["When can I buy upgrades?", "The cruise line put packages on sale to all passengers on Tuesday, October 13 at 10am ET. You add them in Cruise Control after you book."],
    ["Will there be meet-and-greets?", "Possibly. The cruise line says to watch for more details as the date gets closer."],
    ["Does Bahama Bay Pool Club show the stage?", "Not directly. You can catch the concert on TVs throughout the venue."],
  ],

  sameBoat:
    "On Beachcomber, Zac Brown's Same Boat is the first artist-curated live music venue at sea, with live performances and craft cocktails.",
};

// True for the three Nassau meet-up sailings (not the Jan 9 inaugural sailing).
export const isZbbSailing = (it) =>
  Boolean(it && it.note && it.note.indexOf("3-Ship Meet-Up") === 0);
