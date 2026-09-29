#!/usr/bin/env node
/** Regenerates the Mise wordmark SVGs with the text converted to outlines (Space Grotesk 600). */
import fs from "node:fs";
import opentype from "opentype.js";
import sharp from "sharp";

const font = opentype.parse(fs.readFileSync("lib/og-fonts/space-grotesk-600.woff").buffer.slice(0));
const mark = `<rect width="32" height="32" rx="8" fill="#E5B35A"/><path d="M8.5 22.5V11l7.5 7.5 7.5-7.5v11.5" fill="none" stroke="#0C2329" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16" cy="7.6" r="1.7" fill="#0C2329"/>`;
const text = font.getPath("Mise", 42, 24.2, 25.5, { letterSpacing: -0.02 });
const d = text.toPathData(2);
const box = text.getBoundingBox();
const width = Math.ceil(box.x2 + 5);
for (const [file, fill] of [["public/brand/mise-logo.svg", "#F2F4EE"], ["public/brand/mise-logo-dark.svg", "#122D35"]]) {
  fs.writeFileSync(file, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 32" role="img" aria-label="Mise">${mark}<path d="${d}" fill="${fill}"/></svg>\n`);
}
await sharp("public/brand/mise-logo.svg", { density: 600 }).resize({ width: 1024 }).png().toFile("public/brand/mise-logo-light-on-dark-1024.png");
await sharp("public/brand/mise-logo-dark.svg", { density: 600 }).resize({ width: 1024 }).png().toFile("public/brand/mise-logo-dark-on-light-1024.png");
console.log("logo width", width);
