import type { Metadata } from "next";
import Link from "next/link";
import LoopStrip from "@/components/page/LoopStrip";
import PageHero from "@/components/page/PageHero";
import { FaqList, FinalCta, JsonLd } from "@/components/ui/blocks";
import DeptPhoneRotator from "@/components/ui/DeptPhoneRotator";
import { Icon, type IconName } from "@/components/ui/Icon";
import { departments as deptScreens } from "@/content/departments";
import { departments, propertyTypes, solutionsHubMeta } from "@/content/solutions";
import type { Faq } from "@/content/types";
import { createLinkState } from "@/lib/links";
import { Markdown } from "@/lib/md";
import { baseNodes, breadcrumbNode, faqNode, itemListNode, softwareNode, webPageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(solutionsHubMeta);

/**
 * Solutions hub. Built to be seen, not read: every department is shown as
 * its own staff-app screen, the mechanism as the loop diagram, and rollout
 * as a three-step timeline. The detail lives on each solution page.
 */
const rollout = `
1. **Bring your existing standards:** Mise puts them straight into execution as timed tasks, with no passive classroom training.
2. **Proof as the work happens:** staff capture photo evidence on the floor; department heads sign off remotely.
3. **Audit-ready, property-wide:** every department writes to one searchable service record.
`;

const propertyIcons: Record<string, IconName> = { "hotel-chains": "building", "boutique-hotels": "spark" };

const deptIcons: Record<string, IconName> = {
  "front-office": "users",
  housekeeping: "grid",
  "food-and-beverage": "calendar",
  kitchen: "clock",
  engineering: "chip",
  "security-and-safety": "shield",
  "spa-and-wellness": "spark",
};

const faqs: Faq[] = [
  {
    q: "Which hotel departments can use Mise?",
    a: "Every department that runs repeatable standards: front office, housekeeping, F&B service, kitchen, engineering and maintenance, security and safety, spa and wellness, and guest relations. Each runs its own existing standards as timed tasks with photo evidence on the same platform.",
  },
  {
    q: "Do different departments need different software?",
    a: "No. Every department uses the same staff app, manager dashboard and standards workspace. Only the standards differ, so the general manager sees the whole property, and every department, in one service record.",
  },
  {
    q: "Which department should start first?",
    a: "The one where standards slip most. A pilot starts with one property and that department, and the service record fills with evidence from the first shifts. Other departments follow without a new tool or integration.",
  },
];

export default function SolutionsHub() {
  const meta = solutionsHubMeta;
  const crumbs = [{ name: "Solutions", path: meta.path }];
  const screenFor = (slug: string) => deptScreens.find((d) => d.id === slug);
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          softwareNode(),
          webPageNode({ path: meta.path, name: meta.title, description: meta.description, kind: "CollectionPage", updated: meta.updated }),
          breadcrumbNode(meta.path, crumbs),
          faqNode(meta.path, faqs),
          itemListNode(
            meta.path,
            "Service execution, by department and property",
            [...departments, ...propertyTypes].map((s) => ({ name: s.name, path: s.meta.path })),
          ),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={meta.eyebrow ?? "Solutions"}
        title={meta.h1}
        updated={meta.updated}
        lede={
          <p>
            One service execution platform for every department. Each team runs the standards it already has as timed
            tasks on staff phones, with photo proof, in one audit-ready service record.
          </p>
        }
      />

      <div className="container-page pb-20">
        <section aria-labelledby="by-department" className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <div>
            <h2 id="by-department" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
              Tailored solutions for every department
            </h2>
            <p className="mt-2 text-[1rem] text-muted">Same app, same record. Only the standard changes.</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {departments.map((s, i) => {
                const screen = screenFor(s.slug);
                return (
                  <li key={s.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
                    <Link
                      href={s.meta.path}
                      className="dept-tile group flex h-full items-start gap-4 rounded-2xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-gold/60 sm:p-5"
                    >
                      <span className="dept-tile-icon relative grid size-11 flex-none place-items-center rounded-xl bg-gold-soft text-gold-ink">
                        <Icon name={deptIcons[s.slug] ?? "spark"} size={20} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[1.05rem] font-semibold text-ink">{s.name}</span>
                        {screen ? (
                          <span className="mt-0.5 block font-mono text-[0.66rem] tracking-[0.12em] text-gold-ink uppercase">
                            {screen.standardId} · {screen.task}
                          </span>
                        ) : null}
                        <span className="mt-1.5 block text-[0.9rem] leading-relaxed text-muted">{s.short}</span>
                      </span>
                      <Icon name="arrowRight" size={16} className="mt-1 flex-none text-gold-ink transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                );
              })}
              <li data-reveal style={{ ["--reveal-delay" as string]: `${departments.length * 60}ms` }}>
                <Link
                  href="/demo"
                  className="group flex h-full items-start gap-4 rounded-2xl bg-navy p-4 text-[#f2f4ee] transition-transform hover:-translate-y-0.5 sm:p-5"
                >
                  <span className="grid size-11 flex-none place-items-center rounded-xl bg-gold text-on-gold transition-transform duration-500 group-hover:rotate-90">
                    <Icon name="plus" size={20} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-[1.05rem] font-semibold">Your department?</span>
                    <span className="mt-1.5 block text-[0.9rem] leading-relaxed text-[#b9c7c3]">
                      Any repeatable standard runs the same way. <span className="text-[#e5b35a]">Book a 15-min demo</span>
                    </span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          {/* One phone, cycling through every department's Today screen. */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <DeptPhoneRotator label="Mise staff app Today screen, cycling through each department's next timed task" />
              <p className="mt-4 text-center font-mono text-[0.7rem] tracking-[0.12em] text-faint uppercase">One staff app · every department</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="by-property-type" className="mt-16">
          <h2 id="by-property-type" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
            By property type
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {propertyTypes.map((s, i) => (
              <li key={s.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <Link
                  href={s.meta.path}
                  className="group flex h-full items-center gap-5 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-gold/60"
                >
                  <span className="grid size-14 flex-none place-items-center rounded-2xl bg-gold-soft text-gold-ink transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                    <Icon name={propertyIcons[s.slug] ?? "building"} size={26} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-[1.15rem] font-semibold text-ink">{s.name}</span>
                    <span className="mt-1 block text-[0.92rem] leading-relaxed text-muted">{s.short}</span>
                  </span>
                  <Icon name="arrowRight" size={18} className="flex-none text-gold-ink transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <section aria-labelledby="one-loop">
            <h2 id="one-loop" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
              One mechanism, every department
            </h2>
            <LoopStrip />
          </section>
          <section aria-labelledby="rollout" className="prose-mise">
            <h2 id="rollout" className="!mt-0">
              SOP implementation across departments
            </h2>
            <Markdown source={rollout} state={createLinkState(meta.path)} className="" />
          </section>
        </div>

        <section aria-labelledby="hub-faq" className="mt-16 max-w-3xl">
          <h2 id="hub-faq" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
            Frequently asked questions
          </h2>
          <FaqList items={faqs} className="mt-6" />
        </section>
      </div>
      <FinalCta location="solutions" />
    </>
  );
}
