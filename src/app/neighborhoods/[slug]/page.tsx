import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Footprints, GraduationCap, TrainFront } from "lucide-react";
import { cities, getCity } from "@/data/cities";
import { properties } from "@/data/properties";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatCounter } from "@/components/shared/stat-counter";
import { PropertyCard } from "@/components/property/property-card";

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return { title: "Guide not found" };
  return {
    title: `${city.name}, ${city.state} — Neighborhood Guide`,
    description: city.blurb,
  };
}

export default async function CityGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const listings = properties
    .filter((p) => p.citySlug === city.slug)
    .slice(0, 6);

  const lifestyle = [
    { icon: <Footprints className="h-5 w-5" />, label: "Walkability", value: `${city.walkability}/100`, pct: city.walkability },
    { icon: <GraduationCap className="h-5 w-5" />, label: "Schools rating", value: `${city.schoolsRating}/10`, pct: city.schoolsRating * 10 },
    { icon: <TrainFront className="h-5 w-5" />, label: "Avg. commute", value: `${city.commuteMinutes} min`, pct: 100 - Math.min(90, city.commuteMinutes * 2) },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumbs items={[{ label: "Neighborhoods", href: "/neighborhoods" }, { label: city.name }]} />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-xl">
        <Image
          src={unsplash(city.heroImage, 1600, 700)}
          alt={`${city.name} skyline`}
          width={1600}
          height={700}
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="img-editorial h-[380px] w-full object-cover sm:h-[440px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
          <p className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-paper/60">
            City guide · {city.state}
          </p>
          <h1 className="masthead mt-3 text-4xl text-paper sm:text-6xl">
            {city.name}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/85">
            {city.blurb}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {city.lifestyleTags.map((t) => (
              <span key={t} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial + stats */}
      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article className="space-y-5">
          {city.longDescription.map((para, i) => (
            <p key={i} className="text-[17px] leading-relaxed text-ink-soft first:text-lg first:font-medium first:text-ink">
              {para}
            </p>
          ))}

          {/* Gallery */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            {city.gallery.map((g, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={unsplash(g, 400, 300)}
                  alt={`${city.name} — local scene ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 33vw, 220px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition-transform duration-500 hover:scale-[1.06]"
                />
              </div>
            ))}
          </div>
        </article>

        {/* Lifestyle stats */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-soft">
            <h3 className="text-lg text-ink">Lifestyle snapshot</h3>
            <div className="mt-5 space-y-5">
              {lifestyle.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span className="flex items-center gap-2 text-ink-soft">{s.icon} {s.label}</span>
                    <span className="font-semibold text-ink">{s.value}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper-dim">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${Math.min(100, s.pct)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-5 text-center">
              <p className="font-display text-3xl font-semibold tracking-tight text-ink">
                $<StatCounter value={Math.round(city.medianPrice / 1000)} />K
              </p>
              <p className="mt-1.5 font-sans text-[10px] font-medium uppercase tracking-eyebrow text-ink-dim">Median sale price</p>
              <Link href={`/buy?q=${encodeURIComponent(city.name)}`} className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-medium text-white transition hover:bg-ink">
                Browse {city.name} homes
              </Link>
            </div>
          </div>

          <Link href="/neighborhoods" className="flex items-center gap-2 rounded-xl bg-paper-dim px-4 py-3.5 text-[13px] font-medium text-ink transition-colors duration-300 hover:bg-paper-deep">
            <ArrowLeft className="h-4 w-4" /> All neighborhood guides
          </Link>
        </aside>
      </div>

      {/* Homes in area */}
      <section className="mt-20">
        <SectionHeading
          eyebrow="Homes in this area"
          title={`Currently listed in ${city.name}`}
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((p) => (
            <PropertyCard key={p.id} property={p} layoutIdPrefix="guide" />
          ))}
        </div>
      </section>
    </div>
  );
}
