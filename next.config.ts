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
    "frame-src": ["'self'", ...bookingOrigins()],
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
