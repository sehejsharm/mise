import type { Metadata } from "next";
import PageHero from "@/components/page/PageHero";
import RoiCalculator from "@/components/roi/RoiCalculator";
import { FaqList, FinalCta, JsonLd, RelatedLinks, TldrBox } from "@/components/ui/blocks";
import { createLinkState } from "@/lib/links";
import { Markdown } from "@/lib/md";
import { baseNodes, breadcrumbNode, faqNode, softwareNode, webPageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { roiMeta } from "@/content/meta";

const meta = roiMeta;

export const metadata: Metadata = buildMetadata(meta);

const method = `
## How this hotel operations ROI estimate works

The calculator adds up three annual cost pools that service execution touches, using only numbers you enter:

1. **Staff turnover:** staff × turnover rate × your cost to replace one person.
2. **Supervisor verification:** supervisors × minutes a day spent checking work in person × 365 × hourly cost.
3. **Audit preparation:** audits a year × people preparing × days each × cost per person-day.

The scenario slider then applies a share that **you** choose. We do not publish a reduction figure because we have not measured one across enough properties to state it honestly. A one-property pilot measures the real effect from your own service record.

## Where to find your turnover and replacement-cost figures

The most reliable inputs are your own HR records. If you want to benchmark them, published research is a better guide than rules of thumb:

- Hinkin and Tracey's study of what turnover costs hotels, in the Cornell Hotel and Restaurant Administration Quarterly: [The Cost of Turnover: Putting a Price on the Learning Curve](https://ecommons.cornell.edu/items/6f9519be-fef3-4707-b66c-b7422e38761c).
- For the United States, the Bureau of Labor Statistics publishes monthly quits rates by industry, including accommodation and food services, in its [JOLTS quits table](https://www.bls.gov/news.release/jolts.t04.htm).

Neither is a figure for your property, and neither is presented here as one. They are starting points for your own assumption.
`;

const faqs = [
  {
    q: "How do I calculate the cost of hotel staff turnover?",
    a: "Multiply your headcount by your annual turnover rate to get leavers, then multiply by your full cost to replace one person: recruitment, onboarding time, supervisor time and lost productivity while a new joiner gets up to standard. Use your own HR figures for both inputs.",
  },
  {
    q: "Does Mise guarantee a return on investment?",
    a: "No. The calculator sizes cost pools on your assumptions. Mise does not claim a specific reduction. A one-property pilot measures the effect on supervisor time, consistency and audit preparation from your own service record.",
  },
];

export default function RoiPage() {
  const crumbs = [{ name: "ROI calculator", path: meta.path }];
  return (
    <>
      <JsonLd
        nodes={[
          ...baseNodes(),
          softwareNode(),
          webPageNode({ path: meta.path, name: meta.title, description: meta.description, updated: meta.updated }),
          breadcrumbNode(meta.path, crumbs),
          faqNode(meta.path, faqs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={meta.eyebrow ?? ""}
        title={meta.h1}
        updated={meta.updated}
        lede={
          <p>
            Size the hotel operations ROI of better service execution with your own numbers. Every input below is an
            editable assumption, including the cost of hotel staff turnover. Nothing is a borrowed industry statistic.
          </p>
        }
      />
      <div className="container-page pb-20">
        <div className="mb-10 max-w-3xl">
          <TldrBox>
            Enter your properties, staff, turnover, supervisor time and audit preparation. The calculator shows the annual
            cost pools those create, and a scenario value at a recovery share you choose. It is a sizing tool, not a promise.
          </TldrBox>
        </div>
        <RoiCalculator />
        <div className="mt-16 max-w-3xl">
          <Markdown source={method} state={createLinkState(meta.path)} />
          <section aria-labelledby="roi-faq" className="mt-14">
            <h2 id="roi-faq" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
              Frequently asked questions
            </h2>
            <FaqList items={faqs} className="mt-6" />
          </section>
          <RelatedLinks
            links={[
              { href: "/problems/attrition-bleed", label: "The attrition bleed", note: "What turnover really takes." },
              { href: "/problems/supervisor-bottleneck", label: "The supervisor bottleneck", note: "Where verification time goes." },
              { href: "/audit-readiness", label: "Hotel audit readiness", note: "Audit prep as a filter." },
              { href: "/how-it-works#pilot", label: "How a pilot measures it", note: "One property, real shifts." },
            ]}
          />
        </div>
      </div>
      <FinalCta location="roi" />
    </>
  );
}
