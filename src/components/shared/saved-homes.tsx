"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, GitCompareArrows } from "lucide-react";
import { useFavorites } from "@/lib/stores";
import { properties as allProperties } from "@/data/properties";
import type { Property } from "@/data/types";
import { PropertyCard } from "@/components/property/property-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export function SavedHomes() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const ids = useFavorites((s) => s.ids);

  if (!mounted) {
    return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[...Array(3)].map((_, i) => (
      <div key={i} className="overflow-hidden rounded-xl bg-white shadow-soft">
        <div className="aspect-[4/3] animate-pulse bg-paper-dim" />
        <div className="space-y-3 p-5">
          <div className="h-5 w-3/4 animate-pulse rounded-full bg-paper-deep/70" />
          <div className="h-4 w-1/2 animate-pulse rounded-full bg-paper-dim" />
        </div>
      </div>
    ))}</div>;
  }

  const saved: Property[] = ids
    .map((id) => allProperties.find((p) => p.id === id))
    .filter((p): p is Property => !!p);

  if (saved.length === 0) {
    return (
      <EmptyState
        icon={<Heart className="h-6 w-6" />}
        title="No saved homes yet"
        description="Tap the heart on any listing to keep it here — your list syncs across every page on this device."
        actionLabel="Start browsing"
        actionHref="/buy"
      />
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-ink-dim">
          <span className="font-semibold text-ink">{saved.length}</span>{" "}
          home{saved.length > 1 ? "s" : ""} saved
        </p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/compare">
            <GitCompareArrows className="h-4 w-4" /> Compare selected
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {saved.map((p) => (
          <PropertyCard key={p.id} property={p} layoutIdPrefix="saved" />
        ))}
      </div>
    </>
  );
}
