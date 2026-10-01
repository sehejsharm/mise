import { faqs } from "@/content/faq";
import { glossary } from "@/content/glossary";
import { pains } from "@/content/pains";
import { auditReadiness, digitalSop } from "@/content/pillars";
import { absoluteUrl, brand } from "@/content/site";
import { departments, solutions } from "@/content/solutions";
import type { Longform } from "@/content/types";
import { toPlainText } from "@/lib/md";

export const dynamic = "force-static";

function section(page: Longform, extra = "") {
  return `\n\n==================================================
# ${page.meta.h1}
URL: ${absoluteUrl(page.meta.path)}
Last updated: ${page.meta.updated}

${page.lede}

TL;DR: ${page.tldr}
${extra}
${toPlainText(page.body)}

## FAQ
${page.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`;
}

export function GET() {
  let out = `# ${brand.name}: full text for language models

${brand.definition}

Mise (misehotel.com) is a hotel service execution platform built by Focus Realm (focusrealm.org), founded by Sehej Sharma, Ali Electricwala and Aditya Mishra. It is not affiliated with Focus Softnet or its Focus e-RMS hospitality ERP. It is not a PMS and not an LMS. "Mise" refers to the culinary principle mise en place.`;

  out += `\n\n## Departments covered\n\nMise is the SOP app for every hotel department:\n\n${departments.map((d) => `- ${d.name}: ${d.short}`).join("\n")}\n- Guest relations: guest promises, recovery and VIP touches run as timed tasks with evidence.`;
  out += section(digitalSop);
  out += section(auditReadiness);
  for (const p of pains) {
    out += section(
      p,
      `
Status quo: ${p.statusQuo}
Impact chain: ${p.impactChain.join(" → ")}
The wound: ${p.woundLong}
How Mise closes it: ${p.closes.map((c) => `${c.title}. ${c.body}`).join(" ")}
`,
    );
  }
  for (const s of solutions) out += section(s);
  out += `\n\n==================================================\n# Mise FAQ\nURL: ${absoluteUrl("/faq")}\n\n${faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}`;
  out += `\n\n==================================================\n# Glossary\nURL: ${absoluteUrl("/glossary")}\n\n${glossary.map((t) => `${t.term}: ${t.short}`).join("\n\n")}\n`;
  return new Response(out, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
