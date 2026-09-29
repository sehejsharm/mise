#!/usr/bin/env node
/**
 * Image pipeline. Run with `pnpm images` whenever a source image changes.
 *
 * Inputs (first match wins per person/screen):
 *   assets/raw/team/<slug>.{png,jpg,jpeg,webp}      founders
 *   public/images/team/raw/<slug>.*                  (alternative drop folder)
 *   assets/raw/advisors/<slug>.*                     advisors
 *   public/images/advisors/raw/<slug>.*              (alternative drop folder)
 *   assets/raw/product/<name>.jpg                    prototype screenshots
 *
 * Outputs:
 *   public/images/{team,advisors,product}/<seo-name>-<w>.{avif,webp}
 *   lib/images.manifest.json   width/height, srcsets, blur placeholder per key
 *
 * Portraits are cropped to 4:5 using a hand-checked focal box per person (see
 * CROPS) so the face sits in the upper third. Nothing is ever upscaled: widths
 * above the cropped source width are dropped.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = (...p) => path.join(root, ...p);

const PORTRAIT_WIDTHS = [400, 800, 1200];

/** Focal crop boxes (source pixels), verified visually after each run. */
const CROPS = {
  "sehej-sharma": { left: 70, top: 0, width: 640, height: 800 },
  "ali-electricwala": { left: 20, top: 0, width: 751, height: 939 },
  "aditya-mishra": { left: 105, top: 0, width: 640, height: 800 },
  "parul-sharma": { left: 0, top: 60, width: 1071, height: 1339 },
  // The supplied file has black letterbox bars top and bottom; stay inside them.
  "renu-mehra": { left: 109, top: 14, width: 683, height: 854 },
};

const PEOPLE = [
  { group: "team", slug: "sehej-sharma", seo: "sehej-sharma-co-founder-ceo-mise" },
  { group: "team", slug: "ali-electricwala", seo: "ali-electricwala-co-founder-coo-mise" },
  { group: "team", slug: "aditya-mishra", seo: "aditya-mishra-co-founder-cto-mise" },
  { group: "advisors", slug: "parul-sharma", seo: "parul-sharma-advisory-board-mise" },
  { group: "advisors", slug: "renu-mehra", seo: "renu-mehra-advisory-board-mise" },
];

/**
 * Prototype screenshots. `author-pilot-foundation` is deliberately absent: that
 * screen still carries retired positioning and must never ship.
 */
const PRODUCT = [
  ["staff-today", "mise-hotel-staff-app-timed-task"],
  ["staff-standards", "mise-hotel-sop-app-standards-library"],
  ["staff-briefs", "mise-hotel-staff-app-operating-briefs"],
  ["staff-sequence", "mise-hotel-staff-app-shift-readiness-sequence"],
  ["staff-service-record", "mise-hotel-staff-service-record"],
  ["staff-inbox", "mise-hotel-staff-app-operations-inbox"],
  ["manager-overview", "mise-hotel-manager-dashboard-overview"],
  ["manager-assignments", "mise-hotel-manager-dashboard-assignments"],
  ["manager-readiness", "mise-hotel-manager-dashboard-acknowledgements"],
  ["manager-team-progress", "mise-hotel-manager-dashboard-team-readiness"],
  ["manager-standard-results", "mise-hotel-manager-dashboard-sop-results"],
  ["author-create-standard", "mise-hotel-standards-workspace-create-sop"],
  ["author-feedback-inbox", "mise-hotel-standards-workspace-feedback-inbox"],
];

async function findSource(dirs, slug) {
  for (const dir of dirs) {
    for (const ext of ["png", "jpg", "jpeg", "webp", "avif"]) {
      const candidate = out(dir, `${slug}.${ext}`);
      try {
        await fs.access(candidate);
        return candidate;
      } catch {
        /* keep looking */
      }
    }
  }
  return null;
}

async function blur(pipeline) {
  const buf = await pipeline.clone().resize(16).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

async function emit(base, outDir, seo, widths) {
  await fs.mkdir(outDir, { recursive: true });
  const meta = await base.metadata();
  const srcW = meta.width;
  const usable = [...new Set(widths.filter((w) => w < srcW).concat(srcW > Math.max(...widths) ? [] : [srcW]))]
    .sort((a, b) => a - b)
    .filter((w) => w <= srcW);
  if (!usable.length) usable.push(srcW);
  const avif = [];
  const webp = [];
  for (const w of usable) {
    const resized = base.clone().resize({ width: w });
    const a = `${seo}-${w}.avif`;
    const b = `${seo}-${w}.webp`;
    await resized.clone().avif({ quality: 55, effort: 6 }).toFile(path.join(outDir, a));
    await resized.clone().webp({ quality: 78 }).toFile(path.join(outDir, b));
    avif.push([a, w]);
    webp.push([b, w]);
  }
  return { usable, avif, webp, srcW, srcH: meta.height };
}

async function main() {
  const manifest = {};
  const missing = [];

  for (const person of PEOPLE) {
    const src = await findSource([`assets/raw/${person.group}`, `public/images/${person.group}/raw`], person.slug);
    if (!src) {
      missing.push(`${person.group}/${person.slug}`);
      continue;
    }
    const crop = CROPS[person.slug];
    let base = sharp(src).rotate();
    if (crop) base = base.extract(crop);
    // Materialise the crop so later metadata() calls report the cropped size.
    const cropped = sharp(await base.toBuffer());
    const outDir = out("public/images", person.group);
    const { avif, webp, srcW, srcH } = await emit(cropped, outDir, person.seo, PORTRAIT_WIDTHS);
    const prefix = `/images/${person.group}/`;
    manifest[`${person.group}/${person.slug}`] = {
      width: srcW,
      height: srcH,
      avif: avif.map(([f, w]) => `${prefix}${f} ${w}w`).join(", "),
      webp: webp.map(([f, w]) => `${prefix}${f} ${w}w`).join(", "),
      src: `${prefix}${webp[webp.length - 1][0]}`,
      blurDataURL: await blur(cropped),
    };
    console.log(`✓ ${person.group}/${person.slug} → ${person.seo} (${avif.map(([, w]) => w).join("/")})`);
  }

  for (const [name, seo] of PRODUCT) {
    const src = await findSource(["assets/raw/product"], name);
    if (!src) {
      missing.push(`product/${name}`);
      continue;
    }
    const base = sharp(src);
    const meta = await base.metadata();
    const half = Math.round(meta.width / 2);
    const { avif, webp, srcW, srcH } = await emit(base, out("public/images/product"), seo, [half, meta.width]);
    const prefix = "/images/product/";
    manifest[`product/${name}`] = {
      width: srcW,
      height: srcH,
      avif: avif.map(([f, w]) => `${prefix}${f} ${w}w`).join(", "),
      webp: webp.map(([f, w]) => `${prefix}${f} ${w}w`).join(", "),
      src: `${prefix}${webp[webp.length - 1][0]}`,
      blurDataURL: await blur(base),
    };
    console.log(`✓ product/${name} → ${seo}`);
  }

  await fs.writeFile(out("lib/images.manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  if (missing.length) {
    console.error(`\n✗ Missing source images:\n  ${missing.join("\n  ")}`);
    console.error("Drop them into assets/raw/<group>/ (or public/images/<group>/raw/) and re-run.");
    process.exit(1);
  }
  console.log(`\nWrote lib/images.manifest.json (${Object.keys(manifest).length} images)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
