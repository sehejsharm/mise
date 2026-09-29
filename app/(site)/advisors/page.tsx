import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import { FinalCta, JsonLd, RelatedLinks } from "@/components/ui/blocks";
import { Picture } from "@/components/ui/Picture";
import { getAdvisors } from "@/lib/advisors";
import { advisorNode, baseNodes, breadcrumbNode, webPageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { advisorsMeta } from "@/content/meta";

const meta = advisorsMeta;

export const metadata: Metadata = buildMetadata(meta);

export default function AdvisorsPage() {
  const advisors = getAdvisors();
  const crumbs = [
    { name: "About", path: "/about" },
    { name: "Advisory board", path: "/advisors" },
  ];
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          webPageNode({ path: meta.path, name: meta.title, description: meta.description, updated: meta.updated }),
          breadcrumbNode(meta.path, crumbs),
          ...advisors.map(advisorNode),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={meta.eyebrow ?? ""}
        title={meta.h1}
        lede={<p>Mise is advised by hospitality practitioners working in service standards and guest presentation. They help keep the platform grounded in how hotel teams actually work.</p>}
      />
      <div className="container-page pb-20">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advisors.map((a) => (
            <li key={a.slug} id={a.slug} className="scroll-mt-28 overflow-hidden rounded-2xl border border-line bg-surface/60">
              {a.photo ? (
                <div className="aspect-[4/5] overflow-hidden">
                  <Picture image={a.photo} alt={`${a.name}, Mise advisory board`} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw" className="block h-full" imgClassName="h-full object-cover" />
                </div>
              ) : null}
              <div className="p-6">
                <h2 className="font-display text-[1.35rem] font-semibold text-ink">{a.name}</h2>
                {a.title ? <p className="mt-1 text-[0.95rem] text-muted">{a.title}</p> : null}
                {a.credentials.length ? (
                  <ul className="mt-4 space-y-1 text-[0.9rem] text-muted">
                    {a.credentials.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                ) : null}
                {a.bio ? <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{a.bio}</p> : null}
                {a.linkedin ? (
                  <a href={a.linkedin} rel="noopener" target="_blank" className="mt-4 inline-block text-[0.9rem] text-ink underline decoration-gold/60 underline-offset-4">
                    {a.name} on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
        <div className="max-w-3xl">
          <RelatedLinks
            links={[
              { href: "/about", label: "About Mise", note: "The story and the principles." },
              { href: "/about#founders", label: "The founders", note: "Sehej, Ali and Aditya." },
              { href: "/problems", label: "The six hotel operations problems", note: "What we are solving." },
              { href: "/platform", label: "The platform", note: "Three interfaces, one record." },
            ]}
          />
        </div>
      </div>
      <FinalCta location="advisors" />
    </>
  );
}
