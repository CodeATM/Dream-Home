"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { cn } from "@/lib/utils";

export function GalleryLightbox({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2.5 overflow-hidden rounded-xl">
        <button
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
          className="relative col-span-4 row-span-2 aspect-[16/9] sm:col-span-2"
          aria-label="Open photo 1"
        >
          <Image
            src={unsplash(images[0], 1200, 675)}
            alt={`${title} — photo 1`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="rounded-xl object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        </button>
        {images.slice(1, 5).map((img, i) => (
          <button
            key={img + i}
            onClick={() => {
              setIndex(i + 1);
              setOpen(true);
            }}
            className={cn(
              "relative hidden aspect-[16/10] sm:block",
              i >= 3 && "hidden lg:block",
              i === 1 ? "col-span-1" : "col-span-1"
            )}
            aria-label={`Open photo ${i + 2}`}
          >
            <Image
              src={unsplash(img, 600, 400)}
              alt={`${title} — photo ${i + 2}`}
              fill
              sizes="20vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="rounded-xl object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
            {i === 3 && images.length > 5 && (
              <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-navy/50 text-sm font-semibold text-white backdrop-blur-[2px]">
                +{images.length - 5} more
              </span>
            )}
          </button>
        ))}
        <span className="pointer-events-none absolute right-5 top-5 z-10 flex h-9 items-center gap-1.5 rounded-full bg-navy/60 px-3.5 text-xs font-semibold text-white backdrop-blur-sm">
          <Expand className="h-3.5 w-3.5" /> {images.length} photos
        </span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-navy-deep/95 p-4 backdrop-blur"
            onClick={() => setOpen(false)}
          >
            <button
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="absolute top-6 left-1/2 -translate-x-1/2 text-sm font-semibold text-white/60">
              {index + 1} / {images.length}
            </p>

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative h-[70vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={unsplash(images[index], 1600, 900)}
                alt={`${title} — photo ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="rounded-xl object-contain"
              />
            </motion.div>

            <div
              className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={prev}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
