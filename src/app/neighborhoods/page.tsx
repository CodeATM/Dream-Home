import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { cities } from "@/data/cities";
import { properties } from "@/data/properties";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { formatCompactPrice } from "@/lib/format";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "Neighborhood & City Guides",
  description:
    "Editorial guides to every market we cover — median prices, lifestyle stats and current homes.",
};

export default function NeighborhoodsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumbs items={[{ label: "Neighborhoods" }]} />
      </div>
      <div className="max-w-2xl">
        <p className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-accent-deep">
          Guides
        </p>
        <h1 className="masthead mt-3 text-4xl text-ink sm:text-5xl">
          Know the block before you buy it
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-dim">
          Honest write-ups of every city we serve — what it's like on a
          Tuesday, not just at an open house.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((c, i) => {
          const count = properties.filter((p) => p.citySlug === c.slug).length;
          return (
            <Link
              key={c.slug}
              href={`/neighborhoods/${c.slug}`}
              className="group overflow-hidden rounded-xl bg-white shadow-soft transition-all duration-500 ease-luxe hover:-translate-y-1 hover:shadow-hard"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={unsplash(c.heroImage, 640, 400)}
                  alt={`${c.name}, ${c.state}`}
                  fill
                  priority={i < 3}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="img-editorial object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-eyebrow text-ink shadow-sm backdrop-blur">
                  <MapPin className="h-3 w-3 text-accent" strokeWidth={2} /> {c.name}, {c.state}
                </span>
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed text-ink/75">{c.blurb}</p>
                <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-4 text-sm">
                  <span className="text-ink-dim">
                    Median{" "}
                    <span className="font-heading text-base text-ink">
                      {formatCompactPrice(c.medianPrice)}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 font-medium text-accent-deep group-hover:text-accent">
                    {count} homes <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
