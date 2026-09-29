import Link from "next/link";
import type { ReactNode } from "react";
import PageHero from "@/components/page/PageHero";
import { FaqList, FinalCta, JsonLd, TldrBox } from "@/components/ui/blocks";
import { Icon } from "@/components/ui/Icon";
import type { Faq } from "@/content/types";
import { createLinkState } from "@/lib/links";
import { Markdown } from "@/lib/md";
import { baseNodes, breadcrumbNode, faqNode, softwareNode, webPageNode } from "@/lib/schema";
import type { PageMeta } from "@/lib/seo";

export type HubCard = { href: string; title: string; eyebrow?: string; body: string; allowLms?: boolean };

/** Hub template: hero, TL;DR, a card grid of child pages, answer-first body, FAQ. */
export default function HubPage({
  meta,
  lede,
  tldr,
  cards,
  cardsTitle,
  body,
  faqs = [],
  children,
}: {
  meta: PageMeta;
  lede: string;
  tldr: string;
  cards: HubCard[];
  cardsTitle: string;
  body?: string;
  faqs?: Faq[];
  children?: ReactNode;
}) {
  const crumbs = [{ name: meta.eyebrow ?? meta.h1, path: meta.path }];
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          softwareNode(),
          webPageNode({ path: meta.path, name: meta.title, description: meta.description, kind: "CollectionPage", updated: meta.updated }),
          breadcrumbNode(meta.path, crumbs),
          faqs.length ? faqNode(meta.path, faqs) : undefined,
        ]}
      />
      <PageHero crumbs={crumbs} eyebrow={meta.eyebrow ?? ""} title={meta.h1} lede={<p>{lede}</p>} updated={meta.updated} />
      <div className="container-page pb-20">
        <div className="max-w-3xl">
          <TldrBox>{tldr}</TldrBox>
        </div>
        <section aria-labelledby="hub-cards" className="mt-14">
          <h2 id="hub-cards" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
            {cardsTitle}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, i) => (
              <li key={c.href} data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }} {...(c.allowLms ? { "data-copy-lint": "allow" } : {})}>
                <Link
                  href={c.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-colors hover:border-gold/50"
                >
                  {c.eyebrow ? <p className="font-mono text-[0.72rem] tracking-[0.14em] text-gold-ink uppercase">{c.eyebrow}</p> : null}
                  <h3 className="mt-2 font-display text-[1.2rem] leading-snug font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{c.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-gold-ink">
                    Read more <span className="sr-only">about {c.title}</span>
                    <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        {children}
        {body ? (
          <div className="mt-16 max-w-3xl">
            <Markdown source={body} state={createLinkState(meta.path)} />
          </div>
        ) : null}
        {faqs.length ? (
          <section aria-labelledby="hub-faq" className="mt-16 max-w-3xl">
            <h2 id="hub-faq" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
              Frequently asked questions
            </h2>
            <FaqList items={faqs} className="mt-6" />
          </section>
        ) : null}
      </div>
      <FinalCta location={meta.path.slice(1) || "hub"} />
    </>
  );
}
