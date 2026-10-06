import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/PostCard";
import PageHero from "@/components/page/PageHero";
import { FinalCta, JsonLd } from "@/components/ui/blocks";
import { founderBySlug } from "@/content/site";
import { getAllPosts, getAuthors } from "@/lib/blog";
import { baseNodes, breadcrumbNode, founderNode, webPageNode } from "@/lib/schema";
import { buildMetadata, type PageMeta } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAuthors()).map((a) => ({ slug: a.slug }));
}

async function load(slug: string) {
  const author = (await getAuthors()).find((a) => a.slug === slug);
  if (!author) return null;
  const meta: PageMeta = {
    path: `/blog/author/${slug}`,
    title: `${author.name}: Articles on the Mise Blog`,
    description: `Articles by ${author.name}, ${author.role}, on hotel standards, service execution and audit readiness. Book a 15-min demo.`,
    h1: `Articles by ${author.name}`,
    primaryKeyword: author.name,
    eyebrow: "Author",
    updated: "2026-09-29",
    priority: 0.3,
  };
  return { author, meta };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const data = await load(slug);
  if (!data) return {};
  // Until a post in this author is published, keep the page out of the index.
  const hasPosts = (await getAllPosts()).some((p) => p.author.slug === slug);
  return buildMetadata({ ...data.meta, noindex: !hasPosts });
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await load(slug);
  if (!data) notFound();
  const posts = (await getAllPosts()).filter((p) => p.author.slug === slug);
  const founder = data.author.founderSlug ? founderBySlug(data.author.founderSlug) : undefined;
  const crumbs = [
    { name: "Blog", path: "/blog" },
    { name: data.author.name, path: data.meta.path },
  ];
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          webPageNode({ path: data.meta.path, name: data.meta.title, description: data.meta.description, kind: "ProfilePage" }),
          breadcrumbNode(data.meta.path, crumbs),
          founder ? founderNode(founder) : undefined,
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={data.author.role}
        title={data.meta.h1}
        lede={
          <p>
            {data.author.bio}{" "}
            {founder ? (
              <Link href={`/team/${founder.slug}`} className="text-ink underline decoration-gold/60 underline-offset-4">
                Full profile
              </Link>
            ) : null}
          </p>
        }
      />
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
          <p className="rounded-2xl border border-line p-8 text-muted">
            No published articles yet. <Link href="/blog" className="text-ink underline underline-offset-4">Browse the blog</Link>, read{" "}
            <Link href="/about" className="text-ink underline underline-offset-4">about Mise</Link> or see{" "}
            <Link href="/platform" className="text-ink underline underline-offset-4">the platform</Link>.
          </p>
        )}
      </div>
      <FinalCta location={`blog-author-${slug}`} />
    </>
  );
}
