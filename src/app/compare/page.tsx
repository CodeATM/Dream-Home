import type { Metadata } from "next";
import { CompareClient } from "@/components/property/compare-client";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "Compare Properties",
  description:
    "Compare up to four homes side by side — price, size, scores and monthly cost.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumbs items={[{ label: "Compare" }]} />
      </div>
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
        Side by side
      </p>
      <h1 className="masthead mt-3 text-4xl text-navy sm:text-5xl">
        Compare properties
      </h1>
      <p className="mt-3 max-w-xl text-ink-dim">
        Add homes from any listing card — up to four at a time — and see the
        numbers that actually matter, next to each other.
      </p>

      <div className="mt-8">
        <CompareClient />
      </div>
    </div>
  );
}
