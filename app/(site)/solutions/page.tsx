import type { Metadata } from "next";
import HubPage from "@/components/page/HubPage";
import { solutions, solutionsHubMeta } from "@/content/solutions";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(solutionsHubMeta);

const body = `
## One mechanism, every department

Every department in a hotel runs repeatable standards: a room reset, an arrival, an outlet opening, a banquet setup. Mise runs all of them the same way. The standard becomes a [timed task](/glossary/timed-task) on the phone of the person doing the work, key steps need a photo, supervisors sign off in the task, and every completion writes to the property's service record.

What changes between departments is the content of the standards, not the mechanism. That is why a pilot can start in housekeeping and extend to front office or food and beverage without a new tool or a new integration.

## Which department should start first?

Housekeeping, in most properties. Room readiness is high-volume, time-bound and easy to evidence with a photo, so the service record fills quickly and the effect on the supervisor bottleneck is visible within the first weeks. Groups and boutique properties then extend by department and by property.
`;

export default function SolutionsHub() {
  return (
    <HubPage
      meta={solutionsHubMeta}
      lede="Mise is hotel SOP software that works the same way in every department and at every scale: standards become timed tasks, key steps need photo evidence, and each shift builds an audit-ready service record. Choose a department or property type to see how it applies."
      tldr="Mise runs housekeeping, front office and food and beverage standards as timed tasks with photo evidence and supervisor sign-off, for single boutique properties and multi-property hotel groups alike. No PMS integration or hardware is required, and pilots usually start in housekeeping at one property."
      cardsTitle="Solutions by department and property type"
      cards={solutions.map((s) => ({ href: s.meta.path, eyebrow: s.name, title: s.meta.h1, body: s.short }))}
      body={body}
    />
  );
}
