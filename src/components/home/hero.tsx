"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, BedDouble, Bath, Search, Building2, ArrowRight } from "lucide-react";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const HERO_IMAGE = unsplash("1600585154340-be6161a56a0c", 1920, 1080);

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section ref={ref} className="relative bg-navy">
      <div className="relative h-[75vh] min-h-[540px] w-full overflow-hidden sm:h-[80vh]">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <Image
              src={HERO_IMAGE}
              alt="Modern luxury home exterior"
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="img-editorial object-cover"
            />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy/30 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-6 inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-soft">
                <span className="h-px w-8 bg-accent/60" />
                Exceptional Spaces. Better Living.
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="masthead max-w-3xl text-5xl text-paper sm:text-6xl lg:text-7xl xl:text-[5rem]"
            >
              Find a place
              <br />
              <span className="text-paper/80">worth calling home.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-lg text-base leading-relaxed text-paper/55 sm:text-lg"
            >
              Discover thoughtfully managed residential and commercial
              properties in prime locations.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Stats marquee band */}
      <div className="overflow-hidden border-y border-white/5 bg-navy-deep py-4">
        <div className="flex w-max animate-marquee gap-14 whitespace-nowrap">
          {Array.from({ length: 3 }).map((_, dup) => (
            <div key={dup} className="flex gap-14" aria-hidden={dup > 0}>
              {[
                "250+ Properties Managed",
                "1,200+ Satisfied Residents",
                "15+ Years Experience",
                "98% Client Satisfaction",
                "Prime Locations Only",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-14 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/30"
                >
                  {item} <span className="text-accent/40">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HeroSearchCard() {
  const router = useRouter();
  const [mode, setMode] = useState<"buy" | "rent">("buy");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("any");
  const [price, setPrice] = useState("any");
  const [beds, setBeds] = useState("any");

  const search = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.set("q", location.trim());
    if (type !== "any") params.set("type", type);
    if (price !== "any") {
      if (mode === "buy") {
        const [min, max] =
          price === "0-500"
            ? ["0", "500000"]
            : price === "500-1000"
              ? ["500000", "1000000"]
              : ["1000000", ""];
        if (min !== "0") params.set("minPrice", min);
        if (max) params.set("maxPrice", max);
      } else {
        if (price === "0-2500") params.set("maxPrice", "2500");
        else params.set("minPrice", "2500");
      }
    }
    if (beds !== "any") params.set("beds", beds);
    router.push(`/${mode}?${params.toString()}`);
  };

  const fieldLabel =
    "mb-2 block font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-dim";

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto -mt-16 w-full max-w-5xl px-4 sm:-mt-20 sm:px-6"
    >
      <div className="rounded-2xl border border-ink/5 bg-white p-5 shadow-lift sm:p-7">
        {/* Mode toggle */}
        <div className="mb-6 inline-flex rounded-xl bg-paper-deep p-1">
          {(["buy", "rent"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "rounded-lg px-6 py-2 text-[12px] font-semibold tracking-wide transition-all duration-300 ease-luxe",
                mode === m
                  ? "bg-navy text-paper shadow-soft"
                  : "text-ink-dim hover:text-navy"
              )}
            >
              {m === "buy" ? "Buy" : "Rent"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-12">
          {/* Location */}
          <label className="col-span-2 flex flex-col lg:col-span-4">
            <span className={fieldLabel}>Location</span>
            <span className="flex h-12 items-center gap-2.5 rounded-xl border border-ink/8 bg-paper-deep/50 px-3.5 transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
              <MapPin className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && search()}
                placeholder="Where do you want to live?"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-dim/60"
              />
            </span>
          </label>

          {/* Property Type */}
          <label className="flex flex-col lg:col-span-3">
            <span className={fieldLabel}>Property Type</span>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="h-12 rounded-xl border-ink/8 bg-paper-deep/50 focus:border-accent focus:ring-2 focus:ring-accent/20">
                <Building2 className="h-4 w-4 text-ink-dim" strokeWidth={1.75} />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">All types</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Condo">Condo</SelectItem>
                <SelectItem value="Townhouse">Townhouse</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
              </SelectContent>
            </Select>
          </label>

          {/* Price */}
          <label className="flex flex-col lg:col-span-3">
            <span className={fieldLabel}>
              Price
            </span>
            <Select value={price} onValueChange={setPrice}>
              <SelectTrigger className="h-12 rounded-xl border-ink/8 bg-paper-deep/50 focus:border-accent focus:ring-2 focus:ring-accent/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mode === "buy" ? (
                  <>
                    <SelectItem value="any">Any price</SelectItem>
                    <SelectItem value="0-500">Under $500K</SelectItem>
                    <SelectItem value="500-1000">$500K — $1M</SelectItem>
                    <SelectItem value="1000+">$1M+</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="any">Any budget</SelectItem>
                    <SelectItem value="0-2500">Under $2,500/mo</SelectItem>
                    <SelectItem value="2500+">$2,500+/mo</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </label>

          {/* Bedrooms */}
          <label className="flex flex-col lg:col-span-2">
            <span className={fieldLabel}>Bedrooms</span>
            <Select value={beds} onValueChange={setBeds}>
              <SelectTrigger className="h-12 rounded-xl border-ink/8 bg-paper-deep/50 focus:border-accent focus:ring-2 focus:ring-accent/20">
                <BedDouble className="h-4 w-4 text-ink-dim" strokeWidth={1.75} />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </label>

          {/* Search button */}
          <div className="col-span-2 flex items-end lg:col-span-12">
            <button
              onClick={search}
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-accent text-sm font-semibold tracking-wide text-white transition-all duration-300 ease-luxe hover:bg-accent-hot hover:shadow-glow sm:w-auto sm:px-8"
            >
              <Search className="h-4 w-4" strokeWidth={2} /> Search Properties
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        <p className="mt-5 hidden items-center gap-3 pl-1 font-sans text-[11px] font-medium text-ink-dim sm:flex">
          Popular:
          {["Zilker", "Ballard", "LoHi", "Brickell"].map((n) => (
            <button
              key={n}
              onClick={() => setLocation(n)}
              className="rounded-md px-2 py-0.5 text-ink/60 transition-colors hover:bg-navy/5 hover:text-navy"
            >
              {n}
            </button>
          ))}
        </p>
      </div>
    </motion.section>
  );
}
