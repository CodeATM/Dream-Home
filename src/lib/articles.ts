import fs from "fs";
import path from "path";
import { articlesMeta } from "@/data/articles-meta";
import type { ArticleMeta } from "@/data/types";

const contentDir = path.join(process.cwd(), "src", "content", "resources");

export interface FullArticle {
  meta: ArticleMeta;
  body: string;
}

export function getArticleBodies(): Record<string, string> {
  const map: Record<string, string> = {};
  try {
    const files = fs.readdirSync(contentDir);
    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;
      map[file.replace(/\.mdx$/, "")] = fs.readFileSync(
        path.join(contentDir, file),
        "utf8"
      );
    }
  } catch {
    // content directory missing — fall back to empty
  }
  return map;
}

export function getArticle(slug: string): FullArticle | undefined {
  const meta = articlesMeta.find((a) => a.slug === slug);
  if (!meta) return undefined;
  const bodies = getArticleBodies();
  return { meta, body: bodies[slug] ?? "" };
}
