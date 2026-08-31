import type { Property, PropertyType } from "./types";
import { cities } from "./cities";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260824);

const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const between = (min: number, max: number) =>
  Math.floor(min + rand() * (max - min));

const homePhotos = [
  "1568605114967-8130f3a36994",
  "1570129477492-45c003edd2be",
  "1512917774080-9991f1c4c750",
  "1600596542815-ffad4c1539a9",
  "1600585154340-be6161a56a0c",
  "1583608205776-bfd35f0d9f83",
  "1564013799919-ab600027ffc6",
  "1523217582562-09d0def993a6",
  "1449844908441-8829872d2607",
  "1613490493576-7fde63acd811",
  "1600047509807-ba8f99d2cdde",
  "1560185007-cde436f6a4d0",
];

const interiorPhotos = [
  "1600607687939-ce8a6c25118c",
  "1600566753190-17f0baa2a6c3",
  "1600585152220-90363fe7e115",
  "1502672260266-1c1ef2d93688",
  "1493809842364-78817add7ffb",
  "1554995207-c18c203602cb",
  "1484154218962-a197022b5858",
  "1522708323590-d24dbb6b0267",
  "1560448204-e02f11c3d0e2",
  "1560448075-bb485b067938",
  "1560184897-ae75f418493e",
  "1600210492486-724fe5c67fb0",
  "1600121848594-d8644e57abab",
  "1600573472550-8090b5e0745e",
  "1600607687644-c7171b42498f",
  "1600607687920-4e2a09cf159d",
  "1600566752355-35792bedcfea",
  "1600566753086-00f18fb6b3ea",
  "1600585154526-990dced4db0d",
  "1416331108676-a22ccb276e35",
];

const streetNames = [
  "Alder Street",
  "Juniper Lane",
  "Cedar Court",
  "Willow Avenue",
  "Maple Terrace",
  "Birchwood Way",
  "Laurel Drive",
  "Sycamore Bend",
  "Magnolia Row",
  "Aspen Circle",
  "Dogwood Path",
  "Redwood Heights",
];

const neighborhoodsBySlug: Record<string, string[]> = {
  austin: ["Zilker", "Bouldin Creek", "Mueller", "East Austin", "Travis Heights"],
  seattle: ["Ballard", "Capitol Hill", "Fremont", "West Seattle", "Queen Anne"],
  denver: ["LoHi", "Wash Park", "RiNo", "Congress Park", "Berkeley"],
  miami: ["Brickell", "Coconut Grove", "Wynwood", "Coral Gables", "Edgewater"],
  portland: ["Laurelhurst", "Alberta Arts", "Sellwood", "Pearl District", "St. Johns"],
  nashville: ["12South", "East Nashville", "The Gulch", "Bellevue", "Germantown"],
  "san-diego": ["North Park", "Pacific Beach", "Coronado", "La Jolla", "South Park"],
  chicago: ["Logan Square", "Lakeview", "Wicker Park", "Lincoln Park", "Pilsen"],
};

const typePool: PropertyType[] = [
  "House",
  "Condo",
  "Townhouse",
  "Apartment",
  "Villa",
  "Loft",
];

const amenityPool = [
  "Central air",
  "In-unit laundry",
  "Quartz countertops",
  "Hardwood floors",
  "Smart thermostat",
  "Two-car garage",
  "Private balcony",
  "Roof deck",
  "Fitness center",
  "Pet spa",
  "EV charger",
  "Home office nook",
  "Chef's kitchen",
  "Walk-in closets",
  "Fireplace",
  "Heated floors",
  "Solar panels",
  "Sprinkler system",
  "Community pool",
  "Concierge",
  "Storage unit",
  "Floor-to-ceiling windows",
  "Backyard patio",
  "Outdoor kitchen",
];

const descriptionBits = [
  "Light pours through floor-to-ceiling windows across an open great room designed for both quiet mornings and crowded holidays.",
  "A thoughtful remodel kept the original character — coved ceilings, refired oak — while adding the systems a modern buyer expects.",
  "The kitchen opens fully to the dining space, making weeknights easy and weekends generous.",
  "Set on a quiet, tree-lined block where neighbors still wave from porches and the farmers market is a five-minute walk.",
  "Sliders disappear into walls to merge indoor and outdoor living across a professionally landscaped yard.",
  "Primary suite upstairs with a spa-inspired bath, dual vanities, and enough closet space to end every argument about storage.",
  "Energy-smart upgrades throughout: heat pump HVAC, induction range, EV-ready panel, and insulation that actually shows up on bills.",
  "The finished lower level flexes between media room, gym, or the world's most convincing work-from-home setup.",
];

const leaseOptions = ["12 months", "18 months", "24 months"];
const petPolicies = ["both", "cats-ok", "dogs-ok", "no-pets"] as const;
const financingOptions = ["Conventional", "FHA", "VA", "Cash"];

function imagesFor(seedIdx: number): string[] {
  const ext = homePhotos[seedIdx % homePhotos.length];
  const interiors = [
    interiorPhotos[(seedIdx * 3) % interiorPhotos.length],
    interiorPhotos[(seedIdx * 3 + 5) % interiorPhotos.length],
    interiorPhotos[(seedIdx * 3 + 11) % interiorPhotos.length],
    interiorPhotos[(seedIdx * 3 + 17) % interiorPhotos.length],
  ];
  return [ext, ...interiors];
}

function buildProperties(): Property[] {
  const list: Property[] = [];
  let idx = 0;

  cities.forEach((city, cityIdx) => {
    const count = city.slug === "chicago" ? 8 : 7; // 54 total
    const hoods = neighborhoodsBySlug[city.slug] ?? [];

    for (let i = 0; i < count; i++) {
      idx++;
      const status = idx % 3 === 0 ? "for-rent" : "for-sale";
      const isRent = status === "for-rent";
      let type = pick(typePool);
      if (isRent && !["Apartment", "Condo", "Townhouse"].includes(type)) {
        type = pick(["Apartment", "Condo"] as PropertyType[]);
      }

      const beds = between(1, 6);
      const baths = Math.max(1, Math.min(beds, between(1, 4)));
      const sqft = beds * between(650, 1100);

      const basePrice =
        city.medianPrice * (0.62 + rand() * 0.95) *
        (type === "Villa" ? 1.25 : type === "Condo" ? 0.82 : 1);
      const price = isRent
        ? Math.max(
            1200,
            Math.round(((basePrice / 220) * beds) / 50) * 50 - 10
          )
        : Math.round(basePrice / 1000) * 1000;

      const hood = hoods[i % hoods.length] ?? "Downtown";
      const streetNum = between(100, 9800);
      const slugBase = `${streetNum}-${hood}-${city.slug}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");

      const amenities = Array.from(
        new Set([
          pick(amenityPool),
          pick(amenityPool),
          pick(amenityPool),
          pick(amenityPool),
          pick(amenityPool),
          pick(amenityPool),
          pick(amenityPool),
        ])
      );

      // real-world coordinates for the interactive map
      const lat = +(
        city.center.lat +
        (rand() - 0.5) * city.span
      ).toFixed(6);
      const lng = +(
        city.center.lng +
        (rand() - 0.5) * city.span * 1.4
      ).toFixed(6);

      const descStart = descriptionBits[idx % descriptionBits.length];
      const descMid = descriptionBits[(idx + 4) % descriptionBits.length];
      const descEnd = descriptionBits[(idx + 8) % descriptionBits.length];

      list.push({
        id: `prop-${idx.toString().padStart(3, "0")}`,
        slug: `${slugBase}-${idx}`,
        title: `${hood} ${type === "Apartment" ? "Apartment" : type} with ${beds} Bed${beds > 1 ? "s" : ""}`,
        status,
        price,
        address: `${streetNum} ${pick(streetNames)}, ${city.name}, ${city.state}`,
        city: city.name,
        citySlug: city.slug,
        neighborhood: hood,
        beds,
        baths,
        sqft,
        lotSize: type === "House" || type === "Villa" ? between(3500, 12000) : 0,
        yearBuilt: between(1928, 2025),
        type,
        images: imagesFor(idx),
        description: `${descStart} ${descMid} ${descEnd}`,
        amenities,
        hoaMonthly:
          type === "Condo" || type === "Apartment"
            ? between(180, 720)
            : rand() > 0.6
              ? between(40, 130)
              : 0,
        taxAnnual: isRent ? 0 : Math.round(price * (0.009 + rand() * 0.008)),
        walkScore: Math.min(98, city.walkability + between(-14, 22)),
        transitScore: between(35, 96),
        lat,
        lng,
        featured: idx % 9 === 1,
        openHouse:
          !isRent && idx % 4 === 1
            ? pick(["Sat 1–3 PM", "Sun 12–2 PM", "Sun 2–4 PM"])
            : undefined,
        agentId: `agent-${((idx - 1) % 8) + 1}`,
        listedDaysAgo: between(1, 90),
        petPolicy: isRent ? pick([...petPolicies]) : "both",
        leaseLengths: isRent ? [pick(leaseOptions), "12 months"].filter((v, gi, arr) => arr.indexOf(v) === gi) : [],
        availableFrom: isRent
          ? new Date(Date.now() + between(0, 75) * 86400000).toISOString()
          : "",
      });
      void cityIdx;
    }
  });

  return list;
}

export const properties: Property[] = buildProperties();

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function similarListings(property: Property, limit = 3): Property[] {
  return properties
    .filter(
      (p) =>
        p.id !== property.id &&
        p.status === property.status &&
        (p.citySlug === property.citySlug ||
          Math.abs(p.price - property.price) / property.price < 0.25)
    )
    .slice(0, limit);
}

export const financingPrograms = financingOptions;
export { amenityPool };
