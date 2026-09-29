import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/PostCard";
import PageHero from "@/components/page/PageHero";
import { FinalCta, JsonLd, RelatedLinks } from "@/components/ui/blocks";
import { getAllPosts, getCategories } from "@/lib/blog";
import { baseNodes, breadcrumbNode, webPageNode } from "@/lib/schema";
import { buildMetadata, type PageMeta } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ slug: c.slug }));
}

async function load(slug: string) {
  const category = (await getCategories()).find((c) => c.slug === slug);
  if (!category) return null;
  const meta: PageMeta = {
    path: `/blog/category/${slug}`,
    title: `${category.name} Articles | Mise Blog`,
    description: `${category.description} Guides and field notes from the Mise blog. Book a 15-min demo.`,
    h1: `${category.name}: articles from the Mise blog`,
    primaryKeyword: category.name.toLowerCase(),
    eyebrow: "Blog category",
    updated: "2026-09-29",
    priority: 0.4,
  };
  return { category, meta };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const data = await load(slug);
  if (!data) return {};
  // Until a post in this category is published, keep the page out of the index.
  const hasPosts = (await getAllPosts()).some((p) => p.category.slug === slug);
  return buildMetadata({ ...data.meta, noindex: !hasPosts });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await load(slug);
  if (!data) notFound();
  const posts = (await getAllPosts()).filter((p) => p.category.slug === slug);
  const crumbs = [
    { name: "Blog", path: "/blog" },
    { name: data.category.name, path: data.meta.path },
  ];
  return (
    <>
      <JsonLd nodes={[...baseNodes(), webPageNode({ path: data.meta.path, name: data.meta.title, description: data.meta.description, kind: "CollectionPage" }), breadcrumbNode(data.meta.path, crumbs)]} />
      <PageHero crumbs={crumbs} eyebrow={data.meta.eyebrow ?? ""} title={data.meta.h1} lede={<p>{data.category.description}</p>} />
      <div className="container-page pb-20">
        {posts.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} headingLevel={2} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-line p-8 text-muted">New articles in this category are on the way.</p>
        )}
        <div className="max-w-3xl">
          <RelatedLinks
            links={[
              { href: "/blog", label: "All Mise articles" },
              { href: "/digital-sop", label: "Digitize hotel SOPs: the guide" },
              { href: "/audit-readiness", label: "Hotel audit readiness" },
              { href: "/problems", label: "The six hotel operations problems" },
            ]}
          />
        </div>
      </div>
      <FinalCta location={`blog-category-${slug}`} />
    </>
  );
}
