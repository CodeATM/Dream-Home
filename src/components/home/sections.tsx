"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Shield,
  MapPin,
  Wrench,
  Home,
  Building2,
  Sparkles,
  Landmark,
  TreePine,
} from "lucide-react";
import type { Agent } from "@/data/types";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { StatCounter } from "@/components/shared/stat-counter";
import { SectionHeading } from "@/components/shared/section-heading";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ——— Why Choose Us ——— */
export function ValueProps() {
  const items = [
    {
      icon: <Shield className="h-6 w-6" strokeWidth={1.5} />,
      title: "Professionally Managed",
      body: "Every property is maintained to the highest standard, ensuring quality living experiences for all residents.",
    },
    {
      icon: <MapPin className="h-6 w-6" strokeWidth={1.5} />,
      title: "Prime Locations",
      body: "We manage properties in carefully selected locations — the neighborhoods that define exceptional living.",
    },
    {
      icon: <Wrench className="h-6 w-6" strokeWidth={1.5} />,
      title: "Reliable Maintenance",
      body: "Fast, professional property support when you need it. Our team responds within hours, not days.",
    },
    {
      icon: <Home className="h-6 w-6" strokeWidth={1.5} />,
      title: "Trusted Service",
      body: "From viewing to tenancy, our dedicated team stays with you through every step of the journey.",
    },
  ];

  return (
    <section className="bg-paper">
      <div className="mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow="Why Meridian"
          title="Property management you can trust"
          description="Built on decades of expertise, our commitment to quality sets us apart in every property we manage."
        />
        <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="group"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-paper">
                {it.icon}
              </div>
              <h3 className="mt-6 font-heading text-xl font-bold text-navy">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                {it.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ——— Stats Bar ——— */
export function StatsBar() {
  const stats = [
    { value: 250, suffix: "+", label: "Properties Managed" },
    { value: 1200, suffix: "+", label: "Satisfied Residents" },
    { value: 15, suffix: "+", label: "Years of Experience" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
  ];
  return (
    <section className="bg-navy">
      <div className="mx-auto grid w-full max-w-7xl divide-white/8 px-4 py-20 sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="px-5 py-4 text-center">
            <p className="font-heading text-5xl font-bold tracking-tight text-paper lg:text-6xl">
              <StatCounter
                value={s.value}
                suffix={s.suffix}
                decimals={0}
              />
            </p>
            <p className="mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/35">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ——— Property Categories ——— */
export function PropertyCategories() {
  const categories = [
    {
      icon: <Home className="h-5 w-5" strokeWidth={1.75} />,
      title: "Residential",
      description: "Apartments, houses and estates",
      image: "1568605114967-8130f3a36994",
      href: "/buy",
    },
    {
      icon: <Building2 className="h-5 w-5" strokeWidth={1.75} />,
      title: "Commercial",
      description: "Office spaces, retail and commercial",
      image: "1497366216548-37526070297c",
      href: "/sell",
    },
    {
      icon: <Sparkles className="h-5 w-5" strokeWidth={1.75} />,
      title: "Luxury",
      description: "Premium properties in exceptional locations",
      image: "1613490493576-7fde63acd811",
      href: "/buy",
    },
    {
      icon: <Landmark className="h-5 w-5" strokeWidth={1.75} />,
      title: "Land",
      description: "Development and investment opportunities",
      image: "1500076656116-558758c991c1",
      href: "/buy",
    },
  ];

  return (
    <section className="border-t border-ink/5 bg-paper-deep/40 py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          eyebrow="Explore"
          title="Browse by category"
          description="Whether you're looking for a home, an office, or an investment opportunity."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
            >
              <Link
                href={cat.href}
                className="group relative block overflow-hidden rounded-xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={unsplash(cat.image, 500, 625)}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="img-editorial object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-paper backdrop-blur-sm">
                    {cat.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-paper">{cat.title}</h3>
                  <p className="mt-1 text-[13px] text-paper/55">{cat.description}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent transition-all duration-300 group-hover:gap-2.5">
                    Explore <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ——— City Scroller ——— */
export function CityScroller({
  cities,
}: {
  cities: Array<{
    slug: string;
    name: string;
    state: string;
    heroImage: string;
    count: number;
    medianPrice: number;
  }>;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) =>
    scroller.current?.scrollBy({ left: dir * 340, behavior: "smooth" });

  return (
    <section className="bg-paper py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            index="04"
            eyebrow="Browse by Location"
            title="Prime locations, managed with care"
          />
          <div className="hidden gap-2 sm:flex">
            <button onClick={() => scroll(-1)} aria-label="Scroll left" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white shadow-soft transition-all duration-300 hover:border-accent/30 hover:text-accent">
              <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <button onClick={() => scroll(1)} aria-label="Scroll right" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white shadow-soft transition-all duration-300 hover:border-accent/30 hover:text-accent-deep">
              <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
      <div
        ref={scroller}
        className="no-scrollbar mt-14 flex snap-x gap-6 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {cities.map((c) => (
          <Link
            key={c.slug}
            href={`/neighborhoods/${c.slug}`}
            className="group relative block w-[280px] shrink-0 snap-start overflow-hidden rounded-xl"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={unsplash(c.heroImage, 560, 700)}
                alt={`${c.name}, ${c.state}`}
                fill
                sizes="280px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="img-editorial object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-heading text-xl font-bold text-paper">{c.name}, {c.state}</p>
                <p className="mt-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/50">
                  {c.count} properties &middot; from ${Math.round(c.medianPrice / 1000)}K
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ——— Agent Strip ——— */
export function AgentStrip({ agents }: { agents: Agent[] }) {
  return (
    <section className="border-t border-ink/5 bg-paper pb-28 pt-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            index="05"
            eyebrow="Our Team"
            title="Dedicated professionals"
            description="Experienced agents committed to finding you the perfect property."
          />
          <Link
            href="/agents"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-ink/10 bg-transparent px-6 py-3 text-[13px] font-semibold tracking-wide text-navy transition-all duration-300 hover:border-navy/25 hover:bg-navy/5"
          >
            View all agents <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>

        <div className="no-scrollbar mt-14 flex snap-x gap-6 overflow-x-auto pb-2">
          {agents.map((a) => (
            <Link
              key={a.id}
              href={`/agents/${a.slug}`}
              className="group w-[260px] shrink-0 snap-start"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={unsplash(a.photo, 400, 533)}
                  alt={a.name}
                  fill
                  sizes="260px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="img-editorial object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-heading text-lg font-bold text-paper">{a.name}</p>
                  <p className="mt-0.5 text-[13px] text-paper/55">{a.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ——— CTA Banner ——— */
export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0 opacity-20">
        <Image
          src={unsplash("1600596542815-ffad4c1539a9", 1920, 600)}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 to-navy/70" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 sm:py-32 lg:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-soft"
          >
            Get started today
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            className="masthead text-4xl text-paper sm:text-5xl lg:text-6xl"
          >
            Your next property is
            <br />
            <span className="text-paper/80">closer than you think.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
            className="mt-6 max-w-md text-base leading-relaxed text-paper/50"
          >
            Explore our collection of carefully managed properties. From
            apartments to commercial spaces, find your perfect match.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/buy"
              className="inline-flex items-center gap-2.5 rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-accent-hot hover:shadow-glow"
            >
              Explore Properties <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 px-8 py-3.5 text-sm font-semibold tracking-wide text-paper transition-all duration-300 hover:border-white/30 hover:bg-white/5"
            >
              Speak With Us <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
