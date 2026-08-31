"use client";

import { Search, RotateCcw } from "lucide-react";
import type { ListingFilters, PropertyType } from "@/data/types";
import { cities } from "@/data/cities";
import { financingPrograms } from "@/data/properties";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriceRangeSlider } from "./price-range-slider";
import { cn } from "@/lib/utils";

const propertyTypes: PropertyType[] = [
  "House",
  "Condo",
  "Townhouse",
  "Apartment",
  "Villa",
  "Loft",
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3 border-b border-ink/6 pb-5 last:border-0">
      <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-dim">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function FilterControls({
  mode,
  filters,
  onChange,
}: {
  mode: "buy" | "rent";
  filters: ListingFilters;
  onChange: (f: Partial<ListingFilters>) => void;
}) {
  const isRent = mode === "rent";
  const range: [number, number] = [
    filters.minPrice ?? 0,
    filters.maxPrice ?? (isRent ? 8000 : 1500000),
  ];

  const pill =
    "h-9 flex-1 rounded-lg border text-xs font-semibold transition-colors duration-300";

  return (
    <div className="space-y-5">
      <Section title="Search">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-dim" />
          <Input
            value={filters.q}
            onChange={(e) => onChange({ q: e.target.value })}
            placeholder="Location, property name..."
            className="pl-9 rounded-xl"
          />
        </div>
      </Section>

      <Section title={isRent ? "Monthly Rent" : "Price Range"}>
        <PriceRangeSlider
          mode={mode}
          value={range}
          onChange={([min, max]) => onChange({ minPrice: min, maxPrice: max })}
        />
      </Section>

      <Section title="Bedrooms">
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map((b) => (
            <button
              key={b}
              onClick={() => onChange({ beds: b })}
              className={cn(
                pill,
                filters.beds === b
                  ? "border-navy bg-navy text-paper"
                  : "border-ink/8 bg-paper-deep/50 text-ink hover:border-ink/15 hover:bg-paper-deep"
              )}
            >
              {b === 0 ? "Any" : `${b}+`}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Bathrooms">
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((b) => (
            <button
              key={b}
              onClick={() => onChange({ baths: b })}
              className={cn(
                pill,
                filters.baths === b
                  ? "border-navy bg-navy text-paper"
                  : "border-ink/8 bg-paper-deep/50 text-ink hover:border-ink/15 hover:bg-paper-deep"
              )}
            >
              {b === 0 ? "Any" : `${b}+`}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Property Type">
        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
          {propertyTypes.map((t) => (
            <label key={t} className="flex cursor-pointer items-center gap-2.5 text-[13px] text-ink/75">
              <Checkbox
                checked={filters.types.includes(t)}
                onCheckedChange={(checked) =>
                  onChange({
                    types: checked
                      ? [...filters.types, t]
                      : filters.types.filter((x) => x !== t),
                  })
                }
                className="border-ink/20 data-[state=checked]:bg-navy data-[state=checked]:border-navy"
              />
              {t}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Location">
        <div className="space-y-2">
          {cities.map((c) => (
            <label key={c.slug} className="flex cursor-pointer items-center gap-2.5 text-[13px] text-ink/75">
              <Checkbox
                checked={filters.citySlugs.includes(c.slug)}
                onCheckedChange={(checked) =>
                  onChange({
                    citySlugs: checked
                      ? [...filters.citySlugs, c.slug]
                      : filters.citySlugs.filter((x) => x !== c.slug),
                  })
                }
                className="border-ink/20 data-[state=checked]:bg-navy data-[state=checked]:border-navy"
              />
              {c.name}, {c.state}
            </label>
          ))}
        </div>
      </Section>

      {isRent ? (
        <>
          <Section title="Move-in Date">
            <Input
              type="date"
              value={filters.moveInFrom ?? ""}
              onChange={(e) => onChange({ moveInFrom: e.target.value || undefined })}
              className="rounded-xl"
            />
          </Section>
          <Section title="Lease Length">
            <Select
              value={filters.leaseLength}
              onValueChange={(v) => onChange({ leaseLength: v })}
            >
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any length</SelectItem>
                <SelectItem value="12 months">12 months</SelectItem>
                <SelectItem value="18 months">18 months</SelectItem>
                <SelectItem value="24 months">24 months</SelectItem>
              </SelectContent>
            </Select>
          </Section>
          <Section title="Pet Policy">
            <Select
              value={filters.pets}
              onValueChange={(v) => onChange({ pets: v as ListingFilters["pets"] })}
            >
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="cats-ok">Cats OK</SelectItem>
                <SelectItem value="dogs-ok">Dogs OK</SelectItem>
                <SelectItem value="both">Cats & dogs</SelectItem>
                <SelectItem value="no-pets">No pets</SelectItem>
              </SelectContent>
            </Select>
          </Section>
        </>
      ) : (
        <>
          <Section title="Max HOA / month">
            <div className="space-y-2">
              <input
                type="range"
                min={0}
                max={800}
                step={20}
                value={filters.maxHoa ?? 800}
                onChange={(e) =>
                  onChange({ maxHoa: Number(e.target.value) })
                }
                className="w-full accent-accent"
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em]">
                {filters.maxHoa == null || filters.maxHoa >= 800
                  ? "Any"
                  : `≤ $${filters.maxHoa}/mo`}
              </p>
            </div>
          </Section>
          <Section title="Financing">
            <div className="space-y-2">
              {financingPrograms.map((p) => (
                <label key={p} className="flex cursor-pointer items-center gap-2.5 text-[13px] text-ink/75">
                  <Checkbox
                    checked={filters.financing.includes(p)}
                    onCheckedChange={(checked) =>
                      onChange({
                        financing: checked
                          ? [...filters.financing, p]
                          : filters.financing.filter((x) => x !== p),
                      })
                    }
                    className="border-ink/20 data-[state=checked]:bg-navy data-[state=checked]:border-navy"
                  />
                  {p} accepted
                </label>
              ))}
            </div>
          </Section>
        </>
      )}
    </div>
  );
}

export function FilterSidebar({
  mode,
  filters,
  onChange,
  onReset,
  resultCount,
}: {
  mode: "buy" | "rent";
  filters: ListingFilters;
  onChange: (f: Partial<ListingFilters>) => void;
  onReset: () => void;
  resultCount: number;
}) {
  return (
    <aside className="rounded-xl border border-ink/5 bg-white p-5 shadow-soft">
      <div className="mb-5 flex items-center justify-between border-b border-ink/6 pb-4">
        <p className="font-heading text-lg font-bold text-navy">Filters</p>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-accent transition-colors hover:text-accent-deep"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>
      <FilterControls mode={mode} filters={filters} onChange={onChange} />
      <p className="mt-5 rounded-xl bg-navy/5 px-3 py-2.5 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-navy">
        {resultCount} properties found
      </p>
    </aside>
  );
}
