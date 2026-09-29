import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page/PageHero";
import { FinalCta, JsonLd, TldrBox } from "@/components/ui/blocks";
import { glossary, glossaryHubMeta } from "@/content/glossary";
import { baseNodes, breadcrumbNode, definedTermSetNode, webPageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(glossaryHubMeta);

export default function GlossaryHub() {
  const crumbs = [{ name: "Glossary", path: "/glossary" }];
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          webPageNode({ path: "/glossary", name: glossaryHubMeta.title, description: glossaryHubMeta.description, kind: "CollectionPage", updated: glossaryHubMeta.updated }),
          breadcrumbNode("/glossary", crumbs),
          definedTermSetNode(glossary),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={glossaryHubMeta.eyebrow}
        title={glossaryHubMeta.h1}
        updated={glossaryHubMeta.updated}
        lede={<p>The hotel service execution glossary: short, self-contained definitions of the terms Mise uses, from service execution platform to photo gate, timed task and service record.</p>}
      />
      <div className="container-page pb-20">
        <div className="max-w-3xl">
          <TldrBox>
            Service execution is the discipline of making hotel standards run on every shift and proving that they did. These
            definitions describe its building blocks: standards, timed tasks, evidence and the service record they produce.
          </TldrBox>
        </div>
        <dl className="mt-14 grid gap-4 md:grid-cols-2">
          {sorted.map((t) => (
            <div key={t.slug} className="rounded-2xl border border-line bg-surface/60 p-6">
              <dt>
                <Link href={`/glossary/${t.slug}`} className="font-display text-[1.2rem] font-semibold text-ink hover:text-gold-ink">
                  {t.term}
                </Link>
              </dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted">{t.short}</dd>
            </div>
          ))}
        </dl>
      </div>
      <FinalCta location="glossary" />
    </>
  );
}
