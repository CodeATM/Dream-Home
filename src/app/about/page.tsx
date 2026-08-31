import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Newspaper } from "lucide-react";
import { agents } from "@/data/agents";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatCounter } from "@/components/shared/stat-counter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meridian's story, mission and the team rebuilding trust in real estate.",
};

const timeline = [
  ["2019", "Two agents and a spreadsheet", "Founded in Austin with a stubborn belief: buyers deserve the same data advantage as institutional investors."],
  ["2021", "First 1,000 keys handed over", "Word of mouth carried us through a wild market — our average client saved $11K versus asking price."],
  ["2023", "The platform goes public", "Listings, guides and tools opened to everyone; the compare feature alone changed how people shop."],
  ["2024", "Four new markets", "Seattle, Denver, Nashville and Portland joined the family — each with local agents, not franchisees."],
  ["2026", "Eight markets, one standard", "Today: 54 live curated listings, thousands of clients, and the same rule since day one — no pressure, ever."],
];

const press = [
  "Best Places to Work — TechWeekly",
  "Top 10 Proptech Startups — HousingWire",
  "Editor's Choice — HomeJournal",
  "Fastest Growing Brokerage — MetroBiz",
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumbs items={[{ label: "About" }]} />
      </div>

      {/* Story hero */}
      <section className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            Our story
          </p>
          <h1 className="masthead mt-4 text-4xl leading-tight text-navy sm:text-5xl">
            We started because buying a home felt broken
          </h1>
          <div className="mt-6 space-y-4 leading-relaxed text-ink/70">
            <p>
              In 2019, two agents watched a first-time buyer get rushed into a
              bidding war on a house with a cracked foundation. Nobody showed her
              the inspection history. Nobody explained the comps. She overpaid by
              forty thousand dollars for a problem.
            </p>
            <p>
              Meridian exists so that never happens again. We built the platform
              we wished existed: real data on every listing, agents who are paid
              to advise — not just close — and tools that make the biggest
              purchase of your life feel less like a leap of faith.
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={unsplash("1523217582562-09d0def993a6", 1000, 750)}
            alt="A warm, welcoming home"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="img-editorial object-cover"
          />
        </div>
      </section>

      {/* Mission strip */}
      <section className="mt-20 rounded-xl bg-moss px-8 py-16 text-center sm:px-14">
        <p className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-paper/45">
          Mission
        </p>
        <p className="mx-auto mt-5 max-w-3xl font-heading text-2xl font-medium leading-relaxed text-paper sm:text-3xl">
          Make every housing decision the most informed one a person has ever
          made — then make it feel easy.
        </p>
      </section>

      {/* Stats */}
      <section className="mt-20 grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
        {[
          [12500, "+", "clients served"],
          [98.6, "%", "avg. sale-to-list"],
          [8, "", "markets covered"],
          [42, "", "full-time agents"],
        ].map(([value, suffix, label]) => (
          <div key={label as string}>
            <p className="font-heading text-4xl tracking-tight text-ink sm:text-5xl">
              <StatCounter value={value as number} suffix={suffix as string} decimals={value === 98.6 ? 1 : 0} />
            </p>
            <p className="mt-2 font-sans text-[11px] font-medium uppercase tracking-eyebrow text-ink-dim">{label}</p>
          </div>
        ))}
      </section>

      {/* Timeline */}
      <section className="mt-24">
        <SectionHeading eyebrow="Milestones" title="Seven years of momentum" align="center" />
        <ol className="relative mx-auto mt-14 max-w-3xl space-y-12 border-l border-ink/15 pl-10">
          {timeline.map(([year, title, body]) => (
            <li key={year} className="relative">
              <span className="absolute -left-[45px] flex h-[9px] w-[9px] items-center justify-center rounded-full bg-accent ring-4 ring-paper" />
              <p className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-accent-deep">
                {year}
              </p>
              <h3 className="mt-2 font-heading text-xl text-ink">{title}</h3>
              <p className="mt-1.5 leading-relaxed text-ink-dim">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Team */}
      <section className="mt-24">
        <SectionHeading
          eyebrow="Leadership & lead agents"
          title="The humans behind Meridian"
          description="Every one of them still shows houses. That's the point."
          align="center"
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {agents.slice(0, 4).map((a) => (
            <Link key={a.id} href={`/agents/${a.slug}`} className="group text-center">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={unsplash(a.photo, 500, 500)}
                  alt={a.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="img-editorial object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-4 font-heading text-lg text-ink">{a.name}</p>
              <p className="mt-0.5 text-[13px] text-ink-dim">{a.title}, {a.city}</p>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/agents" className="inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-[13px] font-medium tracking-wide text-paper transition-colors duration-300 hover:bg-moss">
            Meet all 42 agents <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>
      </section>

      {/* Press */}
      <section className="mt-20 rounded-xl border border-ink/5 bg-white px-6 py-9 shadow-soft">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
          {press.map((p) => (
            <span key={p} className="flex items-center gap-2.5 text-sm text-ink-dim">
              {p.startsWith("Best") || p.startsWith("Top") ? (
                <Award className="h-4 w-4 text-accent" strokeWidth={1.5} />
              ) : (
                <Newspaper className="h-4 w-4 text-accent" strokeWidth={1.5} />
              )}
              {p}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
