/**
 * Kaartlaag voor de klantenkaart.
 *
 * CARTO heeft zijn gratis basiskaarten in 2026 achter een API-sleutel gezet.
 * Ze geven geen foutmelding maar een tegel met de tekst "API KEY REQUIRED"
 * erop, met status 200 — de kaart lijkt dus te werken maar is onleesbaar.
 *
 * Hieronder de alternatieven die het zónder sleutel doen. Wisselen van stijl
 * is één regel: pas HUIDIG onderaan aan.
 */

export interface Basiskaart {
  naam: string;
  /** Tegel-URL voor Leaflet; {z}/{x}/{y} worden door Leaflet ingevuld. */
  url: string;
  /** Dezelfde tegel als losse URL, voor de statische kaart op mobiel. */
  tegel: (z: number, x: number, y: number) => string;
  /** Optionele laag met plaatsnamen, die over de basiskaart heen gaat. */
  labels?: { url: string; tegel: (z: number, x: number, y: number) => string };
  attributie: string;
}

/**
 * Volledig vrij te gebruiken, community-beheerd. Kleurrijker dan de stijl
 * waar de site op ontworpen is, maar er is geen enkele twijfel over de
 * voorwaarden.
 */
const OSM: Basiskaart = {
  naam: 'OpenStreetMap',
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  tegel: (z, x, y) => `https://tile.openstreetmap.org/${z}/${x}/${y}.png`,
  attributie: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-bijdragers',
};

/**
 * Lichtgrijs, dicht bij de oorspronkelijke CARTO-stijl. Let op: Esri stelt
 * voor hun basiskaarten normaal gesproken een account verplicht. Deze
 * eindpunten zijn open, maar daar kan hetzelfde gebeuren als bij CARTO.
 */
const ESRI_LICHTGRIJS: Basiskaart = {
  naam: 'Esri Light Gray',
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
  tegel: (z, x, y) =>
    `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/${z}/${y}/${x}`,
  labels: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    tegel: (z, x, y) =>
      `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/${z}/${y}/${x}`,
  },
  attributie: 'Kaartgegevens &copy; Esri &amp; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-bijdragers',
};

export const BASISKAARTEN = { OSM, ESRI_LICHTGRIJS };

/** Wissel hier van stijl. */
export const HUIDIG: Basiskaart = OSM;
