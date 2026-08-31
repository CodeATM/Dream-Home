import type { Metadata } from "next";
import { ListingsBrowser } from "@/components/property/listings-browser";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "Properties for Rent",
  description:
    "Discover rental properties managed by Meridian. Find your next home with verified listings and transparent pricing.",
};

export default async function RentPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;
  return (
    <>
      <section className="border-b border-ink/5 bg-navy text-paper">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Rent" }]} dark />
          <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-soft">
                Explore Properties
              </p>
              <h1 className="masthead text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Properties
                <br />
                <span className="text-paper/70">for rent.</span>
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-paper/50">
              Quality rental properties in prime locations. Filter by move-in
              date, lease length and more.
            </p>
          </div>
        </div>
      </section>
      <ListingsBrowser mode="rent" initialQuery={sp.q} />
    </>
  );
}
