import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink, Container, cx } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { formatDate } from "@/lib/seo";
import { serializeGraph } from "@/lib/schema";

export function JsonLd({ nodes }: { nodes: Parameters<typeof serializeGraph>[0] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeGraph(nodes) }} />;
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[0.72rem] tracking-wide text-faint">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {i === all.length - 1 ? (
              <span aria-current="page" className="text-muted">
                {c.name}
              </span>
            ) : (
              <Link href={c.path} className="transition-colors hover:text-gold-ink">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Answer-first summary box. AI engines extract these nearly verbatim. */
export function TldrBox({ children, label = "TL;DR" }: { children: ReactNode; label?: string }) {
  return (
    <aside
      aria-label="Summary"
      className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gold-soft p-6 sm:p-7"
    >
      <p className="eyebrow">{label}</p>
      <div className="mt-3 text-[1.05rem] leading-relaxed text-ink">{children}</div>
    </aside>
  );
}

export function LastUpdated({ date }: { date: string }) {
  return (
    <p className="font-mono text-[0.72rem] tracking-wide text-faint">
      Last updated <time dateTime={date}>{formatDate(date)}</time>
    </p>
  );
}

/**
 * FAQ accordion on native <details>/<summary>: keyboard and screen-reader
 * accessible, crawlable, and zero JavaScript. `allowLms` exempts an item from
 * the copy lint (only the "Is Mise an LMS?" answer needs it).
 */
export function FaqList({
  items,
  className,
  headingLevel = 3,
  openFirst = true,
}: {
  items: { q: string; a: string; allowLms?: boolean }[];
  className?: string;
  headingLevel?: 2 | 3;
  openFirst?: boolean;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className={cx("divide-y divide-line border-y border-line", className)}>
      {items.map((item, i) => (
        <details
          key={item.q}
          name="faq"
          className="group py-1"
          {...(item.allowLms ? { "data-copy-lint": "allow" } : {})}
          {...(i === 0 && openFirst ? { open: true } : {})}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <H className="font-display text-[1.08rem] leading-snug font-medium text-ink sm:text-[1.15rem]">{item.q}</H>
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-gold-ink transition-transform duration-300 group-open:rotate-45"
            >
              <Icon name="plus" size={16} />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-[1rem] leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Full-bleed gold-on-navy closing CTA. */
export function FinalCta({
  title = "See it on a real shift. No feature tour.",
  body = "Fifteen minutes. Your SOP, as a timed task, on a live demo property.",
  location,
}: {
  title?: string;
  body?: string;
  location: string;
}) {
  return (
    <section aria-labelledby={`cta-${location}`} className="relative overflow-hidden bg-navy py-20 text-[#eef2fa] sm:py-28">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-40 [--line:rgb(238_242_250/0.06)]" />
      <div
        aria-hidden="true"
        className="absolute -top-1/2 left-1/2 size-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(212_169_79/0.28),transparent_60%)]"
      />
      <Container className="relative text-center">
        <p className="eyebrow justify-center !text-[#d4a94f]" data-reveal>
          Book a demo
        </p>
        <h2
          id={`cta-${location}`}
          data-reveal
          className="mx-auto mt-5 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] leading-[1.04] font-semibold text-[#eef2fa]"
        >
          {title}
        </h2>
        <p data-reveal className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-[#b4bdd3]">
          {body}
        </p>
        <div data-reveal className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/demo" size="lg" arrow trackLocation={`final-cta-${location}`}>
            Book a 15-min demo
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

/** Related / next-step links block used at the foot of long-form pages. */
export function RelatedLinks({ title = "Keep reading", links }: { title?: string; links: { href: string; label: string; note?: string }[] }) {
  return (
    <nav aria-label={title} className="mt-16">
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href} {...(l.href === "/compare/mise-vs-hotel-lms" ? { "data-copy-lint": "allow" } : {})}>
            <Link
              href={l.href}
              className="group flex h-full items-start justify-between gap-4 rounded-xl border border-line bg-surface/60 p-5 transition-colors hover:border-gold/50"
            >
              <span>
                <span className="block font-display text-[1.05rem] font-medium text-ink">{l.label}</span>
                {l.note ? <span className="mt-1 block text-[0.92rem] leading-snug text-muted">{l.note}</span> : null}
              </span>
              <Icon name="arrowRight" size={18} className="mt-1 shrink-0 text-gold-ink transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
