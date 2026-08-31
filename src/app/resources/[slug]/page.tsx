import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { articlesMeta } from "@/data/articles-meta";
import { getArticle } from "@/lib/articles";
import { unsplash, BLUR_DATA_URL } from "@/lib/images";
import { formatDate } from "@/lib/format";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return articlesMeta.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.meta.title,
    description: article.meta.excerpt,
  };
}

const mdxComponents = {
  a: ({ href = "#", children }: { href?: string; children?: React.ReactNode }) => (
    <Link href={href} className="font-medium text-accent-deep underline underline-offset-4 hover:text-accent">
      {children}
    </Link>
  ),
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || !article.body) notFound();
  const { meta, body } = article;

  const related = articlesMeta
    .filter((a) => a.slug !== meta.slug)
    .sort((a) => (a.category === meta.category ? -1 : 1))
    .slice(0, 3);

  const initials = meta.author
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="py-6">
        <Breadcrumbs
          items={[
            { label: "Resources", href: "/resources" },
            { label: meta.category },
            { label: meta.title.length > 40 ? meta.title.slice(0, 40) + "…" : meta.title },
          ]}
        />
      </div>

      <article>
        <header className="mx-auto max-w-3xl text-center">
          <Badge variant="accent" className="mx-auto">{meta.category}</Badge>
          <h1 className="masthead mt-5 text-3xl leading-[1.15] text-ink sm:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-dim">{meta.excerpt}</p>
          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-ink-dim">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
              {initials}
            </span>
            <span className="text-left">
              <span className="block font-semibold text-ink">{meta.author}</span>
              {meta.authorRole}
            </span>
            <span aria-hidden>·</span>
            <span>{formatDate(meta.date)}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" /> {meta.readTime} min read
            </span>
          </div>
        </header>

        <div className="relative mx-auto mt-10 aspect-[16/8] max-w-5xl overflow-hidden rounded-xl">
          <Image
            src={unsplash(meta.coverImage, 1400, 700)}
            alt={meta.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="img-editorial object-cover"
          />
        </div>

        <div className="prose-article mx-auto mt-12 max-w-2xl">
          <MDXRemote source={body} components={mdxComponents as never} />
        </div>
      </article>

      {/* Related */}
      <section className="mx-auto mt-20 max-w-5xl border-t border-ink/5 pt-12">
        <h2 className="font-heading text-2xl tracking-tight text-ink">
          Keep reading
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/resources/${r.slug}`}
              className="group overflow-hidden rounded-xl bg-white shadow-soft transition-all duration-500 ease-luxe hover:-translate-y-1 hover:shadow-hard"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={unsplash(r.coverImage, 480, 270)}
                  alt={r.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="img-editorial object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  {r.category}
                </p>
                <h3 className="mt-1.5 font-display text-base font-semibold leading-snug text-ink group-hover:text-accent-deep">
                  {r.title}
                </h3>
                <p className="mt-2 text-xs text-ink-dim">{r.readTime} min read</p>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/resources" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent-deep">
          <ArrowLeft className="h-4 w-4" /> All resources
        </Link>
      </section>
    </div>
  );
}
