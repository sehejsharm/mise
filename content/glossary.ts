/**
 * Glossary of hotel service execution terms. Each term is a DefinedTerm in the
 * /glossary DefinedTermSet and gets its own page. `short` is the definitional
 * sentence AI engines extract; keep it self-contained.
 */
export type GlossaryTerm = {
  slug: string;
  term: string;
  short: string;
  body: string;
  related: { href: string; label: string }[];
  /** 140–158 characters, ends with a CTA. */
  description: string;
};

export const glossary: GlossaryTerm[] = [
  {
    slug: "service-execution-platform",
    term: "Service execution platform",
    short:
      "A service execution platform is software that turns a hotel's standard operating procedures into timed tasks carried out on staff devices, captures evidence as the work happens, and compounds it into an audit-ready service record.",
    description:
      "A service execution platform turns hotel SOPs into timed tasks on staff phones, captures evidence and builds a service record. Definition and examples. Book a demo.",
    body: `
A service execution platform sits between a hotel's standards and its shifts. Where document systems store SOPs and training tools teach them, a service execution platform runs them: each standard becomes a [timed task](/glossary/timed-task) on the phone of the person doing the work, key steps require evidence, and every completion writes to a [service record](/glossary/service-record).

## How it differs from nearby categories

| Category | Main output |
|---|---|
| Document management | Stored SOPs |
| Checklist app | Ticked lists |
| Training or learning software | Completion records |
| Service execution platform | Evidence that standards ran |

## Why the category exists

Hotels rarely lack standards. They lack a way to make standards run consistently on every shift and to prove that they did. That gap produces [ghost SOPs](/problems/ghost-sop) and [audit ambushes](/problems/audit-ambush). Mise is a service execution platform for hotels.
`,
    related: [
      { href: "/how-it-works", label: "How Mise works" },
      { href: "/compare/mise-vs-hotel-lms", label: "Mise vs hotel LMS" },
    ],
  },
  {
    slug: "ghost-sop",
    term: "Ghost SOP",
    short:
      "A ghost SOP is a standard operating procedure that exists on paper, signed off and filed, but is not what actually happens on the floor.",
    description:
      "A ghost SOP is a hotel standard that exists on paper but not in practice. What causes ghost SOPs, how to spot them and how to fix them. Book a 15-min demo.",
    body: `
Ghost SOPs form when the standard lives in a document and the work happens somewhere else, with nothing connecting the two during a shift. Staff fall back on memory and habit, updates never reach the floor, and nobody can prove which version, if any, was followed.

## Signs of a ghost SOP

- Two staff describe the same procedure differently.
- The latest version is not the one in use.
- Nobody can show that the standard ran for a given room and time.

## The fix

Make the SOP the task. When the standard runs as a timed task with steps and [photo gates](/glossary/photo-gate), following it and doing the work are one action. Read the full explanation of [the ghost SOP problem](/problems/ghost-sop).
`,
    related: [
      { href: "/problems/ghost-sop", label: "The ghost SOP problem" },
      { href: "/digital-sop", label: "Digitize hotel SOPs" },
    ],
  },
  {
    slug: "photo-gate",
    term: "Photo gate",
    short:
      "A photo gate is a step in a task that cannot be marked complete until a photo is captured from inside the task, making evidence a requirement of the work rather than a follow-up.",
    description:
      "A photo gate is a task step that cannot close until a photo is captured, so evidence exists by design. How photo gates work in hotel SOPs. Book a 15-min demo.",
    body: `
In Mise, the standards owner marks which steps of a standard need photo evidence. On the staff app, those steps stay locked until the photo is taken with the phone's camera from inside the task. The photo is stored against the room, the person, the step, the time and the version of the standard.

## Why gate rather than request

A request for evidence is optional under pressure. A gate is not. Gating the steps that matter, such as bathroom finish, bed presentation or amenity setup, means proof exists for every one of those steps, by design.

## Use gates sparingly

Gate the steps a guest or auditor would check. Gating everything slows the work and dilutes the evidence. See the [digital SOP guide](/digital-sop#step-5).
`,
    related: [
      { href: "/compare/sop-software-vs-checklist-app", label: "SOP software vs checklist apps" },
      { href: "/solutions/housekeeping", label: "Housekeeping SOP app" },
    ],
  },
  {
    slug: "service-record",
    term: "Service record",
    short:
      "A service record is the time-ordered, attributable record of every standard executed at a property: who did what, to which standard and version, where, when, with what evidence and sign-off.",
    description:
      "A hotel service record is the attributable log of standards executed: who, what, where, when and with what evidence. Why it matters for audits. Book a demo.",
    body: `
The service record is what a [service execution platform](/glossary/service-execution-platform) produces. Every completed [timed task](/glossary/timed-task) adds an entry: the standard and version, the person, the room or area, start and finish times against target, completed steps, photo evidence and [supervisor sign-off](/glossary/supervisor-sign-off).

## What it is used for

- **Audits:** filter and export instead of assembling a folder.
- **Management:** see readiness and consistency per person, standard and shift.
- **Staff:** each person sees their own verified standards and feedback.

It is the last step of the Mise loop: Standard → Timed task → Evidence → Service record. Read more on [audit readiness](/audit-readiness).
`,
    related: [
      { href: "/audit-readiness", label: "Hotel audit readiness" },
      { href: "/platform#service-record", label: "The service record in Mise" },
    ],
  },
  {
    slug: "timed-task",
    term: "Timed task",
    short:
      "A timed task is a hotel standard delivered as a unit of work on a staff device, with ordered steps, a target time and a live countdown, so the standard runs at the moment of work.",
    description:
      "A timed task delivers a hotel SOP as a unit of work with steps, a target time and a countdown on the staff phone. How timed tasks replace binders. Book a demo.",
    body: `
A timed task is how a standard reaches the floor in Mise. When a standard is published and assigned, it appears on the right person's phone as a task with a countdown against its target time. The steps are grouped into four phases (**Prepare, Perform, Verify, Release**) with reference photos, and some steps are [photo gates](/glossary/photo-gate).

## Why time matters

A target time turns a standard into something that can be planned and measured. Tasks that consistently run late point to an unrealistic target or a method that needs work. Tasks that run early may be skipping steps. Either way, time makes the standard visible.

## The unit of work

A timed task is not a reminder to read an SOP. It is the SOP, in the order the work happens. See [how Mise works](/how-it-works).
`,
    related: [
      { href: "/how-it-works", label: "How Mise works" },
      { href: "/digital-sop", label: "Digitize hotel SOPs" },
    ],
  },
  {
    slug: "operating-brief",
    term: "Operating brief",
    short:
      "An operating brief is the supporting material for a standard, such as a short document, demonstration or deck, paired with the task it supports and sequenced in the order the work happens.",
    description:
      "An operating brief pairs a hotel standard with short supporting material and a readiness check, sequenced in the order work happens. Definition. Book a demo.",
    body: `
Operating briefs are how staff get ready for a standard before they run it. In Mise, each brief is paired with the standard it supports and includes an inline readiness check. Briefs for a role unlock in sequence, so a new joiner meets them in the order they will meet the work.

## Brief, not lecture

A brief is short and specific to one standard. It exists to make the timed task go well, not as a separate programme. Staff can rate a brief and send feedback, which reaches the standard's author with the version attached.

See [the staff app](/platform#staff) and how briefs support [readiness](/glossary/readiness).
`,
    related: [
      { href: "/for/learning-and-development", label: "For L&D Heads" },
      { href: "/glossary/readiness", label: "Readiness" },
    ],
  },
  {
    slug: "readiness",
    term: "Readiness",
    short:
      "Readiness is the measure of whether a staff member is cleared to execute a given standard, based on acknowledged versions, completed briefs and supervisor sign-off on evidenced tasks.",
    description:
      "In hotel operations, readiness shows who is cleared to execute which standard, based on evidenced work and sign-off, not time served. Definition. Book a demo.",
    body: `
Readiness answers a practical question: can this person be assigned this standard today? In Mise it is built from evidence rather than assumptions: the person has acknowledged the current version, completed the relevant operating briefs, and carried out evidenced tasks that a supervisor signed off.

## Readiness per person and per standard

Managers see readiness per person and per standard on the manager dashboard, so assignment and coaching decisions rest on evidence. Staff see their own readiness in their service record. In the Mise demo property, the team view shows how many of 42 staff are ready for their current operation (demo data).

Readiness is what replaces "time served" as the signal that a new joiner is up to standard. See [the attrition bleed](/problems/attrition-bleed).
`,
    related: [
      { href: "/for/hr-directors", label: "For HR Directors" },
      { href: "/problems/invisible-performance-gap", label: "The invisible performance gap" },
    ],
  },
  {
    slug: "supervisor-sign-off",
    term: "Supervisor sign-off",
    short:
      "Supervisor sign-off is the recorded verification by a supervisor that a task met its standard, captured inside the task with the supervisor's name and time.",
    description:
      "Supervisor sign-off records that a hotel task met its standard, with name and time, inside the task. How in-task sign-off cuts supervisor load. Book a demo.",
    body: `
In many hotels, sign-off means a signature on a sheet, added later. In Mise, sign-off happens against the task itself: the supervisor reviews the evidence, confirms the standard was met, and the sign-off is recorded with their name and time as part of the [service record](/glossary/service-record).

## Remote or in person

Because gated steps already carry photo evidence, many sign-offs can be done from the manager dashboard. Supervisors still inspect in person where it matters, and those inspections are recorded the same way. This is how the [supervisor bottleneck](/problems/supervisor-bottleneck) is reduced without lowering the standard.
`,
    related: [
      { href: "/problems/supervisor-bottleneck", label: "The supervisor bottleneck" },
      { href: "/platform#manager", label: "The manager dashboard" },
    ],
  },
  {
    slug: "shift-handover",
    term: "Shift handover",
    short:
      "A shift handover is the structured transfer of unfinished work, guest promises and blocked rooms from one shift to the next, acknowledged by the incoming team.",
    description:
      "A hotel shift handover transfers unfinished work, guest promises and blocked rooms to the next shift. How a gated, acknowledged handover works. Book a demo.",
    body: `
Handovers are where hotel promises get lost. A guest was promised a late checkout; a room is blocked for maintenance; a VIP amenity is half set up. If the handover is a conversation or a chat message, some of it will not survive the shift change.

## A gated handover

In Mise, the handover is gated behind a short checklist: unfinished work, guest promises and blocked rooms must be addressed before it can be sent. The incoming shift acknowledges it, and both actions are recorded. The next person on duty knows exactly what they inherited.

See [front desk SOP software](/solutions/front-office) and why [WhatsApp handovers](/compare/mise-vs-whatsapp) fail.
`,
    related: [
      { href: "/solutions/front-office", label: "Front desk SOP software" },
      { href: "/compare/mise-vs-whatsapp", label: "Mise vs WhatsApp" },
    ],
  },
  {
    slug: "audit-ambush",
    term: "Audit ambush",
    short:
      "An audit ambush is when a hotel audit or inspection arrives and evidence of compliant work has to be rebuilt by hand because it was never recorded at the time.",
    description:
      "An audit ambush is when a hotel audit arrives and evidence has to be rebuilt by hand because it was never recorded. Causes and prevention. Book a 15-min demo.",
    body: `
The audit ambush is the sixth pain in the Mise chain. The work was usually done; the proof was not kept. Preparing for the audit means pulling photos from personal phones, recreating sign-off sheets and assembling a narrative, while the hotel still has to run.

## Prevention

Capture evidence inside each task as the work happens, so the audit trail already exists. With a [service record](/glossary/service-record), audit preparation becomes filtering and exporting. Read [the audit ambush](/problems/audit-ambush) and the [audit readiness guide](/audit-readiness).
`,
    related: [
      { href: "/problems/audit-ambush", label: "The audit ambush" },
      { href: "/audit-readiness", label: "Hotel audit readiness" },
    ],
  },
  {
    slug: "audit-ready",
    term: "Audit-ready",
    short:
      "A hotel is audit-ready when the evidence an auditor would ask for already exists, is attributable to a person, place and time, and can be produced without preparation.",
    description:
      "Audit-ready means a hotel's evidence already exists, is attributable and can be produced without preparation. What it takes to be audit-ready. Book a demo.",
    body: `
Being audit-ready is different from being able to prepare for an audit. An audit-capable hotel can assemble a folder given a week. An audit-ready hotel can answer "show me" in minutes, because its [service record](/glossary/service-record) was written during the work.

## The test

Pick a standard, a room and a date. If you can show who carried it out, when, against which version, with what evidence and whose sign-off, without calling anyone, you are audit-ready. The [audit readiness guide](/audit-readiness) includes a checklist.
`,
    related: [
      { href: "/audit-readiness", label: "Hotel audit readiness guide" },
      { href: "/glossary/audit-ambush", label: "Audit ambush" },
    ],
  },
  {
    slug: "digital-sop",
    term: "Digital SOP",
    short:
      "A digital SOP is a standard operating procedure delivered on a device as a task to carry out, with ordered steps, a target time and evidence captured as the work is done, not a scanned document.",
    description:
      "A digital SOP for hotels is a standard run as a task on a device, with steps, target time and evidence, not a scanned PDF. Definition and examples. Book a demo.",
    body: `
Moving an SOP into a shared folder is digital storage. A digital SOP, in the sense that matters for operations, is one that runs: it reaches the person doing the work as a [timed task](/glossary/timed-task), shows the steps at the moment of work, and records execution with evidence.

## Three levels of digital

1. **Digitized document:** a PDF in a folder. Easier to find, still separate from the work.
2. **Digital checklist:** a list that can be ticked. Closer to the work, weak on proof.
3. **Executed standard:** a timed task with [photo gates](/glossary/photo-gate) and sign-off. The standard runs and leaves a record.

Read the full guide to [digitizing hotel SOPs](/digital-sop).
`,
    related: [
      { href: "/digital-sop", label: "Digitize hotel SOPs guide" },
      { href: "/compare/sop-software-vs-checklist-app", label: "SOP software vs checklist apps" },
    ],
  },
  {
    slug: "mise-en-place",
    term: "Mise en place",
    short:
      "Mise en place is the kitchen discipline of having everything in its place before service starts. It is where Mise, the hotel service execution platform, takes its name.",
    description:
      "Mise en place is the kitchen discipline of having everything in its place before service starts, and the origin of the Mise name. What it means for hotels.",
    body: `
Professional kitchens run on mise en place: every ingredient prepared, every tool in position, every station set before the first order arrives. It is what lets a kitchen deliver the same dish, to the same standard, under pressure.

## From the kitchen to every department

Mise brings that discipline to the rest of the hotel. Housekeeping, front office, food and beverage and every other department get their standards in place before and during service: the steps on screen, the evidence captured, the record kept. Every shift, five-star.

Read [the story behind Mise](/about).
`,
    related: [
      { href: "/about", label: "About Mise" },
      { href: "/solutions/food-and-beverage", label: "Hotel F&B SOP software" },
    ],
  },
];

export function termBySlug(slug: string) {
  return glossary.find((t) => t.slug === slug);
}

export const glossaryHubMeta = {
  path: "/glossary",
  title: "Hotel Service Execution Glossary: Key Terms | Mise",
  description:
    "Definitions of hotel service execution terms: service execution platform, ghost SOP, photo gate, timed task, service record, readiness and more. Book a demo.",
  h1: "Glossary of hotel service execution terms",
  primaryKeyword: "hotel service execution glossary",
  eyebrow: "Glossary",
  updated: "2026-09-29",
};
