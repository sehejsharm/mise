import { brand } from "@/content/site";
import type { Faq } from "@/content/types";

/**
 * FAQ. Answers are answer-first: the first sentence answers the question on
 * its own. `home: true` marks the eight shown on the homepage (kept short to
 * respect the homepage copy budget; /faq carries the full set).
 */
export type FaqItem = Faq & { home?: boolean; homeAnswer?: string; group: string };

export const faqs: FaqItem[] = [
  {
    group: "About Mise",
    home: true,
    q: "What is Mise?",
    a: brand.definition,
    homeAnswer: brand.definition,
  },
  {
    group: "About Mise",
    q: "What is a service execution platform (SEP) for hotels?",
    a: "A service execution platform (SEP) is dedicated operational software that transforms a hotel's written guidelines into active floor execution. Mise is the service execution platform (SEP) for hotels: it does not write your standards; it implements the SOPs your hotel already has, running them as timed tasks on staff phones in every department, capturing photo and supervisor evidence as work happens, and building an audit-ready service record.",
  },
  {
    group: "How it works",
    q: 'How does a service execution platform eliminate "ghost SOPs"?',
    a: "\"Ghost SOPs\" occur when paper checklists or digital checkboxes are marked as \"done\" without physical completion on the floor. Mise eliminates ghost SOPs by acting as a dedicated photo proof execution platform. Frontline staff must submit timestamped visual proof for room setups, safety checks, and maintenance repairs before a task can be logged.",
  },
  {
    group: "How it works",
    q: "How does remote supervisor sign-off clear floor bottlenecks?",
    a: "Floor supervisors typically spend hours walking corridors to verify completed work manually. Functioning as high-accountability supervisor verification execution software, Mise allows department heads to inspect image proof and approve or reject tasks directly on their mobile screens, clearing inspection bottlenecks instantly.",
  },
  {
    group: "How it works",
    home: true,
    q: "What is a service execution platform (SEP) for hotels and why is PMS integration not required?",
    a: "Mise is the service execution platform (SEP) for hotels. It does not write your standards; it implements the SOPs your hotel already has, running them as timed tasks on staff phones in every department. Because it focuses entirely on floor-level service execution and supervisor verification, no PMS integration is required, enabling deployment across your property from day one.",
  },
  {
    group: "How it works",
    home: true,
    q: 'How does a service execution platform eliminate "ghost SOPs" and supervisor bottlenecks?',
    a: "Mise stops \"ghost SOPs\"—tasks checked off without actual execution—by requiring mandatory timestamped photo proof and supervisor evidence as work happens. Supervisors review task proof directly on their mobile devices, clearing inspection bottlenecks on the floor while building an audit-ready service record.",
  },
  {
    group: "How it works",
    home: true,
    q: "Why should hotel operations replace WhatsApp and Excel with a service execution platform?",
    a: "WhatsApp group chats and static Excel files lack real-time accountability, timed execution schedules, and structured proof. Mise replaces unstructured messaging with an accountable service execution platform that runs your standards as timed tasks on staff phones, tracks shift handovers, and maintains searchable execution records.",
  },
  {
    group: "How it works",
    home: true,
    allowLms: true,
    q: "How does Mise support multi-department hotel operations and audit compliance?",
    a: "Mise is built to execute standards across every department—including housekeeping, front office, maintenance, and F&B—rather than functioning solely as a single-department tool. It tracks timed task execution, captures supervisor sign-offs, and automatically builds permanent, audit-ready service records for hotel brand compliance without acting as an LMS.",
  },
  {
    group: "About Mise",
    home: true,
    allowLms: true,
    q: "Is Mise a Learning Management System (LMS)?",
    a: "No, Mise is strictly not an LMS. Traditional LMS platforms provide passive training videos and course modules for new hires. In contrast, Mise is an active hotel operations execution platform that drives daily, real-time shift accountability on the floor where work actually happens.",
    homeAnswer:
      "No. An LMS tracks course completion. Mise runs your existing standards as timed tasks during the shift and records whether each standard was executed, with evidence.",
  },
  {
    group: "How it works",
    home: true,
    q: "Does Mise replace my existing hotel standards or write new ones?",
    a: "No, Mise never writes or invents SOPs. Your hotel retains full ownership of its operational rules and brand standards. You simply bring your existing procedures, and Mise puts them into execution as structured, timed tasks delivered directly to staff devices.",
    homeAnswer:
      "No. Mise implements the standards you already have. Each one becomes a timed task with steps, target time and photo gates, on staff phones.",
  },
  {
    group: "How it works",
    home: true,
    q: "What evidence does Mise capture?",
    a: "Mise captures photos on gated steps, a timestamp for every step, task start and finish times against the target, the standard version, the person and location, and supervisor sign-off. Evidence is captured inside the task as the work happens, not uploaded afterwards.",
    homeAnswer:
      "Photos on gated steps, a timestamp per step, time against target, the standard version and supervisor sign-off, all captured inside the task.",
  },
  {
    group: "Setup",
    home: true,
    q: "Why is PMS integration not required to run Mise?",
    a: "Mise operates completely standalone. Traditional hotel software requires months of complex IT work, vendor API negotiations, and expensive Property Management System (PMS) integrations before deployment. Because Mise focuses on staff task timing, visual verification, and supervisor evidence, it requires zero PMS integration and runs in the browser on any iOS or Android phone from day one.",
    homeAnswer: "No. Mise runs in any browser, on any phone, over mobile data. No PMS integration, no hardware.",
  },
  {
    group: "How it works",
    home: true,
    q: "Who uses the three interfaces?",
    a: "Staff in every department, from front desk agents and cooks to technicians, security officers and therapists, use the mobile staff app to run timed tasks. Supervisors, duty managers and department heads use the desktop manager dashboard. Whoever owns the standards, often a quality, standards or L&D lead, uses the desktop standards workspace to write and publish them.",
    homeAnswer:
      "Staff run timed tasks on the mobile app; supervisors and managers use the desktop dashboard; standards owners write and publish in the standards workspace.",
  },
  {
    group: "Setup",
    home: true,
    q: "How does a pilot work?",
    a: "A pilot is scoped to one property, starting with the department where standards slip most: front office, housekeeping, F&B, kitchen or engineering. We convert your most important standards into timed tasks, your team runs them on real shifts, and the service record fills with evidence from the first days. Scope, and therefore pricing, is agreed on a call rather than from a rate card.",
    homeAnswer:
      "One property, starting with the department where standards slip most — front office, housekeeping, F&B, kitchen or engineering. The standards you already have become timed tasks, and the service record fills with evidence from the first shifts.",
  },
  {
    group: "About Mise",
    q: "Is Mise a hotel or a MICE venue?",
    a: "No. Mise (pronounced \"meez\", from the kitchen discipline mise en place) is the service execution platform (SEP) that hotels use to run their existing standards. It is not a hotel, an event venue or a MICE (meetings, incentives, conferences and exhibitions) business, and it does not take bookings.",
  },
  {
    group: "About Mise",
    home: true,
    q: "Is Mise related to Focus Realm?",
    a: "Yes. Mise is built by Focus Realm, its parent company, founded by Sehej Sharma, Ali Electricwala and Aditya Mishra. Mise is Focus Realm's hospitality platform. It is not affiliated with Focus Softnet or its Focus e-RMS product.",
    homeAnswer:
      "Yes. Mise is a Focus Realm company, founded by Sehej Sharma, Ali Electricwala and Aditya Mishra. It is not affiliated with Focus Softnet.",
  },
  {
    group: "About Mise",
    q: "Is Mise a PMS?",
    a: "No. Mise is not a property management system and does not handle reservations, rates, folios or room inventory. It runs service standards (the work that happens in rooms, outlets and at the desk) and records evidence of it, alongside whichever PMS you already use.",
  },
  {
    group: "About Mise",
    q: "Why is it called Mise?",
    a: "Mise comes from mise en place, the kitchen discipline of having everything in its place before service starts. Mise brings that discipline to every department, on every shift.",
  },
  {
    group: "How it works",
    q: "What is a photo gate?",
    a: "A photo gate is a step that cannot be completed until a photo is taken from inside the task. Standards owners choose which steps are gated, usually the ones a guest or auditor would check, so evidence exists for every one of them by design.",
  },
  {
    group: "How it works",
    q: "What is a service record?",
    a: "A service record is the time-ordered, attributable record of every standard executed at a property: the standard and version, the person, the location, times against target, completed steps, photo evidence and supervisor sign-off. Mise builds it automatically as tasks are completed.",
  },
  {
    group: "How it works",
    q: "Can staff use their own phones?",
    a: "Yes. The staff app runs in the browser of the phones staff already carry, with nothing to install from an app store. It is designed for one thumb on a small screen, in bright daylight, on a budget Android phone, over mobile data.",
  },
  {
    group: "How it works",
    q: "How are new staff onboarded?",
    a: "New joiners receive operating briefs sequenced in the order the work happens, each with an inline readiness check, and run the same timed tasks as experienced staff with the standard on screen. Supervisor sign-off on evidenced tasks marks them ready for each standard.",
  },
  {
    group: "Setup",
    q: "How long does it take to get started?",
    a: "The first standards can run within days of starting a one-property pilot. Setting up one existing standard as a timed task takes minutes once its steps are clear; we do one live during the 15-minute demo.",
  },
  {
    group: "Setup",
    q: "How much does Mise cost?",
    a: "We do not publish prices. Pilots are scoped per property, and pricing follows the scope we agree after a 15-minute demo. Book a demo to discuss your property.",
  },
  {
    group: "Setup",
    q: "Which hotel departments can use the platform?",
    a: "Mise is built for every department across your property. Housekeeping: timed room checks, turndown schedules and linen controls with photo proof. Front desk: duty manager shift handover logs, VIP arrivals and guest issue tracking. Maintenance: equipment servicing, work order sign-offs and facility inspections. Food & beverage: kitchen sanitation schedules, temperature tracking and pre-service setup checks. Kitchen, security and safety, and spa and wellness teams run their standards the same way.",
  },
  {
    group: "Trust",
    q: "Where is Mise's data stored?",
    a: "Mise runs on Google Cloud and Firebase. Our security page explains what data is collected, how access is controlled by role, and how our policies reflect India's Digital Personal Data Protection Act, 2023.",
  },
  {
    group: "Trust",
    q: "Does Mise hold security certifications?",
    a: "We do not claim any security or compliance certifications. Our security page states plainly how data is handled and which controls are in place today.",
  },
  {
    group: "Trust",
    q: "Who is Mise for?",
    a: "Mise is for hotels, resorts and hotel groups, and for the people accountable for service there: HR Directors, General Managers, L&D Heads and hotel-group founders and operators.",
  },
  {
    group: "Trust",
    q: "Where is Mise available?",
    a: "Mise works with hotels in India and across South Asia, including Sri Lanka. It runs in a browser with no integrations, so there is no technical restriction on location.",
  },
];

export const homeFaqs = faqs.filter((f) => f.home);

export const faqMeta = {
  path: "/faq",
  title: "Hotel Service Execution Platform (SEP) FAQ | Mise",
  description:
    "Get answers about Mise, the hotel service execution platform (SEP). Learn how to implement existing standards, track timed tasks, and eliminate ghost SOPs.",
  h1: "Frequently Asked Questions",
  ogTitle: "Frequently Asked Questions: Hotel Service Execution Platform (SEP) Explained | Mise",
  ogDescription: "Everything you need to know about running hotel standards as timed tasks with real-time photo proof, mobile supervisor sign-offs, and zero PMS setup.",
  ogImageAlt: "Mise Frequently Asked Questions & Knowledge Base Interface",
  twitterTitle: "Hotel Service Execution Platform FAQ | Mise Knowledge Base",
  twitterDescription: "Got questions about hotel service execution platforms? Learn how Mise runs existing SOPs as timed tasks with photo proof across every department.",
  primaryKeyword: "hotel service execution platform",
  secondaryKeywords: ["Mise FAQ", "Mise SEP", "Mise hotel operations", "Mise by Focus Realm"],
  eyebrow: "Frequently asked",
  updated: "2026-10-18",
};
