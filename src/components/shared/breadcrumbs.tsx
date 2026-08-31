import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  dark = false,
}: {
  items: Crumb[];
  dark?: boolean;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em]",
        dark ? "text-paper/40" : "text-ink-dim"
      )}
    >
      <Link
        href="/"
        className={cn(
          "transition-colors duration-300",
          dark ? "hover:text-paper" : "hover:text-navy"
        )}
      >
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3 opacity-40" strokeWidth={1.75} />
          {item.href && i < items.length - 1 ? (
            <Link
              href={item.href}
              className={cn(
                "transition-colors duration-300",
                dark ? "hover:text-paper" : "hover:text-navy"
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span className={dark ? "text-paper/80" : "text-navy"}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
