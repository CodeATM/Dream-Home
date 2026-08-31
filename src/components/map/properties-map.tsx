"use client";

import dynamic from "next/dynamic";
import type { Property } from "@/data/types";
import type { Poi } from "@/data/pois";

function MapSkeleton({ height }: { height?: string }) {
  return (
    <div
      className={`relative w-full rounded-xl border border-ink/5 bg-paper-deep ${height ?? "h-full min-h-[420px]"}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-ink-dim">
          Loading map…
        </p>
      </div>
    </div>
  );
}

/** Clustered price-pill map synced to the listings list. Client-only. */
export const BrowseMapPanel = dynamic(
  () => import("./map-inner").then((m) => m.BrowseMap),
  {
    ssr: false,
    loading: () => <MapSkeleton />,
  }
);

/** Single-property map with walkable amenity legend layers. Client-only. */
export const PropertyLocationMap = dynamic(
  () => import("./map-inner").then((m) => m.PropertyDetailMap),
  {
    ssr: false,
    loading: () => <MapSkeleton height="h-[420px]" />,
  }
);

/** Minimal single-pin map (office locations). Client-only. */
export const SinglePinMapPanel = dynamic(
  () => import("./map-inner").then((m) => m.SinglePinMap),
  {
    ssr: false,
    loading: () => <MapSkeleton height="h-[260px]" />,
  }
);

// Re-export prop shapes for consumers
export interface BrowseMapPanelProps {
  properties: Property[];
  activeId: string | null;
  onSelect: (p: Property) => void;
}

export interface PropertyLocationMapProps {
  property: Property;
  pois: Poi[];
}

export interface SinglePinMapPanelProps {
  lat: number;
  lng: number;
  label: string;
}
