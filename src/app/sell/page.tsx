import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialCarousel } from "@/components/shared/testimonial-carousel";
import { ValuationTool } from "@/components/forms/valuation-tool";
import { LeadForm } from "@/components/forms/lead-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description:
    "Get an instant home valuation, a pre-launch punch list and a listing strategy built on real comparables.",
};

const steps = [
  {
    title: "Valuation & walk-through",
    body: "Your agent verifies the instant estimate in person, room by room, and flags the fixes that pay.",
  },
  {
    title: "Pre-launch prep",
    body: "Paint, staging, photography and floor plans — we coordinate every vendor and front the costs where allowed.",
  },
  {
    title: "Launch weekend",
    body: "We go live Thursday evening; open houses run the first weekend when traffic is highest.",
  },
  {
    title: "Offers & negotiation",
    body: "Every offer is compared on net proceeds, terms and certainty — not just headline price.",
  },
  {
    title: "Close & hand off keys",
    body: "Title, appraisal, final walkthrough — you get a checklist and a human who answers.",
  },
];

const faqs = [
  {
    q: "What does it cost to sell with Meridian?",
    a: "A standard listing commission of 2.5–3% depending on market and service level. No upfront fees for valuation, staging consults or photography — those are covered at closing.",
  },
  {
    q: "How accurate is the instant valuation?",
    a: "It's a starting point built from recent comparable sales plus your inputs. In our last audit it landed within ±6% of eventual sale price in 78% of cases. The in-person walk-through tightens that considerably.",
  },
  {
    q: "Should I fix things before listing?",
    a: "Sometimes. We give you a pre-launch punch list ranked by expected return — paint and lighting almost always earn out; major renovations rarely do before a sale.",
  },
  {
    q: "How fast can we close?",
    a: "Median days from launch to contract across our markets is 21. With a conventional loan and clean title, contract-to-keys runs about 30 days.",
  },
];

export default function SellPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumbs items={[{ label: "Sell" }]} />
      </div>

      {/* Hero + stepper */}
      <section className="rounded-xl bg-moss px-6 py-16 text-center sm:px-12 sm:py-20">
        <p className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-paper/45">
          Sell with confidence
        </p>
        <h1 className="masthead mx-auto mt-4 max-w-2xl text-4xl text-paper sm:text-5xl">
          Your home, priced right and{" "}
          <span className="italic text-paper/80">launched well</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-paper/60">
          Data-first pricing, pre-market prep and negotiation that protects your
          bottom line.
        </p>

        <ol className="mx-auto mt-14 grid max-w-5xl gap-x-8 gap-y-10 text-left sm:grid-cols-3 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-accent/15 font-heading text-[13px] text-paper">
                  {i + 1}
                </span>
                <span className="h-px flex-1 bg-white/10" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-base leading-snug text-paper">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-paper/55">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Valuation */}
      <section id="valuation" className="mt-24 scroll-mt-24">
        <SectionHeading
          eyebrow="Instant valuation"
          title="What's your home worth right now?"
          description="Answer four questions and watch the estimate build from comparable sales."
        />
        <div className="mt-10">
          <ValuationTool />
        </div>
      </section>

      {/* Value props row */}
      <section className="mt-24 grid gap-6 sm:grid-cols-3">
        {[
          ["Sell nine days faster", "Digital pipeline, pre-scheduled vendors and an agent who manages the calendar."],
          ["Net more", "Pricing bands, launch timing and credit strategy — small edges compound into real money."],
          ["Zero-surprise fees", "Every cost disclosed before you sign. If a repair negotiation lands, you approve it first."],
        ].map(([title, body]) => (
          <div key={title} className="rounded-xl border border-ink/5 bg-white p-7 shadow-soft">
            <Check className="h-5 w-5 text-accent" strokeWidth={1.5} />
            <h3 className="mt-4 font-heading text-lg text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">{body}</p>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="mt-24 rounded-xl bg-paper-deep/70 py-20">
        <TestimonialCarousel items={testimonials.slice(0, 3)} />
      </section>

      {/* FAQ */}
      <section className="mt-24 grid gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title="Seller questions, answered straight"
          />
          <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-deep underline-offset-4 hover:underline">
            Still curious? Ask us directly <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>
        <Accordion type="single" collapsible className="rounded-xl border border-ink/5 bg-white px-7 shadow-soft">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Lead capture */}
      <section className="mt-24 overflow-hidden rounded-xl bg-moss">
        <div className="grid gap-12 p-8 lg:grid-cols-2 lg:p-16">
          <div>
            <p className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-paper/45">
              List with us
            </p>
            <h2 className="masthead mt-4 text-3xl text-paper sm:text-4xl">
              Ready when you are
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-paper/60">
              Tell us about your home and a top local agent will reply within one
              business day with a refined valuation and a launch plan.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-paper/65">
              {["No-obligation listing consultation", "Staging and photography included in full-service plans", "Weekly written updates, not just calls"].map((li) => (
                <li key={li} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} /> {li}
                </li>
              ))}
            </ul>
          </div>
          <LeadForm />
        </div>
      </section>
    </div>
  );
}
