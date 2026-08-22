// Destination landing pages ("Margaritaville at Sea cruises to <place>").
// Each pulls the real sailings that call on `port` (must match a label used in
// app/data/sailings.js ports_of_call) and lists them with a prefilled quote CTA.
//
// To add a destination: copy an object, set a unique `slug`, a `port` that
// matches the port label in sailings.js, and write a short honest intro.

export const destinations = [
  {
    slug: "cozumel",
    port: "Cozumel",
    name: "Cozumel",
    region: "Mexico",
    intro:
      "Crystal water, world-class reefs, and beach clubs a short ride from the pier. Margaritaville at Sea calls on Cozumel from both Tampa and Palm Beach on a range of itineraries.",
  },
  {
    slug: "key-west",
    port: "Key West",
    name: "Key West",
    region: "Florida Keys",
    intro:
      "Conch Republic sunsets, Duval Street, and the southernmost point in the continental U.S. Key West is a favorite stop on Margaritaville at Sea sailings from all three homeports.",
  },
  {
    slug: "nassau",
    port: "Nassau",
    name: "Nassau, Bahamas",
    region: "The Bahamas",
    intro:
      "Powder-soft beaches, Junkanoo color, and the classic Bahamas escape. Nassau anchors many Margaritaville at Sea itineraries from Palm Beach and Miami.",
  },
  {
    slug: "grand-bahama",
    port: "Grand Bahama",
    name: "Grand Bahama (Freeport)",
    region: "The Bahamas",
    intro:
      "The quick-getaway island: beaches, snorkeling, and island time just off Florida. Grand Bahama is a staple of the short Margaritaville at Sea Paradise sailings.",
  },
  {
    slug: "grand-cayman",
    port: "Grand Cayman",
    name: "Grand Cayman",
    region: "Western Caribbean",
    intro:
      "Seven Mile Beach, Stingray City, and some of the clearest water in the Caribbean. Grand Cayman features on the longer Western Caribbean Margaritaville at Sea itineraries.",
  },
  {
    slug: "progreso",
    port: "Progreso",
    name: "Progreso",
    region: "Mexico",
    intro:
      "Gateway to the Yucatan and the Mayan ruins, with a laid-back Gulf-coast beach town at the pier. Progreso pairs with Cozumel on several Margaritaville at Sea Mexico sailings from Tampa.",
  },
  {
    slug: "ocho-rios",
    port: "Ocho Rios",
    name: "Ocho Rios, Jamaica",
    region: "Jamaica",
    intro:
      "Dunn's River Falls, lush hills, and Jamaican rhythm. Ocho Rios is a highlight of the Western Caribbean and Jamaica-focused Margaritaville at Sea itineraries.",
  },
  {
    slug: "belize",
    port: "Belize",
    name: "Belize City, Belize",
    region: "Western Caribbean",
    intro:
      "Barrier-reef snorkeling, jungle rivers, and Mayan history. Belize appears on the longer Islander Western Caribbean sailings from Tampa.",
  },
  {
    slug: "roatan",
    port: "Roatan",
    name: "Roatan, Honduras",
    region: "Western Caribbean",
    intro:
      "A diver's paradise on the Mesoamerican Reef, with easygoing island beaches. Roatan rounds out several Margaritaville at Sea Western Caribbean itineraries from Tampa.",
  },
  {
    slug: "puerto-plata",
    port: "Puerto Plata",
    name: "Puerto Plata, Dominican Republic",
    region: "Eastern & Southern Caribbean",
    intro:
      "Amber-coast beaches, cable-car mountain views, and DR warmth. Puerto Plata anchors many of the new Beachcomber Eastern and Southern Caribbean sailings from Miami.",
  },
];

export function getDestination(slug) {
  return destinations.find((d) => d.slug === slug);
}
