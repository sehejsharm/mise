import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/page/PageHero";
import { FinalCta, JsonLd, RelatedLinks, TldrBox } from "@/components/ui/blocks";
import { glossary, termBySlug } from "@/content/glossary";
import { createLinkState } from "@/lib/links";
import { Markdown } from "@/lib/md";
import { baseNodes, breadcrumbNode, definedTermNode, faqNode, webPageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { glossaryMeta } from "@/content/meta";

export const dynamicParams = false;


const metaFor = glossaryMeta;

export function generateStaticParams() {
  return glossary.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
  const t = termBySlug((await params).term);
  return t ? buildMetadata(metaFor(t)) : {};
}

export default async function TermPage({ params }: { params: Promise<{ term: string }> }) {
  const t = termBySlug((await params).term);
  if (!t) notFound();
  const meta = metaFor(t);
  const crumbs = [
    { name: "Glossary", path: "/glossary" },
    { name: t.term, path: meta.path },
  ];
  const others = glossary.filter((g) => g.slug !== t.slug).slice(0, 4);
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          webPageNode({ path: meta.path, name: meta.title, description: meta.description, updated: meta.updated, about: `${meta.path}#term` }),
          breadcrumbNode(meta.path, crumbs),
          definedTermNode(t),
          faqNode(meta.path, [{ q: meta.h1, a: t.short }]),
        ]}
      />
      <PageHero crumbs={crumbs} eyebrow="Glossary" title={meta.h1} updated={meta.updated} />
      <div className="container-page pb-20">
        <div className="max-w-3xl">
          <TldrBox label="Definition">{t.short}</TldrBox>
          <h2 className="mt-12 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">{t.term} in hotel operations</h2>
          <div className="mt-2">
            <Markdown source={t.body} state={createLinkState(meta.path)} />
          </div>
          <RelatedLinks
            title="Related"
            links={[...t.related, ...others.map((o) => ({ href: `/glossary/${o.slug}`, label: o.term }))].slice(0, 6)}
          />
        </div>
      </div>
      <FinalCta location={`glossary-${t.slug}`} />
    </>
  );
}
