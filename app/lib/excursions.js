// Shore Excursions Group affiliate links.
//
// Their tracking is cookie based: the credit is set only when a visit carries
// the portal parameters below, and their own internal links do not carry them.
// So every link that leaves this site MUST go through excursionUrl(). Never
// hand-write a shoreexcursionsgroup.com link anywhere else.

export const SEG_HOST = "https://www.shoreexcursionsgroup.com";

// Brent's portal credentials, exactly as Shore Excursions Group issued them.
export const SEG_PARAMS = "?source=portal&id=2033842&data=brentb@cruisestoursandtravel.com";

// Port page paths on their site, checked live 2026-10-07. Keys match PORTS in
// app/data/guideContent.js. Ports without their own page fall back to a region
// page (Cabo Rojo) or the main search page (Veracruz).
const PORT_PATHS = {
  Cozumel: "/port/cozumel-excursions",
  Belize: "/port/belize-cruise-excursions",
  Progreso: "/port/progreso-shore-excursions",
  "Key West": "/port/key-west-excursions",
  Nassau: "/port/nassau-excursions",
  "Grand Bahama": "/port/freeport-cruise-port-tours",
  "Grand Cayman": "/port/grand-cayman-excursions",
  "Ocho Rios": "/port/ocho-rios-shore-excursions",
  "Montego Bay": "/port/montego-bay-shore-excursions",
  Roatan: "/port/roatan-excursions",
  Bimini: "/port/bimini-excursions",
  "Grand Turk": "/port/grand-turk-excursion-tours",
  "Amber Cove": "/port/amber-cove-shore-excursions",
  "Puerto Plata": "/port/puerto-plata-dominican-republic",
  "San Juan": "/port/san-juan-shore-excursions",
  "St. Thomas": "/port/st-thomas-excursions",
  "St. Maarten": "/port/st-maarten-excursions",
  Aruba: "/port/aruba-shore-excursions",
  Bonaire: "/port/bonaire-shore-excursions",
  Curacao: "/port/curacao-shore-excursions",
  "Cabo Rojo": "/caribbean-shore-excursions",
  "New Orleans": "/port/new-orleans-tours",
  Limon: "/port/puerto-limon-shore-excursions",
  Colon: "/port/colon-panama-shore-excursions",
  Veracruz: "/shore-excursions",
};

// The affiliate-tagged URL for any path on their site ("" is the home page).
export function excursionUrl(path) {
  const p = !path || path === "/" ? "/" : path.charAt(0) === "/" ? path : "/" + path;
  return SEG_HOST + p + SEG_PARAMS;
}

// The affiliate-tagged page for one of our port keys, or the main site.
export function portExcursionUrl(portKey) {
  return excursionUrl(PORT_PATHS[portKey] || "/");
}

// Printed under the links so the relationship is plain.
export const EXCURSION_DISCLOSURE =
  "Excursion links go to Shore Excursions Group, a separate company. I may earn a commission if you book through them, at no extra cost to you.";
