import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, Mail, MapPin, Star, Languages, BadgeCheck, Quote } from "lucide-react";
import { agents, getAgent, agentReviews } from "@/data/agents";
import { properties } from "@/data/properties";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { formatDate } from "@/lib/format";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { PropertyCard } from "@/components/property/property-card";
import Image from "next/image";

export function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) return { title: "Agent not found" };
  return {
    title: `${agent.name} — ${agent.title}`,
    description: agent.bio.slice(0, 150),
  };
}

export default async function AgentProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();

  const listings = properties.filter((p) => p.agentId === agent.id).slice(0, 3);
  const reviews = agentReviews(agent.id);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumbs items={[{ label: "Agents", href: "/agents" }, { label: agent.name }]} />
      </div>

      {/* Header */}
      <section className="overflow-hidden rounded-xl bg-moss">
        <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-xl lg:mx-0">
            <Image
              src={unsplash(agent.photo, 600, 600)}
              alt={agent.name}
              width={600}
              height={600}
              priority
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="img-editorial h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-paper/50">
              {agent.title}
            </p>
            <h1 className="masthead mt-3 text-4xl text-paper">
              {agent.name}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-sans text-[11px] font-medium uppercase tracking-eyebrow text-paper/55">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" strokeWidth={1.75} /> {agent.city}</span>
              <span className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" strokeWidth={0} />
                {agent.rating.toFixed(1)} · {agent.reviewsCount} reviews
              </span>
              <span className="flex items-center gap-1.5">
                <Languages className="h-3.5 w-3.5" strokeWidth={1.75} /> {agent.languages.join(", ")}
              </span>
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {agent.specialties.map((s) => (
                <span key={s} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-paper/80 backdrop-blur-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10 sm:grid-cols-4">
          {[
            ["Homes sold", agent.salesCount.toString()],
            ["Years of experience", `${agent.experienceYears}`],
            ["Avg. rating", `${agent.rating.toFixed(1)} / 5`],
            ["Response time", "< 2 hrs"],
          ].map(([label, value]) => (
            <div key={label} className="px-4 py-6 text-center">
              <p className="font-heading text-2xl text-paper">{value}</p>
              <p className="mt-1 font-sans text-[10px] font-medium uppercase tracking-eyebrow text-paper/45">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-12">
          <section>
            <SectionHeading eyebrow="About" title={`Meet ${agent.name.split(" ")[0]}`} />
            <p className="mt-4 leading-relaxed text-ink-soft">{agent.bio}</p>
          </section>

          <section>
            <SectionHeading eyebrow="Active listings" title={`${agent.name.split(" ")[0]}'s current homes`} />
            {listings.length > 0 ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {listings.map((p) => (
                  <PropertyCard key={p.id} property={p} layoutIdPrefix="agent" />
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-none border border-dashed border-border p-8 text-center text-sm text-ink-dim">
                No active listings right now — reach out about upcoming inventory.
              </p>
            )}
          </section>

          <section>
            <SectionHeading eyebrow="Reviews" title="What clients say" />
            <div className="mt-6 space-y-4">
              {reviews.map((r, i) => (
                <figure key={i} className="rounded-xl border border-ink/5 bg-white p-6 shadow-soft">
                  <Quote className="h-5 w-5 text-accent/60" strokeWidth={1.25} />
                  <blockquote className="mt-3 leading-relaxed text-ink/80">{r.text}</blockquote>
                  <figcaption className="mt-4 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-ink">
                      <BadgeCheck className="h-4 w-4 text-accent-deep" strokeWidth={1.75} /> {r.author}
                    </span>
                    <span className="flex items-center gap-2 font-heading text-sm tracking-widest text-accent">
                      {"★".repeat(r.rating)}
                      <span className="font-sans text-xs normal-case tracking-normal text-ink-dim">· {formatDate(r.date)}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>

        {/* Contact card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-soft">
            <h3 className="font-heading text-xl text-ink">Contact {agent.name.split(" ")[0]}</h3>
            <p className="mt-1 text-sm text-ink-dim">
              Typically replies within two hours.
            </p>
            <div className="mt-5 space-y-3 text-sm">
              <a href={`tel:${agent.phone}`} className="flex items-center gap-2.5 rounded-xl bg-paper-deep px-4 py-3 text-[13px] font-medium text-ink transition-colors duration-300 hover:bg-paper-dim">
                <Phone className="h-4 w-4" /> {agent.phone}
              </a>
              <a href={`mailto:${agent.email}`} className="flex items-center gap-2.5 rounded-xl bg-paper-deep px-4 py-3 text-[13px] font-medium text-ink transition-colors duration-300 hover:bg-paper-dim">
                <Mail className="h-4 w-4 shrink-0" /> {agent.email}
              </a>
            </div>
            <p className="mt-4 rounded-xl border border-dashed border-ink/12 p-4 text-center text-xs leading-relaxed text-ink-dim">
              Prefer email? Mention your timeline and budget — it helps the first reply be twice as useful.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
