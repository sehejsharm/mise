/**
 * Homepage copy. Kept in one module so the copy budget (≤700 words of body
 * copy, section headlines ≤9 words) is easy to audit: `pnpm seo:report`
 * counts the rendered words.
 */
import type { TickerItem } from "@/components/home/ServiceTicker";
import { departmentTicker } from "@/content/departments";

export const homeMeta = {
  path: "/",
  title: "Best Hotel SOP Software & Photo Proof Task Tracking | Mise",
  description:
    "Mise is the standalone hotel SOP software with photo proof verification and timed task tracking. Replace WhatsApp and Excel with zero PMS integration required.",
  h1: "The SOP app for hotels. Every department, every shift.",
  primaryKeyword: "hotel SOP software",
  secondaryKeywords: [
    "SOP app for hotels",
    "standalone hotel SOP software",
    "hotel photo proof software",
    "hotel timed task software",
    "hotel supervisor sign-off app",
    "hotel duty manager handover app",
    "hotel operations software",
    "Mise by Focus Realm",
  ],
  ogTitle: "Standalone Hotel SOP Software & Photo Proof Task Tracking | Mise",
  ogDescription:
    "Digitize hotel SOPs with real-time photo proof, timed tasks, and supervisor sign-offs. Replace WhatsApp group chats and manual Excel spreadsheets without needing PMS integration.",
  ogImageAlt: "Mise Hotel Operations & Photo Proof SOP Platform Interface",
  twitterTitle: "Standalone Hotel SOP Software & Photo Proof Task Tracking | Mise",
  twitterDescription:
    "Digitize hotel SOPs with real-time photo proof, timed tasks, and supervisor sign-offs. Eliminate ghost SOPs and replace WhatsApp for hotel operations.",
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
  title: "Five places. One SOP app for hotels.",
  cards: [
    { icon: "binder", place: "The SOP binder", line: "Written once, opened never." },
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
