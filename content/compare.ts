import type { Longform } from "@/content/types";

export type Comparison = Longform & { slug: string; name: string; versus: string; short: string };

export const comparisons: Comparison[] = [
  {
    slug: "mise-vs-hotel-lms",
    name: "Mise vs hotel LMS",
    versus: "Learning management systems",
    short: "An LMS records that someone completed a course. Mise records that the standard ran.",
    allowLmsVocabulary: true,
    meta: {
      path: "/compare/mise-vs-hotel-lms",
      title: "Service Execution Platform vs LMS: The Difference | Mise",
      description:
        "Service execution platform vs LMS: an LMS tracks course completion; Mise tracks whether standards run on shift, with photo evidence. Book a demo.",
      h1: "Service execution platform vs LMS: execution evidence vs course completion",
      primaryKeyword: "service execution platform vs LMS",
      secondaryKeywords: ["hotel operations software vs LMS", "hotel training software"],
      eyebrow: "Compare · Mise vs hotel LMS",
      updated: "2026-09-29",
      priority: 0.7,
    },
    eyebrow: "Compare · Mise vs LMS",
    lede:
      "Service execution platform vs LMS is the comparison buyers ask about most, because both involve standards and staff. They answer different questions. A learning management system (LMS) records that someone completed a course or module. Mise, a service execution platform, records that the standard actually ran on the floor: which room, which person, what time, with photo evidence.",
    tldr:
      "An LMS manages courses, learners and completion certificates. Mise manages execution: existing standards run as timed tasks on staff phones, key steps require photo evidence, and every shift builds an audit-ready service record. Many hotels keep an LMS for formal training and use Mise for how the work is done on shift.",
    body: `
## What is the difference between a service execution platform and an LMS?

The difference is the output. An LMS produces a record of learning activity: courses assigned, modules completed, quiz scores, certificates. A service execution platform, like Mise, produces a record of work done to standard: which task, which room, which person, how long, and what evidence. One tells you a learner finished a course; the other tells you room 208 was reset to standard at 08:39 with a photo attached.

Both have a place. They are not substitutes.

## Side by side

| | Hotel LMS / training software | Mise (service execution platform) |
|---|---|---|
| Core unit | Course or module | Timed task |
| When it is used | Before or between shifts | During the shift, at the moment of work |
| What it records | Enrolment, completion, scores | Steps, times, photo evidence, sign-off |
| Primary user | Learner and trainer | Staff on shift, supervisors, standards owners |
| Proof for an audit | Training completion certificates | Service record of executed standards |
| Measures | Knowledge | Execution |
| Device posture | Often desktop or tablet sessions | One-thumb phone app on shift, desktop for managers |

## Why a hotel LMS does not fix ghost SOPs

Hotel training software improves what staff know. The [ghost SOP](/problems/ghost-sop) is not a knowledge problem; most staff know the standard. It is an execution problem: under shift pressure, the standard is not in front of them and nobody can see whether it ran. More courses do not change that. Putting the standard inside the task does.

## When a hotel needs an LMS

An LMS is the right tool for structured learning programmes: induction content, compliance courses with formal assessments, leadership development and certifications. If your requirement is to deliver and track courses, use an LMS.

## When a hotel needs service execution

Mise is the right tool when the question is "did the standard run, and can we prove it?" It is built for:

- running existing SOPs as timed tasks on staff phones;
- capturing photo evidence and supervisor sign-off as work happens;
- seeing readiness and execution per person and per standard;
- producing an audit-ready service record without preparation.

## Hotel operations software vs LMS: using both

Many properties will run both. The LMS holds formal learning content and certifications. Mise runs the standards on shift and shows whether they hold. Operating briefs in Mise can reference existing materials, paired with the standard they support, so staff see the right material at the right moment of work.

## Is Mise an LMS?

No. Mise does not manage courses, learners or certificates. It is a service execution platform: it runs the SOPs hotels already have as timed tasks, captures evidence as the work happens and compounds it into an audit-ready service record.
`,
    faqs: [
      {
        q: "Is Mise a hotel LMS?",
        a: "No. Mise is a service execution platform, not an LMS. It does not manage courses or certificates. It runs the SOPs hotels already have as timed tasks on staff phones, captures photo and supervisor evidence as work happens, and builds an audit-ready service record.",
        allowLms: true,
      },
      {
        q: "Can Mise and an LMS work together?",
        a: "Yes. An LMS can keep formal learning programmes and certifications, while Mise runs standards on shift and shows whether they hold. Operating briefs in Mise can point to existing materials, paired with the standard they support.",
        allowLms: true,
      },
      {
        q: "Which is better for audit evidence, an LMS or Mise?",
        a: "They evidence different things. An LMS shows that staff completed training. Mise shows that standards were executed, with timestamps, photo evidence and sign-off per task, which is usually what brand audits and inspections ask to see.",
        allowLms: true,
      },
    ],
    related: [
      { href: "/glossary/service-execution-platform", label: "What is a service execution platform?", note: "The category, defined." },
      { href: "/problems/ghost-sop", label: "The ghost SOP", note: "Why knowing is not doing." },
      { href: "/for/learning-and-development", label: "For L&D Heads", note: "Execution as the measure." },
      { href: "/compare/execution-platform-vs-checklist-app", label: "Service execution platform vs checklist apps", note: "The other common comparison." },
    ],
    relatedPosts: ["what-is-a-service-execution-platform"],
  },
  {
    slug: "mise-vs-excel",
    name: "Mise vs Excel",
    versus: "Spreadsheets and Excel trackers",
    short: "Spreadsheets record what someone typed later. Mise records the work as it happens.",
    meta: {
      path: "/compare/mise-vs-excel",
      title: "Hotel Operations Excel Alternative | Mise",
      description:
        "A hotel operations Excel alternative: replace spreadsheet trackers with timed tasks on staff phones, photo evidence and a live record. Book a demo.",
      h1: "A hotel operations Excel alternative that records the work as it happens",
      primaryKeyword: "hotel operations Excel alternative",
      secondaryKeywords: ["service execution platform vs Excel hotel"],
      eyebrow: "Compare · Mise vs Excel",
      updated: "2026-09-29",
      priority: 0.6,
    },
    eyebrow: "Compare · Mise vs Excel",
    lede:
      "Most properties looking for a hotel operations Excel alternative built their trackers for good reasons: spreadsheets are flexible, familiar and free. The trouble is that a spreadsheet only knows what someone typed into it, usually later, usually from memory. Mise replaces Excel trackers with timed tasks that record the work as it happens, with evidence attached.",
    tldr:
      "Excel trackers depend on someone entering data after the work, so they are late, incomplete and hard to verify. Mise captures the record at the moment of work: timed tasks on staff phones, photo evidence on gated steps, supervisor sign-off and a live service record. Spreadsheets remain useful for analysis; they are a weak system of record.",
    body: `
## Why hotels run operations on spreadsheets

Spreadsheets fill gaps. When there is no system for room inspections, audit logs or shift checks, someone builds a tracker. It works, for a while, because the person who built it maintains it. When that person is busy, on leave or gone, the tracker drifts.

## Service execution platform vs Excel in a hotel

| | Excel tracker | Mise |
|---|---|---|
| When data is captured | After the work, when someone has time | During the work, inside the task |
| Who enters it | A supervisor or coordinator | The person doing the work, automatically |
| Evidence | A cell that says "done" | Photo on gated steps, timestamps, sign-off |
| Standard version | Not recorded | Recorded per task |
| Works on a phone on shift | Poorly | Built for one thumb |
| Audit value | Low; easy to backfill | High; captured at the time |
| Depends on one person | Usually | No |

## Where spreadsheets fail audits

An auditor looking at a spreadsheet sees a claim. There is no way to tell whether a row was entered at the time or reconstructed the night before, and no evidence behind the tick. That is why spreadsheet-based operations are so exposed to the [audit ambush](/problems/audit-ambush).

## What to keep in Excel

Spreadsheets remain excellent for analysis, budgeting and ad-hoc reporting. Export the service record and analyse it however you like. The point is to stop using a spreadsheet as the system of record for work that happens on the floor.

## Moving off the tracker

Start with the tracker that causes the most pain, usually room inspections or audit logs. Convert the underlying standard into a timed task with photo gates, run it for a few weeks at one property, and compare the record with what the spreadsheet used to show. The [standards-to-execution guide](/standards-to-execution) covers the steps.
`,
    faqs: [
      {
        q: "Why replace an Excel tracker for hotel operations?",
        a: "An Excel tracker only knows what someone typed later, so it is often late, incomplete and impossible to verify. Mise records work inside each timed task as it happens, with photo evidence and sign-off, which makes the record trustworthy for managers and auditors.",
      },
      {
        q: "Can we still export data to Excel?",
        a: "Yes. Filtered records such as acknowledgement receipts export as CSV, which opens in Excel. Spreadsheets stay useful for analysis; Mise replaces them as the system of record for floor work.",
      },
      {
        q: "Which spreadsheet should we replace first?",
        a: "Start with the one that causes the most pain, usually room inspection or audit logs. Convert the standard behind it into a timed task with photo gates and run it at one property for a few weeks.",
      },
    ],
    related: [
      { href: "/audit-readiness", label: "Hotel audit readiness", note: "A record that survives scrutiny." },
      { href: "/compare/mise-vs-whatsapp", label: "Mise vs WhatsApp", note: "The other shadow system." },
      { href: "/standards-to-execution", label: "Standards to execution", note: "Step-by-step guide." },
      { href: "/problems/audit-ambush", label: "The audit ambush", note: "Why backfilled records fail." },
    ],
    relatedPosts: ["hotel-audit-readiness-audit-trail"],
  },
  {
    slug: "mise-vs-whatsapp",
    name: "Mise vs WhatsApp",
    versus: "WhatsApp groups",
    short: "WhatsApp moves messages. Mise runs the standard and keeps the evidence.",
    meta: {
      path: "/compare/mise-vs-whatsapp",
      title: "Hotel WhatsApp Task Management: A Better Way | Mise",
      description:
        "Hotel WhatsApp task management loses instructions, photos and proof in chat. Replace WhatsApp for hotel operations with timed tasks and evidence. Book a demo.",
      h1: "Hotel WhatsApp task management, and what to use instead",
      primaryKeyword: "hotel WhatsApp task management",
      secondaryKeywords: ["replace WhatsApp hotel operations"],
      eyebrow: "Compare · Mise vs WhatsApp",
      updated: "2026-09-29",
      priority: 0.7,
    },
    eyebrow: "Compare · Mise vs WhatsApp",
    lede:
      "Hotel WhatsApp task management happens by default. Shift briefings, room updates, photos of finished work and urgent requests all flow through group chats because everyone already has the app. It is fast and free. It is also where instructions scroll away, photos lose their context, and proof disappears onto personal phones. Mise gives that work a structure without slowing it down.",
    tldr:
      "WhatsApp groups are good for quick messages and poor for running standards: instructions scroll away, photos lack room, time and standard context, and evidence stays on personal phones. Mise keeps the speed of a phone but runs tasks with steps, timers and photo gates, and writes everything to one service record.",
    leadImage: {
      dept: "rotate",
      alt: "Mise staff app showing the next timed task for every department, an alternative to hotel WhatsApp task management",
      device: "phone",
    },
    body: `
## Why hotels run on WhatsApp

WhatsApp is on every staff phone, needs no setup and works on mobile data. For a busy shift it is the fastest way to say "room 305 is ready" or "VIP arriving early". It became the default operations tool in many hotels because nothing else was as easy.

## What goes wrong with hotel WhatsApp task management

- **Instructions scroll away.** The morning briefing is thirty messages up by lunchtime. New joiners never saw it.
- **Photos lose their context.** A photo of a bathroom in a group chat has no room number, no standard and no reliable timestamp you can audit.
- **Evidence lives on personal phones.** When someone leaves the group or changes phones, the record goes with them.
- **Everything is equally urgent.** A request, a joke and a guest complaint share one stream.
- **Nothing is measurable.** There is no way to see how long tasks took or whether the standard was followed.

## Replace WhatsApp for hotel operations, not for conversation

You do not need to ban WhatsApp. You need to move the work out of it. Conversation can stay in chat; tasks, standards and evidence belong in a system built for them.

| | WhatsApp group | Mise |
|---|---|---|
| Task assignment | A message, easy to miss | A timed task on the right person's phone |
| The standard | Whatever people remember | Steps and reference photos in the task |
| Photo evidence | Loose images in chat | Captured at the gated step, tied to room, person and time |
| Handover | Scroll up and hope | Gated handover checklist, acknowledged |
| Audit trail | Screenshots | Service record, filterable and exportable |
| Ownership | Personal phones | The property's record |

## Keeping the speed

Staff chose WhatsApp because it is quick. Mise is built to be as quick where it matters: it opens in a browser on the same phone, shows the next task first, and closes a step in one tap. The difference is that the tap leaves a record.

## Where to start

Pick the WhatsApp group that carries the most operational weight, usually housekeeping, and move its routine work into timed tasks first. See [housekeeping execution](/solutions/housekeeping) and our guide to [putting hotel standards into execution](/standards-to-execution).
`,
    faqs: [
      {
        q: "Should hotels stop using WhatsApp?",
        a: "Not for conversation. The problem is running tasks, standards and evidence through group chats, where instructions scroll away and proof stays on personal phones. Move operational work into timed tasks with evidence, and keep chat for talking.",
      },
      {
        q: "Is Mise as quick as WhatsApp for staff?",
        a: "It is designed to be. Mise runs in the browser on the same phone, shows the next timed task first, and closes a step in one tap. The difference is that each tap is recorded against the room, the person and the standard.",
      },
      {
        q: "Does Mise send WhatsApp messages?",
        a: "Mise keeps assignments, supervisor notes and receipts in its own inbox on the staff app. Ask us during the demo about notification channels for your pilot.",
      },
    ],
    related: [
      { href: "/problems/audit-ambush", label: "The audit ambush", note: "Where chat evidence fails." },
      { href: "/solutions/housekeeping", label: "Housekeeping execution", note: "Move the busiest group first." },
      { href: "/compare/mise-vs-excel", label: "Mise vs Excel", note: "The spreadsheet shadow system." },
      { href: "/glossary/shift-handover", label: "Shift handover", note: "What replaces scroll-up handovers." },
    ],
    relatedPosts: ["replace-whatsapp-hotel-task-tracking"],
  },
  {
    slug: "execution-platform-vs-checklist-app",
    name: "Service execution platform vs checklist apps",
    versus: "Checklist apps",
    short: "A checklist records ticks. A service execution platform records proof.",
    meta: {
      path: "/compare/execution-platform-vs-checklist-app",
      title: "Service Execution Platform vs Checklist App | Mise",
      description:
        "Service execution platform vs checklist apps: ticks vs proof. How timed tasks, photo gates, versions and sign-off differ from a checklist. Book a demo.",
      h1: "Service execution platform vs checklist apps: ticks vs proof",
      primaryKeyword: "service execution platform vs checklist app",
      secondaryKeywords: ["hotel checklist app vs service execution platform"],
      eyebrow: "Compare · Service execution platform vs checklist apps",
      updated: "2026-09-29",
      priority: 0.6,
    },
    eyebrow: "Compare · Service execution platform vs checklist apps",
    lede:
      "Service execution platform vs checklist apps can look like a small distinction: both put a list of steps on a phone. The difference shows up at audit time and in guest reviews. A checklist app records that boxes were ticked. A service execution platform records that the standard ran, against a target time, with photo evidence on the steps that matter and a sign-off.",
    tldr:
      "Checklist apps are good at lists and weak at proof: a tick carries no evidence, no standard version and no target time. A service execution platform like Mise runs the standard as a timed task, gates key steps on photos, records the version and supervisor sign-off, and builds a service record that holds up in an audit.",
    body: `
## What a checklist app does well

Checklist apps are quick to set up and easy to use. For simple, low-stakes routines, such as a daily equipment check where the only question is "was it done?", a checklist can be enough.

## Where checklists fall short in hotels

Hotel standards are rarely that simple. A guest room reset has a sequence, a time expectation, details that must look a particular way, and a verification step. A checklist flattens all of that into ticks, and a tick is easy to add at the end of a shift without the work behind it. The checklist becomes another [ghost SOP](/problems/ghost-sop), just on a phone.

## Hotel checklist app vs service execution platform

| | Checklist app | Mise |
|---|---|---|
| Unit of work | A list | A timed task with phases |
| Time | Not tracked, or tracked loosely | Countdown against a target time |
| Evidence | Optional attachments | Photo gates: the step cannot close without a photo |
| Standard version | Rarely recorded | Recorded per task |
| Verification | Separate, if at all | Supervisor sign-off in the task |
| Reference | Text | Steps with reference photos and reasons |
| Output | Completed checklists | An audit-ready service record |

## Why the photo gate matters

The single biggest difference is the [photo gate](/glossary/photo-gate). When a step requires a photo and cannot be completed without one, evidence exists by design rather than by goodwill. Combined with timestamps and sign-off, that is what turns a list into a record.

## When to choose which

Use a checklist app for simple, low-risk routines where a tick is enough. Use a service execution platform when the standard matters to guests, auditors or your brand, which in a hotel is most of the time.
`,
    faqs: [
      {
        q: "What is the difference between a service execution platform and a checklist app?",
        a: "A checklist app records ticks. A service execution platform, like Mise, runs the standard as a timed task with phases, requires photo evidence on key steps, records the standard version and supervisor sign-off, and builds an audit-ready service record.",
      },
      {
        q: "Can a checklist app be audit-ready?",
        a: "Rarely on its own. A tick can be added after the fact and carries no evidence or version. Audit-ready records need attributable, time-stamped evidence captured at the time of work, which is what photo gates and in-task sign-off provide.",
      },
      {
        q: "Is Mise harder to use than a checklist app?",
        a: "For staff, no. The staff app shows one task at a time with steps on screen and one-tap completion. The extra structure (target times, gates and versions) is set once by the standards owner.",
      },
    ],
    related: [
      { href: "/glossary/photo-gate", label: "What is a photo gate?", note: "Evidence by design." },
      { href: "/standards-to-execution", label: "Standards to execution", note: "Steps that can be proven." },
      { href: "/compare/mise-vs-hotel-lms", label: "Mise vs hotel LMS", note: "Execution vs completion." },
      { href: "/solutions/housekeeping", label: "Housekeeping execution", note: "A checklist that proves itself." },
    ],
    relatedPosts: ["housekeeping-sop-checklist"],
  },
];

export function comparisonBySlug(slug: string) {
  return comparisons.find((c) => c.slug === slug);
}

export const compareHubMeta = {
  path: "/compare",
  title: "Service Execution Platform Comparisons | Mise",
  description:
    "Service execution platform comparisons: Mise vs training systems, Excel trackers, WhatsApp groups and checklist apps, and what each one records. Book a demo.",
  h1: "Service execution platform comparisons: what each tool actually records",
  primaryKeyword: "service execution platform comparison",
  eyebrow: "Compare",
  updated: "2026-09-29",
};
