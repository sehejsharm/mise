import { absoluteUrl, brand } from "@/content/site";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

function esc(s: string) {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);
}

export async function GET() {
  // Drafts never appear in the feed, even on preview builds.
  const posts = (await getAllPosts()).filter((p) => p.status === "published");
  const items = posts
    .map(
      (p) => `<item>
  <title>${esc(p.title)}</title>
  <link>${absoluteUrl(`/blog/${p.slug}`)}</link>
  <guid isPermaLink="true">${absoluteUrl(`/blog/${p.slug}`)}</guid>
  <description>${esc(p.excerpt)}</description>
  <category>${esc(p.category.name)}</category>
  <dc:creator>${esc(p.author.name)}</dc:creator>
  <pubDate>${new Date(`${p.publishedAt}T09:00:00Z`).toUTCString()}</pubDate>
</item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
  <title>${esc(`${brand.name} blog`)}</title>
  <link>${absoluteUrl("/blog")}</link>
  <description>${esc("Guides on hotel SOPs, service execution and audit readiness from Mise.")}</description>
  <language>en-IN</language>
  <atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
