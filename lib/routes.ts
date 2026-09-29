/**
 * Route registry: every static marketing route with its metadata. Drives the
 * sitemap, the static OG images, llms-full.txt, the search index, the SEO
 * report and the Playwright route test, so a page cannot silently fall out of
 * any of them. Blog routes are added from Keystatic at build time.
 */
import { audiences, audiencesHubMeta } from "@/content/audiences";
import { compareHubMeta, comparisons } from "@/content/compare";
import { faqMeta } from "@/content/faq";
import { indiaPage, southAsiaPage } from "@/content/geo";
import { glossary, glossaryHubMeta } from "@/content/glossary";
import { homeMeta } from "@/content/home";
import { cookies, privacy, security, terms } from "@/content/legal";
import {
  aboutMeta,
  advisorsMeta,
  blogMeta,
  contactMeta,
  demoMeta,
  founderMeta,
  glossaryMeta,
  roiMeta,
} from "@/content/meta";
import { pains, problemsHubMeta } from "@/content/pains";
import { auditReadiness, digitalSop } from "@/content/pillars";
import { howItWorksMeta, platformMeta } from "@/content/platform";
import { founders } from "@/content/site";
import { solutions, solutionsHubMeta } from "@/content/solutions";
import type { PageMeta } from "@/lib/seo";

export type RouteEntry = PageMeta & { group: string };

export function staticRoutes(): RouteEntry[] {
  const r = (group: string, meta: PageMeta): RouteEntry => ({ ...meta, group });
  return [
    r("home", homeMeta),
    r("platform", platformMeta),
    r("platform", howItWorksMeta),
    r("problems", problemsHubMeta),
    ...pains.map((p) => r("problems", p.meta)),
    r("solutions", solutionsHubMeta),
    ...solutions.map((s) => r("solutions", s.meta)),
    r("audiences", audiencesHubMeta),
    ...audiences.map((a) => r("audiences", a.meta)),
    r("pillar", digitalSop.meta),
    r("pillar", auditReadiness.meta),
    r("compare", compareHubMeta),
    ...comparisons.map((c) => r("compare", c.meta)),
    r("geo", indiaPage.meta),
    r("geo", southAsiaPage.meta),
    r("tools", roiMeta),
    r("glossary", glossaryHubMeta),
    ...glossary.map((t) => r("glossary", glossaryMeta(t))),
    r("company", faqMeta),
    r("company", aboutMeta),
    ...founders.map((f) => r("company", founderMeta(f.slug)!)),
    r("company", advisorsMeta),
    r("blog", blogMeta),
    r("conversion", demoMeta),
    r("conversion", contactMeta),
    r("legal", security.meta),
    r("legal", privacy.meta),
    r("legal", terms.meta),
    r("legal", cookies.meta),
  ];
}
