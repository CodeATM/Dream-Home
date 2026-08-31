import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SavedHomes } from "@/components/shared/saved-homes";

export const metadata: Metadata = {
  title: "Saved Homes",
  description: "Your favorited listings, synced across every page.",
};

export default function SavedPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumbs items={[{ label: "Saved homes" }]} />
      </div>
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
        Your shortlist
      </p>
      <h1 className="masthead mt-3 text-4xl text-navy sm:text-5xl">
        Saved homes
      </h1>
      <p className="mt-3 max-w-xl text-ink-dim">
        Everything you've hearted, in one place.
      </p>

      <div className="mt-10">
        <SavedHomes />
      </div>
    </div>
  );
}
