/**
 * Metadata for pages whose content lives in the page file itself. Kept here so
 * the route registry (lib/routes.ts) can read every page's title, H1 and
 * primary keyword without importing React components.
 */
import { founderBySlug } from "@/content/site";
import type { GlossaryTerm } from "@/content/glossary";
import type { PageMeta } from "@/lib/seo";

const updated = "2026-09-29";

export const roiMeta: PageMeta = {
  path: "/roi",
  title: "Hotel Operations ROI Calculator | Mise",
  description:
    "Estimate hotel operations ROI with your own numbers: the cost of hotel staff turnover, supervisor verification time and audit prep. Book a 15-min demo.",
  h1: "Hotel operations ROI calculator",
  primaryKeyword: "hotel operations ROI",
  secondaryKeywords: ["cost of hotel staff turnover"],
  eyebrow: "ROI calculator",
  updated,
  priority: 0.7,
};

export const aboutMeta: PageMeta = {
  path: "/about",
  title: "About Mise | Hotel Service Execution Platform (SEP)",
  description:
    "How Mise is transforming hotel service execution: running the SOPs hotels already have, and ending ghost SOPs, supervisor bottlenecks and WhatsApp chaos.",
  h1: "Reimagining Hotel Service Execution",
  primaryKeyword: "hotel service execution",
  secondaryKeywords: ["service execution platform", "SEP", "About Mise", "Mise by Focus Realm"],
  ogTitle: "About Mise | Revolutionizing Hotel Service Execution & Task Tracking",
  ogDescription:
    "Learn how Mise, the service execution platform, puts the SOPs hotels already have into practice with photo proof, timed tasks and supervisor sign-offs.",
  ogImageAlt: "Mise Team & Hotel Operations Platform Interface",
  twitterTitle: "About Mise | Revolutionizing Hotel Service Execution & Task Tracking",
  twitterDescription:
    "Discover the story behind Mise: the service execution platform (SEP) that makes existing hotel standards actually run, ending ghost SOPs and WhatsApp chaos.",
  eyebrow: "About Mise",
  updated,
  priority: 0.8,
};

export const advisorsMeta: PageMeta = {
  path: "/advisors",
  title: "Mise Advisory Board: Hospitality Advisors | Mise",
  description:
    "Meet the Mise advisory board: hospitality practitioners who advise Mise, the hotel service execution platform by Focus Realm. Book a 15-min demo.",
  h1: "The Mise advisory board",
  primaryKeyword: "Mise advisory board",
  eyebrow: "Advisory board",
  updated,
  priority: 0.5,
};

export const demoMeta: PageMeta = {
  path: "/demo",
  title: "Book a 15-Minute Mise Demo | Mise",
  description:
    "Book a 15-minute Mise demo: three interfaces on a live demo property, one of your existing standards as a timed task, and how a one-property pilot works.",
  h1: "Book a 15-minute Mise demo",
  primaryKeyword: "Mise demo",
  eyebrow: "Book a demo",
  updated,
  priority: 0.9,
};

export const contactMeta: PageMeta = {
  path: "/contact",
  title: "Contact Mise: Service Execution Platform Team | Mise",
  description:
    "Contact the Mise team about the service execution platform, pilots, partnerships or press. Email, phone or the form; we reply to every message. Book a demo.",
  h1: "Contact Mise",
  primaryKeyword: "contact Mise",
  eyebrow: "Contact",
  updated,
  priority: 0.5,
};

export const blogMeta: PageMeta = {
  path: "/blog",
  title: "Mise Blog: Hotel Service Execution Guides",
  description:
    "The Mise blog: guides on hotel service execution, audit readiness, every department's standards and running shifts without WhatsApp chaos. Book a demo.",
  h1: "The Mise blog: hotel standards and service execution",
  primaryKeyword: "Mise blog",
  eyebrow: "Field notes",
  updated,
  priority: 0.7,
};

export const searchMeta: PageMeta = {
  path: "/search",
  title: "Search | Mise",
  description:
    "Search misehotel.com: guides on service execution, hotel standards, audit readiness, the six hotel operations problems and the Mise platform. Book a demo.",
  h1: "Search Mise",
  primaryKeyword: "search",
  eyebrow: "Search",
  updated,
  noindex: true,
};

export function founderMeta(slug: string): PageMeta | undefined {
  const f = founderBySlug(slug);
  if (!f) return undefined;
  return {
    path: `/team/${f.slug}`,
    title: `${f.name}, ${f.role} of Mise`,
    description: `${f.name} is ${f.role} of Mise, the hotel service execution platform by Focus Realm, leading ${f.focus[0].toLowerCase()}. Book a 15-min demo.`,
    h1: f.name,
    primaryKeyword: f.name,
    eyebrow: `${f.role} · Mise`,
    updated,
    priority: 0.6,
  };
}

const ARTICLE: Record<string, string> = {
  "service-execution-platform": "a ",
  "ghost-sop": "a ",
  "photo-gate": "a ",
  "service-record": "a ",
  "timed-task": "a ",
  "operating-brief": "an ",
  "shift-handover": "a ",
  "audit-ambush": "an ",
  "digital-sop": "a ",
};

export function glossaryMeta(t: GlossaryTerm): PageMeta {
  const article = ARTICLE[t.slug] ?? "";
  const subject = t.slug === "mise-en-place" ? "mise en place" : t.term.toLowerCase().replace(/\bsop\b/, "SOP");
  const titleCore = `What Is ${article}${t.term}?`;
  return {
    path: `/glossary/${t.slug}`,
    title: `${titleCore} | Mise Glossary`.length <= 60 ? `${titleCore} | Mise Glossary` : `${titleCore} | Mise`,
    description: t.description,
    h1: `What is ${article}${subject}?`,
    primaryKeyword: t.term.toLowerCase(),
    eyebrow: "Glossary",
    updated,
    priority: 0.5,
  };
}
