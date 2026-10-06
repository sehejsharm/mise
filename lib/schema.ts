/**
 * Typed JSON-LD builders (schema-dts). Every page emits one `@graph`.
 * Nodes reference each other by `@id` so crawlers resolve one entity per
 * thing: one Organization, one WebSite, one SoftwareApplication, one Person
 * per founder, wherever they appear.
 */
import type {
  Article,
  BreadcrumbList,
  DefinedTerm,
  DefinedTermSet,
  FAQPage,
  HowTo,
  Organization,
  Person,
  SoftwareApplication,
  WebPage,
  WebSite,
} from "schema-dts";
import { absoluteUrl, brand, contact, founders, siteUrl, socialProfiles, type Founder } from "@/content/site";
import manifest from "@/lib/images.manifest.json";

export const ids = {
  org: `${siteUrl}/#organization`,
  website: `${siteUrl}/#website`,
  software: `${siteUrl}/#software`,
  parent: "https://focusrealm.org/#organization",
  logo: `${siteUrl}/#logo`,
  person: (slug: string) => `${siteUrl}/team/${slug}#person`,
  advisor: (slug: string) => `${siteUrl}/advisors#${slug}`,
  page: (path: string) => `${absoluteUrl(path)}#webpage`,
};

type Node = unknown;

type ManifestEntry = { src: string; width: number; height: number };
export function imageUrl(key: string) {
  const entry = (manifest as Record<string, ManifestEntry>)[key];
  return entry ? absoluteUrl(entry.src) : undefined;
}

export function organizationNode(): Organization {
  return {
    "@type": "Organization",
    "@id": ids.org,
    name: brand.name,
    legalName: brand.legalName,
    alternateName: ["Mise hotel software", "Mise hospitality", "Mise by Focus Realm"],
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      "@id": ids.logo,
      url: absoluteUrl("/brand/mise-logo-512.png"),
      width: "512",
      height: "512",
      caption: "Mise",
    },
    image: { "@id": ids.logo },
    description:
      "Mise provides standalone hotel SOP management software with photo proof task tracking, duty manager handovers, and supervisor sign-off features.",
    email: contact.email,
    telephone: contact.phone,
    slogan: brand.tagline,
    foundingDate: brand.founded,
    areaServed: brand.areaServed.map((name) => ({ "@type": "Place" as const, name })),
    knowsAbout: [
      "Hotel SOP software",
      "Service execution",
      "Hotel operations",
      "Hotel audit readiness",
      "Digital SOPs for hotels",
      "Housekeeping task management",
    ],
    parentOrganization: {
      "@type": "Organization",
      "@id": ids.parent,
      name: brand.parent.name,
      url: brand.parent.url,
    },
    founder: founders.map((f) => ({ "@id": ids.person(f.slug) })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: contact.email,
        telephone: contact.phone,
        areaServed: ["IN", "LK"],
        availableLanguage: ["English"],
      },
    ],
    sameAs: socialProfiles.map((p) => p.href),
  };
}

export function websiteNode(): WebSite {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: siteUrl,
    name: brand.name,
    description: "Standalone Hotel SOP Software & Photo Proof Task Tracking",
    inLanguage: "en-IN",
    publisher: { "@id": ids.org },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      // schema-dts has no typing for the query-input shorthand Google documents.
      ...({ "query-input": "required name=search_term_string" } as object),
    },
  };
}

export function softwareNode(): SoftwareApplication {
  return {
    "@type": "SoftwareApplication",
    "@id": ids.software,
    name: "Mise Hotel Operations Software",
    url: siteUrl,
    description:
      "Standalone hotel SOP software with photo proof verification, timed task tracking, supervisor sign-offs, and duty manager handovers without PMS integration.",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Hotel Operations & SOP Software",
    ...({ brand: { "@id": ids.org } } as object),
    keywords:
      "SOP app for hotels, hotel SOP app, hotel SOP software, hotel department SOP software, hotel departmental workflow software, hotel operations task management, digital SOP for hotels",
    operatingSystem: "iOS, Android, Web",
    featureList: [
      "Real-time photo proof task verification",
      "Timed task scheduling & SOP execution",
      "Standalone deployment with zero PMS integration required",
      "Duty manager shift handover logbook",
      "Housekeeping checklist & sanitation tracking",
      "Hotel HR compliance & audit readiness logs",
      "One SOP app for every department: front office, housekeeping, F&B, kitchen, engineering, security, spa",
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Hotel General Managers, Directors of Operations, Executive Housekeepers",
    },
    offers: {
      "@type": "Offer",
      description: "Custom per-property or enterprise SaaS subscription",
      priceCurrency: "INR",
    },
    publisher: { "@id": ids.org },
    screenshot: ["product/staff-today", "product/manager-overview", "product/author-create-standard"]
      .map(imageUrl)
      .filter(Boolean) as string[],
  };
}

export function founderNode(f: Founder): Person {
  return {
    "@type": "Person",
    "@id": ids.person(f.slug),
    name: f.name,
    jobTitle: f.jobTitle,
    url: absoluteUrl(`/team/${f.slug}`),
    image: imageUrl(f.photo),
    worksFor: { "@id": ids.org },
    sameAs: [f.linkedin],
    knowsAbout: f.focus,
  };
}

export type AdvisorData = {
  slug: string;
  name: string;
  title?: string;
  credentials?: string[];
  photo?: string;
  linkedin?: string;
};

export function advisorNode(a: AdvisorData): Person {
  return {
    "@type": "Person",
    "@id": ids.advisor(a.slug),
    name: a.name,
    ...(a.title ? { jobTitle: a.title } : {}),
    ...(a.photo ? { image: imageUrl(a.photo) } : {}),
    description: `Member of the ${brand.name} advisory board.`,
    ...(a.linkedin ? { sameAs: [a.linkedin] } : {}),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbNode(path: string, crumbs: Crumb[]): BreadcrumbList {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** An ItemList of child pages (hub pages such as /solutions). */
export function itemListNode(path: string, name: string, items: { name: string; path: string }[]) {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#itemlist`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
  };
}

export type WebPageKind = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage" | "ProfilePage";

export function webPageNode(opts: {
  path: string;
  name: string;
  description: string;
  kind?: WebPageKind;
  updated?: string;
  published?: string;
  about?: string;
  primaryImage?: string;
  hasBreadcrumb?: boolean;
}): WebPage {
  return {
    "@type": opts.kind ?? "WebPage",
    "@id": ids.page(opts.path),
    url: absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": ids.website },
    about: { "@id": opts.about ?? ids.software },
    publisher: { "@id": ids.org },
    ...(opts.hasBreadcrumb === false ? {} : { breadcrumb: { "@id": `${absoluteUrl(opts.path)}#breadcrumb` } }),
    ...(opts.updated ? { dateModified: opts.updated } : {}),
    ...(opts.published ? { datePublished: opts.published } : {}),
    ...(opts.primaryImage ? { primaryImageOfPage: { "@type": "ImageObject", url: opts.primaryImage } } : {}),
  } as WebPage;
}

export type QA = { q: string; a: string };

/** FAQPage node. On pages whose main type is not FAQPage it is emitted as a separate node. */
export function faqNode(path: string, faqs: QA[]): FAQPage {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function howToNode(path: string, name: string, description: string, steps: { name: string; text: string }[]): HowTo {
  return {
    "@type": "HowTo",
    "@id": `${absoluteUrl(path)}#howto`,
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${absoluteUrl(path)}#step-${i + 1}`,
    })),
  };
}

export function articleNode(opts: {
  path: string;
  headline: string;
  description: string;
  image: string;
  published: string;
  updated: string;
  author: { name: string; url?: string; slug?: string; sameAs?: string[]; jobTitle?: string };
  keywords?: string[];
  section?: string;
  wordCount?: number;
}): Article {
  const founder = opts.author.slug ? founders.find((f) => f.slug === opts.author.slug) : undefined;
  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(opts.path)}#article`,
    mainEntityOfPage: { "@id": ids.page(opts.path) },
    headline: opts.headline,
    description: opts.description,
    image: [opts.image],
    datePublished: opts.published,
    dateModified: opts.updated,
    inLanguage: "en-IN",
    author: founder
      ? { "@id": ids.person(founder.slug), "@type": "Person", name: founder.name, url: absoluteUrl(`/team/${founder.slug}`) }
      : {
          "@type": "Person",
          name: opts.author.name,
          ...(opts.author.url ? { url: opts.author.url } : {}),
          ...(opts.author.jobTitle ? { jobTitle: opts.author.jobTitle } : {}),
          ...(opts.author.sameAs?.length ? { sameAs: opts.author.sameAs } : {}),
        },
    publisher: { "@id": ids.org },
    keywords: opts.keywords?.join(", "),
    articleSection: opts.section,
    ...(opts.wordCount ? { wordCount: opts.wordCount } : {}),
    isPartOf: { "@id": ids.website },
  } as Article;
}

export function definedTermSetNode(terms: { slug: string; term: string; short: string }[]): DefinedTermSet {
  return {
    "@type": "DefinedTermSet",
    "@id": `${absoluteUrl("/glossary")}#set`,
    name: "Mise glossary of hotel service execution terms",
    url: absoluteUrl("/glossary"),
    hasDefinedTerm: terms.map((t) => definedTermNode(t)),
  };
}

export function definedTermNode(t: { slug: string; term: string; short: string }): DefinedTerm {
  return {
    "@type": "DefinedTerm",
    "@id": `${absoluteUrl(`/glossary/${t.slug}`)}#term`,
    name: t.term,
    description: t.short,
    url: absoluteUrl(`/glossary/${t.slug}`),
    inDefinedTermSet: `${absoluteUrl("/glossary")}#set`,
  };
}

/** Serialises a graph for a <script type="application/ld+json">, escaping "<". */
export function serializeGraph(nodes: (Node | undefined | false)[]) {
  const graph = { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}

/** The nodes every page carries so references always resolve on-page. */
export function baseNodes(): Node[] {
  return [organizationNode(), websiteNode()];
}
