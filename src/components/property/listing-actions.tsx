"use client";

import { useEffect, useState } from "react";
import { Heart, GitCompareArrows, Share2, Check } from "lucide-react";
import { useFavorites, useCompare } from "@/lib/stores";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ListingActions({ propertyId }: { propertyId: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const favorites = useFavorites((s) => s.ids);
  const toggleFavorite = useFavorites((s) => s.toggle);
  const compareIds = useCompare((s) => s.ids);
  const toggleCompare = useCompare((s) => s.toggle);

  const isFav = mounted && favorites.includes(propertyId);
  const inCompare = mounted && compareIds.includes(propertyId);
  const [shared, setShared] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => toggleFavorite(propertyId)} className="rounded-xl">
        <Heart className={cn("h-4 w-4", isFav && "fill-accent text-accent")} />
        {isFav ? "Saved" : "Save"}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="rounded-xl"
        disabled={!inCompare && compareIds.length >= 4}
        onClick={() => toggleCompare(propertyId)}
        title={!inCompare && compareIds.length >= 4 ? "Compare list is full (max 4)" : undefined}
      >
        <GitCompareArrows
          className={cn("h-4 w-4", inCompare && "text-navy")}
        />
        {inCompare ? "In compare" : "Compare"}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-xl"
        aria-label="Copy link"
        onClick={() => {
          navigator.clipboard?.writeText(window.location.href).catch(() => {});
          setShared(true);
          setTimeout(() => setShared(false), 1800);
        }}
      >
        {shared ? (
          <>
            <Check className="h-4 w-4 text-emerald-500" /> Copied
          </>
        ) : (
          <Share2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
