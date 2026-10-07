/**
 * Homepage copy. Kept in one module so the copy budget (≤700 words of body
 * copy, section headlines ≤9 words) is easy to audit: `pnpm seo:report`
 * counts the rendered words.
 */
import type { TickerItem } from "@/components/home/ServiceTicker";
import { departmentTicker } from "@/content/departments";

export const homeMeta = {
  path: "/",
  title: "Hotel Service Execution Platform (SEP) & Timed Task Tracking | Mise",
  description:
    "Mise is the service execution platform (SEP) for hotels. Run your existing standards as timed tasks with photo proof across every department. No PMS needed.",
  h1: "The service execution platform for hotels. Every department, every shift.",
  primaryKeyword: "service execution platform",
  secondaryKeywords: [
    "hotel service execution platform",
    "SEP for hotels",
    "hotel photo proof software",
    "hotel timed task software",
    "hotel supervisor sign-off app",
    "hotel duty manager handover app",
    "hotel operations software",
    "Mise by Focus Realm",
  ],
  ogTitle: "Service Execution Platform (SEP) for Hotels | Mise",
  ogDescription:
    "Implement your hotel's existing standards as timed tasks with photo proof and supervisor evidence. Run every department without PMS integration.",
  ogImageAlt: "Mise Service Execution Platform Interface",
  twitterTitle: "Service Execution Platform (SEP) for Hotels | Mise",
  twitterDescription:
    "Run your hotel's existing SOPs as timed tasks on staff phones with photo proof and supervisor evidence. Eliminate ghost SOPs across all departments.",
  eyebrow: "Service Execution Platform",
  updated: "2026-10-06",
  priority: 1,
};

/** Service-record ticker: departments interleaved (Aurora Grand Colombo demo data). */
export const ticker: TickerItem[] = departmentTicker.map((t) => ({ ...t }));

export const fiveSeconds = {
  eyebrow: "The five-second question",
  title: "Hotel audit readiness, answered in one filter",
  without: {
    label: "Five calls",
    steps: [
      { call: "Call the duty supervisor", result: "Off shift" },
      { call: "Radio whoever was on", result: "Mid-task" },
      { call: "Ask for the photo", result: "Somewhere" },
      { call: "Search a camera roll", result: "Personal phone" },
      { call: "Check the audit file", result: "Proof: none" },
    ],
  },
  with: { label: "One filter", verdict: "Answered in one beat." },
};

export const fivePlaces = {
  eyebrow: "What it replaces",
  title: "Five places. One service execution platform.",
  cards: [
    { icon: "binder", place: "The standards binder", line: "Written once, opened never." },
    { icon: "whatsapp", place: "The WhatsApp group", line: "Instructions that scroll away." },
    { icon: "memory", place: "Memory", line: "Whoever is senior today." },
    { icon: "photos", place: "The camera roll", line: "Proof on a personal phone." },
    { icon: "calendar", place: "Audit prep week", line: "Evidence rebuilt by hand." },
  ] as const,
  mise: { title: "Mise", line: "Standard, task, evidence and record, on one shift." },
};

export const liveFloor = {
  eyebrow: "Live floor",
  title: "The hotel GM dashboard, live as the shift runs",
  evidence: [61, 64, 63, 69, 72, 71, 76, 79, 81, 80, 85, 88, 91, 94],
};

export const runsOn = {
  eyebrow: "Zero setup",
  title: "Runs on what your hotel already has",
  tiles: [
    { icon: "globe", title: "Any browser", line: "No app store install." },
    { icon: "signal", title: "Mobile data", line: "Light on any network." },
    { icon: "plugOff", title: "No PMS integration", line: "Your PMS stays untouched." },
    { icon: "phone", title: "No hardware", line: "Staff's own phones." },
  ] as const,
};

export const whoFor = {
  eyebrow: "Who it's for",
  title: "Hotel operations software for every decision-maker",
  cards: [
    { href: "/for/hr-directors", who: "HR Directors", line: "Readiness and acknowledgement evidence, per person." },
    { href: "/for/general-managers", who: "General Managers", line: "One live picture of service, floor by floor." },
    { href: "/for/learning-and-development", who: "L&D Heads", line: "Standards measured by execution, not attendance." },
    { href: "/solutions/hotel-chains", who: "Hotel-group founders", line: "One standards library, evidenced at every property." },
  ],
};
