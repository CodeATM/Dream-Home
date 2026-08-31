"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Heart, CalendarClock } from "lucide-react";
import type { Property } from "@/data/types";
import { formatCompactPrice, formatRelativeDays } from "@/lib/format";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { useFavorites, useCompare } from "@/lib/stores";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PropertyCard({
  property,
  priority = false,
  className,
  layoutIdPrefix = "card",
  rowLayout = false,
}: {
  property: Property;
  priority?: boolean;
  className?: string;
  layoutIdPrefix?: string;
  rowLayout?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const favorites = useFavorites((s) => s.ids);
  const toggleFavorite = useFavorites((s) => s.toggle);
  const compareIds = useCompare((s) => s.ids);
  const compareToggle = useCompare((s) => s.toggle);

  const isFav = mounted && favorites.includes(property.id);
  const inCompare = mounted && compareIds.includes(property.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: EASE }}
      id={`card-${property.id}`}
      onMouseEnter={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("dh:hover-listing", { detail: property.id })
          );
        }
      }}
      onMouseLeave={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("dh:hover-listing", { detail: null }));
        }
      }}
      className={cn(
        "group relative flex scroll-mt-28 flex-col rounded-xl bg-white shadow-soft transition-all duration-500 ease-luxe hover:-translate-y-1 hover:shadow-lift border border-ink/5 hover:border-ink/10",
        rowLayout &&
          "sm:flex-row [&>a]:sm:w-[38%] [&>a]:sm:self-stretch [&>a]:sm:aspect-auto [&>div:last-child]:sm:flex-1",
        className
      )}
    >
      <Link
        href={`/listings/${property.slug}`}
        className={cn(
          "relative block overflow-hidden rounded-t-xl",
          rowLayout ? "aspect-[16/10] sm:aspect-auto sm:min-h-[220px] sm:rounded-l-xl sm:rounded-t-none" : "aspect-[4/3]"
        )}
        aria-label={property.title}
      >
        <motion.div
          layoutId={`${layoutIdPrefix}-${property.id}`}
          className="absolute inset-0"
        >
          <Image
            src={unsplash(property.images[0], 800, 600)}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="img-editorial object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.05]"
          />
        </motion.div>

        <div className="absolute left-3.5 top-3.5 z-10 flex gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-navy backdrop-blur-sm">
            {property.status === "for-sale" ? "For Sale" : "For Rent"}
          </span>
          {property.openHouse && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/90 px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              <CalendarClock className="h-3 w-3" strokeWidth={2} /> Open{" "}
              {property.openHouse}
            </span>
          )}
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(property.id);
        }}
        aria-label={isFav ? "Remove from saved homes" : "Save home"}
        className="absolute right-3.5 top-3.5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110 focus-visible:outline-none"
      >
        <Heart
          strokeWidth={1.75}
          className={cn(
            "h-4 w-4 text-navy transition-colors duration-300",
            isFav && "fill-accent text-accent"
          )}
        />
      </button>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-heading text-xl font-bold tracking-tight text-navy">
          {formatCompactPrice(property.price)}
          {property.status === "for-rent" && (
            <span className="text-sm font-normal text-ink-dim">/mo</span>
          )}
        </p>
        <h3 className="mt-2 text-sm leading-relaxed text-ink/80">
          <Link href={`/listings/${property.slug}`} className="transition-colors duration-300 hover:text-accent-deep">
            {property.title}
          </Link>
        </h3>
        <p className="mt-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-dim">
          {property.neighborhood}, {property.city}
        </p>

        <p className="mt-4 border-t border-ink/6 pt-4 text-[13px] leading-relaxed text-ink-dim">
          {property.beds} Beds &middot; {property.baths} Baths &middot;{" "}
          {property.sqft.toLocaleString()} m&sup2;
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-ink-dim/60">
            {formatRelativeDays(property.listedDaysAgo)}
          </span>
          <label className="flex cursor-pointer select-none items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-dim transition-colors hover:text-navy">
            <input
              type="checkbox"
              checked={inCompare}
              onChange={() => compareToggle(property.id)}
              disabled={!inCompare && compareIds.length >= 4}
              className="h-3.5 w-3.5 cursor-pointer accent-accent disabled:opacity-30"
            />
            Compare
          </label>
        </div>
      </div>
    </motion.article>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="rounded-xl bg-white shadow-soft border border-ink/5">
      <div className="aspect-[4/3] animate-pulse rounded-t-xl bg-paper-deep" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-1/3 animate-pulse rounded-lg bg-paper-deep" />
        <div className="h-3.5 w-3/4 animate-pulse rounded bg-paper-dim" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-paper-dim/70" />
      </div>
    </div>
  );
}

export function PriceTag({
  property,
  long = false,
}: {
  property: Property;
  long?: boolean;
}) {
  void long;
  return (
    <span className="font-heading font-bold">
      {formatCompactPrice(property.price)}
      {property.status === "for-rent" && "/mo"}
    </span>
  );
}
