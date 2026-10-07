#!/usr/bin/env node
/**
 * Copy lint. Runs after `next build` (postbuild) and fails the build when:
 *
 * 1. Retired LMS vocabulary ("LMS", "course", "module", "learner",
 *    "training platform") appears in rendered copy outside the allowed places:
 *    - /compare/mise-vs-hotel-lms and the "what is a service execution
 *      platform" post (Mise-vs-LMS comparison content),
 *    - elements marked data-copy-lint="allow" (the "Is Mise an LMS?" FAQ,
 *      quoted testimonials, links to the LMS comparison),
 *    - the exact negation in the canonical definition ("Not an LMS").
 * 2. Confidential terms appear anywhere in the repository. They are stored
 *    obfuscated below so this file never contains them literally.
 */
import fs from "node:fs";
import path from "node:path";
import { parse } from "node-html-parser";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const failures = [];

/* ── 1. Confidential terms, anywhere in the repo ─────────────────────── */

const rev = (s) => s.split("").reverse().join("");
const confidential = [
  { label: "partner name A", re: new RegExp(`\\b${rev("noigeL")}\\b`, "i") },
  { label: "partner name B", re: new RegExp(`\\b${rev("CDT")}\\b`) },
  { label: "retired domain", re: new RegExp(["focus", "realm\\.com"].join("-"), "i") },
];
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "tmp", "test-results", "playwright-report", ".lighthouseci", "qa"]);
const TEXT_EXT = /\.(tsx?|mjs|cjs|js|json|mdoc|md|css|txt|ya?ml|html|svg|xml|env|example)$|^\.[a-z]+rc$/i;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (TEXT_EXT.test(entry.name) || entry.name.startsWith(".env")) out.push(full);
  }
  return out;
}

for (const file of walk(root)) {
  if (file.endsWith("pnpm-lock.yaml")) continue;
  // Base64 payloads (blur placeholders) can contain any letter sequence.
  const text = fs.readFileSync(file, "utf8").replace(/data:[a-z/+.-]+;base64,[A-Za-z0-9+/=]+/g, "");
  for (const term of confidential) {
    if (term.re.test(text)) failures.push(`${path.relative(root, file)}: contains a confidential term (${term.label})`);
  }
}

/* ── 2. LMS vocabulary in rendered copy ──────────────────────────────── */

const vocabulary = [/\bLMS\b/, /\bcourses?\b/i, /\bmodules?\b/i, /\blearners?\b/i, /\btraining platforms?\b/i];
const allowedPhrases = [/\bnot an LMS\b/gi, /\bwithout acting as an LMS\b/gi, /\bnot a learning management system\b/gi];
const allowedPages = [/compare\/mise-vs-hotel-lms\.html$/, /blog\/what-is-a-service-execution-platform\.html$/];

const appDir = path.join(root, ".next", "server", "app");
if (!fs.existsSync(appDir)) {
  console.error("copy-lint: .next/server/app not found. Run `next build` first.");
  process.exit(1);
}

function htmlFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) htmlFiles(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function check(text, where) {
  let clean = text;
  for (const re of allowedPhrases) clean = clean.replace(re, "");
  for (const re of vocabulary) {
    const m = clean.match(re);
    if (m) {
      const i = clean.search(re);
      failures.push(`${where}: "${m[0]}" in "…${clean.slice(Math.max(0, i - 60), i + 40).replace(/\s+/g, " ")}…"`);
    }
  }
}

let pages = 0;
for (const file of htmlFiles(appDir)) {
  const rel = path.relative(appDir, file);
  if (allowedPages.some((re) => re.test(rel))) continue;
  const doc = parse(fs.readFileSync(file, "utf8"));
  doc.querySelectorAll("script, style, noscript, template").forEach((n) => n.remove());
  doc.querySelectorAll("[data-copy-lint='allow']").forEach((n) => n.remove());
  const metas = doc
    .querySelectorAll("meta[name='description'], meta[property='og:description'], meta[name='twitter:description'], meta[property='og:title'], title")
    .map((m) => m.getAttribute("content") ?? m.text)
    .join(" \n ");
  check(`${doc.querySelector("body")?.text ?? ""}\n${metas}`, rel);
  pages++;
}

// Plain-text surfaces for AI engines. The "Is Mise an LMS?" Q/A is the allowed FAQ.
for (const name of ["llms.txt.body", "llms-full.txt.body"]) {
  const file = path.join(appDir, name);
  if (!fs.existsSync(file)) continue;
  const text = fs
    .readFileSync(file, "utf8")
    .replace(/Q: Is Mise an LMS\?\nA: [^\n]*/g, "")
    // The link line to the comparison page is a comparison label, like data-copy-lint="allow" on the site.
    .replace(/^.*compare\/mise-vs-hotel-lms.*$/gm, "");
  check(text, name);
}

// Client brands are never named on the site: not in copy, metadata, schema or the RSC payload.
const clientNames = /\b(clarks|hosteller)\b/i;
for (const file of [...htmlFiles(appDir), ...["llms.txt.body", "llms-full.txt.body"].map((n) => path.join(appDir, n))]) {
  if (!fs.existsSync(file)) continue;
  const m = fs.readFileSync(file, "utf8").match(clientNames);
  if (m) failures.push(`${path.relative(appDir, file)}: names a client ("${m[0]}"); client brands are not shown on the site`);
}

if (failures.length) {
  console.error(`\n✗ copy-lint: ${failures.length} problem(s)\n`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error("");
  process.exit(1);
}
console.log(`✓ copy-lint: ${pages} rendered pages and the repository are clean.`);
