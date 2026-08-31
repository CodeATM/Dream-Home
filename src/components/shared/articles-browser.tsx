"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import type { ArticleMeta } from "@/data/types";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = ["All", "Buying", "Selling", "Renting", "Finance", "Market Updates"] as const;

export function ArticlesBrowser({ articles }: { articles: ArticleMeta[] }) {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () =>
      category === "All"
        ? articles
        : articles.filter((a) => a.category === category),
    [articles, category]
  );

  const [lead, ...rest] = filtered;

  return (
    <div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
              category === c
                ? "border-ink bg-ink text-white shadow-sm"
                : "border-ink/12 bg-white text-ink/70 hover:border-ink/40"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {!lead ? (
        <p className="mt-12 rounded-xl border border-dashed border-ink/15 p-12 text-center text-ink-dim">
          No articles in this category yet.
        </p>
      ) : (
        <>
          {/* Lead article */}
          <Link
            href={`/resources/${lead.slug}`}
            className="group mt-8 grid overflow-hidden rounded-xl bg-white shadow-soft transition-shadow duration-500 ease-luxe hover:shadow-hard lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px]">
              <Image
                src={unsplash(lead.coverImage, 900, 640)}
                alt={lead.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="img-editorial object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <Badge variant="accent" className="w-fit">{lead.category}</Badge>
              <h2 className="masthead mt-4 text-2xl text-ink transition-colors duration-300 group-hover:text-accent-deep sm:text-3xl">
                {lead.title}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-dim">{lead.excerpt}</p>
              <p className="mt-5 text-sm text-ink-dim">
                <span className="font-medium text-ink">{lead.author}</span> ·{" "}
                {formatDate(lead.date)} ·{" "}
                <span className="inline-flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" /> {lead.readTime} min read
                </span>
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-deep">
                Read the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* Rest */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <Link
                key={a.slug}
                href={`/resources/${a.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-soft transition-all duration-500 ease-luxe hover:-translate-y-1 hover:shadow-hard"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={unsplash(a.coverImage, 600, 340)}
                    alt={a.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="img-editorial object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.04]"
                  />
                  <Badge variant="secondary" className="absolute left-3 top-3 bg-white/90 backdrop-blur">
                    {a.category}
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg leading-snug text-ink transition-colors duration-300 group-hover:text-accent-deep">
                    {a.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-dim">{a.excerpt}</p>
                  <p className="mt-4 flex items-center justify-between border-t border-ink/5 pt-4 text-xs text-ink-dim">
                    <span>{formatDate(a.date)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-3 w-3" /> {a.readTime} min
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
