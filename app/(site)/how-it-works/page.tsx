import type { Metadata } from "next";
import LoopPhone from "@/components/home/LoopPhone";
import PageHero from "@/components/page/PageHero";
import { FaqList, FinalCta, JsonLd, RelatedLinks, TldrBox } from "@/components/ui/blocks";
import { PhoneFrame } from "@/components/ui/DeviceFrame";
import { Eyebrow } from "@/components/ui/primitives";
import { howItWorksFaqs, howItWorksMeta, loopSteps } from "@/content/platform";
import { createLinkState } from "@/lib/links";
import { Markdown } from "@/lib/md";
import { baseNodes, breadcrumbNode, faqNode, howToNode, softwareNode, webPageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(howItWorksMeta);

const deepDive = `
## What does a timed task look like for hotel staff?

A timed task is the hotel standard, delivered as the work itself. The attendant opens the staff app and sees the next task first: Room 208, guest-ready reset, release by 09:05, with a countdown against the target time. The steps are on screen in order, grouped into Prepare, Perform, Verify and Release, each with a reference photo where it helps. There is nothing to read first and nothing to remember.

Because every task has a target time, the standard becomes plannable and measurable. Tasks that always run late point to an unrealistic target or a method that needs work; the manager dashboard shows both.

## How the hotel photo evidence app works

The photo gate is what makes Mise a hotel photo evidence app rather than a checklist. The standards owner decides which steps need proof. On the staff app those steps stay locked until a photo is taken from inside the task. The photo is stored against the room, the person, the step, the time and the version of the standard. Evidence exists for every gated step by design, not by goodwill.

Gate the steps a guest or auditor would check: bathroom finish, bed presentation, amenity setup, a temperature reading. Gating everything slows the work and dilutes the record.

## How the hotel supervisor sign-off app works

Supervisors work from the manager dashboard. Completed tasks arrive with their evidence attached, so most can be reviewed and signed off without walking to the room. Blocked rooms, late tasks and missing photos surface first. When an in-person inspection is needed, the sign-off is recorded against the same task. Either way, sign-off is one action with a name and a time, and it becomes part of the service record.

## How a one-property pilot works {#pilot}

1. **Demo (15 minutes).** See the three interfaces on the demo property, and watch one of your SOPs become a timed task.
2. **Scope (one call).** Choose one property and one department, usually housekeeping, and the five to ten standards that matter most.
3. **Set up (days, not months).** We convert those standards into timed tasks with your standards owner. Staff open the app in their phone's browser. No PMS integration, no hardware.
4. **Run (real shifts).** Your team runs the standards on real shifts. The service record fills with evidence from the first day.
5. **Review.** Together we read the record: what ran to standard, where time or evidence slipped, and what to extend next.

Pricing follows the scope we agree for your property; we do not publish a rate card.
`;

export default function HowItWorksPage() {
  const crumbs = [{ name: "How it works", path: howItWorksMeta.path }];
  const state = createLinkState(howItWorksMeta.path);
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          softwareNode(),
          webPageNode({ path: howItWorksMeta.path, name: howItWorksMeta.title, description: howItWorksMeta.description, updated: howItWorksMeta.updated }),
          breadcrumbNode(howItWorksMeta.path, crumbs),
          howToNode(
            howItWorksMeta.path,
            "How Mise turns a hotel SOP into an audit-ready service record",
            "The four moves of the Mise loop: Standard, Timed task, Evidence, Service record.",
            loopSteps.map((s) => ({ name: s.name, text: s.detail })),
          ),
          faqNode(howItWorksMeta.path, howItWorksFaqs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={howItWorksMeta.eyebrow}
        title={howItWorksMeta.h1}
        updated={howItWorksMeta.updated}
        lede={
          <p>
            Mise is hotel SOP management software built around one loop: <strong className="text-ink">Standard → Timed task → Evidence → Service record</strong>.
            A standard is written once, runs as a timed task on the right person's phone, captures photo and supervisor
            evidence as the work happens, and writes an audit-ready entry every time a task closes.
          </p>
        }
      />
      <div className="container-page">
        <div className="max-w-3xl">
          <TldrBox>
            Standards owners write each SOP as steps with a target time and photo gates. It arrives on staff phones as a
            timed task with a countdown. Gated steps cannot close without a photo; supervisors sign off from the evidence.
            Every closed task writes a timestamped, attributable row to the service record.
          </TldrBox>
        </div>
      </div>

      <section aria-labelledby="loop-steps" className="py-16 sm:py-20">
        <div className="container-page">
          <h2 id="loop-steps" className="max-w-3xl text-[clamp(1.8rem,3.6vw,2.7rem)] leading-[1.08] font-semibold text-ink">
            The four moves, step by step
          </h2>
          <ol className="mt-12 space-y-16">
            {loopSteps.map((s, i) => (
              <li key={s.id} id={`step-${i + 1}`} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
                <div className="max-w-xl">
                  <Eyebrow>
                    {s.n} · {s.who}
                  </Eyebrow>
                  <h3 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-tight font-semibold text-ink">{s.name}</h3>
                  <p className="mt-2 text-[1.1rem] text-gold-ink">{s.line}</p>
                  <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{s.detail}</p>
                </div>
                <div className="flex h-[480px] justify-center overflow-hidden">
                  <PhoneFrame className="origin-top scale-[0.9]">
                    <LoopPhone step={i} />
                  </PhoneFrame>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="container-page pb-20">
        <div className="max-w-3xl">
          <Markdown source={deepDive} state={state} />
          <section aria-labelledby="hiw-faq" className="mt-16">
            <h2 id="hiw-faq" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
              Hotel SOP management software: frequently asked questions
            </h2>
            <FaqList items={howItWorksFaqs} className="mt-6" />
          </section>
          <RelatedLinks
            links={[
              { href: "/platform", label: "The platform", note: "Three interfaces, one record." },
              { href: "/digital-sop", label: "Digitize hotel SOPs", note: "Write standards that run." },
              { href: "/audit-readiness", label: "Hotel audit readiness", note: "What the record is for." },
              { href: "/problems/supervisor-bottleneck", label: "The supervisor bottleneck", note: "What photo evidence fixes." },
            ]}
          />
        </div>
      </div>
      <FinalCta location="how-it-works" />
    </>
  );
}
