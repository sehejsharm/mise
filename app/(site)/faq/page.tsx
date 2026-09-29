import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import { FaqList, FinalCta, JsonLd, RelatedLinks, TldrBox } from "@/components/ui/blocks";
import { faqMeta, faqs } from "@/content/faq";
import { brand } from "@/content/site";
import { baseNodes, breadcrumbNode, faqNode, webPageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(faqMeta);

export default function FaqPage() {
  const crumbs = [{ name: "FAQ", path: "/faq" }];
  const groups = [...new Set(faqs.map((f) => f.group))];
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          { ...(webPageNode({ path: "/faq", name: faqMeta.title, description: faqMeta.description, updated: faqMeta.updated }) as object), "@type": "WebPage" },
          breadcrumbNode("/faq", crumbs),
          faqNode("/faq", faqs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={faqMeta.eyebrow}
        title={faqMeta.h1}
        updated={faqMeta.updated}
        lede={<p>The Mise FAQ covers everything hotel teams ask us about Mise hotel software: what it is, how the Mise SOP platform works on a shift, what it needs, what a pilot looks like, and how Mise by Focus Realm handles data.</p>}
      />
      <div className="container-page pb-20">
        <div className="max-w-3xl">
          <TldrBox>{brand.definition}</TldrBox>
          {groups.map((g) => (
            <section key={g} aria-labelledby={`faq-${g.toLowerCase().replace(/\W+/g, "-")}`} className="mt-14">
              <h2 id={`faq-${g.toLowerCase().replace(/\W+/g, "-")}`} className="font-display text-[1.5rem] font-semibold text-ink">
                Mise FAQ: {g.toLowerCase()}
              </h2>
              <FaqList items={faqs.filter((f) => f.group === g)} className="mt-5" />
            </section>
          ))}
          <RelatedLinks
            links={[
              { href: "/how-it-works", label: "How Mise works", note: "Standard → Timed task → Evidence → Service record." },
              { href: "/platform", label: "The platform", note: "Staff app, manager dashboard, standards workspace." },
              { href: "/security", label: "Security & data handling", note: "Plainly stated." },
              { href: "/compare/mise-vs-hotel-lms", label: "Mise vs hotel LMS", note: "Execution evidence vs completion records." },
            ]}
          />
        </div>
      </div>
      <FinalCta location="faq" />
    </>
  );
}
