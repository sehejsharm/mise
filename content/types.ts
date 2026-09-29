import type { PageMeta } from "@/lib/seo";

export type Faq = { q: string; a: string; allowLms?: boolean };
export type RelatedLink = { href: string; label: string; note?: string };

/** A long-form, answer-first page (pillars, solutions, audiences, comparisons, geo). */
export type Longform = {
  meta: PageMeta;
  eyebrow: string;
  /** Opening paragraph under the H1. Carries the primary keyword in the first 100 words. */
  lede: string;
  /** Answer-first summary (TL;DR box). */
  tldr: string;
  leadImage?: { key: string; alt: string; device: "phone" | "laptop" };
  /** Body in the lib/md.tsx dialect. Question-style H2s are followed by a 40–60 word answer. */
  body: string;
  faqs: Faq[];
  related: RelatedLink[];
  /** Blog post slugs to feature (only shown once the post is published). */
  relatedPosts?: string[];
  howTo?: { name: string; description: string; steps: { name: string; text: string }[] };
  /** Pages whose subject legitimately compares against LMS vocabulary. */
  allowLmsVocabulary?: boolean;
};
