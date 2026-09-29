import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, FinalCta, JsonLd } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import { Picture } from "@/components/ui/Picture";
import { Eyebrow } from "@/components/ui/primitives";
import { founderBySlug, founders } from "@/content/site";
import { baseNodes, breadcrumbNode, founderNode, ids, imageUrl, webPageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { founderMeta } from "@/content/meta";

export const dynamicParams = false;

const metaFor = founderMeta;

export function generateStaticParams() {
  return founders.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const meta = metaFor((await params).slug);
  if (!meta) return {};
  return buildMetadata({ ...meta, title: meta.title.length <= 60 ? meta.title : `${meta.h1} | Mise` });
}

export default async function FounderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = founderBySlug(slug);
  const meta = metaFor(slug);
  if (!f || !meta) notFound();
  const crumbs = [
    { name: "About", path: "/about" },
    { name: f.name, path: meta.path },
  ];
  const others = founders.filter((o) => o.slug !== f.slug);
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          {
            ...(webPageNode({ path: meta.path, name: meta.title, description: meta.description, kind: "ProfilePage", updated: meta.updated, primaryImage: imageUrl(f.photo) }) as object),
            mainEntity: { "@id": ids.person(f.slug) },
          },
          breadcrumbNode(meta.path, crumbs),
          founderNode(f),
        ]}
      />
      <section className="relative pt-28 pb-16 sm:pt-36">
        <div className="container-page">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
            <div className="overflow-hidden rounded-2xl border border-line">
              <Picture image={f.photo} alt={`${f.name}, ${f.role} of Mise`} sizes="(min-width: 1024px) 360px, 92vw" priority />
            </div>
            <div className="max-w-2xl">
              <Eyebrow>{f.jobTitle}</Eyebrow>
              <h1 className="mt-4 text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-ink">{f.name}</h1>
              <p className="mt-3 text-[1.05rem] text-muted">{f.role}, Mise · a Focus Realm company</p>
              {/* TODO(review): thesis line written for the site; founder to approve. */}
              <blockquote className="mt-8 border-l-2 border-gold pl-5 font-display text-[clamp(1.3rem,2.4vw,1.7rem)] leading-snug text-ink">
                “{f.thesis}”
              </blockquote>
              <div className="prose-mise mt-8">
                {f.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <h2 className="mt-10 font-mono text-[0.76rem] tracking-[0.16em] text-faint uppercase">Focus</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {f.focus.map((x) => (
                  <li key={x} className="rounded-full border border-line-strong px-3 py-1.5 text-[0.88rem] text-ink">
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={f.linkedin}
                  rel="me noopener"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-[0.92rem] text-ink hover:border-gold"
                >
                  <Icon name="linkedin" size={16} /> {f.name} on LinkedIn
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
              <nav aria-label="Keep exploring" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
                <Link href="/about" className="text-ink underline decoration-gold/60 underline-offset-4 hover:text-gold-ink">
                  The story behind Mise
                </Link>
                <Link href="/platform" className="text-ink underline decoration-gold/60 underline-offset-4 hover:text-gold-ink">
                  The Mise platform
                </Link>
                <Link href="/problems" className="text-ink underline decoration-gold/60 underline-offset-4 hover:text-gold-ink">
                  The six hotel operations problems
                </Link>
                {others.map((o) => (
                  <Link key={o.slug} href={`/team/${o.slug}`} className="text-ink underline decoration-gold/60 underline-offset-4 hover:text-gold-ink">
                    {o.name}, {o.role}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </section>
      <FinalCta location={`team-${f.slug}`} />
    </>
  );
}
