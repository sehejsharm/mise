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
    home: true,
    allowLms: true,
    q: "Is Mise an LMS?",
    a: "No. Mise is a service execution platform, not an LMS. A learning management system tracks courses and completion. Mise runs your SOPs as timed tasks during the shift and records whether each standard was executed, with photo evidence and supervisor sign-off, in an audit-ready service record.",
    homeAnswer:
      "No. An LMS tracks course completion. Mise runs SOPs as timed tasks during the shift and records whether each standard was executed, with evidence.",
  },
  {
    group: "How it works",
    home: true,
    q: "How does Mise digitize hotel SOPs?",
    a: "Mise turns each SOP into a timed task. The standards owner writes the steps, a target time and reference photos in the standards workspace, marks which steps need photo evidence, and publishes. The standard then arrives on staff phones as a timed task with a countdown, and every completion writes to the service record.",
    homeAnswer:
      "Each SOP becomes a timed task: steps, target time, reference photos and photo gates, published straight onto staff phones.",
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
    q: "Does Mise need PMS integration?",
    a: "No. Mise needs no PMS integration and no hardware. It runs in any browser, on any phone, over mobile data. Staff use the phones they already carry and managers use any desktop browser, so a pilot starts on a property rather than on an integration project.",
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
      "One property, starting with the department where standards slip most — front office, housekeeping, F&B, kitchen or engineering. Your SOPs become timed tasks, and the service record fills with evidence from the first shifts.",
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
    a: "The first standards can run within days of starting a one-property pilot. Converting a single SOP into a timed task takes minutes once its steps are clear; we do one live during the 15-minute demo.",
  },
  {
    group: "Setup",
    q: "How much does Mise cost?",
    a: "We do not publish prices. Pilots are scoped per property, and pricing follows the scope we agree after a 15-minute demo. Book a demo to discuss your property.",
  },
  {
    group: "Setup",
    q: "Which departments can use Mise?",
    a: "Every department that runs repeatable standards: front office, housekeeping, F&B service, kitchen, engineering and maintenance, security and safety, spa and wellness, and guest relations. Each runs its own SOPs as timed tasks with photo evidence in the same app, writing to one service record.",
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
  title: "Mise FAQ: Hotel SOP Software Questions Answered | Mise",
  description:
    "Mise FAQ: answers about Mise hotel SOP software, how it digitizes SOPs, evidence, PMS, pilots, pricing, data and Focus Realm. Book a 15-min demo.",
  h1: "Mise FAQ: hotel SOP software, answered",
  primaryKeyword: "Mise FAQ",
  secondaryKeywords: ["Mise SOP", "Mise hotel operations", "Mise by Focus Realm"],
  eyebrow: "Frequently asked",
  updated: "2026-10-01",
};
