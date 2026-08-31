"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  const btn =
    "flex h-9 min-w-9 items-center justify-center rounded-lg font-mono text-xs text-ink transition-colors duration-300 hover:bg-paper-deep";

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 pt-14">
      <button
        className={cn(btn, "border border-ink/5 bg-white disabled:pointer-events-none disabled:opacity-30")}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
      </button>
      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-1.5">
          {i > 0 && p - pages[i - 1] > 1 && (
            <span className="px-1 font-mono text-xs text-ink-dim">…</span>
          )}
          {p === page ? (
            <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-navy px-2 font-mono text-xs text-paper">
              {p}
            </span>
          ) : (
            <button className={btn} onClick={() => onChange(p)}>
              {p}
            </button>
          )}
        </span>
      ))}
      <button
        className={cn(btn, "border border-ink/5 bg-white disabled:pointer-events-none disabled:opacity-30")}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </nav>
  );
}

export function PaginationLink({
  page,
  totalPages,
  makeHref,
}: {
  page: number;
  totalPages: number;
  makeHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-3 pt-14">
      {page > 1 ? (
        <Link
          href={makeHref(page - 1)}
          className="inline-flex h-10 items-center gap-1 rounded-lg border border-ink/10 bg-transparent px-4 text-[13px] font-semibold tracking-wide text-navy transition-colors duration-300 hover:bg-paper-deep"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} /> Prev
        </Link>
      ) : (
        <span className="inline-flex h-10 items-center gap-1 px-4 text-[13px] opacity-40">Prev</span>
      )}
      <span className="font-mono text-xs text-ink-dim">
        {page} / {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={makeHref(page + 1)}
          className="inline-flex h-10 items-center gap-1 rounded-lg border border-ink/10 bg-transparent px-4 text-[13px] font-semibold tracking-wide text-navy transition-colors duration-300 hover:bg-paper-deep"
        >
          Next <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
        </Link>
      ) : (
        <span className="inline-flex h-10 items-center gap-1 px-4 text-[13px] opacity-40">Next</span>
      )}
    </nav>
  );
}
