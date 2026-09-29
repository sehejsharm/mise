import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/content/site";

export const dynamic = "force-static";

/** Search and AI crawlers explicitly welcome; the CMS and API are off limits. */
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/keystatic", "/api/", "/search"];
  return {
    rules: [
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
