import type { ReactNode } from "react";
import { PostCard } from "@/components/blog/PostCard";
import LeadImage from "@/components/page/LeadImage";
import PageHero from "@/components/page/PageHero";
import Toc from "@/components/page/Toc";
import { FaqList, FinalCta, JsonLd, RelatedLinks, TldrBox } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/primitives";
import type { Longform } from "@/content/types";
import { resolvePosts } from "@/lib/blog";
import { createLinkState } from "@/lib/links";
import { headingsOf, Markdown } from "@/lib/md";
import { baseNodes, breadcrumbNode, faqNode, howToNode, imageUrl, softwareNode, webPageNode } from "@/lib/schema";

/**
 * Template for long-form SEO pages: hero with H1 + lede (primary keyword in the
 * first 100 words), TL;DR, lead image, answer-first body with a sticky TOC and
 * the internal-linking engine, FAQ, related reading and a demo CTA.
 */
export default async function LongformPage({
  page,
  crumbs,
  before,
  heroExtra,
  extraNodes = [],
}: {
  page: Longform;
  crumbs: { name: string; path: string }[];
  /** Content rendered between the TL;DR and the body (e.g. the pain anatomy). */
  before?: ReactNode;
  /** Content at the bottom of the hero, under the CTAs (e.g. the department switcher bar). */
  heroExtra?: ReactNode;
  extraNodes?: unknown[];
}) {
  const { meta } = page;
  const state = createLinkState(meta.path);
  const headings = headingsOf(page.body);
  const posts = await resolvePosts(page.relatedPosts);
  const lintAllow = page.allowLmsVocabulary ? { "data-copy-lint": "allow" } : {};

  return (
    <article {...lintAllow}>
      <JsonLd
        nodes={[
          ...baseNodes(),
          softwareNode(),
          webPageNode({
            path: meta.path,
            name: meta.title,
            description: meta.description,
            updated: meta.updated,
            primaryImage: page.leadImage?.key ? imageUrl(page.leadImage.key) : undefined,
          }),
          breadcrumbNode(meta.path, crumbs),
          page.faqs.length ? faqNode(meta.path, page.faqs) : undefined,
          page.howTo ? howToNode(meta.path, page.howTo.name, page.howTo.description, page.howTo.steps) : undefined,
          ...extraNodes,
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={page.eyebrow}
        title={meta.h1}
        lede={<p>{page.lede}</p>}
        updated={meta.updated}
        aside={page.leadImage ? <LeadImage image={page.leadImage.key} dept={page.leadImage.dept} alt={page.leadImage.alt} device={page.leadImage.device} priority /> : undefined}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/demo" arrow trackLocation={`hero-${meta.path}`}>
            Book a 15-min demo
          </ButtonLink>
          <ButtonLink href="/how-it-works" variant="ghost">
            How Mise works
          </ButtonLink>
        </div>
        {heroExtra}
      </PageHero>

      <div className="container-page pb-20">
        <div className="max-w-3xl">
          <TldrBox>{page.tldr}</TldrBox>
        </div>
        {before}
        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
          <div className="max-w-3xl min-w-0">
            <Markdown source={page.body} state={state} />

            {page.faqs.length ? (
              <section aria-labelledby="page-faq" className="mt-16">
                <h2 id="page-faq" className="scroll-mt-28 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
                  {page.faqTitle ?? `${meta.primaryKeyword.replace(/^./, (c) => c.toUpperCase())}: frequently asked questions`}
                </h2>
                <FaqList items={page.faqs} className="mt-6" />
              </section>
            ) : null}

            {posts.length ? (
              <section aria-labelledby="page-posts" className="mt-16">
                <h2 id="page-posts" className="font-display text-[1.4rem] font-semibold text-ink">
                  Related articles
                </h2>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <PostCard post={p} />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <RelatedLinks links={page.related} />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <Toc headings={headings} />
              <div className="mt-8 rounded-2xl border border-gold/30 bg-gold-soft p-5">
                <p className="font-display text-[1.05rem] font-semibold text-ink">See it on a real shift</p>
                <p className="mt-1.5 text-[0.88rem] text-muted">15 minutes. One of your existing standards, running as a timed task.</p>
                <ButtonLink href="/demo" className="mt-4 w-full" trackLocation={`toc-${meta.path}`}>
                  Book a demo
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <FinalCta location={meta.path.replace(/\//g, "-").slice(1) || "page"} />
    </article>
  );
}
