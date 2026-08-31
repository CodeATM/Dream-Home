export type PropertyStatus = "for-sale" | "for-rent";

export type PropertyType =
  | "House"
  | "Condo"
  | "Townhouse"
  | "Apartment"
  | "Villa"
  | "Loft";

export interface Property {
  id: string;
  slug: string;
  title: string;
  status: PropertyStatus;
  price: number; // sale price, or monthly rent
  address: string;
  city: string;
  citySlug: string;
  neighborhood: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: number;
  yearBuilt: number;
  type: PropertyType;
  images: string[];
  description: string;
  amenities: string[];
  hoaMonthly: number;
  taxAnnual: number;
  walkScore: number;
  transitScore: number;
  lat?: number; // real-world position for the interactive map
  lng?: number;
  featured: boolean;
  openHouse?: string;
  agentId: string;
  listedDaysAgo: number;
  petPolicy: "cats-ok" | "dogs-ok" | "both" | "no-pets";
  leaseLengths: string[];
  availableFrom: string;
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  title: string;
  photo: string;
  city: string;
  citySlug: string;
  specialties: string[];
  rating: number;
  reviewsCount: number;
  salesCount: number;
  experienceYears: number;
  phone: string;
  email: string;
  bio: string;
  languages: string[];
}

export interface Review {
  agentId: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface City {
  slug: string;
  name: string;
  state: string;
  blurb: string;
  longDescription: string[];
  heroImage: string;
  gallery: string[];
  medianPrice: number;
  walkability: number;
  schoolsRating: number;
  commuteMinutes: number;
  lifestyleTags: string[];
  /** Real-world center used by the interactive map */
  center: { lat: number; lng: number };
  /** Rough spread (degrees) of listings around the center */
  span: number;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: "Buying" | "Selling" | "Market Updates" | "Renting" | "Finance";
  coverImage: string;
  coverBlur?: string;
  author: string;
  authorRole: string;
  readTime: number;
  date: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface ListingFilters {
  q: string;
  types: PropertyType[];
  minPrice?: number;
  maxPrice?: number;
  beds: number;
  baths: number;
  citySlugs: string[];
  sort: "newest" | "price-asc" | "price-desc" | "sqft-desc";
  pets: "any" | "cats-ok" | "dogs-ok" | "both" | "no-pets";
  moveInFrom?: string;
  leaseLength: string;
  maxHoa?: number;
  financing: string[];
}

export const DEFAULT_FILTERS: ListingFilters = {
  q: "",
  types: [],
  beds: 0,
  baths: 0,
  citySlugs: [],
  sort: "newest",
  pets: "any",
  leaseLength: "any",
  financing: [],
};

export interface NotificationItem {
  id: string;
  kind: "price-drop" | "new-match" | "tour-reminder";
  title: string;
  body: string;
  propertySlug?: string;
  time: string;
  read: boolean;
}
