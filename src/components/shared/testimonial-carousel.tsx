"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/data/types";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [paused, items.length]);

  const current = items[index];

  return (
    <div
      className="relative mx-auto max-w-3xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
        <Quote
          className="h-6 w-6 text-accent"
          strokeWidth={1.5}
          fill="currentColor"
        />
      </div>
      <div className="min-h-[160px] sm:min-h-[140px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <blockquote className="font-heading text-xl leading-relaxed text-navy/85 sm:text-2xl font-medium">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8">
              <p className="font-heading text-sm font-bold text-navy">{current.name}</p>
              <p className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-dim">
                {current.role}
              </p>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white shadow-soft transition-all duration-300 hover:border-accent/30 hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <div className="flex items-center gap-2.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === index ? "w-8 bg-accent" : "w-1.5 bg-ink/15 hover:bg-ink/25"
              )}
            />
          ))}
        </div>
        <button
          onClick={() => setIndex((i) => (i + 1) % items.length)}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white shadow-soft transition-all duration-300 hover:border-accent/30 hover:text-accent"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
