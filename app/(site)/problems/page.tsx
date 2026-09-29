import type { Metadata } from "next";
import HubPage from "@/components/page/HubPage";
import { pains, problemsHubMeta } from "@/content/pains";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(problemsHubMeta);

const body = `
## Why hotel operations problems compound

Most hotel operations problems are treated one at a time: a new inspection sheet for the supervisor, a refresher session for the ghost SOP, a recruitment drive for turnover, an audit-prep project for the audit. Each fix is reasonable. None of them lasts, because the problems are linked. Each one makes the next worse.

The chain starts with **hotel supervisor workload**. When verification means walking to every room, supervisors cannot check everything, so the written standard quietly stops being the one that runs, and **hotel SOPs are not followed**. Without a record of execution, **hotel performance tracking** falls back on impressions. When experienced people leave, the undocumented practice leaves with them. Variance between shifts caps guest ratings. And when the audit arrives, the evidence that was never kept has to be rebuilt by hand.

## What breaks the chain?

The chain breaks when the standard runs inside the work and the work records itself. That is what a [service execution platform](/glossary/service-execution-platform) does: each SOP becomes a timed task on the phone of the person doing the job, key steps require photo evidence, and every completion writes to an audit-ready service record. One mechanism addresses all six links, which is why Mise is built around it rather than around six separate features.

| Pain | What it looks like | What closes it |
|---|---|---|
| Supervisor Bottleneck | Every check waits on one person | Photo evidence reviewed remotely; exceptions first |
| Ghost SOP | Standards on paper, not on the floor | The SOP runs as the timed task |
| Invisible Performance Gap | Performance judged by anecdote | Every task records time, steps and evidence |
| Attrition Bleed | Quality resets with each departure | The standard lives in the operation |
| Star Rating Ceiling | Variance caps ratings | Same standard, every room, every shift |
| Audit Ambush | Evidence rebuilt before audits | The record is written as work happens |
`;

const faqs = [
  {
    q: "What are the most common hotel operations problems?",
    a: "Six recur in almost every property: the supervisor bottleneck, ghost SOPs that are not followed, an invisible performance gap, the attrition bleed that follows staff turnover, a star rating ceiling caused by inconsistency, and the audit ambush when evidence has to be rebuilt.",
  },
  {
    q: "Why do hotel operations problems keep coming back?",
    a: "Because they are linked. Fixing one in isolation leaves the cause in place: standards live beside the work instead of inside it, and the work leaves no record. Each problem then feeds the next, so the chain reforms around any single fix.",
  },
  {
    q: "How does Mise address all six at once?",
    a: "Mise turns each SOP into a timed task on staff phones, gates key steps on photo evidence, and writes every completion to an audit-ready service record. That single loop removes verification from the corridor, makes standards run, records performance, and keeps evidence ready for audits.",
  },
];

export default function ProblemsHub() {
  return (
    <HubPage
      meta={problemsHubMeta}
      lede="Hotel operations problems rarely arrive alone. Six of them form a chain, and each makes the next one worse: from the supervisor who cannot check every room, to the audit that finds what was never recorded. This page maps the chain and links to a full guide for each problem."
      tldr="Six hotel operations problems compound in order: Supervisor Bottleneck → Ghost SOP → Invisible Performance Gap → Attrition Bleed → Star Rating Ceiling → Audit Ambush. They share one cause: standards live beside the work and the work leaves no record. Mise closes the chain by running each SOP as a timed task that records its own evidence."
      cardsTitle="The six pains, in chain order"
      cards={pains.map((p) => ({ href: `/problems/${p.slug}`, eyebrow: `Pain ${p.index}`, title: p.name, body: p.definition }))}
      body={body}
      faqs={faqs}
    />
  );
}
