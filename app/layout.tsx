import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { themeInitScript } from "@/components/site/ThemeToggle";
import { brand, siteUrl } from "@/content/site";
import { GA_ID } from "@/lib/analytics";
import { consentDefaultsScript } from "@/lib/consent";

const inter = localFont({
  src: "./fonts/inter-var-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-var-latin.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/geist-mono-regular.woff2",
  variable: "--font-geist-mono",
  weight: "400",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: [{ color: "#0C2329" }],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: brand.name,
  title: { default: `${brand.name} — Service Execution Platform (SEP) for Hotels`, template: `%s | ${brand.name}` },
  description: brand.definition,
  authors: [{ name: brand.name, url: siteUrl }],
  creator: brand.name,
  publisher: brand.parent.name,
  formatDetection: { telephone: false, email: false, address: false },
  alternates: {
    types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: "Mise blog" }] },
  },
  verification: {
    // Search Console ownership token (HTML-tag method); GOOGLE_SITE_VERIFICATION overrides it.
    google: process.env.GOOGLE_SITE_VERIFICATION || "GhYMZZmq1DqSsWqfkJ7IY38ze6BLDDjcMLdBxMS5Og4",
    ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/brand/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/brand/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

/**
 * Root layout: document shell only. Site chrome (header, footer, consent
 * banner, gtag.js) lives in app/(site)/layout.tsx so the CMS at /keystatic
 * stays clean. The Consent Mode v2 defaults must run before gtag.js loads,
 * which is why they sit here as a beforeInteractive script.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="grain min-h-dvh">
        <Script id="consent-defaults" strategy="beforeInteractive">
          {consentDefaultsScript(GA_ID)}
        </Script>
        {children}
      </body>
    </html>
  );
}
