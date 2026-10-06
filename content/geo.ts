import type { Longform } from "@/content/types";

export const indiaPage: Longform = {
  meta: {
    path: "/hotel-service-execution-india",
    title: "Hotel Service Execution Platform, Built in India | Mise",
    description:
      "A hotel service execution platform for India, on any phone over mobile data: timed tasks, photo evidence, audit-ready records, no PMS. Book a demo.",
    h1: "A hotel service execution platform built in India, for Indian hotels",
    primaryKeyword: "hotel service execution platform India",
    secondaryKeywords: ["service execution for Indian hotels", "hotel staff task app India"],
    eyebrow: "Mise in India",
    updated: "2026-09-29",
    priority: 0.8,
  },
  eyebrow: "Mise in India",
  lede:
    "Mise is the service execution platform India's hotel teams can run on the phones they already carry. It was built by Focus Realm in India around the realities of Indian hotel operations: budget Android phones, mobile data, large multi-department teams, WhatsApp-run shifts and audits that arrive with little notice. Standards become timed tasks, key steps need photo evidence, and every shift builds an audit-ready record.",
  tldr:
    "Mise is a service execution platform built in India for hotels. It runs the SOPs hotels already have as timed tasks on staff phones in a browser over mobile data, with photo evidence and supervisor sign-off, and no PMS integration or hardware. Pilots start at one property, usually in housekeeping.",
  leadImage: {
    dept: "rotate",
    alt: "Mise, the service execution platform India's hotel teams run on a budget phone: the staff app with each department's next timed task and target time",
    device: "phone",
  },
  body: `
## Why service execution for Indian hotels has to be different

Service execution for Indian hotels has to work in conditions many global tools were not designed for. Staff often use their own budget Android phones. Connectivity in back-of-house areas can be patchy, so the app must be light on mobile data. Teams are large and span several departments, and shift coordination often runs through WhatsApp groups. Mise was designed for exactly this posture: one thumb, a 340px screen, bright light and a mid-range phone.

## A hotel staff task app India's floor teams will actually open

Adoption decides everything. The staff app:

- **opens in the browser**, with nothing to install from an app store and no device management;
- **shows the next timed task first**, with the standard's steps and reference photos on screen;
- **closes steps in one tap**, and gated steps with one photo;
- **keeps text short and visual**, so the standard is clear at a glance.

## Built for Indian hotel audits and inspections

Indian hotels answer to several kinds of review: brand audits, owner reviews, food safety inspections and, for classified properties, star classification. Classification criteria are published by the [Ministry of Tourism](https://tourism.gov.in/schemes-and-guidelines/guidelines/guidelines-hotel-and-resort-star-classification), and food safety requirements are set by FSSAI, whose published guidance includes its [Hygiene Rating Scheme](https://www.fssai.gov.in/docs/eri/Hygiene_Rating_Document_Jan21_VerIV.pdf).

Mise does not certify compliance with any of these. It runs the procedures you have written to meet them as timed tasks, and keeps dated, attributable evidence that they ran. See [hotel audit readiness](/audit-readiness).

## No PMS integration, no IT project

Many Indian hotels run a PMS that is hard to integrate with, or a mix of systems across a group. Mise needs none of that. It runs alongside whatever you use, so a pilot starts on a property rather than on an integration roadmap.

## One property first, then the group

Every pilot is scoped to one property. We usually start in housekeeping, convert the standards that matter most, and let the service record fill for the first weeks. Groups then extend property by property. See [multi-property service execution](/solutions/hotel-chains).

## Data handling

Mise runs on Google Cloud and Firebase. Read [security and data handling](/security) for what is collected, who can see it, and how India's data protection law is reflected in our policies.
`,
  faqs: [
    {
      q: "Is Mise built for Indian hotels?",
      a: "Yes. Mise is built by Focus Realm in India for hotel operations: it runs in a browser on budget Android phones over mobile data, needs no PMS integration or hardware, and is designed for large, multi-department teams that often coordinate shifts through WhatsApp.",
    },
    {
      q: "Does Mise work on staff's own phones?",
      a: "Yes. Staff use a browser on the phones they already carry, with nothing to install from an app store. The staff app is designed for one thumb on a small screen in bright light.",
    },
    {
      q: "Does Mise help with FSSAI or Ministry of Tourism requirements?",
      a: "Mise does not certify compliance. It helps you run the procedures you have written to meet FSSAI food safety requirements or classification criteria, and keeps dated, attributable evidence that they were carried out.",
    },
  ],
  related: [
    { href: "/hotel-service-execution-south-asia", label: "Hotel operations software in South Asia", note: "Sri Lanka and beyond." },
    { href: "/solutions/housekeeping", label: "Housekeeping execution", note: "Where Indian pilots start." },
    { href: "/compare/mise-vs-whatsapp", label: "Replace WhatsApp for hotel operations", note: "Move work out of chat." },
    { href: "/standards-to-execution", label: "Standards to execution", note: "The step-by-step guide." },
  ],
  relatedPosts: ["replace-whatsapp-hotel-task-tracking", "how-to-digitize-hotel-sops"],
};

export const southAsiaPage: Longform = {
  meta: {
    path: "/hotel-service-execution-south-asia",
    title: "Hotel Operations Software for South Asia | Mise",
    description:
      "Hotel operations software for South Asia, built as a service execution platform: timed tasks, photo evidence and audit-ready records. Book a demo.",
    h1: "Hotel operations software for South Asia, from Colombo to Kathmandu",
    primaryKeyword: "hotel operations software South Asia",
    secondaryKeywords: ["hotel service execution platform Sri Lanka"],
    eyebrow: "Mise in South Asia",
    updated: "2026-09-29",
    priority: 0.7,
  },
  eyebrow: "Mise in South Asia",
  lede:
    "Mise is hotel operations software for South Asia's hotels and resorts: a service execution platform that runs the SOPs hotels already have as timed tasks on staff phones and builds an audit-ready service record every shift. Our demo property, Aurora Grand Colombo, is set in Sri Lanka for a reason. The operating conditions Mise was designed for are shared across the region.",
  tldr:
    "Mise runs hotel standards as timed tasks on staff phones in a browser, with photo evidence, supervisor sign-off and no PMS integration or hardware. It suits South Asian hotels and resorts, including in Sri Lanka, where teams are large, phones are budget Android and shift coordination often runs through chat apps.",
  leadImage: {
    key: "product/manager-overview",
    alt: "Mise hotel operations software for South Asia showing the Aurora Grand Colombo demo property overview",
    device: "laptop",
  },
  body: `
## Shared operating conditions across South Asia

Hotels across South Asia share many of the same operating realities: large teams across several departments, staff using their own budget Android phones, patchy back-of-house connectivity, shift coordination in chat groups, and demanding international guests with high expectations. Hotel operations software for South Asia has to be light, mobile-first and quick to adopt. Mise is built around those constraints.

## Hotel service execution for Sri Lanka

Our demo environment is a fictional property, Aurora Grand Colombo, with 468 rooms across 14 guest floors and 42 staff on the demo shift. We built it in Colombo because resort and city hotels in Sri Lanka face exactly the problems Mise addresses: seasonal staffing, the need to hold consistent standards for international guests, and brand or owner audits.

As a service execution platform for Sri Lanka's properties, Mise:

- runs room, front office and F&B standards as timed tasks on staff phones;
- gates key steps on photo evidence, captured in the task;
- records supervisor sign-off and handovers;
- builds a service record per room, person, standard and shift.

## Resorts and seasonal teams

Resorts and seasonal properties onboard new staff every season. When the standard lives in the task, a seasonal joiner works to the same steps as a returning colleague from the first shift, and managers can see readiness per person. See [the attrition bleed](/problems/attrition-bleed).

## Nothing to integrate

Mise needs no PMS integration and no hardware. It runs in any browser over mobile data. A pilot starts at one property in one department and expands from evidence, not from a rollout plan.

## Talk to us

We work with hotels across India and South Asia. Book a 15-minute demo to see the three interfaces on the Aurora Grand Colombo demo property and one of your existing standards running as a timed task.
`,
  faqs: [
    {
      q: "Does Mise work for hotels in Sri Lanka?",
      a: "Yes. Mise runs in any browser over mobile data, needs no PMS integration or hardware, and is designed for large, multi-department hotel teams using their own phones. Our demo property, Aurora Grand Colombo, is set in Sri Lanka.",
    },
    {
      q: "Is Aurora Grand Colombo a real hotel?",
      a: "No. Aurora Grand Colombo is a fictional demo property used to show Mise's three interfaces with realistic data: 468 rooms, 14 guest floors and 42 staff on the demo shift. All figures shown for it are demo data.",
    },
    {
      q: "Which countries does Mise serve?",
      a: "Mise works with hotels in India and across South Asia. Because it runs in a browser without integrations, there is no technical limit on location; talk to us about your property during the demo.",
    },
  ],
  related: [
    { href: "/hotel-service-execution-india", label: "Hotel service execution in India", note: "Built for Indian hotels." },
    { href: "/solutions/boutique-hotels", label: "Service execution for boutique hotels", note: "Small teams, signature service." },
    { href: "/solutions/hotel-chains", label: "Multi-property service execution", note: "For regional groups." },
    { href: "/platform", label: "The platform", note: "Three role interfaces." },
  ],
  relatedPosts: ["what-is-a-service-execution-platform"],
};
