import type { Metadata } from "next";
import HubPage from "@/components/page/HubPage";
import { compareHubMeta, comparisons } from "@/content/compare";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(compareHubMeta);

const body = `
## The one question that separates them

Every tool a hotel uses for standards records something. The useful question is what it records. A document system records that a standard exists. A chat group records that a message was sent. A spreadsheet records what someone typed later. A checklist records a tick. Mise records that the standard ran: which room, which person, how long, with what evidence and whose sign-off.

That record is what supervisors need to stop walking every corridor, what managers need to see performance fairly, and what auditors ask to see. It is the reason Mise describes itself as a [service execution platform](/glossary/service-execution-platform).
`;

export default function CompareHub() {
  return (
    <HubPage
      meta={compareHubMeta}
      lede="Hotels compare Mise with the tools they already use for standards and shifts: training systems, spreadsheets, WhatsApp groups and checklist apps. Each comparison below is answer-first and specific about what each tool actually records."
      tldr="Training systems record attendance and completion; spreadsheets record what someone typed later; WhatsApp records messages; checklist apps record ticks. Mise records execution: SOPs run as timed tasks, key steps need photo evidence, and each shift builds an audit-ready service record."
      cardsTitle="Comparisons"
      cards={comparisons.map((c) => ({
        href: c.meta.path,
        eyebrow: c.versus,
        title: c.name,
        body: c.short,
        allowLms: c.slug === "mise-vs-hotel-lms",
      }))}
      body={body}
    />
  );
}
