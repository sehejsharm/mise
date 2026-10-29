import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Origins the demo page may frame. Cal.com and Calendly are allowed by
 * default; a self-hosted scheduler is picked up from NEXT_PUBLIC_BOOKING_URL.
 */
function bookingOrigins(): string[] {
  const origins = new Set([
    "https://cal.com",
    "https://*.cal.com",
    "https://app.cal.com",
    "https://calendly.com",
    "https://*.calendly.com",
  ]);
  const url = process.env.NEXT_PUBLIC_BOOKING_URL;
  if (url) {
    try {
      origins.add(new URL(url).origin);
    } catch {
      // An invalid URL is reported by the demo page itself; CSP keeps its defaults.
    }
  }
  return [...origins];
}

const google = {
  script: ["https://www.googletagmanager.com"],
  connect: [
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    "https://www.googletagmanager.com",
  ],
  img: ["https://*.google-analytics.com", "https://www.googletagmanager.com"],
};

function csp(extra: { script?: string[]; connect?: string[]; img?: string[] } = {}) {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    // Next.js App Router streams its payload through inline scripts, and a
    // statically generated site cannot carry per-request nonces.
    "script-src": ["'self'", "'unsafe-inline'", ...google.script, ...(extra.script ?? []), ...(isDev ? ["'unsafe-eval'"] : [])],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:", ...google.img, ...(extra.img ?? [])],
    "font-src": ["'self'", "data:"],
    "connect-src": ["'self'", ...google.connect, ...(extra.connect ?? []), ...(isDev ? ["ws:"] : [])],
    "frame-src": ["'self'", "https://www.google.com", ...bookingOrigins()],
    "frame-ancestors": ["'self'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "object-src": ["'none'"],
    "worker-src": ["'self'", "blob:"],
    "manifest-src": ["'self'"],
  };
  const policy = Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join("; ");
  return isDev ? policy : `${policy}; upgrade-insecure-requests`;
}

const baseSecurityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  async redirects() {
    return [
      { source: "/team", destination: "/about#founders", permanent: true },
      { source: "/opengraph-image", destination: "/og/home.png", permanent: false },
      { source: "/blog/page/1", destination: "/blog", permanent: true },
      { source: "/solutions/fnb", destination: "/solutions/food-and-beverage", permanent: true },
      // Service execution platform renames: no product URLs carry "SOP".
      // Alternate addresses from the owner's sitemap draft, sent to the real pages.
      { source: "/staff-app", destination: "/platform#staff", permanent: true },
      { source: "/manager-dashboard", destination: "/platform#manager", permanent: true },
      { source: "/standards-workspace", destination: "/platform#standards", permanent: true },
      { source: "/service-record", destination: "/platform#service-record", permanent: true },
      { source: "/roi-calculator", destination: "/roi", permanent: true },
      { source: "/for-hr-directors", destination: "/for/hr-directors", permanent: true },
      { source: "/for-general-managers", destination: "/for/general-managers", permanent: true },
      { source: "/for-ld-heads", destination: "/for/learning-and-development", permanent: true },
      { source: "/solutions/fb-service", destination: "/solutions/food-and-beverage", permanent: true },
      { source: "/solutions/engineering-maintenance", destination: "/solutions/engineering", permanent: true },
      { source: "/solutions/security-safety", destination: "/solutions/security-and-safety", permanent: true },
      { source: "/solutions/spa-wellness", destination: "/solutions/spa-and-wellness", permanent: true },
      { source: "/case/standards-to-execution", destination: "/standards-to-execution", permanent: true },
      { source: "/case/audit-readiness", destination: "/audit-readiness", permanent: true },
      { source: "/case/:slug", destination: "/problems/:slug", permanent: true },
      { source: "/case", destination: "/problems", permanent: true },
      { source: "/comparisons", destination: "/compare", permanent: true },
      { source: "/comparisons/vs-lms", destination: "/compare/mise-vs-hotel-lms", permanent: true },
      { source: "/comparisons/excel-alternative", destination: "/compare/mise-vs-excel", permanent: true },
      { source: "/comparisons/whatsapp-task-management", destination: "/compare/mise-vs-whatsapp", permanent: true },
      { source: "/comparisons/checklist-apps", destination: "/compare/execution-platform-vs-checklist-app", permanent: true },
      { source: "/founders", destination: "/about#founders", permanent: true },
      { source: "/advisory-board", destination: "/advisors", permanent: true },
      { source: "/media-kit", destination: "/about", permanent: true },
      { source: "/cookie-policy", destination: "/cookies", permanent: true },
      { source: "/hotel-sop-software-india", destination: "/hotel-service-execution-india", permanent: true },
      { source: "/hotel-sop-software-south-asia", destination: "/hotel-service-execution-south-asia", permanent: true },
      { source: "/compare/sop-software-vs-checklist-app", destination: "/compare/execution-platform-vs-checklist-app", permanent: true },
      { source: "/digital-sop", destination: "/standards-to-execution", permanent: true },
      { source: "/glossary/sop-app-for-hotels", destination: "/glossary/service-execution-platform", permanent: true },
      { source: "/blog/one-sop-app-every-hotel-department", destination: "/blog/one-platform-every-hotel-department", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/((?!keystatic|api/keystatic).*)",
        headers: [...baseSecurityHeaders, { key: "Content-Security-Policy", value: csp() }],
      },
      {
        // The CMS talks to GitHub from the browser and renders avatars from it.
        source: "/(keystatic|api/keystatic)(.*)",
        headers: [
          ...baseSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value: csp({
              script: ["'unsafe-eval'"],
              connect: ["https://api.github.com", "https://github.com"],
              img: ["https://avatars.githubusercontent.com", "https://raw.githubusercontent.com"],
            }),
          },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

export default withBundleAnalyzer(nextConfig);
