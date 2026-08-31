import type { Metadata } from "next";
import { ListingsBrowser } from "@/components/property/listings-browser";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "Properties for Sale",
  description:
    "Discover properties managed by Meridian. Browse homes for sale across prime locations with advanced filters and real-time pricing.",
};

export default async function BuyPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;
  return (
    <>
      <section className="border-b border-ink/5 bg-navy text-paper">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Buy" }]} dark />
          <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-soft">
                Explore Properties
              </p>
              <h1 className="masthead text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Properties
                <br />
                <span className="text-paper/70">for sale.</span>
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-paper/50">
              Discover properties managed by Meridian — curated listings in
              prime locations with verified details and transparent pricing.
            </p>
          </div>
        </div>
      </section>
      <ListingsBrowser mode="buy" initialQuery={sp.q} />
    </>
  );
}
