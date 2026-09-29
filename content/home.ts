/**
 * Homepage copy. Kept in one module so the copy budget (≤700 words of body
 * copy, section headlines ≤9 words) is easy to audit: `pnpm seo:report`
 * counts the rendered words.
 */
import type { TickerItem } from "@/components/home/ServiceTicker";

export const homeMeta = {
  path: "/",
  title: "Hotel SOP Software for Service Execution | Mise",
  description:
    "Mise is hotel SOP software that turns SOPs into timed tasks on staff phones, with photo evidence and an audit-ready service record. Book a 15-min demo.",
  h1: "Hotel SOP software that runs inside every shift.",
  primaryKeyword: "hotel SOP software",
  secondaryKeywords: [
    "service execution platform",
    "hotel operations software",
    "digital SOP for hotels",
    "Mise hotel software",
    "Mise hospitality",
    "Mise SOP platform",
    "Mise by Focus Realm",
  ],
  ogTitle: "Mise — hotel SOP software that runs inside every shift",
  eyebrow: "Service Execution Platform",
  updated: "2026-09-29",
  priority: 1,
};

export const ticker: TickerItem[] = [
  { time: "07:52", where: "Room 204", what: "HSK-101 started · Maya F.", tone: "cyan" },
  { time: "08:14", where: "Room 206", what: "Step 3 of 8 · on time", tone: "cyan" },
  { time: "08:39", where: "Room 208", what: "Photo evidence attached · step 4", tone: "green" },
  { time: "08:42", where: "Room 208", what: "Supervisor sign-off · E. Rossi", tone: "gold" },
  { time: "08:47", where: "Room 210", what: "Released to front office", tone: "green" },
  { time: "09:03", where: "Lobby", what: "Arrival check · evidence held", tone: "green" },
  { time: "09:15", where: "Room 305", what: "Blocked · maintenance flag", tone: "coral" },
  { time: "09:21", where: "Handover", what: "Acknowledged · J. Lee", tone: "gold" },
];

export const fiveSeconds = {
  eyebrow: "The five-second question",
  title: "Hotel audit readiness, answered in one filter",
  question: "Was room 208 reset to standard this morning, and can you prove it?",
  without: {
    label: "Five calls",
    steps: [
      { call: "Call the floor supervisor", result: "Wasn't there" },
      { call: "Radio the attendant", result: "Mid-shift" },
      { call: "Ask for the photo", result: "Somewhere" },
      { call: "Search a camera roll", result: "Personal phone" },
      { call: "Check the audit file", result: "Proof: none" },
    ],
  },
  with: {
    label: "One filter",
    filter: "room:208 · today",
    record: [
      { k: "Standard", v: "HSK-101 Guest room reset" },
      { k: "Completed", v: "08:39 · 24 of 26 min" },
      { k: "Evidence", v: "Photo, step 4 (gated)" },
      { k: "Sign-off", v: "E. Rossi · 08:42" },
    ],
    verdict: "Answered in one beat.",
  },
};

export const fivePlaces = {
  eyebrow: "What it replaces",
  title: "Five places. One hotel operations platform.",
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
  counters: [
    { label: "Released", value: 214, tone: "green" },
    { label: "In progress", value: 41, tone: "cyan" },
    { label: "Blocked", value: 7, tone: "coral" },
    { label: "Queued", value: 206, tone: "muted" },
  ] as const,
  departments: [
    { name: "Housekeeping", value: 92 },
    { name: "Food & beverage", value: 88 },
    { name: "Guest relations", value: 90 },
    { name: "Front office", value: 84 },
    { name: "Engineering", value: 79 },
  ],
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
