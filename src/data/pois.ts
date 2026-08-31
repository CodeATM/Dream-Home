import type { Property } from "./types";

export type PoiKind = "school" | "transit" | "park" | "food";

export interface Poi {
  id: string;
  kind: PoiKind;
  name: string;
  lat: number;
  lng: number;
}

const POI_META: Record<PoiKind, { icon: string; names: string[] }> = {
  school: { icon: "🎓", names: ["Maple Elementary", "Riverside High", "Oakridge Academy", "Lincoln Middle"] },
  transit: { icon: "🚇", names: ["Central Station", "Line 4 Stop", "Transit Hub", "Express Terminal"] },
  park: { icon: "🌳", names: ["Greenbelt Park", "Heritage Gardens", "River Trail", "Cedar Commons"] },
  food: { icon: "🍽️", names: ["Corner Bistro", "Night Market", "Blue Door Café", "Taqueria Norte"] },
};

/** Deterministic pseudo-random so POIs don't jump between renders. */
function seeded(seed: number) {
  let t = seed + 0x9e3779b9;
  return () => {
    t = Math.imul(t ^ (t >>> 16), 2246822507);
    t = Math.imul(t ^ (t >>> 13), 3266489909);
    t ^= t >>> 16;
    return (t >>> 0) / 4294967296;
  };
}

/**
 * Generates a believable set of walkable amenities around a property
 * (~within 1.2 km). Pure function — same property always yields same POIs.
 */
export function nearbyPois(property: Property): Poi[] {
  if (property.lat == null || property.lng == null) return [];
  const base =
    Math.abs(Math.round(property.lat * 1e5)) +
    Math.abs(Math.round(property.lng * 1e5));
  const rand = seeded(base);

  const kinds: PoiKind[] = ["school", "transit", "park", "food"];
  const pois: Poi[] = [];
  let i = 0;

  for (const kind of kinds) {
    const count = 2 + Math.floor(rand() * 2); // 2–3 per kind
    for (let k = 0; k < count; k++) {
      const angle = rand() * Math.PI * 2;
      // ~150m to ~1200m in degrees latitude (lng scaled by cos(lat))
      const distDeg = (0.0015 + rand() * 0.0105);
      const latOffset = Math.sin(angle) * distDeg;
      const lngOffset =
        (Math.cos(angle) * distDeg) /
        Math.max(0.35, Math.cos((property.lat * Math.PI) / 180));
      const meta = POI_META[kind];
      pois.push({
        id: `poi-${base}-${kind}-${k}`,
        kind,
        name:
          meta.names[Math.floor(rand() * meta.names.length)] ??
          meta.names[0],
        lat: +(property.lat + latOffset).toFixed(6),
        lng: +(property.lng + lngOffset).toFixed(6),
      });
      i++;
    }
  }
  void i;
  return pois;
}
