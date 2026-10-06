/**
 * Internal-linking engine.
 *
 * A keyword → URL map. `autolink()` turns the FIRST mention of each mapped term
 * on a page into a link, at most once per term AND once per destination, never
 * to the page it is on, and never inside an existing link or a heading. Anchor
 * text is always the matched phrase itself, which keeps it descriptive
 * ("hotel standards into execution"), never "click here".
 *
 * Longer phrases are listed first so "audit-ready service record" wins over
 * "service record".
 */
export type LinkRule = { terms: string[]; href: string };

export const linkRules: LinkRule[] = [
  { terms: ["put hotel standards into execution", "hotel standards into execution"], href: "/standards-to-execution" },
    { terms: ["audit-ready service record", "hotel audit readiness", "audit readiness"], href: "/audit-readiness" },
  { terms: ["service execution platform"], href: "/glossary/service-execution-platform" },
  { terms: ["hotel service execution platform", "service execution platform (SEP)"], href: "/" },
  { terms: ["service execution platform for every department", "hotel departmental workflow software", "every hotel department"], href: "/solutions" },
  { terms: ["hotel operations task management"], href: "/platform" },
  { terms: ["departmental SOP", "departmental SOPs"], href: "/glossary/departmental-sop" },
  { terms: ["hotel operations software"], href: "/platform" },
  { terms: ["supervisor bottleneck"], href: "/problems/supervisor-bottleneck" },
  { terms: ["ghost SOP", "ghost SOPs"], href: "/problems/ghost-sop" },
  { terms: ["invisible performance gap"], href: "/problems/invisible-performance-gap" },
  { terms: ["attrition bleed"], href: "/problems/attrition-bleed" },
  { terms: ["star rating ceiling"], href: "/problems/star-rating-ceiling" },
  { terms: ["audit ambush"], href: "/problems/audit-ambush" },
  { terms: ["photo gate", "photo gates"], href: "/glossary/photo-gate" },
  { terms: ["timed task", "timed tasks"], href: "/glossary/timed-task" },
  { terms: ["operating brief", "operating briefs"], href: "/glossary/operating-brief" },
  { terms: ["supervisor sign-off", "supervisor sign-offs"], href: "/glossary/supervisor-sign-off" },
  { terms: ["shift handover"], href: "/glossary/shift-handover" },
  { terms: ["service record"], href: "/glossary/service-record" },
  { terms: ["housekeeping execution", "housekeeping checklist"], href: "/solutions/housekeeping" },
  { terms: ["front desk service execution", "front office execution"], href: "/solutions/front-office" },
  { terms: ["F&B service execution", "food and beverage execution"], href: "/solutions/food-and-beverage" },
  { terms: ["hotel kitchen execution", "FSSAI hygiene checklist"], href: "/solutions/kitchen" },
  { terms: ["hotel maintenance task tracking", "preventive maintenance checklist", "engineering execution"], href: "/solutions/engineering" },
  { terms: ["hotel security round app", "fire safety checklist", "fire-exit round"], href: "/solutions/security-and-safety" },
  { terms: ["spa service execution", "spa and wellness execution"], href: "/solutions/spa-and-wellness" },
  { terms: ["multi-property hotel groups", "multi-property", "hotel chains"], href: "/solutions/hotel-chains" },
  { terms: ["boutique hotels", "boutique hotel"], href: "/solutions/boutique-hotels" },
  { terms: ["manager dashboard"], href: "/platform#manager" },
  { terms: ["standards workspace"], href: "/platform#standards" },
  { terms: ["WhatsApp groups", "WhatsApp group"], href: "/compare/mise-vs-whatsapp" },
  { terms: ["Excel tracker", "Excel trackers", "spreadsheet tracker"], href: "/compare/mise-vs-excel" },
  { terms: ["checklist app", "checklist apps"], href: "/compare/execution-platform-vs-checklist-app" },
  { terms: ["cost of staff turnover", "cost of hotel staff turnover"], href: "/roi" },
  { terms: ["one-property pilot", "one property pilot"], href: "/how-it-works#pilot" },
];

type Compiled = { re: RegExp; href: string; key: string };

const compiled: Compiled[] = linkRules.flatMap((rule) =>
  rule.terms.map((term) => ({
    key: rule.terms[0].toLowerCase(),
    href: rule.href,
    re: new RegExp(`(?<![\\w-])${term.replace(/[.*+?^${}()|[\]\\&]/g, (m) => (m === "&" ? "&" : `\\${m}`))}(?![\\w-])`, "i"),
  })),
);

export type LinkState = {
  /** Path of the page being rendered; links to it are skipped. */
  path: string;
  usedTerms: Set<string>;
  usedHrefs: Set<string>;
};

export function createLinkState(path: string): LinkState {
  return { path, usedTerms: new Set(), usedHrefs: new Set() };
}

export type Segment = { text: string; href?: string };

function samePage(href: string, path: string) {
  const base = href.split("#")[0] || "/";
  return base === path;
}

/**
 * Splits `text` into plain and linked segments, consuming at most one link per
 * term and per destination from `state`.
 */
export function autolink(text: string, state: LinkState): Segment[] {
  const segments: Segment[] = [{ text }];
  for (const rule of compiled) {
    if (state.usedTerms.has(rule.key) || state.usedHrefs.has(rule.href) || samePage(rule.href, state.path)) continue;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      if (seg.href) continue;
      const match = rule.re.exec(seg.text);
      if (!match) continue;
      const before = seg.text.slice(0, match.index);
      const hit = match[0];
      const after = seg.text.slice(match.index + hit.length);
      const replacement: Segment[] = [];
      if (before) replacement.push({ text: before });
      replacement.push({ text: hit, href: rule.href });
      if (after) replacement.push({ text: after });
      segments.splice(i, 1, ...replacement);
      state.usedTerms.add(rule.key);
      state.usedHrefs.add(rule.href);
      break;
    }
  }
  return segments;
}

/** Marks explicit links already present on the page so the engine does not duplicate them. */
export function reserveHref(state: LinkState, href: string) {
  state.usedHrefs.add(href);
}
