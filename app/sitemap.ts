import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";
import { getAllPosts, getAuthors, getCategories } from "@/lib/blog";
import { staticRoutes } from "@/lib/routes";

export const dynamic = "force-static";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

/** Crawl hints per page, from the owner's sitemap plan. */
function hints(path: string, group: string): { changeFrequency: Freq; priority: number } {
  const exact: Record<string, [Freq, number]> = {
    "/": ["daily", 1.0],
    "/platform": ["weekly", 0.9],
    "/solutions": ["weekly", 0.9],
    "/how-it-works": ["monthly", 0.8],
    "/blog": ["weekly", 0.8],
    "/faq": ["weekly", 0.7],
    "/roi": ["monthly", 0.7],
    "/compare": ["monthly", 0.7],
    "/glossary": ["weekly", 0.6],
    "/about": ["monthly", 0.6],
    "/advisors": ["monthly", 0.5],
    "/security": ["monthly", 0.5],
    "/contact": ["monthly", 0.5],
    "/sitemap": ["weekly", 0.3],
  };
  if (exact[path]) return { changeFrequency: exact[path][0], priority: exact[path][1] };
  if (path.startsWith("/solutions/")) return { changeFrequency: "monthly", priority: 0.8 };
  if (path.startsWith("/for")) return { changeFrequency: "monthly", priority: 0.7 };
  if (path.startsWith("/team/")) return { changeFrequency: "monthly", priority: 0.5 };
  if (group === "legal") return { changeFrequency: "yearly", priority: 0.3 };
  if (group === "glossary") return { changeFrequency: "monthly", priority: 0.6 };
  return { changeFrequency: "monthly", priority: 0.7 };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = staticRoutes()
    .filter((r) => !r.noindex)
    .map((r) => ({
      url: absoluteUrl(r.path),
      lastModified: r.updated ? new Date(`${r.updated}T00:00:00Z`) : undefined,
      ...hints(r.path, r.group),
      alternates: { languages: { en: absoluteUrl(r.path), "en-IN": absoluteUrl(r.path) } },
    }));

  const [posts, categories, authors] = await Promise.all([getAllPosts(), getCategories(), getAuthors()]);
  // Drafts are listed only on preview builds (getAllPosts already hides them on production).
  for (const p of posts) {
    entries.push({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(`${p.updatedAt}T00:00:00Z`),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const c of categories) {
    if (posts.some((p) => p.category.slug === c.slug)) {
      entries.push({ url: absoluteUrl(`/blog/category/${c.slug}`), changeFrequency: "weekly", priority: 0.4 });
    }
  }
  for (const a of authors) {
    if (posts.some((p) => p.author.slug === a.slug)) {
      entries.push({ url: absoluteUrl(`/blog/author/${a.slug}`), changeFrequency: "monthly", priority: 0.3 });
    }
  }
  return entries;
}
