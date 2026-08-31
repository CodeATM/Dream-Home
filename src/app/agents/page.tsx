import type { Metadata } from "next";
import { AgentsDirectory } from "@/components/agent/agents-directory";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "Find an Agent",
  description:
    "Browse Meridian's top-rated local agents by market, specialty and rating.",
};

export default function AgentsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumbs items={[{ label: "Agents" }]} />
      </div>
      <div className="max-w-2xl">
        <p className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-accent-deep">
          Our people
        </p>
        <h1 className="masthead mt-3 text-4xl text-ink sm:text-5xl">
          Agents who answer
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-dim">
          Every Meridian agent is a full-time local expert — vetted for
          negotiation chops, market fluency and the ability to explain things
          like a human.
        </p>
      </div>

      <div className="mt-12">
        <AgentsDirectory />
      </div>
    </div>
  );
}
