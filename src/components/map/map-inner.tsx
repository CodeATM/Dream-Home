"use client";

/**
 * All Leaflet-dependent code lives here. This module is loaded client-side
 * only via next/dynamic (see properties-map.tsx).
 */
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import type { Property } from "@/data/types";
import type { Poi, PoiKind } from "@/data/pois";
import { formatCompactPrice } from "@/lib/format";

const CARTO_LIGHT =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function pillIcon(property: Property, active: boolean): L.DivIcon {
  const rent = property.status === "for-rent";
  const classes = [
    "map-pin-pill",
    rent ? "map-pin-rent" : "",
    active ? "is-active" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return L.divIcon({
    className: "",
    html: `<span class="${classes}" style="display:inline-flex; transform:translate(-50%,-115%);">${formatCompactPrice(
      property.price
    )}${rent ? "/mo" : ""}</span>`,
    iconSize: [0, 0],
  });
}

function clusterIcon(cluster: {
  getChildCount: () => number;
}): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div class="map-cluster-bubble"><span>${cluster.getChildCount()}</span></div>`,
    iconSize: [42, 42],
  });
}

const POI_GLYPHS: Record<PoiKind, string> = {
  school:
    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B675F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m22 10-6.5 3.5L9 10l6.5-3.5L22 10Z"/><path d="M9 10v6c0 1.66 2.24 3 5 3s5-1.34 5-3v-6"/><path d="M5.5 12.5V17a1 1 0 1 1-2 0v-3.7"/></svg>',
  transit:
    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B675F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/></svg>',
  park:
    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B675F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-4"/><path d="M9 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z"/><path d="M12 2a5 5 0 0 0-5 5c0 1.1.35 2.1.95 2.93A4.5 4.5 0 0 0 7.5 18h9a4.5 4.5 0 0 0 .55-8.07A5 5 0 0 0 12 2Z"/></svg>',
  food:
    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B675F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>',
};

function poiIcon(poi: Poi): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div class="poi-dot" title="${poi.name}">${POI_GLYPHS[poi.kind]}</div>`,
    iconSize: [22, 22],
  });
}

/** Fits the map to the given points once on mount (and when key changes). */
function FitToPoints({
  points,
  padding,
}: {
  points: Array<[number, number]>;
  padding?: [number, number];
}) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 15, { animate: true });
      return;
    }
    map.fitBounds(L.latLngBounds(points), {
      padding: padding ?? [36, 36],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);
  return null;
}

/** Custom minimal zoom controls + fit-to-results. */
function MapControls({ onFit }: { onFit?: () => void }) {
  const map = useMap();
  const btn =
    "flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/95 text-ink shadow-soft backdrop-blur transition-all duration-300 hover:border-accent/40 hover:text-accent-deep select-none";
  return (
    <div className="absolute bottom-4 right-4 z-[500] flex flex-col gap-1.5">
      <button
        aria-label="Zoom in"
        className={btn}
        onClick={() => map.zoomIn()}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
      </button>
      <button
        aria-label="Zoom out"
        className={btn}
        onClick={() => map.zoomOut()}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M5 12h14"/></svg>
      </button>
      {onFit && (
        <button
          aria-label="Fit to results"
          title="Fit to results"
          className={btn}
          onClick={onFit}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Browse map — clustered price pills synced to the listing list       */
/* ------------------------------------------------------------------ */

export function BrowseMap({
  properties,
  activeId,
  onSelect,
}: {
  properties: Property[];
  activeId: string | null;
  onSelect: (p: Property) => void;
}) {
  const points = useMemo(
    () =>
      properties
        .filter((p) => p.lat != null && p.lng != null)
        .map((p) => [p.lat!, p.lng!] as [number, number]),
    [properties]
  );
  const [fitKey, setFitKey] = useState(0);

  return (
    <div className="relative h-full min-h-[420px] w-full">
      <MapContainer
        // remount fit logic when the filtered result set changes shape
        center={[39.5, -98.35]}
        zoom={4}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url={CARTO_LIGHT} attribution={ATTRIBUTION} />
        <FitToPoints key={`${fitKey}-${points.length}`} points={points} />
        <MarkerClusterGroup
          iconCreateFunction={clusterIcon}
          showCoverageOnHover={false}
          maxClusterRadius={58}
          spiderfyDistanceMultiplier={1.6}
        >
          {properties.map((p) =>
            p.lat == null || p.lng == null ? null : (
              <Marker
                key={p.id}
                position={[p.lat, p.lng]}
                icon={pillIcon(p, p.id === activeId)}
                eventHandlers={{ click: () => onSelect(p) }}
                zIndexOffset={p.id === activeId ? 1000 : 0}
              />
            )
          )}
        </MarkerClusterGroup>
        <MapControls onFit={() => setFitKey((k) => k + 1)} />
      </MapContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail map — one property + toggleable walkable amenity layers     */
/* ------------------------------------------------------------------ */

const LEGEND_ITEMS: Array<{ kind: PoiKind; label: string }> = [
  { kind: "school", label: "Schools" },
  { kind: "transit", label: "Transit" },
  { kind: "park", label: "Parks" },
  { kind: "food", label: "Food" },
];

export function PropertyDetailMap({
  property,
  pois,
}: {
  property: Property;
  pois: Poi[];
}) {
  const [visible, setVisible] = useState<Set<PoiKind>>(
    new Set(LEGEND_ITEMS.map((l) => l.kind))
  );
  const [fitKey, setFitKey] = useState(0);

  if (property.lat == null || property.lng == null) {
    return (
      <div className="flex h-full min-h-[380px] items-center justify-center bg-ink text-paper">
        <p className="label-mono">No coordinates on file</p>
      </div>
    );
  }

  const shownPois = pois.filter((p) => visible.has(p.kind));

  return (
    <div>
      {/* legend / filter chip row */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="mr-1 font-sans text-[11px] font-medium uppercase tracking-eyebrow text-ink-dim">
          Nearby:
        </span>
        {LEGEND_ITEMS.map((item) => {
          const on = visible.has(item.kind);
          return (
            <button
              key={item.kind}
              onClick={() =>
                setVisible((prev) => {
                  const next = new Set(prev);
                  if (next.has(item.kind)) next.delete(item.kind);
                  else next.add(item.kind);
                  return next;
                })
              }
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-sans text-[11px] font-medium tracking-wide transition-all duration-300 ${
                on
                  ? "border-accent bg-accent/10 text-accent-deep"
                  : "border-ink/12 bg-white text-ink-dim hover:border-ink/25 hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="relative h-[380px] w-full sm:h-[420px]">
        <MapContainer
          center={[property.lat, property.lng]}
          zoom={15}
          scrollWheelZoom={false}
          zoomControl={false}
          className="h-full w-full"
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url={CARTO_LIGHT} attribution={ATTRIBUTION} />
          <FitToPoints
            key={fitKey}
            points={[
              [property.lat, property.lng],
              ...shownPois.map((p) => [p.lat, p.lng] as [number, number]),
            ]}
            padding={[48, 48]}
          />
          {/* subject property */}
          <Marker
            position={[property.lat, property.lng]}
            icon={pillIcon(property, true)}
            zIndexOffset={1200}
          />
          {/* amenity dots */}
          {shownPois.map((poi) => (
            <Marker key={poi.id} position={[poi.lat, poi.lng]} icon={poiIcon(poi)} />
          ))}
        <MapControls onFit={() => setFitKey((k) => k + 1)} />
        </MapContainer>

        {/* mini preview card anchored to the subject pin */}
        <div className="pointer-events-none absolute left-4 top-4 z-[500] hidden max-w-[220px] rounded-xl border border-ink/5 bg-white/95 shadow-hard backdrop-blur sm:block">
          <div className="px-4 pt-3">
            <p className="font-sans text-[10px] font-medium uppercase tracking-eyebrow text-ink-dim">
              Subject property
            </p>
          </div>
          <div className="space-y-1 px-4 pb-3.5 pt-1">
            <p className="font-heading text-base text-ink">
              {formatCompactPrice(property.price)}
              {property.status === "for-rent" ? "/mo" : ""}
            </p>
            <p className="text-[12px] text-ink-dim">
              {property.beds} bd · {property.baths} ba ·{" "}
              {property.sqft.toLocaleString()} sqft
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Single-pin map — office locations etc.                             */
/* ------------------------------------------------------------------ */

export function SinglePinMap({
  lat,
  lng,
  label,
}: {
  lat: number;
  lng: number;
  label: string;
}) {
  return (
    <div className="relative h-[260px] w-full">
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url={CARTO_LIGHT} attribution={ATTRIBUTION} />
        <Marker
          position={[lat, lng]}
          eventHandlers={{}}
          icon={L.divIcon({
            className: "",
            html: `<span class="map-pin-pill is-active" style="display:inline-flex; transform:translate(-50%,-115%);">★ ${label}</span>`,
            iconSize: [0, 0],
          })}
          zIndexOffset={1000}
        />
        <MapControls />
      </MapContainer>
    </div>
  );
}
