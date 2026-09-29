// Summarises qa/results/*.json from the visual QA run.
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "qa", "results");
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json")) : [];
const rows = files.flatMap((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
const overflow = rows.filter((r) => r.overflow > 1);
const byRule = new Map();
for (const r of rows) {
  for (const v of r.axe ?? []) {
    const key = `${v.impact} · ${v.id}`;
    const entry = byRule.get(key) ?? { count: 0, pages: new Set(), samples: [] };
    entry.count += v.nodes;
    entry.pages.add(`${r.theme} ${r.path} @${r.width}`);
    if (entry.samples.length < 4) entry.samples.push(...v.samples.slice(0, 1));
    byRule.set(key, entry);
  }
}
console.log(`Checks: ${rows.length} page×width×theme combinations from ${files.length} route×theme runs.`);
console.log(`Horizontal overflow: ${overflow.length}`);
overflow.slice(0, 30).forEach((r) => console.log(`  ${r.theme} ${r.path} @${r.width}: +${r.overflow}px`));
console.log(`Axe rules violated: ${byRule.size}`);
for (const [rule, e] of byRule) {
  console.log(`  ${rule}: ${e.count} nodes on ${e.pages.size} page views`);
  e.samples.forEach((s) => console.log(`     e.g. ${s}`));
  console.log(`     pages: ${[...e.pages].slice(0, 6).join(" | ")}`);
}
