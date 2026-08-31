import type { Metadata } from "next";
import { properties } from "@/data/properties";
import { cities } from "@/data/cities";
import { agents } from "@/data/agents";
import { testimonials } from "@/data/testimonials";
import { Hero, HeroSearchCard } from "@/components/home/hero";
import { FeaturedBento } from "@/components/home/featured-bento";
import {
  ValueProps,
  StatsBar,
  PropertyCategories,
  CityScroller,
  AgentStrip,
  CtaBanner,
} from "@/components/home/sections";
import { TestimonialCarousel } from "@/components/shared/testimonial-carousel";

export const metadata: Metadata = {
  title: "Meridian — Exceptional Spaces. Better Living.",
  description:
    "Discover thoughtfully managed residential and commercial properties in prime locations. Premium property management you can trust.",
};

export default function HomePage() {
  const featured = properties.filter((p) => p.featured).slice(0, 6);
  const bentoItems =
    featured.length >= 6 ? featured : properties.slice(0, 6);

  const cityCounts = cities.map((c) => ({
    slug: c.slug,
    name: c.name,
    state: c.state,
    heroImage: c.heroImage,
    medianPrice: c.medianPrice,
    count: properties.filter(
      (p) => p.citySlug === c.slug && p.status === "for-sale"
    ).length,
  }));

  return (
    <>
      <Hero />
      <HeroSearchCard />

      <FeaturedBento items={bentoItems} />

      <ValueProps />

      <StatsBar />

      <PropertyCategories />

      <CityScroller cities={cityCounts} />

      <AgentStrip agents={agents.slice(0, 6)} />

      <section className="border-t border-ink/5 bg-paper-deep/30 py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <TestimonialCarousel items={testimonials} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
