import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard, PostCover } from "@/components/blog/PostCard";
import PostBody from "@/components/blog/PostBody";
import ReadingProgress from "@/components/blog/ReadingProgress";
import ShareButtons from "@/components/blog/ShareButtons";
import Toc from "@/components/page/Toc";
import { Breadcrumbs, FaqList, FinalCta, JsonLd, TldrBox } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { absoluteUrl } from "@/content/site";
import { getAllPosts, getVisiblePost, readingMinutes, renderPost } from "@/lib/blog";
import { articleNode, baseNodes, breadcrumbNode, faqNode, webPageNode } from "@/lib/schema";
import { buildMetadata, formatDate, ogImagePath, type PageMeta } from "@/lib/seo";

export const dynamicParams = false;

/** The most relevant problem or solution page for each category. */
const categoryLinks: Record<string, { href: string; label: string }[]> = {
  "digital-sops": [
    { href: "/standards-to-execution", label: "The complete guide to putting hotel standards into execution" },
    { href: "/problems/ghost-sop", label: "Why hotel SOPs are not followed" },
  ],
  "service-execution": [
    { href: "/glossary/service-execution-platform", label: "What is a service execution platform?" },
    { href: "/compare/mise-vs-hotel-lms", label: "How Mise compares with an LMS" },
  ],
  "audit-and-compliance": [
    { href: "/audit-readiness", label: "Hotel audit readiness software" },
    { href: "/problems/audit-ambush", label: "The audit ambush" },
  ],
  housekeeping: [
    { href: "/solutions/housekeeping", label: "Housekeeping execution" },
    { href: "/problems/supervisor-bottleneck", label: "The hotel supervisor bottleneck" },
  ],
  "hotel-operations": [
    { href: "/compare/mise-vs-whatsapp", label: "Replace WhatsApp for hotel operations" },
    { href: "/platform", label: "Hotel operations software" },
  ],
};

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

function metaFor(post: Awaited<ReturnType<typeof getVisiblePost>>): PageMeta | null {
  if (!post) return null;
  return {
    path: `/blog/${post.slug}`,
    title: post.metaTitle || `${post.title} | Mise`,
    description: post.metaDescription || post.excerpt,
    h1: post.title,
    primaryKeyword: post.primaryKeyword,
    secondaryKeywords: post.secondaryKeywords,
    eyebrow: post.category.name,
    updated: post.updatedAt,
    published: post.publishedAt,
    type: "article",
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const meta = metaFor(await getVisiblePost((await params).slug));
  return meta ? buildMetadata(meta) : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getVisiblePost(slug);
  const meta = metaFor(post);
  const rendered = await renderPost(slug);
  if (!post || !meta || !rendered) notFound();

  const all = await getAllPosts();
  const related = [
    ...all.filter((p) => p.slug !== slug && p.category.slug === post.category.slug),
    ...all.filter((p) => p.slug !== slug && p.category.slug !== post.category.slug),
  ].slice(0, 3);
  const minutes = readingMinutes(rendered.words);
  const crumbs = [
    { name: "Blog", path: "/blog" },
    { name: post.category.name, path: `/blog/category/${post.category.slug}` },
    { name: post.title, path: meta.path },
  ];
  const url = absoluteUrl(meta.path);
  const nextSteps = categoryLinks[post.category.slug] ?? categoryLinks["digital-sops"];

  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          webPageNode({ path: meta.path, name: meta.title, description: meta.description, updated: post.updatedAt, published: post.publishedAt, about: `${url}#article` }),
          breadcrumbNode(meta.path, crumbs),
          articleNode({
            path: meta.path,
            headline: post.title,
            description: meta.description,
            image: post.coverImage ? absoluteUrl(post.coverImage) : absoluteUrl(ogImagePath(meta.path)),
            published: post.publishedAt,
            updated: post.updatedAt,
            author: { name: post.author.name, slug: post.author.founderSlug || undefined, sameAs: post.author.linkedin ? [post.author.linkedin] : [] },
            keywords: [post.primaryKeyword, ...post.secondaryKeywords],
            section: post.category.name,
            wordCount: rendered.words,
          }),
          post.faq.length ? faqNode(meta.path, post.faq) : undefined,
        ]}
      />
      <article>
        <header className="relative overflow-hidden pt-28 pb-10 sm:pt-36">
          <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_0%,#000_10%,transparent_60%)]" />
          <div className="container-page relative max-w-4xl">
            <Breadcrumbs items={crumbs} />
            {post.status === "draft" ? (
              <p className="mt-6 inline-flex rounded-full border border-coral/40 bg-coral/10 px-3 py-1 font-mono text-[0.72rem] text-coral-ink">
                Draft · visible on preview builds only · pending review
              </p>
            ) : null}
            <p className="mt-6 font-mono text-[0.74rem] tracking-[0.14em] text-gold-ink uppercase">
              <Link href={`/blog/category/${post.category.slug}`}>{post.category.name}</Link>
            </p>
            <h1 className="mt-4 text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-ink">{post.title}</h1>
            <p className="mt-5 max-w-3xl text-[1.12rem] leading-relaxed text-muted">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.76rem] text-faint">
              <Link href={`/blog/author/${post.author.slug}`} className="text-ink hover:text-gold-ink">
                {post.author.name}
              </Link>
              <span>
                Published <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              <span>
                Last updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </span>
              <span>{minutes} min read</span>
            </div>
          </div>
        </header>

        <div className="container-page max-w-4xl">
          <div className="aspect-[16/7] overflow-hidden rounded-2xl border border-line">
            <PostCover post={post} large />
          </div>
        </div>

        <div className="container-page mt-12 grid gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="max-w-3xl min-w-0">
            {post.tldr ? <TldrBox>{post.tldr}</TldrBox> : null}
            <div id="article-body" className="mt-10">
              <PostBody tree={rendered.tree} />
            </div>

            {post.faq.length ? (
              <section aria-labelledby="post-faq" className="mt-14">
                <h2 id="post-faq" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
                  Frequently asked questions
                </h2>
                <FaqList items={post.faq} className="mt-6" />
              </section>
            ) : null}

            <section aria-label="About the author" className="mt-14 rounded-2xl border border-line bg-surface/60 p-6">
              <p className="eyebrow !text-faint">Written by</p>
              <p className="mt-2 font-display text-[1.2rem] font-semibold text-ink">
                <Link href={`/blog/author/${post.author.slug}`} className="hover:text-gold-ink">
                  {post.author.name}
                </Link>
              </p>
              <p className="text-[0.9rem] text-muted">{post.author.role}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{post.author.bio}</p>
              {post.author.founderSlug ? (
                <Link href={`/team/${post.author.founderSlug}`} className="mt-3 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-gold-ink">
                  {post.author.name}'s profile <Icon name="arrowRight" size={14} />
                </Link>
              ) : null}
            </section>

            <nav aria-label="Next steps" className="mt-10 grid gap-3 sm:grid-cols-2">
              {nextSteps.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  {...(l.href === "/compare/mise-vs-hotel-lms" ? { "data-copy-lint": "allow" } : {})}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line p-4 text-[0.95rem] font-medium text-ink hover:border-gold/50"
                >
                  {l.label}
                  <Icon name="arrowRight" size={16} className="shrink-0 text-gold-ink" />
                </Link>
              ))}
            </nav>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <ReadingProgress targetId="article-body" slug={post.slug} />
              <Toc headings={rendered.headings} label="In this article" />
              <div>
                <p className="eyebrow !text-faint">Share</p>
                <div className="mt-3">
                  <ShareButtons url={url} title={post.title} />
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="container-page pb-6 lg:hidden">
          <p className="eyebrow !text-faint">Share this article</p>
          <div className="mt-3">
            <ShareButtons url={url} title={post.title} />
          </div>
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related-title" className="py-16">
          <div className="container-page">
            <h2 id="related-title" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
              Related articles
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <FinalCta location={`blog-${post.slug}`} />
    </>
  );
}
