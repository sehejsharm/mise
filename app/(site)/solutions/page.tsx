import type { Metadata } from "next";
import HubPage from "@/components/page/HubPage";
import type { Faq } from "@/content/types";
import { departments, propertyTypes, solutionsHubMeta } from "@/content/solutions";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(solutionsHubMeta);

const body = `
## One hotel SOP app, one mechanism for every department

Every department in a hotel runs repeatable standards: an arrival, a room reset, a breakfast close, a cold-chain check, a fault response, a fire-exit round, a treatment room turnover. Mise runs all of them the same way. The standard becomes a [timed task](/glossary/timed-task) on the phone of the person doing the work, key steps need a photo, supervisors sign off in the task, and every completion writes to the property's [service record](/glossary/service-record).

What changes between departments is the content of the standards, not the mechanism. That is why a property can start in one department and extend to the rest without a new tool, a new integration or a new habit for managers.

## Which department should start first?

The one where standards slip most. For some properties that is front office arrivals; for others it is housekeeping, the breakfast service, kitchen logs or engineering response times. A pilot starts with one property and that department, and the service record fills with evidence from the first shifts.
`;

const faqs: Faq[] = [
  {
    q: "Which hotel departments can use Mise?",
    a: "Every department that runs repeatable standards: front office, housekeeping, F&B service, kitchen, engineering and maintenance, security and safety, spa and wellness, and guest relations. Each runs its own SOPs as timed tasks with photo evidence in the same app.",
  },
  {
    q: "Is Mise a housekeeping app?",
    a: "No. Mise is the SOP app for hotels as a whole. Housekeeping is one of the departments it runs, alongside front office, F&B service, kitchen, engineering, security and spa, all on the same standards library, staff app and service record.",
  },
  {
    q: "Do different departments need different software?",
    a: "No. Every department uses the same staff app, manager dashboard and standards workspace. Only the standards differ, so the general manager sees the whole property, and every department, in one service record.",
  },
];

export default function SolutionsHub() {
  const card = (s: (typeof departments)[number]) => ({ href: s.meta.path, eyebrow: s.name, title: s.meta.h1, body: s.short });
  const deptCards = departments.map(card);
  const typeCards = propertyTypes.map(card);
  return (
    <HubPage
      meta={solutionsHubMeta}
      lede="Mise is the hotel SOP app for every department. Front office, housekeeping, F&B service, kitchen, engineering, security and spa all run their standards the same way: as timed tasks on staff phones, with photo and supervisor evidence, building one audit-ready service record for the whole property."
      tldr="Mise turns every department's SOPs into timed tasks on staff phones, captures photo and supervisor evidence as the work happens, and builds one audit-ready service record. It works for single boutique properties and multi-property groups, needs no PMS integration, and a pilot starts with the department where standards slip most."
      cardsTitle="Hotel SOP app solutions"
      cards={[...deptCards, ...typeCards]}
      groups={[
        { id: "by-department", title: "By department", cards: deptCards },
        { id: "by-property-type", title: "By property type", cards: typeCards },
      ]}
      itemList
      body={body}
      faqs={faqs}
    />
  );
}
