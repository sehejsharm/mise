import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page/PageHero";
import { FinalCta, JsonLd } from "@/components/ui/blocks";
import { sitemapMeta as meta } from "@/content/meta";
import { getAllPosts } from "@/lib/blog";
import { staticRoutes } from "@/lib/routes";
import { baseNodes, breadcrumbNode, webPageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(meta);

/** Group order and headings for the human-readable sitemap. */
const GROUPS: [string, string][] = [
  ["home", "Main pages"],
  ["platform", "Platform"],
  ["solutions", "Solutions"],
  ["audiences", "Who it's for"],
  ["problems", "Problems we solve"],
  ["pillar", "Guides"],
  ["compare", "Comparisons"],
  ["geo", "Regions"],
  ["tools", "Tools"],
  ["glossary", "Glossary"],
  ["company", "Company"],
  ["blog", "Blog"],
  ["conversion", "Get in touch"],
  ["legal", "Legal"],
];

const label = (h1: string) => h1.split(/[:—]/)[0].trim();

export default async function SitemapPage() {
  const routes = staticRoutes().filter((r) => !r.noindex && r.group !== "sitemap");
  const posts = await getAllPosts();
  const crumbs = [{ name: "Sitemap", path: meta.path }];
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          webPageNode({ path: meta.path, name: meta.title, description: meta.description, updated: meta.updated }),
          breadcrumbNode(meta.path, crumbs),
        ]}
      />
      <PageHero crumbs={crumbs} eyebrow={meta.eyebrow ?? ""} title={meta.h1} updated={meta.updated} lede={<p>{meta.description}</p>} />
      <section className="pb-20">
        <div className="container-page grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map(([group, heading]) => {
            const items = routes.filter((r) => r.group === group);
            const blogItems = group === "blog" ? posts.map((p) => ({ path: `/blog/${p.slug}`, h1: p.title })) : [];
            if (!items.length && !blogItems.length) return null;
            return (
              <nav key={group} aria-labelledby={`sm-${group}`}>
                <h2 id={`sm-${group}`} className="font-display text-[1.15rem] font-semibold text-ink">
                  {heading}
                </h2>
                <ul className="mt-4 space-y-2 border-l border-line pl-4">
                  {[...items, ...blogItems].map((r) => (
                    <li key={r.path}>
                      <Link href={r.path} className="text-[0.95rem] text-muted hover:text-gold-ink">
                        {r.path === "/" ? "Home" : label(r.h1)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>
      </section>
      <FinalCta location="sitemap" />
    </>
  );
}
