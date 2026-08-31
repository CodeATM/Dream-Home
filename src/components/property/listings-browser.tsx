"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LayoutGrid,
  List,
  BookmarkPlus,
  Check,
  SearchX,
} from "lucide-react";
import type { ListingFilters, Property } from "@/data/types";
import { DEFAULT_FILTERS } from "@/data/types";
import { properties as allProperties } from "@/data/properties";
import { useSearches } from "@/lib/stores";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { FilterSidebar, FilterControls } from "./filter-sidebar";
import { PropertyCard } from "./property-card";
import { Pagination } from "@/components/shared/pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

export function ListingsBrowser({
  mode,
  initialQuery = "",
}: {
  mode: "buy" | "rent";
  initialQuery?: string;
}) {
  const [filters, setFilters] = useState<ListingFilters>({
    ...DEFAULT_FILTERS,
    q: initialQuery,
  });
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [savedSearchConfirm, setSavedSearchConfirm] = useState(false);
  const saveSearch = useSearches((s) => s.saveSearch);

  const all: Property[] = allProperties;

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    let list = all.filter((p) => p.status === (mode === "buy" ? "for-sale" : "for-rent"));

    if (q) {
      list = list.filter((p) =>
        [p.title, p.address, p.city, p.neighborhood]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    if (filters.minPrice) list = list.filter((p) => p.price >= filters.minPrice!);
    if (filters.maxPrice != null && filters.maxPrice < (mode === "rent" ? 8000 : 1500000))
      list = list.filter((p) => p.price <= filters.maxPrice!);
    if (filters.beds > 0) list = list.filter((p) => p.beds >= filters.beds);
    if (filters.baths > 0) list = list.filter((p) => p.baths >= filters.baths);
    if (filters.types.length) list = list.filter((p) => filters.types.includes(p.type));
    if (filters.citySlugs.length)
      list = list.filter((p) => filters.citySlugs.includes(p.citySlug));

    if (mode === "rent") {
      if (filters.pets !== "any")
        list = list.filter(
          (p) =>
            p.petPolicy === filters.pets ||
            (filters.pets === "both" &&
              (p.petPolicy === "cats-ok" || p.petPolicy === "dogs-ok"))
        );
      if (filters.moveInFrom)
        list = list.filter(
          (p) => new Date(p.availableFrom) <= new Date(filters.moveInFrom!)
        );
      if (filters.leaseLength !== "any")
        list = list.filter((p) =>
          p.leaseLengths.includes(filters.leaseLength)
        );
    } else {
      if (filters.maxHoa != null && filters.maxHoa < 800)
        list = list.filter((p) => p.hoaMonthly <= filters.maxHoa!);
      if (filters.financing.length) {
        list = list.filter((p) =>
          filters.financing.every((f) =>
            f === "Cash"
              ? true
              : p.yearBuilt >= 1980 || p.price < 750000
          )
        );
      }
    }

    switch (filters.sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "sqft-desc":
        list = [...list].sort((a, b) => b.sqft - a.sqft);
        break;
      default:
        list = [...list].sort((a, b) => a.listedDaysAgo - b.listedDaysAgo);
    }

    return list;
  }, [all, filters, mode]);

  useEffect(() => setPage(1), [filters]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const pageItems = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const patch = (f: Partial<ListingFilters>) => setFilters((s) => ({ ...s, ...f }));
  const reset = () => setFilters({ ...DEFAULT_FILTERS });

  const handleSaveSearch = () => {
    saveSearch({
      label:
        filters.q.trim() ||
        `${mode === "buy" ? "Homes for sale" : "Rentals"}${filters.citySlugs.length ? ` · ${filters.citySlugs.join(", ")}` : ""}`,
      mode,
      query: JSON.parse(JSON.stringify({ ...filters, q: undefined })),
      matchCount: results.length,
    });
    setSavedSearchConfirm(true);
    setTimeout(() => setSavedSearchConfirm(false), 2200);
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1 no-scrollbar">
            <FilterSidebar
              mode={mode}
              filters={filters}
              onChange={patch}
              onReset={reset}
              resultCount={results.length}
            />
          </div>
        </div>

        <div>
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-ink/6 pb-4">
            <p className="mr-auto font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-dim">
              <span className="text-accent">{results.length}</span>{" "}
              {mode === "buy" ? "properties for sale" : "rental properties"}
              {filters.q && <> — &ldquo;{filters.q}&rdquo;</>}
            </p>

            <Select value={filters.sort} onValueChange={(v) => patch({ sort: v as ListingFilters["sort"] })}>
              <SelectTrigger className="w-[180px] bg-white rounded-xl border-ink/8"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Recommended</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="sqft-desc">Largest area</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={handleSaveSearch} className="rounded-xl">
              {savedSearchConfirm ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" /> Saved
                </>
              ) : (
                <>
                  <BookmarkPlus className="h-4 w-4" /> Save search
                </>
              )}
            </Button>

            <div className="flex items-center rounded-xl border border-ink/8 bg-white p-0.5">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-label={`${v} view`}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300",
                    view === v
                      ? "bg-navy text-paper"
                      : "text-ink-dim hover:text-navy"
                  )}
                >
                  {v === "grid" ? <LayoutGrid className="h-4 w-4" strokeWidth={1.75} /> : <List className="h-4 w-4" strokeWidth={1.75} />}
                </button>
              ))}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm" className="lg:hidden rounded-xl">
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-2xl">
                <div className="max-h-[60vh] overflow-y-auto pr-1">
                  <FilterControls mode={mode} filters={filters} onChange={patch} />
                </div>
                <SheetClose asChild>
                  <Button className="mt-6 w-full rounded-xl">Show {results.length} results</Button>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>

          <div>
            {/* Results */}
            <div>
              {pageItems.length === 0 ? (
                <EmptyState
                  icon={<SearchX className="h-6 w-6" strokeWidth={1.5} />}
                  title="No properties match these filters"
                  description="Try widening your search criteria or clearing filters — there is more inventory where this came from."
                  actionLabel="Clear all filters"
                  onAction={reset}
                />
              ) : view === "grid" ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {pageItems.map((p, i) => (
                    <div key={p.id} id={`card-${p.id}`}>
                      <PropertyCard property={p} priority={i === 0 && page === 1} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {pageItems.map((p) => (
                    <div key={p.id} id={`card-${p.id}`}>
                      <PropertyCard property={p} rowLayout />
                    </div>
                  ))}
                </div>
              )}
              <Pagination page={page} totalPages={totalPages} onChange={(p) => { setPage(p); window.scrollTo({ top: 300, behavior: "smooth" }); }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
