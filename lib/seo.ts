import type { Metadata } from "next";
import { absoluteUrl, brand } from "@/content/site";

export type PageMeta = {
  /** Route path, e.g. "/problems/ghost-sop". */
  path: string;
  /** Full <title>, ≤60 characters, brand at the end ("… | Mise"). */
  title: string;
  /** 140–158 characters, ends with a demo CTA. */
  description: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords?: string[];
  /** Short eyebrow used on the OG card. */
  eyebrow?: string;
  ogTitle?: string;
  /** ISO date the content last changed. Drives sitemap lastModified and "Last updated". */
  updated?: string;
  published?: string;
  noindex?: boolean;
  type?: "website" | "article";
  /** Priority in the sitemap (0–1). */
  priority?: number;
  /** Overrides the <meta name="keywords"> order (defaults to primary + secondary). */
  metaKeywords?: string[];
};

/** Stable key for the static OG image of a route: "/" → "home", "/a/b" → "a--b". */
export function ogKey(path: string) {
  if (path === "/") return "home";
  return path.replace(/^\//, "").replace(/\//g, "--");
}

export function ogImagePath(path: string) {
  return `/og/${ogKey(path)}.png`;
}

export function buildMetadata(meta: PageMeta, extra: Partial<Metadata> = {}): Metadata {
  const url = absoluteUrl(meta.path);
  const ogTitle = meta.ogTitle ?? meta.title;
  const image = {
    url: absoluteUrl(ogImagePath(meta.path)),
    width: 1200,
    height: 630,
    alt: `${meta.h1} — ${brand.name}`,
  };
  return {
    title: { absolute: meta.title },
    description: meta.description,
    keywords: meta.metaKeywords ?? [meta.primaryKeyword, ...(meta.secondaryKeywords ?? [])],
    // When the keywords list leads with something else, the crawl report still knows the page's primary keyword.
    ...(meta.metaKeywords ? { other: { "mise:primary-keyword": meta.primaryKeyword } } : {}),
    alternates: {
      canonical: url,
      languages: { en: url, "en-IN": url, "x-default": url },
    },
    robots: meta.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: meta.type ?? "website",
      url,
      siteName: brand.name,
      locale: "en_IN",
      title: ogTitle,
      description: meta.description,
      images: [image],
      ...(meta.type === "article" && meta.published
        ? { publishedTime: meta.published, modifiedTime: meta.updated ?? meta.published }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: meta.description,
      images: [image.url],
    },
    ...extra,
  };
}

/** Formats an ISO date as "29 September 2026". */
export function formatDate(iso: string) {
  return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
