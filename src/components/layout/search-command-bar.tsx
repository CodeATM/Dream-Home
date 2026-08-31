"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  FileText,
  Clock,
  ArrowRight,
  Search,
  TrendingUp,
} from "lucide-react";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "@/components/ui/command";
import { useUi } from "@/lib/ui-store";
import { useSearches } from "@/lib/stores";
import { properties } from "@/data/properties";
import { cities } from "@/data/cities";
import { articlesMeta } from "@/data/articles-meta";
import { formatCompactPrice } from "@/lib/format";

const quickLinks = [
  { label: "Homes for sale", href: "/buy", icon: Building2 },
  { label: "Rentals", href: "/rent", icon: Building2 },
  { label: "Commercial", href: "/sell", icon: TrendingUp },
  { label: "Find an agent", href: "/agents", icon: ArrowRight },
  { label: "Neighborhood guides", href: "/neighborhoods", icon: MapPin },
];

export function SearchCommandBar() {
  const open = useUi((s) => s.searchOpen);
  const setOpen = useUi((s) => s.setSearchOpen);
  const router = useRouter();
  const recent = useSearches((s) => s.recent);
  const pushRecent = useSearches((s) => s.pushRecent);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search properties, locations, guides..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {recent.length > 0 && (
          <>
            <CommandGroup heading="Recent searches">
              {recent.map((q) => (
                <CommandItem
                  key={q}
                  value={`recent-${q}`}
                  onSelect={() =>
                    run(() => {
                      router.push(`/buy?q=${encodeURIComponent(q)}`);
                    })
                  }
                >
                  <Clock /> {q}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}
        <CommandGroup heading="Quick links">
          {quickLinks.map((l) => (
            <CommandItem
              key={l.href}
              value={`link-${l.label}`}
              onSelect={() => run(() => router.push(l.href))}
            >
              <l.icon /> {l.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Locations">
          {cities.map((c) => (
            <CommandItem
              key={c.slug}
              value={`city-${c.name}-${c.state}`}
              onSelect={() =>
                run(() => router.push(`/neighborhoods/${c.slug}`))
              }
            >
              <MapPin /> {c.name}, {c.state}
              <span className="ml-auto text-xs text-muted-foreground">
                Median {formatCompactPrice(c.medianPrice)}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Featured Properties">
          {properties
            .filter((p) => p.featured)
            .slice(0, 6)
            .map((p) => (
              <CommandItem
                key={p.id}
                value={`prop-${p.title}-${p.neighborhood}-${p.city}`}
                onSelect={() =>
                  run(() => {
                    pushRecent(p.neighborhood);
                    router.push(`/listings/${p.slug}`);
                  })
                }
              >
                <Building2 /> {p.address}
                <span className="ml-auto text-xs text-muted-foreground">
                  {formatCompactPrice(p.price)}
                  {p.status === "for-rent" ? "/mo" : ""}
                </span>
              </CommandItem>
            ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Guides & Articles">
          {articlesMeta.slice(0, 5).map((a) => (
            <CommandItem
              key={a.slug}
              value={`article-${a.title}`}
              onSelect={() => run(() => router.push(`/resources/${a.slug}`))}
            >
              <FileText /> {a.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function SearchTriggerButton({ className }: { className?: string }) {
  const setSearchOpen = useUi((s) => s.setSearchOpen);
  return (
    <button
      onClick={() => setSearchOpen(true)}
      className={
        className ??
        "flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm text-ink-dim shadow-soft transition hover:border-ink/20"
      }
    >
      <Search className="h-4 w-4" />
      Search anywhere
    </button>
  );
}
