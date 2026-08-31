"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, Heart } from "lucide-react";
import type { Property } from "@/data/types";
import { properties as allProperties } from "@/data/properties";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { formatPrice, formatCompactPrice } from "@/lib/format";
import { mortgageBreakdown } from "@/lib/mortgage";
import { useCompare, useFavorites } from "@/lib/stores";
import { Badge } from "@/components/ui/badge";

function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

function amenityScore(p: Property) {
  return p.amenities.length;
}

export function CompareTable() {
  const mounted = useMounted();
  const compareIds = useCompare((s) => s.ids);
  const remove = useCompare((s) => s.remove);
  const clear = useCompare((s) => s.clear);
  const favorites = useFavorites((s) => s.ids);
  const toggleFavorite = useFavorites((s) => s.toggle);

  if (!mounted || compareIds.length === 0) return null;

  const items = compareIds
    .map((id) => allProperties.find((p) => p.id === id))
    .filter((p): p is Property => !!p);

  const allAmenities = Array.from(
    new Set(items.flatMap((p) => p.amenities))
  ).slice(0, 8);

  const bestPrice = Math.min(...items.map((p) => p.price));
  const mostAmenities = Math.max(...items.map(amenityScore));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-x-auto rounded-xl border border-ink/5 bg-white shadow-soft"
    >
      <div className="flex items-center justify-between border-b border-ink/5 px-6 py-4">
        <p className="text-sm font-medium text-ink-dim">
          Comparing {items.length} of 4 homes
        </p>
        <button
          onClick={clear}
          className="text-xs font-medium text-accent-deep hover:text-accent"
        >
          Clear all
        </button>
      </div>

      <table className="w-full min-w-[720px] border-collapse">
        <thead>
          <tr>
            <th className="w-40 p-4 text-left align-bottom text-xs font-semibold uppercase tracking-wider text-ink-dim">
              Attribute
            </th>
            {items.map((p) => (
              <th key={p.id} className="min-w-[200px] p-4 align-top">
                <div className="relative overflow-hidden rounded-none">
                  <Link href={`/listings/${p.slug}`} className="block aspect-[4/3] relative">
                    <Image
                      src={unsplash(p.images[0], 400, 300)}
                      alt={p.title}
                      fill
                      sizes="220px"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </Link>
                  <button
                    onClick={() => toggleFavorite(p.id)}
                    aria-label="Save home"
                    className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-none transition hover:scale-110"
                  >
                    <Heart
                      className={
                        favorites.includes(p.id)
                          ? "h-4 w-4 fill-accent text-accent"
                          : "h-4 w-4 text-ink"
                      }
                    />
                  </button>
                </div>
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/listings/${p.slug}`}
                      className="font-heading text-base text-ink transition-colors duration-300 hover:text-accent-deep"
                    >
                      {formatCompactPrice(p.price)}
                      {p.status === "for-rent" ? "/mo" : ""}
                    </Link>
                    <p className="mt-0.5 line-clamp-1 text-xs text-ink-dim">
                      {p.address}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(p.id)}
                    aria-label={`Remove ${p.address} from comparison`}
                    className="shrink-0 rounded-full bg-paper-dim p-1.5 text-ink-dim transition hover:bg-paper-deep hover:text-accent-deep"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {[
            {
              label: "Price",
              render: (p: Property) => (
                <span className="flex items-center gap-2">
                  {formatPrice(p.price)}
                  {p.status === "for-rent" ? "/mo" : ""}
                  {p.price === bestPrice && (
                    <Badge variant="success">Best value</Badge>
                  )}
                </span>
              ),
            },
            {
              label: "Beds / Baths",
              render: (p: Property) => `${p.beds} bd · ${p.baths} ba`,
            },
            {
              label: "Square feet",
              render: (p: Property) =>
                `${p.sqft.toLocaleString()} ft² · $${Math.round(p.price / p.sqft)}${
                  p.status === "for-rent" ? "/mo·ft²" : "/ft²"
                }`,
            },
            {
              label: "Type",
              render: (p: Property) => `${p.type} · built ${p.yearBuilt}`,
            },
            {
              label: "Neighborhood",
              render: (p: Property) => `${p.neighborhood}, ${p.city}`,
            },
            {
              label: "Walk score",
              render: (p: Property) => (
                <span className="flex items-center gap-2">
                  <span className="font-semibold">{p.walkScore}</span>
                  <span className="h-1.5 w-16 overflow-hidden rounded-full bg-paper-dim">
                    <span
                      className="block h-full rounded-full bg-accent"
                      style={{ width: `${p.walkScore}%` }}
                    />
                  </span>
                </span>
              ),
            },
            {
              label: "Transit",
              render: (p: Property) => (
                <span className="flex items-center gap-2">
                  <span className="font-semibold">{p.transitScore}</span>
                  <span className="h-1.5 w-16 overflow-hidden rounded-full bg-paper-dim">
                    <span
                      className="block h-full rounded-full bg-accent"
                      style={{ width: `${p.transitScore}%` }}
                    />
                  </span>
                </span>
              ),
            },
            {
              label: "Est. monthly cost*",
              render: (p: Property) => (
                <span className="font-semibold text-ink">
                  {p.status === "for-rent"
                    ? `${formatPrice(Math.round(p.price * 1.12))}`
                    : `${formatPrice(
                        Math.round(
                          mortgageBreakdown(
                            p.price,
                            20,
                            6.4,
                            30,
                            p.taxAnnual,
                            p.hoaMonthly
                          ).total
                        )
                      )}`}
                  /mo
                </span>
              ),
            },
            {
              label: "Open house",
              render: (p: Property) => p.openHouse ?? "—",
            },
            ...allAmenities.map((a) => ({
              label: a,
              render: (p: Property) =>
                p.amenities.includes(a) ? (
                  <span className="font-medium text-accent-deep">✓</span>
                ) : (
                  <span className="text-ink-dim/40">—</span>
                ),
            })),
            {
              label: "Amenity count",
              render: (p: Property) =>
                p.amenities.length === mostAmenities ? (
                  <Badge variant="accent">Most equipped</Badge>
                ) : (
                  p.amenities.length
                ),
            },
          ].map((row) => (
            <tr key={row.label} className="border-t border-ink/6 even:bg-paper-deep/40">
              <td className="p-4 text-xs font-semibold uppercase tracking-wide text-ink-dim">
                {row.label}
              </td>
              {items.map((p) => (
                <td key={p.id} className="p-4 text-ink">
                  {row.render(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="border-t border-ink/5 px-6 py-3 text-xs text-ink-dim">
        *Buy estimates assume 20% down, 6.4% rate, 30-year fixed, including taxes,
        insurance and HOA. Rent estimates include utilities allowance.
      </p>
    </motion.div>
  );
}
