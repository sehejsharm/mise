import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";
import { getAllPosts, getAuthors, getCategories } from "@/lib/blog";
import { staticRoutes } from "@/lib/routes";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = staticRoutes()
    .filter((r) => !r.noindex)
    .map((r) => ({
      url: absoluteUrl(r.path),
      lastModified: r.updated ? new Date(`${r.updated}T00:00:00Z`) : undefined,
      changeFrequency: r.group === "legal" ? "yearly" : "monthly",
      priority: r.priority ?? 0.6,
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
