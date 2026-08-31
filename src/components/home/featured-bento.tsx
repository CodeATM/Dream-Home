"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";
import type { Property } from "@/data/types";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { useFavorites } from "@/lib/stores";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function SaveButton({ id }: { id: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const favorites = useFavorites((s) => s.ids);
  const toggle = useFavorites((s) => s.toggle);
  const isFav = mounted && favorites.includes(id);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggle(id);
      }}
      aria-label="Save home"
      className={cn(
        "absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110",
        isFav && "bg-white"
      )}
    >
      <Heart
        strokeWidth={1.75}
        className={cn(
          "h-4 w-4 text-navy transition-colors",
          isFav && "fill-accent text-accent"
        )}
      />
    </button>
  );
}

function TileContent({
  property,
  priority = false,
}: {
  property: Property;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/listings/${property.slug}`}
      className="group absolute inset-0 block overflow-hidden rounded-xl"
    >
      <Image
        src={unsplash(property.images[0], 600, 500)}
        alt={property.title}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 50vw, 25vw"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="img-editorial object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy/10 to-transparent opacity-90" />
      <SaveButton id={property.id} />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-heading text-xl font-bold text-paper">
          ${Math.round(property.price / 1000)}K
          {property.status === "for-rent" && "/mo"}
        </p>
        <p className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/55">
          {property.neighborhood}
        </p>
      </div>
      <ArrowUpRight className="absolute bottom-5 right-5 h-5 w-5 text-paper/70 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" strokeWidth={1.75} />
    </Link>
  );
}

function LargeTileContent({ property }: { property: Property }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(1200px) rotateX(${(-py * 2).toFixed(2)}deg) rotateY(${(px * 3).toFixed(2)}deg) scale(1.02)`
    );
  };

  return (
    <Link
      href={`/listings/${property.slug}`}
      onMouseMove={onMove}
      onMouseLeave={() => setTransform("")}
      className="group absolute inset-0 block overflow-hidden rounded-xl"
    >
      <div
        ref={ref}
        className="relative h-full w-full transition-transform duration-700 ease-luxe"
        style={{ transform }}
      >
        <Image
          src={unsplash(property.images[0], 1000, 800)}
          alt={property.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="img-editorial object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy/15 to-transparent" />
      <SaveButton id={property.id} />
      <span className="absolute left-5 top-5 rounded-full bg-accent/90 px-3.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
        Featured &middot; {property.status === "for-sale" ? "For Sale" : "For Rent"}
      </span>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 text-paper sm:p-8">
        <div className="min-w-0">
          <p className="masthead text-3xl sm:text-4xl">
            ${Math.round(property.price / 1000)}K
            {property.status === "for-rent" && "/mo"}
          </p>
          <p className="mt-1.5 truncate font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/50">
            {property.address}
          </p>
        </div>
        <ArrowUpRight className="h-6 w-6 shrink-0 text-paper/75 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-paper" strokeWidth={1.5} />
      </div>
    </Link>
  );
}

export function FeaturedBento({ items }: { items: Property[] }) {
  if (items.length < 6) return null;
  const [large, tall, ...rest] = items;

  return (
    <section className="border-t border-ink/5 bg-paper py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            index="01"
            eyebrow="Featured Properties"
            title="Spaces selected for exceptional living"
            description="Properties curated for exceptional quality, investment potential, and prime locations."
          />
          <Link
            href="/buy"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-ink/10 px-6 py-3 text-[13px] font-semibold tracking-wide text-navy transition-all duration-300 hover:border-navy/25 hover:bg-navy/5"
          >
            Browse all <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>

        {/* Mobile & tablet */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative aspect-[16/10]"
          >
            <LargeTileContent property={large} />
          </motion.div>
          {[tall, ...rest.slice(0, 3)].map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
              className="relative aspect-[4/3]"
            >
              <TileContent property={p} priority={i === 0} />
            </motion.div>
          ))}
        </div>

        {/* Desktop bento */}
        <div className="mt-14 hidden gap-4 lg:grid lg:h-[620px] lg:grid-cols-4 lg:grid-rows-2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative col-span-2 row-span-2"
          >
            <LargeTileContent property={large} />
          </motion.div>
          {[tall, ...rest.slice(0, 3)].map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              className="relative col-span-1 row-span-1"
            >
              <TileContent property={p} priority={i === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
