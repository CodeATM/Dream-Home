import type { City } from "./types";

export const cities: City[] = [
  {
    slug: "austin",
    name: "Austin",
    state: "TX",
    blurb:
      "Live-music capital with tech money, taco trailers and swimming holes.",
    longDescription: [
      "Austin moves to its own rhythm — a city where tech campuses sit ten minutes from spring-fed swimming holes and the best meal of your life might come off a food trailer. Neighborhoods like Zilker and Bouldin Creek trade on walkability and greenbelt access, while East Austin keeps its creative edge with galleries in old warehouses.",
      "Buyers here get genuine variety: restored bungalows under mature oaks, glassy new-builds along Lady Bird Lake, and hill-country moderns minutes from downtown. With no state income tax and a job market that keeps compounding, Austin remains one of the most confident bets in Texas real estate.",
    ],
    heroImage: "photo-1531218150217-54595bc2b934",
    gallery: [
      "photo-1444723121867-7a241cacace9",
      "photo-1506905925346-21bda4d32df4",
      "photo-1522083165195-3424ed129620",
    ],
    medianPrice: 689000,
    walkability: 62,
    schoolsRating: 8,
    commuteMinutes: 26,
    lifestyleTags: ["Live music", "Outdoor lifestyle", "Tech hub", "Food scene"],
    center: { lat: 30.2672, lng: -97.7431 }, span: 0.09,
  },
  {
    slug: "seattle",
    name: "Seattle",
    state: "WA",
    blurb:
      "Evergreen city of craft coffee, water views and quiet, leafy streets.",
    longDescription: [
      "Between Puget Sound and the Cascades, Seattle balances urban density with an almost embarrassing amount of nature. Capitol Hill delivers nightlife and character; Ballard brings Nordic-rooted charm and a famous Sunday market; West Seattle trades a bridge commute for beach sunsets against the skyline.",
      "The housing stock leans craftsman and mid-century, with modern condos clustered around South Lake Union. A resilient tech-and-aerospace economy keeps demand steady, while the state's lack of income tax softens the cost-of-living math for relocators.",
    ],
    heroImage: "photo-1519501025264-65ba15a82390",
    gallery: [
      "photo-1441974231531-c6227db76b6e",
      "photo-1493246507139-91e8fad9978e",
      "photo-1480714378408-67cf0d13bc1b",
    ],
    medianPrice: 812000,
    walkability: 73,
    schoolsRating: 8,
    commuteMinutes: 31,
    lifestyleTags: ["Coffee culture", "Water views", "Hiking", "Tech"],
    center: { lat: 47.6062, lng: -122.3321 }, span: 0.085,
  },
  {
    slug: "denver",
    name: "Denver",
    state: "CO",
    blurb:
      "Mile-high sunshine, brewery patios and weekend runs into the Rockies.",
    longDescription: [
      "Denver sells a lifestyle as much as square footage — 300 days of sun, a brewery within walking distance of nearly everything, and ski traffic as the only traffic anyone complains about. RiNo and LoHi lead the charge for new construction; Wash Park and Congress Park hold down the classic brick-bungalow end of the market.",
      "Prices have cooled from their peak without losing momentum, making this a rare window for buyers who want mountain access without resort-town pricing.",
    ],
    heroImage: "photo-1506905925346-21bda4d32df4",
    gallery: [
      "photo-1493246507139-91e8fad9978e",
      "photo-1441974231531-c6227db76b6e",
      "photo-1444723121867-7a241cacace9",
    ],
    medianPrice: 598000,
    walkability: 66,
    schoolsRating: 7,
    commuteMinutes: 28,
    lifestyleTags: ["Ski weekends", "Craft beer", "300 days of sun", "Bikeable"],
    center: { lat: 39.7392, lng: -104.9903 }, span: 0.11,
  },
  {
    slug: "miami",
    name: "Miami",
    state: "FL",
    blurb:
      "Art-deco shoreline energy with a skyline that never sits still.",
    longDescription: [
      "Miami is having a decade. Brickell's glass towers, Wynwood's murals and Coconut Grove's canopy-lined lanes each feel like different cities stitched together by turquoise water. No state income tax continues pulling companies — and their employees — south.",
      "Condos dominate the waterfront core, while Coral Gables and Pinecrest serve families who want Mediterranean architecture and top-rated schools. Expect competition at every price point; well-priced units still move in days.",
    ],
    heroImage: "photo-1506929562872-bb421503ef21",
    gallery: [
      "photo-1514924013411-cbf25faa35bb",
      "photo-1480714378408-67cf0d13bc1b",
      "photo-1519501025264-65ba15a82390",
    ],
    medianPrice: 645000,
    walkability: 71,
    schoolsRating: 7,
    commuteMinutes: 29,
    lifestyleTags: ["Beaches", "Nightlife", "No income tax", "International"],
    center: { lat: 25.7617, lng: -80.1918 }, span: 0.075,
  },
  {
    slug: "portland",
    name: "Portland",
    state: "OR",
    blurb:
      "Rose gardens, food carts and neighborhoods built for slow Saturdays.",
    longDescription: [
      "Portland rewards people who look closer: century-old foursquares in Irvington, adobe-style mid-centries in Laurelhurst, and ADU-friendly lots across the east side. The city's urban growth boundary keeps neighborhoods compact and green space genuinely wild — Forest Park is larger than Central Park five times over.",
      "It's the most affordable major city on the West Coast, which is exactly why buyers who priced out of Seattle and California keep landing here.",
    ],
    heroImage: "photo-1441974231531-c6227db76b6e",
    gallery: [
      "photo-1522083165195-3424ed129620",
      "photo-1493246507139-91e8fad9978e",
      "photo-1506905925346-21bda4d32df4",
    ],
    medianPrice: 542000,
    walkability: 68,
    schoolsRating: 7,
    commuteMinutes: 25,
    lifestyleTags: ["Food carts", "Rose gardens", "Cycling", "Indie spirit"],
    center: { lat: 45.5152, lng: -122.6784 }, span: 0.07,
  },
  {
    slug: "nashville",
    name: "Nashville",
    state: "TN",
    blurb:
      "Songwriter city turned boomtown — honky-tonks, hot chicken, new builds.",
    longDescription: [
      "Nashville's growth curve looks like a power chord: healthcare and entertainment dollars pouring in, cranes over Gulch and Midtown, and 12South turning into a destination street. The state has no income tax, and prices still trail peer boomtowns by a comfortable margin.",
      "East Nashville keeps the bungalow-and-porch character, while Bellevue and Nolensville feed families seeking newer builds and strong schools.",
    ],
    heroImage: "photo-1480714378408-67cf0d13bc1b",
    gallery: [
      "photo-1444723121867-7a241cacace9",
      "photo-1519501025264-65ba15a82390",
      "photo-1522083165195-3424ed129620",
    ],
    medianPrice: 512000,
    walkability: 59,
    schoolsRating: 7,
    commuteMinutes: 27,
    lifestyleTags: ["Music row", "Hot chicken", "Boomtown growth", "Porch culture"],
    center: { lat: 36.1627, lng: -86.7816 }, span: 0.13,
  },
  {
    slug: "san-diego",
    name: "San Diego",
    state: "CA",
    blurb:
      "Seventy degrees and sunny — beach towns, burritos, biotech payrolls.",
    longDescription: [
      "San Diego's promise is simple and durable: the country's gentlest climate wrapped around distinct beach villages — La Jolla for drama, Pacific Beach for energy, Coronado for postcard perfection. Inland, North Park and South Park carry the craft-everything scene; Carmel Valley feeds biotech commuters.",
      "Inventory is famously tight, so prepared buyers win here. The payoff is owning a piece of the coastline people dream about from cubicles in colder states.",
    ],
    heroImage: "photo-1506929562872-bb421503ef21",
    gallery: [
      "photo-1514924013411-cbf25faa35bb",
      "photo-1506905925346-21bda4d32df4",
      "photo-1480714378408-67cf0d13bc1b",
    ],
    medianPrice: 918000,
    walkability: 64,
    schoolsRating: 8,
    commuteMinutes: 27,
    lifestyleTags: ["Beach towns", "Perfect weather", "Biotech", "Burritos"],
    center: { lat: 32.7157, lng: -117.1611 }, span: 0.09,
  },
  {
    slug: "chicago",
    name: "Chicago",
    state: "IL",
    blurb:
      "Big-city architecture at Midwest prices — lakefront paths and corner bars.",
    longDescription: [
      "Chicago remains the best value among America's true skylines. Graystone two-flats in Logan Square, vintage courtyards in Lakeview, and glass condos along the river offer three completely different ownership stories inside one metro. The lakefront trail alone justifies the address.",
      "World-class restaurants, museums and transit mean you can live car-free in a way few American cities allow — and the price per square foot still reads like a typo to coastal buyers.",
    ],
    heroImage: "photo-1514924013411-cbf25faa35bb",
    gallery: [
      "photo-1477959858617-67f85cf4f1df",
      "photo-1480714378408-67cf0d13bc1b",
      "photo-1519501025264-65ba15a82390",
    ],
    medianPrice: 425000,
    walkability: 76,
    schoolsRating: 7,
    commuteMinutes: 33,
    lifestyleTags: ["Architecture", "Lakefront", "Transit city", "Value"],
    center: { lat: 36.1627, lng: -86.7816 }, span: 0.13,
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
