import { getAllPosts } from "@/lib/blog";
import { staticRoutes } from "@/lib/routes";

export const dynamic = "force-static";

export async function GET() {
  const pages = staticRoutes().map((r) => ({ path: r.path, title: r.h1, description: r.description, group: r.group, keywords: [r.primaryKeyword, ...(r.secondaryKeywords ?? [])].join(" ") }));
  const posts = (await getAllPosts()).map((p) => ({ path: `/blog/${p.slug}`, title: p.title, description: p.excerpt, group: "blog", keywords: [p.primaryKeyword, ...p.tags].join(" ") }));
  return Response.json([...pages, ...posts]);
}
