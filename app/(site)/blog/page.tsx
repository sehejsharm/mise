import type { Metadata } from "next";
import Link from "next/link";
import BlogFilter from "@/components/blog/BlogFilter";
import { PostCover } from "@/components/blog/PostCard";
import PageHero from "@/components/page/PageHero";
import { FinalCta, JsonLd } from "@/components/ui/blocks";
import { getAllPosts, getCategories } from "@/lib/blog";
import { absoluteUrl } from "@/content/site";
import { baseNodes, breadcrumbNode, webPageNode } from "@/lib/schema";
import { buildMetadata, formatDate } from "@/lib/seo";
import { blogMeta } from "@/content/meta";

const meta = blogMeta;

export const metadata: Metadata = buildMetadata(meta);

export default async function BlogIndex() {
  const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);
  const [featured, ...rest] = posts;
  const crumbs = [{ name: "Blog", path: "/blog" }];
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          webPageNode({ path: meta.path, name: meta.title, description: meta.description, kind: "CollectionPage", updated: meta.updated }),
          breadcrumbNode(meta.path, crumbs),
          {
            "@type": "Blog",
            "@id": `${absoluteUrl("/blog")}#blog`,
            name: "Mise blog",
            url: absoluteUrl("/blog"),
            publisher: { "@id": `${absoluteUrl("/")}#organization` },
            blogPost: posts.map((p) => ({ "@id": `${absoluteUrl(`/blog/${p.slug}`)}#article` })),
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={meta.eyebrow ?? ""}
        title={meta.h1}
        lede={<p>Practical, answer-first writing for the people who run hotel shifts: how to digitize hotel SOPs, build an audit trail every shift, and hold one standard across every room.</p>}
      />
      <div className="container-page pb-20">
        {featured ? (
          <article className="group relative grid overflow-hidden rounded-[1.6rem] border border-line bg-surface/60 lg:grid-cols-[1.2fr_1fr]">
            <div className="aspect-[16/9] lg:aspect-auto">
              <PostCover post={featured} large />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <p className="font-mono text-[0.72rem] tracking-[0.14em] text-gold-ink uppercase">
                Featured · {featured.category.name}
                {featured.status === "draft" ? <span className="ml-2 rounded bg-coral/15 px-1.5 py-0.5 text-coral-ink">Draft</span> : null}
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-tight font-semibold text-ink">
                <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-3 text-[1rem] leading-relaxed text-muted">{featured.excerpt}</p>
              <p className="mt-5 font-mono text-[0.74rem] text-faint">
                {featured.author.name} · <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
              </p>
            </div>
          </article>
        ) : (
          <p className="rounded-2xl border border-line p-8 text-muted">The first articles are being reviewed. Check back soon.</p>
        )}

        {rest.length ? (
          <section aria-labelledby="more-posts" className="mt-14">
            <h2 id="more-posts" className="mb-6 font-display text-[clamp(1.4rem,2.4vw,1.8rem)] font-semibold text-ink">More from the Mise blog</h2>
            <BlogFilter posts={rest} categories={categories} />
          </section>
        ) : null}

        <nav aria-label="Browse by category" className="mt-14">
          <p className="eyebrow !text-faint">Browse by category</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/blog/category/${c.slug}`} className="text-[0.95rem] text-ink underline decoration-gold/50 underline-offset-4 hover:text-gold-ink">
                  {c.name} articles
                </Link>
              </li>
            ))}
            <li>
              <Link href="/blog/rss.xml" prefetch={false} className="text-[0.95rem] text-muted underline decoration-line-strong underline-offset-4 hover:text-ink">
                RSS feed
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <FinalCta location="blog" />
    </>
  );
}
