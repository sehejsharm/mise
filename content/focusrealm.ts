import { brand, founders } from "@/content/site";
import type { Longform } from "@/content/types";

/**
 * /focusrealm: the Mise ↔ Focus Realm relationship, stated once and plainly so
 * search and answer engines resolve "Mise by Focus Realm" to one entity pair.
 * Every fact here also appears on focusrealm.org; keep the two in step.
 */
const founderLines = founders
  .map((f) => `- **[${f.name}](/team/${f.slug})**, ${f.role} of Mise and a founder of Focus Realm: ${f.focus[0].toLowerCase()}.`)
  .join("\n");

export const focusRealmPage: Longform = {
  meta: {
    path: "/focusrealm",
    title: "Mise by Focus Realm: About Our Parent Company | Mise",
    description:
      "Mise by Focus Realm: how the hotel service execution platform (SEP) relates to Focus Realm, its parent software company, and who runs both. Book a demo.",
    h1: "Mise by Focus Realm: the company behind the hotel service execution platform",
    primaryKeyword: "Mise by Focus Realm",
    secondaryKeywords: ["Focus Realm", "Mise parent company", "who owns Mise", "Focus Realm Mise", "focusrealm.org"],
    ogTitle: "Mise by Focus Realm: the company behind Mise",
    ogDescription:
      "Mise is the hotel service execution platform (SEP) from Focus Realm, the software company founded in India in 2024 by Sehej Sharma, Ali Electricwala and Aditya Mishra.",
    ogImageAlt: "Mise by Focus Realm: Mise is the hospitality platform of Focus Realm",
    eyebrow: "A Focus Realm company",
    updated: "2026-11-13",
    priority: 0.6,
  },
  eyebrow: "A Focus Realm company",
  lede: `Mise by Focus Realm: Mise is the hotel service execution platform (SEP), and Focus Realm is the software company that builds it. Focus Realm was founded in India in ${brand.founded} by Sehej Sharma, Ali Electricwala and Aditya Mishra, and Mise is its hospitality product line, with its own name, site and team focus.`,
  tldr: `Mise is a Focus Realm company. Focus Realm (focusrealm.org) is a software company founded in India in ${brand.founded} that builds learning and operations platforms for institutions. It has two product lines: Mise, the service execution platform for hotels, and the Focus Realm education platform for schools, colleges and universities. The same three founders lead both.`,
  body: `
## What is Focus Realm?

Focus Realm is a software company founded in India in ${brand.founded} by Sehej Sharma, Ali Electricwala and Aditya Mishra. It builds learning and operations platforms for institutions, with two product lines: Mise for hotels, and the Focus Realm education platform for schools, colleges and universities. Its company site is [focusrealm.org](${brand.parent.url}).

## How is Mise related to Focus Realm?

Mise is Focus Realm's hospitality product line, and Focus Realm is Mise's parent company. Mise has its own name, its own site at misehotel.com and its own product focus: running the standards a hotel already has as timed tasks on staff phones, with photo and supervisor evidence, in an audit-ready service record.

| | Focus Realm | Mise |
|---|---|---|
| What it is | Software company (parent) | Hotel service execution platform (SEP) |
| Website | focusrealm.org | misehotel.com |
| Founded | ${brand.founded}, India | Built by Focus Realm |
| Serves | Hotels, schools, colleges and universities | Hotels, resorts and hotel groups |
| Founders | Sehej Sharma, Ali Electricwala, Aditya Mishra | The same three founders |

## Who leads Mise and Focus Realm?

The same three founders lead both, so a hotel working with Mise deals directly with the people who build it:

${founderLines}

## Why does Mise have its own website?

Hotel teams search for hotel answers. Giving the hospitality product its own name and site at misehotel.com keeps every hotel page, guide and comparison in one place, while focusrealm.org describes the company as a whole. Focus Realm's earlier hotel pages now redirect to their counterparts on misehotel.com, so nothing is duplicated between the two sites.

## What does Mise inherit from Focus Realm?

Mise is built the way Focus Realm builds every product: only what the property actually uses, shaped around the person doing the work. It runs on Google Cloud and Firebase, in a browser on the phones staff already carry, with no PMS integration and no hardware. Every pilot is scoped to one property, with evidence from the first shifts.

## Is Mise affiliated with Focus Softnet?

No. Mise and Focus Realm are not affiliated with Focus Softnet or its Focus e-RMS hospitality product. The names are similar; the companies, products and founders are different. Mise is the service execution platform from Focus Realm, founded by Sehej Sharma, Ali Electricwala and Aditya Mishra.
`,
  faqs: [
    {
      q: "Who owns Mise?",
      a: "Mise is owned and built by Focus Realm, a software company founded in India in 2024 by Sehej Sharma, Ali Electricwala and Aditya Mishra. Mise is Focus Realm's hospitality product line.",
    },
    {
      q: "Is Mise part of Focus Realm?",
      a: "Yes. Mise is a Focus Realm company and its platform for hotels. Focus Realm's other product line is an education platform for schools, colleges and universities.",
    },
    {
      q: "Where can I learn more about Focus Realm?",
      a: "Focus Realm's company site is focusrealm.org. It covers both product lines, the founding team, and how the company handles security and data.",
    },
    {
      q: "Who should a hotel contact about Mise?",
      a: "Contact the Mise team at hello@misehotel.com or book a 15-minute demo on misehotel.com. Pilots are run by the founding team.",
    },
  ],
  faqTitle: "Mise by Focus Realm: frequently asked questions",
  related: [
    { href: "/about", label: "About Mise", note: "Mission, founders and how Mise works." },
    { href: "/team/sehej-sharma", label: "Sehej Sharma", note: "Co-Founder & CEO." },
    { href: "/security", label: "Security & data handling", note: "Google Cloud and Firebase, plainly stated." },
    { href: "/demo", label: "Book a 15-min demo", note: "See Mise on a real shift." },
  ],
};
