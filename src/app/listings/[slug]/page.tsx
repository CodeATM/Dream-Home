import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BedDouble,
  Bath,
  Ruler,
  Building2,
  CalendarClock,
  Footprints,
  TrainFront,
  Layers,
} from "lucide-react";
import { getProperty, similarListings } from "@/data/properties";
import { getAgentById } from "@/data/agents";
import { nearbyPois, type PoiKind } from "@/data/pois";
import { formatPrice, formatRelativeDays } from "@/lib/format";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { PropertyCard } from "@/components/property/property-card";
import { GalleryLightbox } from "@/components/property/gallery-lightbox";
import { ListingActions } from "@/components/property/listing-actions";
import {
  MortgageCalculator,
  RentCalculator,
} from "@/components/property/calculators";
import { TourSection } from "@/components/property/tour-section";
import { PropertyLocationMap } from "@/components/map/properties-map";

function nearbyCount(kind: PoiKind, pois: ReturnType<typeof nearbyPois>) {
  return pois.filter((p) => p.kind === kind).length;
}

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return { title: "Listing not found" };
  return {
    title: `${formatPrice(property.price)}${property.status === "for-rent" ? "/mo" : ""} — ${property.address}`,
    description: property.description.slice(0, 150),
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const agent = getAgentById(property.agentId);
  const isRent = property.status === "for-rent";
  const similar = similarListings(property);
  const pois = nearbyPois(property);

  const stats = [
    { icon: <BedDouble className="h-5 w-5" />, label: "Bedrooms", value: property.beds },
    { icon: <Bath className="h-5 w-5" />, label: "Bathrooms", value: property.baths },
    { icon: <Ruler className="h-5 w-5" />, label: "Area", value: `${property.sqft.toLocaleString()} m²` },
    ...(property.lotSize > 0
      ? [{ icon: <Layers className="h-5 w-5" />, label: "Lot size", value: `${(property.lotSize / 43560).toFixed(2)} ac` }]
      : []),
    { icon: <Building2 className="h-5 w-5" />, label: "Type", value: property.type },
    { icon: <CalendarClock className="h-5 w-5" />, label: "Year built", value: property.yearBuilt },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumbs
          items={[
            { label: isRent ? "Rent" : "Buy", href: isRent ? "/rent" : "/buy" },
            { label: property.neighborhood, href: `/neighborhoods/${property.citySlug}` },
            { label: property.address.split(",")[0] },
          ]}
        />
      </div>

      {/* Title row */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="masthead text-3xl text-navy sm:text-4xl">
              {formatPrice(property.price)}
              {isRent && <span className="text-xl font-normal text-ink-dim">/mo</span>}
            </h1>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-dim">{formatRelativeDays(property.listedDaysAgo)}</p>
          </div>
          <p className="mt-2 text-base text-ink/65">{property.address}</p>
        </div>
        <ListingActions propertyId={property.id} />
      </div>

      {/* Gallery */}
      <div className="relative mt-6">
        <GalleryLightbox images={property.images} title={property.address} />
      </div>

      {/* Key stats bar */}
      <div className="mt-8 grid grid-cols-3 gap-y-6 rounded-xl border border-ink/5 bg-white px-5 py-7 shadow-soft sm:grid-cols-6 sm:divide-x sm:divide-ink/6">
        {stats.map((s, i) => (
          <div key={s.label} className={i > 0 ? "flex flex-col items-center gap-1.5 px-3 text-center" : "flex flex-col items-center gap-1.5 px-3 text-center"}>
            <span className="text-navy/40 [&_svg]:h-[18px] [&_svg]:w-[18px]">{s.icon}</span>
            <p className="mt-1 font-heading text-lg font-bold leading-none text-navy">{s.value}</p>
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-dim">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-14">
          {/* Description */}
          <section>
            <SectionHeading eyebrow="About this property" title="The story in short" />
            <p className="mt-4 leading-relaxed text-ink/70">{property.description}</p>
            {property.openHouse && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent-deep">
                <CalendarClock className="h-4 w-4" /> Open house {property.openHouse} — drop by anytime.
              </p>
            )}
          </section>

          {/* Amenities */}
          <section>
            <SectionHeading eyebrow="Amenities & Features" title="What's included" />
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5 sm:grid-cols-3">
              {property.amenities.map((a) => (
                <div key={a} className="flex items-center gap-3 text-sm text-ink/70">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A86A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  {a}
                </div>
              ))}
            </div>
          </section>

          {/* Floor plan */}
          <section>
            <SectionHeading eyebrow="Floor plan" title="Room by room" />
            <div className="mt-5 overflow-hidden rounded-xl border border-ink/5 bg-white shadow-soft">
              <table className="w-full text-left text-sm">
                <thead className="bg-navy/3 text-xs uppercase tracking-wider text-ink-dim">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold">Level</th>
                    <th className="px-5 py-3.5 font-semibold">Room</th>
                    <th className="px-5 py-3.5 font-semibold">Dimensions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Main", "Living / great room", `${Math.round(Math.sqrt(property.sqft * 0.28))}′ × ${Math.round(Math.sqrt(property.sqft * 0.22))}′`],
                    ["Main", "Kitchen & dining", `${Math.round(Math.sqrt(property.sqft * 0.18))}′ × ${Math.round(Math.sqrt(property.sqft * 0.14))}′`],
                    ["Upper", `Primary suite${property.beds > 1 ? " + " + Math.max(0, property.beds - 1) + " bed" + (property.beds > 2 ? "s" : "") : ""}`, `${Math.round(Math.sqrt(property.sqft * 0.34))}′ × ${Math.round(Math.sqrt(property.sqft * 0.26))}′`],
                    [property.sqft > 1800 ? "Lower" : "—", "Flex / laundry", property.sqft > 1400 ? "Full level" : "In-hall closet"],
                  ].map(([level, room, dims]) => (
                    <tr key={room as string} className="border-t border-ink/5 even:bg-paper-deep/30">
                      <td className="px-5 py-3.5 font-medium text-navy">{level}</td>
                      <td className="px-5 py-3.5 text-ink/70">{room}</td>
                      <td className="px-5 py-3.5 text-ink-dim">{dims}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Neighborhood map */}
          <section>
            <SectionHeading
              eyebrow="Neighborhood"
              title={`Life around ${property.neighborhood}`}
            />
            <div className="mt-6">
              <PropertyLocationMap property={property} pois={pois} />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-ink/5 bg-white p-5 shadow-soft">
                <p className="mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-dim">Walkability</p>
                {[
                  { icon: <Footprints className="h-4 w-4" strokeWidth={1.5} />, score: property.walkScore, label: "Walk Score®" },
                  { icon: <TrainFront className="h-4 w-4" strokeWidth={1.5} />, score: property.transitScore, label: "Transit" },
                ].map((s) => (
                  <div key={s.label} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between font-sans text-[11px] font-semibold uppercase tracking-[0.15em]">
                      <span className="flex items-center gap-2 text-ink/60">{s.icon} {s.label}</span>
                      <span className="font-heading text-sm font-bold normal-case tracking-normal text-accent-deep">{s.score}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-deep">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-gold-soft"
                        style={{ width: `${s.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-navy p-5 text-paper">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-paper/35">Getting Around</p>
                <ul className="mt-3.5 space-y-2.5 text-[13px] leading-relaxed text-paper/65">
                  <li>{nearbyCount("school", pois)} schools within walking distance</li>
                  <li>{nearbyCount("transit", pois)} transit stops nearby</li>
                  <li>{nearbyCount("park", pois)} parks & trails close by</li>
                  <li>{nearbyCount("food", pois)} restaurants & cafés in range</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Calculator */}
          <section>
            <SectionHeading
              eyebrow={isRent ? "Rent affordability" : "Mortgage calculator"}
              title={isRent ? "Does the math work for you?" : "What it costs per month"}
            />
            <div className="mt-5 rounded-xl border border-ink/5 bg-white p-6 shadow-soft sm:p-7">
              {isRent ? (
                <RentCalculator property={property} />
              ) : (
                <MortgageCalculator property={property} />
              )}
            </div>
          </section>
        </div>

        {/* Sticky Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {/* Inquiry card */}
          <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-premium">
            <p className="font-heading text-lg font-bold text-navy">Interested in this property?</p>
            <p className="mt-1 font-heading text-2xl font-bold text-accent">
              {formatPrice(property.price)}
              {isRent && <span className="text-base font-normal text-ink-dim">/mo</span>}
            </p>

            <div className="mt-5 space-y-3">
              <TourSection property={property} agent={agent!} />
            </div>
          </div>

          {/* Home facts */}
          <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-soft">
            <h3 className="font-heading text-base font-bold text-navy">Property Details</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["Status", isRent ? "For rent" : "For sale"],
                ["HOA dues", property.hoaMonthly > 0 ? `$${property.hoaMonthly}/mo` : "None"],
                ["Property tax", isRent ? "Paid by owner" : `$${property.taxAnnual.toLocaleString()}/yr`],
                ["Pets", isRent ? (property.petPolicy === "no-pets" ? "Sorry, no pets" : property.petPolicy.replace("-", " & ")) : "Welcome"],
                ["Available", isRent ? new Date(property.availableFrom).toLocaleDateString("en-US", { month: "long", day: "numeric" }) : "Immediate"],
              ].map(([k, v]) => (
                <div key={k as string} className="flex justify-between gap-4">
                  <dt className="text-ink-dim">{k}</dt>
                  <dd className="text-right font-semibold capitalize text-navy">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      {/* Similar properties */}
      {similar.length > 0 && (
        <section className="mt-20">
          <SectionHeading eyebrow="Keep looking" title="Similar properties" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} layoutIdPrefix="similar" />
            ))}
          </div>
        </section>
      )}

      <div className="pb-16 sm:hidden" aria-hidden />
    </div>
  );
}
