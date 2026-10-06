/**
 * Static Open Graph images: one 1200×630 PNG per page, generated at build.
 * /og/home.png, /og/problems--ghost-sop.png, /og/blog--<slug>.png …
 */
import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getAllPosts } from "@/lib/blog";
import { staticRoutes } from "@/lib/routes";
import { ogKey } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

type Card = { title: string; eyebrow: string };

async function cards(): Promise<Record<string, Card>> {
  const out: Record<string, Card> = {};
  for (const r of staticRoutes()) out[ogKey(r.path)] = { title: r.ogTitle ?? r.h1, eyebrow: r.eyebrow ?? "Mise" };
  for (const p of await getAllPosts()) out[ogKey(`/blog/${p.slug}`)] = { title: p.title, eyebrow: `Blog · ${p.category.name}` };
  return out;
}

export async function generateStaticParams() {
  return Object.keys(await cards()).map((k) => ({ key: `${k}.png` }));
}

const font = (file: string) => fs.readFile(path.join(process.cwd(), "lib/og-fonts", file));

export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const card = (await cards())[key.replace(/\.png$/, "")] ?? { title: "The service execution platform for every shift.", eyebrow: "Mise" };
  const [grotesk, inter, mono] = await Promise.all([font("space-grotesk-600.woff"), font("inter-400.woff"), font("geist-mono-500.ttf")]);
  const size = card.title.length > 70 ? 54 : card.title.length > 45 ? 62 : 72;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0C2329",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(212,169,79,0.35), transparent 45%), radial-gradient(circle at 10% 100%, rgba(56,225,255,0.14), transparent 40%)",
          color: "#F2F4EE",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#E5B35A" />
            <path d="M8.5 22.5V11l7.5 7.5 7.5-7.5v11.5" fill="none" stroke="#0C2329" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="16" cy="7.6" r="1.7" fill="#0C2329" />
          </svg>
          <div style={{ fontFamily: "Space Grotesk", fontSize: 40, letterSpacing: -1 }}>Mise</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1000 }}>
          <div style={{ fontFamily: "Geist Mono", fontSize: 22, letterSpacing: 4, color: "#E5B35A", textTransform: "uppercase" }}>{card.eyebrow}</div>
          <div style={{ fontFamily: "Space Grotesk", fontSize: size, lineHeight: 1.05, letterSpacing: -2 }}>{card.title}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#A0B0AC" }}>
          <div>misehotel.com · Every shift, five-star.</div>
          <div style={{ color: "#E5B35A" }}>Service Execution Platform</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Space Grotesk", data: grotesk, weight: 600, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
