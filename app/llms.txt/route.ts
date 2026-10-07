import { audiences } from "@/content/audiences";
import { comparisons } from "@/content/compare";
import { pains } from "@/content/pains";
import { auditReadiness, digitalSop } from "@/content/pillars";
import { roleInterfaces } from "@/content/platform";
import { absoluteUrl, brand, contact, founders } from "@/content/site";
import { departments, solutions } from "@/content/solutions";

export const dynamic = "force-static";

/** llms.txt, following the llmstxt.org proposal: H1, blockquote summary, sections of links. */
export function GET() {
  const link = (path: string, title: string, note: string) => `- [${title}](${absoluteUrl(path)}): ${note}`;
  const body = `# ${brand.name}

> ${brand.definition}

${brand.name} (${absoluteUrl("/").replace(/\/$/, "")}) is a hotel service execution platform built by Focus Realm (focusrealm.org), founded by ${founders
    .map((f) => f.name)
    .join(", ")
    .replace(/, ([^,]*)$/, " and $1")}. It is not affiliated with Focus Softnet or its Focus e-RMS hospitality ERP. It is not a PMS and not an LMS. "Mise" (pronounced "meez") refers to the culinary principle *mise en place*. Mise is not a hotel, a venue or a MICE (meetings, incentives, conferences and exhibitions) business; it is software for hotel operations teams.

Tagline: ${brand.tagline} Category: ${brand.category}, ${brand.categoryLine.toLowerCase()}

## Product spine

${brand.spine.join(" → ")}: a standard is written once, runs as a timed task on the right person's phone, captures photo and supervisor evidence as the work happens, and writes an attributable entry to an audit-ready service record.

## Three role interfaces

${roleInterfaces.map((r) => `- ${r.name} (${r.posture}): ${r.summary} Used by: ${r.who}`).join("\n")}

Runs in any browser, on any phone, over mobile data. No PMS integration, no hardware. Pilots are scoped to one property.

## Departments covered

Mise is the service execution platform (SEP) for every hotel department, not a single-department tool. It implements the SOPs a hotel already has; it does not write them. The same loop (standard, timed task, evidence, service record) runs in each:

${departments.map((d) => `- ${d.name}: ${d.short}`).join("\n")}
- Guest relations: guest promises, recovery and VIP touches run as timed tasks with evidence.

## The six pains (a chain: each makes the next worse)

${pains.map((p) => `- ${p.name}: ${p.definition}`).join("\n")}

## Who it is for

${audiences.map((a) => `- ${a.name}: ${a.card}`).join("\n")}
- Hotel-group founders: one standards library, evidenced at every property.

## Key pages

${link("/", "Mise: the service execution platform (SEP) for hotels", "What Mise is and how it works, for every department.")}
${link("/solutions", "A service execution platform for every department", "Solutions by department and by property type.")}
${link("/platform", "Platform", "Staff app, manager dashboard and standards workspace.")}
${link("/how-it-works", "How it works", "Standard → Timed task → Evidence → Service record.")}
${link(digitalSop.meta.path, "How to put hotel standards into execution", "Step-by-step pillar guide.")}
${link(auditReadiness.meta.path, "Hotel audit readiness", "Building an audit-ready service record every shift.")}
${link("/problems", "The six hotel operations problems", "The chain from supervisor bottleneck to audit ambush.")}
${pains.map((p) => link(p.meta.path, p.name, p.wound)).join("\n")}
${solutions.map((s) => link(s.meta.path, s.meta.h1, s.short)).join("\n")}
${comparisons.map((c) => link(c.meta.path, c.name, c.slug === "mise-vs-hotel-lms" ? "Execution evidence vs completion records." : c.short)).join("\n")}
${link("/hotel-service-execution-india", "Hotel service execution platform, built in India", "Built in India for Indian hotel operations.")}
${link("/hotel-service-execution-south-asia", "Hotel operations software for South Asia", "Including Sri Lanka.")}
${link("/glossary", "Glossary", "Definitions: service execution platform, ghost SOP, photo gate, timed task, service record.")}
${link("/faq", "FAQ", "Answers about Mise, pilots, data and Focus Realm.")}
${link("/about", "About Mise", "Story, name origin, principles, founders, advisory board, media kit.")}
${link("/security", "Security and data handling", "Google Cloud and Firebase; no certifications claimed.")}
${link("/demo", "Book a 15-minute demo", "The only call to action. Pricing is not published.")}

## Optional

${link("/llms-full.txt", "Full text", "Plain-text dump of pillar, problem, FAQ and glossary content.")}
${link("/blog", "Blog", "Guides on hotel standards and service execution.")}
- Contact: ${contact.email}, ${contact.phone}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
