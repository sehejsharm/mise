import type { ReactNode } from "react";
import { Breadcrumbs, LastUpdated } from "@/components/ui/blocks";
import { Eyebrow } from "@/components/ui/primitives";

/**
 * Inner-page hero. The H1 is the LCP element on most pages, so nothing here
 * starts hidden: the entrance is a transform-only CSS animation.
 */
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  lede,
  updated,
  children,
  aside,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  updated?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_0%,#000_10%,transparent_65%)]" />
        <div
          className="absolute -top-56 left-1/4 size-[640px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, rgb(229 179 90 / 0.2), transparent 60%)" }}
        />
      </div>
      <div className={`container-page relative ${aside ? "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
        <div className="max-w-3xl">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-5 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.03] font-semibold tracking-[-0.035em] text-ink">
            {title}
          </h1>
          {lede ? <div className="mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-muted">{lede}</div> : null}
          {updated ? (
            <div className="mt-6">
              <LastUpdated date={updated} />
            </div>
          ) : null}
          {children}
        </div>
        {aside ? <div className="relative">{aside}</div> : null}
      </div>
    </section>
  );
}
