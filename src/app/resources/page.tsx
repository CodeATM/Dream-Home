import type { Metadata } from "next";
import { articlesMeta } from "@/data/articles-meta";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ArticlesBrowser } from "@/components/shared/articles-browser";

export const metadata: Metadata = {
  title: "Resources & Guides",
  description:
    "Buying, selling, financing and market guides written by working agents — not content farms.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumbs items={[{ label: "Resources" }]} />
      </div>
      <div className="max-w-2xl">
        <p className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-accent-deep">
          Resources
        </p>
        <h1 className="masthead mt-3 text-4xl text-ink sm:text-5xl">
          Guides worth your commute
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-dim">
          Practical playbooks on buying, selling, renting and the math in
          between — written by the agents who do this every day.
        </p>
      </div>

      <div className="mt-10">
        <ArticlesBrowser articles={articlesMeta} />
      </div>
    </div>
  );
}
