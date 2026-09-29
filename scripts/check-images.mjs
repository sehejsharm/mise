#!/usr/bin/env node
/**
 * Fails the build if any founder or advisor portrait is missing, if a
 * manifest entry points at a file that does not exist, or if the retired
 * "/author/platform" screenshot has crept back in. Never ship silhouettes.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "lib/images.manifest.json"), "utf8"));
const errors = [];

const siteSource = fs.readFileSync(path.join(root, "content/site.ts"), "utf8");
const founderPhotos = [...siteSource.matchAll(/photo: "(team\/[a-z-]+)"/g)].map((m) => m[1]);
if (founderPhotos.length < 3) errors.push(`Expected 3 founder photos in content/site.ts, found ${founderPhotos.length}.`);
for (const key of founderPhotos) if (!manifest[key]) errors.push(`Founder image missing from manifest: ${key}`);

const advisorsDir = path.join(root, "content/advisors");
for (const file of fs.readdirSync(advisorsDir).filter((f) => f.endsWith(".json"))) {
  const a = JSON.parse(fs.readFileSync(path.join(advisorsDir, file), "utf8"));
  const ok = (a.photo && manifest[a.photo]) || (a.photoUpload && fs.existsSync(path.join(root, "public", a.photoUpload)));
  if (!ok) errors.push(`Advisor "${a.name}" (${file}) has no processed photo or uploaded image.`);
}

for (const [key, entry] of Object.entries(manifest)) {
  for (const set of [entry.avif, entry.webp]) {
    for (const part of set.split(",")) {
      const file = part.trim().split(" ")[0];
      if (!fs.existsSync(path.join(root, "public", file))) errors.push(`${key}: missing file public${file}`);
    }
  }
}

const forbidden = /pilot-foundation|author-platform/;
if (Object.keys(manifest).some((k) => forbidden.test(k))) errors.push("The retired /author/platform screenshot is in the image manifest.");
for (const f of fs.readdirSync(path.join(root, "public/images/product"))) {
  if (forbidden.test(f)) errors.push(`Retired screenshot shipped: public/images/product/${f}`);
}

if (errors.length) {
  console.error(`\n✗ check-images:\n  - ${errors.join("\n  - ")}\n`);
  process.exit(1);
}
console.log(`✓ check-images: ${Object.keys(manifest).length} images present, all founders and advisors have portraits.`);
