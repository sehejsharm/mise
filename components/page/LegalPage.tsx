import PageHero from "@/components/page/PageHero";
import { FinalCta, JsonLd, RelatedLinks } from "@/components/ui/blocks";
import { createLinkState } from "@/lib/links";
import { Markdown } from "@/lib/md";
import { baseNodes, breadcrumbNode, webPageNode } from "@/lib/schema";
import type { PageMeta } from "@/lib/seo";

export default function LegalPage({ page }: { page: { meta: PageMeta; lede: string; body: string } }) {
  const crumbs = [{ name: page.meta.h1.replace(/^./, (c) => c.toUpperCase()), path: page.meta.path }];
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          webPageNode({ path: page.meta.path, name: page.meta.title, description: page.meta.description, updated: page.meta.updated }),
          breadcrumbNode(page.meta.path, crumbs),
        ]}
      />
      <PageHero crumbs={crumbs} eyebrow={page.meta.eyebrow ?? "Legal"} title={page.meta.h1} lede={<p>{page.lede}</p>} updated={page.meta.updated} />
      <div className="container-page pb-24">
        <div className="max-w-3xl">
          <Markdown source={page.body} state={createLinkState(page.meta.path)} />
          <RelatedLinks
            title="Related"
            links={[
              { href: "/security", label: "Security & data handling" },
              { href: "/privacy", label: "Privacy policy" },
              { href: "/cookies", label: "Cookie policy" },
              { href: "/contact", label: "Contact Mise" },
            ].filter((l) => l.href !== page.meta.path)}
          />
        </div>
      </div>
      <FinalCta location={page.meta.path.slice(1)} title="Questions about how Mise handles data?" body="Ask us anything in a 15-minute demo, or see the platform running on a live demo property." />
    </>
  );
}
