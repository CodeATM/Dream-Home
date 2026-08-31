import type { Agent, Review } from "./types";

export const agents: Agent[] = [
  {
    id: "agent-1",
    slug: "maya-chen",
    name: "Maya Chen",
    title: "Principal Agent",
    photo: "1573496359142-b8d87734a5a2",
    city: "Austin",
    citySlug: "austin",
    specialties: ["Luxury homes", "First-time buyers", "Relocation"],
    rating: 4.9,
    reviewsCount: 127,
    salesCount: 342,
    experienceYears: 12,
    phone: "(512) 555-0142",
    email: "maya.chen@Meridian.com",
    bio: "Maya has guided more than three hundred families through Austin's fastest-moving neighborhoods. A former architect, she sees past staging to structure — clients rely on her to flag the foundation issue everyone else missed and spot the $40K kitchen that just needs paint.",
    languages: ["English", "Mandarin"],
  },
  {
    id: "agent-2",
    slug: "jordan-reyes",
    name: "Jordan Reyes",
    title: "Senior Listing Agent",
    photo: "1507003211169-0a1dd7228f2d",
    city: "Seattle",
    citySlug: "seattle",
    specialties: ["Condos & high-rises", "Investment properties"],
    rating: 4.8,
    reviewsCount: 98,
    salesCount: 261,
    experienceYears: 10,
    phone: "(206) 555-0187",
    email: "jordan.reyes@Meridian.com",
    bio: "Jordan specializes in Seattle's vertical market — pre-sales, view corridors, and HOA documents read cover to cover. Investors love his rental-yield spreadsheets; first-time condo buyers love that he translates all of it into plain English.",
    languages: ["English", "Spanish"],
  },
  {
    id: "agent-3",
    slug: "sarah-okafor",
    name: "Sarah Okafor",
    title: "Lead Buyer's Agent",
    photo: "1544005313-94ddf0286df2",
    city: "Denver",
    citySlug: "denver",
    specialties: ["Suburban family homes", "New construction", "School districts"],
    rating: 5.0,
    reviewsCount: 156,
    salesCount: 289,
    experienceYears: 9,
    phone: "(303) 555-0121",
    email: "sarah.okafor@Meridian.com",
    bio: "Sarah knows Denver's school boundaries better than most registrars. She works almost exclusively with growing families, negotiating builder incentives in new communities and finding the quiet cul-de-sacs that never make it onto listing sites early.",
    languages: ["English", "Igbo"],
  },
  {
    id: "agent-4",
    slug: "diego-martinez",
    name: "Diego Martinez",
    title: "Waterfront Specialist",
    photo: "1633332755192-727a05c4013d",
    city: "Miami",
    citySlug: "miami",
    specialties: ["Waterfront", "International buyers", "New development"],
    rating: 4.7,
    reviewsCount: 84,
    salesCount: 198,
    experienceYears: 11,
    phone: "(305) 555-0163",
    email: "diego.martinez@Meridian.com",
    bio: "From Coral Gables estates to Brickell penthouses, Diego handles Miami's most competitive waterfront listings. Bilingual in English and Spanish with a client book spanning fourteen countries, he runs a white-glove process for international buyers purchasing sight-unseen.",
    languages: ["English", "Spanish", "Portuguese"],
  },
  {
    id: "agent-5",
    slug: "emily-hartman",
    name: "Emily Hartman",
    title: "Senior Agent",
    photo: "1438761681033-6461ffad8d80",
    city: "Portland",
    citySlug: "portland",
    specialties: ["Craftsman & vintage homes", "ADU investments"],
    rating: 4.9,
    reviewsCount: 112,
    salesCount: 203,
    experienceYears: 8,
    phone: "(503) 555-0178",
    email: "emily.hartman@Meridian.com",
    bio: "Emily is the agent Portland preservationists call. She can date a home from its trim profile, connect buyers with contractors who respect old houses, and has helped two dozen owners add income-generating ADUs without losing the neighborhood's character.",
    languages: ["English"],
  },
  {
    id: "agent-6",
    slug: "andre-williams",
    name: "Andre Williams",
    title: "Growth Markets Lead",
    photo: "1560250097-0b93528c311a",
    city: "Nashville",
    citySlug: "nashville",
    specialties: ["New construction", "Investment", "Relocation"],
    rating: 4.8,
    reviewsCount: 91,
    salesCount: 276,
    experienceYears: 13,
    phone: "(615) 555-0109",
    email: "andre.williams@Meridian.com",
    bio: "Andre rode Nashville's boom from the front seat — pre-construction contracts, lot selection, and exit math for investors. Relocators get his famous 'Nashville in a Day' tour: twelve neighborhoods, honest pricing context, and hot chicken (optional but recommended).",
    languages: ["English"],
  },
  {
    id: "agent-7",
    slug: "lena-kowalski",
    name: "Lena Kowalski",
    title: "Coastal Property Expert",
    photo: "1580489944761-15a19d654956",
    city: "San Diego",
    citySlug: "san-diego",
    specialties: ["Beach communities", "Luxury homes", "1031 exchanges"],
    rating: 4.9,
    reviewsCount: 143,
    salesCount: 311,
    experienceYears: 15,
    phone: "(619) 555-0134",
    email: "lena.kowalski@Meridian.com",
    bio: "Fifteen years of San Diego coastal sales taught Lena that inventory is a relationships business — nearly a third of her deals never hit the MLS. She represents move-up families in La Jolla and investors structuring exchanges across state lines with equal calm.",
    languages: ["English", "Polish"],
  },
  {
    id: "agent-8",
    slug: "marcus-webb",
    name: "Marcus Webb",
    title: "City Specialist",
    photo: "1472099645785-5658abf4ff4e",
    city: "Chicago",
    citySlug: "chicago",
    specialties: ["Historic districts", "Condos", "Walkability"],
    rating: 4.7,
    reviewsCount: 76,
    salesCount: 187,
    experienceYears: 7,
    phone: "(312) 555-0156",
    email: "marcus.webb@Meridian.com",
    bio: "Marcus covers Chicago's north-side vintage stock — graystones, courtyard buildings, and the assessment appeals that come with them. Car-free by choice, he maps every showing around transit and will happily debate the best patio in Logan Square.",
    languages: ["English"],
  },
];

const reviewTexts: Array<[string, number, string]> = [
  [
    "Claire D.",
    5,
    "Sold above asking in four days. Every step was explained before we had to ask — communication was genuinely next level.",
  ],
  [
    "Tom H.",
    5,
    "Patient with a picky buyer (me), ruthless with inspectors and lenders. Found us a house we didn't think existed in our budget.",
  ],
  [
    "Priya S.",
    4,
    "Great negotiation on our purchase and honest advice when we considered backing out. Only wish showings ran later on weekdays.",
  ],
  [
    "Marcus L.",
    5,
    "As an out-of-state buyer I needed someone I could trust completely. Video walkthroughs, straight answers, zero pressure.",
  ],
  [
    "Elena R.",
    5,
    "Handled a messy contingency situation like it was nothing. Our stress levels stayed low because nothing slipped through.",
  ],
];

export const reviews: Review[] = agents.flatMap((agent, ai) =>
  reviewTexts.map(([author, rating, text], ri) => ({
    agentId: agent.id,
    author,
    rating,
    date: new Date(
      Date.now() - ((ai * 5 + ri) % 10 + 1) * 30 * 86400000
    ).toISOString(),
    text:
      ri === 0
        ? `${text} ${agent.name.split(" ")[0]} made it happen.`
        : text,
  }))
);

export function getAgent(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export function agentReviews(agentId: string): Review[] {
  return reviews.filter((r) => r.agentId === agentId);
}
