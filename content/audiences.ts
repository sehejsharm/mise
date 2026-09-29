import type { Longform } from "@/content/types";

export type Audience = Longform & { slug: string; name: string; card: string };

export const audiences: Audience[] = [
  {
    slug: "hr-directors",
    name: "HR Directors",
    card: "Readiness and acknowledgement evidence per person, from the first shift.",
    meta: {
      path: "/for/hr-directors",
      title: "Hotel HR Compliance Software for HR Directors | Mise",
      description:
        "Hotel HR compliance software that shows who acknowledged each standard, who is ready for which role, and the evidence behind it. For HR Directors. Book a demo.",
      h1: "Hotel HR compliance software that shows readiness, not attendance",
      primaryKeyword: "hotel HR compliance software",
      secondaryKeywords: ["hotel staff compliance tracking"],
      eyebrow: "For HR Directors",
      updated: "2026-09-29",
      priority: 0.7,
    },
    eyebrow: "For HR Directors",
    lede:
      "Most hotel HR compliance software records that a policy was sent or a session was attended. HR Directors need something harder: evidence that each person acknowledged the current standard, is ready for the work they are assigned, and actually executes it. Mise provides that evidence as a by-product of the shift, per person and per standard.",
    tldr:
      "Mise gives HR Directors an acknowledgement desk (who confirmed which version of each standard, when, with a record ID), readiness per person and role, and an execution record from real tasks. New joiners are onboarded inside the shift, and evidence exports as a filtered CSV.",
    leadImage: {
      key: "product/manager-readiness",
      alt: "Mise HR acknowledgement desk used as hotel HR compliance software, showing who confirmed the current standard",
      device: "laptop",
    },
    body: `
## What HR Directors are accountable for

HR Directors in hospitality carry three responsibilities that operations tools rarely serve well: making sure every person has received and understood the standards that apply to them, making sure new joiners become productive and compliant quickly, and being able to prove both when asked. Attendance sheets and signed policy forms answer the first question weakly and the other two not at all.

## Hotel staff compliance tracking that starts with acknowledgement

In Mise, every published standard has a version. When a standard is assigned, staff acknowledge it in the staff app, and the acknowledgement desk records who confirmed which version, when, from which device, with a record ID. HR can filter receipts by standard, role or status and export a filtered CSV.

- **Acknowledged:** receipt sealed with timestamp.
- **Pending:** response due.
- **Overdue:** follow-up needed.

That is hotel staff compliance tracking built on an attributable record, not a spreadsheet.

## From acknowledgement to readiness

Acknowledging a standard is not the same as being ready to execute it. Mise tracks readiness per person and per standard, based on completed, evidenced tasks and supervisor sign-off. HR can see who is ready for their current operation and who needs support, and the manager dashboard shows the same picture to department heads.

## Onboarding inside the shift

Hotel staff turnover means onboarding never stops. Mise shortens the distance between joining and executing to standard:

1. Operating briefs for the role unlock in the order the work happens, each with an inline readiness check.
2. The new joiner runs the same timed tasks as experienced staff, with the standard on screen.
3. Supervisor sign-off on evidenced tasks marks readiness for each standard.

We do not claim Mise changes retention. It reduces what each departure costs, because the standard lives in the operation. See [the attrition bleed](/problems/attrition-bleed).

## Evidence for HR conversations

Performance conversations, recognition and disputes all go better with evidence. Staff see their own service record, including verified standards and supervisor feedback, and HR sees the same data. That shared record makes the [invisible performance gap](/problems/invisible-performance-gap) visible, fairly.

## Data handling

Mise runs on Google Cloud and Firebase. See [security and data handling](/security) for what is collected and how access works.
`,
    faqs: [
      {
        q: "How does Mise track staff acknowledgement of SOPs?",
        a: "Each standard is published with a version. When it is assigned, staff acknowledge it in the staff app, and the acknowledgement desk records the person, version, timestamp, device label and a record ID. HR can filter receipts by standard, role or status and export a CSV.",
      },
      {
        q: "Is acknowledgement the same as compliance?",
        a: "No. Acknowledgement shows someone confirmed a standard. Mise also records execution, meaning completed timed tasks with evidence and sign-off, and derives readiness from that. HR can see both whether people know the standard and whether they apply it.",
      },
      {
        q: "Does Mise replace our HRMS or payroll?",
        a: "No. Mise does not handle payroll, leave or HR records. It provides standards acknowledgement, readiness and execution evidence alongside your existing HR systems, with no integration required to start.",
      },
    ],
    related: [
      { href: "/problems/attrition-bleed", label: "The attrition bleed", note: "Keep standards when people leave." },
      { href: "/audit-readiness", label: "Hotel audit readiness", note: "Acknowledgements on file." },
      { href: "/for/learning-and-development", label: "For L&D Heads", note: "Standards that execute." },
      { href: "/security", label: "Security & data handling", note: "Plainly stated." },
    ],
    relatedPosts: ["hotel-audit-readiness-audit-trail"],
  },
  {
    slug: "general-managers",
    name: "General Managers",
    card: "One live picture of service, and a defensible record behind every promise.",
    meta: {
      path: "/for/general-managers",
      title: "Hotel GM Dashboard for Operations Visibility | Mise",
      description:
        "A hotel GM dashboard for operations visibility: readiness, service health, blocked rooms and SOP results, fed live by timed tasks on the floor. Book a 15-min demo.",
      h1: "The hotel GM dashboard for live operations visibility",
      primaryKeyword: "hotel GM dashboard",
      secondaryKeywords: ["hotel operations visibility", "hotel general manager operations software"],
      eyebrow: "For General Managers",
      updated: "2026-09-29",
      priority: 0.7,
    },
    eyebrow: "For General Managers",
    lede:
      "A hotel GM dashboard is only as good as the data under it. Most show occupancy and revenue, because that is what the PMS knows. Mise shows what the PMS cannot: whether the standards behind every promise are being executed right now. Readiness, service health, blocked rooms and SOP results are fed live by timed tasks on the floor.",
    tldr:
      "Mise gives General Managers a live view of service execution: readiness, service health and guest signal together; floor-by-floor progress with blocked rooms; who needs a decision today; and which standards actually improve results. It is fed by the service record staff create during each shift, with no PMS integration.",
    leadImage: {
      key: "product/manager-overview",
      alt: "Mise hotel GM dashboard with readiness, service health and guest signal for the Aurora Grand Colombo demo property",
      device: "laptop",
    },
    body: `
## What a GM needs to see

A general manager is accountable for the guest experience, the rating and the P&L, and sees most of the operation second-hand. Hotel operations visibility usually means a morning meeting, a walk-round and a pile of reports. By the time a problem reaches the GM, a guest has usually found it first.

## The hotel GM dashboard in Mise

The manager overview is built around decisions:

- **Readiness, service health and guest signal**, side by side, so the next decision carries its context. In the demo property these read 77%, 84% and 85%; in a pilot they come from your own shifts.
- **Floor-by-floor view** across guest floors, showing where attention is needed first.
- **People who need a decision today**, such as pending verifications and timing risks.
- **SOP results** that compare how standards are used with observed operational outcomes, so you can decide what to reinforce, improve or retire.

## Hotel general manager operations software, without another report

Hotel general manager operations software often adds reporting work. Mise removes it. The data comes from timed tasks staff complete anyway: times against target, step completion, photo evidence and supervisor sign-off. Nobody compiles anything.

## Consistency is the GM's lever

Ratings plateau when variance, not quality, is the constraint. The GM dashboard shows variance by floor, department and standard, which is where the [star rating ceiling](/problems/star-rating-ceiling) is lifted. It also makes audits a filter rather than a fire drill; see [hotel audit readiness](/audit-readiness).

## What it does not do

Mise is not a PMS and does not replace revenue, reservation or finance systems. It covers service execution, the part of the operation those systems cannot see, and runs alongside them without integration.
`,
    faqs: [
      {
        q: "What does the Mise GM dashboard show?",
        a: "It shows readiness, service health and guest signal together, a floor-by-floor view of the property, the people and rooms that need a decision today, and SOP results comparing standard usage with observed outcomes. All of it is fed by timed tasks completed on the floor.",
      },
      {
        q: "Does the GM dashboard need our PMS data?",
        a: "No. Mise needs no PMS integration. Its data comes from the service record staff create while completing timed tasks, so it shows execution, which the PMS cannot see, alongside your existing occupancy and revenue reports.",
      },
      {
        q: "Are the dashboard numbers on this site real?",
        a: "No. The figures shown are demo data from Aurora Grand Colombo, a fictional demo property. In a pilot, the dashboard shows your own property's data from the first shift.",
      },
    ],
    related: [
      { href: "/platform#manager", label: "The manager dashboard", note: "Screens and capabilities." },
      { href: "/problems/star-rating-ceiling", label: "The star rating ceiling", note: "Variance caps ratings." },
      { href: "/for/hr-directors", label: "For HR Directors", note: "Readiness evidence per person." },
      { href: "/roi", label: "ROI calculator", note: "Size the opportunity." },
    ],
    relatedPosts: ["what-is-a-service-execution-platform"],
  },
  {
    slug: "learning-and-development",
    name: "L&D Heads",
    card: "Standards that execute on the floor, and report back what worked.",
    meta: {
      path: "/for/learning-and-development",
      title: "Hotel Standards Platform for L&D Teams | Mise",
      description:
        "A hotel standards platform for L&D: author standards, sequence operating briefs, and see execution evidence and floor feedback per standard. Book a 15-min demo.",
      h1: "A hotel standards platform for L&D teams who need execution, not attendance",
      primaryKeyword: "hotel standards platform for L&D",
      secondaryKeywords: ["hospitality standards software"],
      eyebrow: "For Learning & Development",
      updated: "2026-09-29",
      priority: 0.7,
    },
    eyebrow: "For Learning & Development Heads",
    lede:
      "Learning and development teams in hotels are measured on sessions delivered and attendance recorded, while the business measures them on how the floor performs. A hotel standards platform for L&D closes that gap. Mise lets L&D author standards, sequence the operating briefs that support them, and see, per standard, whether they are executed on the floor and what staff say about them.",
    tldr:
      "Mise gives L&D a standards workspace to author and version standards, sequenced operating briefs with inline readiness checks, execution evidence per standard from real timed tasks, and a feedback inbox where floor staff comment on specific standard versions. The signal is execution, not attendance.",
    leadImage: {
      key: "product/author-feedback-inbox",
      alt: "Mise standards workspace feedback inbox, part of a hotel standards platform for L&D teams",
      device: "laptop",
    },
    body: `
## The L&D measurement problem

L&D teams can show that sessions happened. They struggle to show that standards changed on the floor, because nothing connects what people were shown to what they do. The business sees inconsistency and asks for more sessions, and the cycle repeats. The [ghost SOP](/problems/ghost-sop) is often the result.

## Hospitality standards software built around execution

Mise treats the standard, not the session, as the unit. L&D and standards owners work in the standards workspace:

- **Author:** write the standard in a simple form with steps, target time, reference photos and which steps need photo evidence.
- **Publish:** it goes straight into the shift as a timed task, with a version.
- **Support:** operating briefs such as documents, short demonstrations and decks are paired with the standard, sequenced in the order the work happens, with an inline readiness check.
- **Listen:** staff rate briefs and send structured feedback, which arrives in the author's inbox with the exact standard version attached.

## Seeing what works

Because every timed task records how the standard ran, L&D can see execution per standard: which standards run to time, where steps are skipped, where evidence is missing. The manager view of SOP results compares standard usage with observed operational outcomes, which is the evidence L&D has always lacked.

## Sequenced readiness for new joiners

Briefs unlock in sequence for each role, and supervisor sign-off on evidenced tasks marks readiness. New joiners are guided through the work in the order they will meet it, and L&D can see where each person is.

## What changes for L&D

| Measured today | Measured with Mise |
|---|---|
| Sessions delivered | Standards executed |
| Attendance | Readiness per person and standard |
| Post-session survey | Floor feedback per standard version |
| Assumed impact | Observed outcomes per standard |
`,
    faqs: [
      {
        q: "How does Mise support hotel L&D teams?",
        a: "L&D teams author and version standards in the standards workspace, pair them with sequenced operating briefs and inline readiness checks, and see execution evidence and floor feedback per standard. The measure shifts from attendance to whether standards run on the floor.",
      },
      {
        q: "Can we keep our existing materials?",
        a: "Yes. Existing documents, short demonstration videos and decks can be attached to standards as operating briefs. The difference is that each brief is paired with the standard it supports and sequenced in the order the work happens.",
      },
      {
        q: "How does floor feedback reach the standards author?",
        a: "Staff rate an operating brief and submit a structured note from the staff app. It arrives in the author's feedback inbox with the standard code and the exact published version, so authors know which version needs clarification.",
      },
    ],
    related: [
      { href: "/platform#standards", label: "The standards workspace", note: "Author, publish, listen." },
      { href: "/compare/mise-vs-hotel-lms", label: "How Mise compares with an LMS", note: "Different questions, different outputs." },
      { href: "/digital-sop", label: "Digitize hotel SOPs", note: "Write standards that run." },
      { href: "/for/hr-directors", label: "For HR Directors", note: "Acknowledgement evidence." },
    ],
    relatedPosts: ["what-is-a-service-execution-platform", "ghost-sop-hotel-standards"],
  },
];

export function audienceBySlug(slug: string) {
  return audiences.find((a) => a.slug === slug);
}

export const audiencesHubMeta = {
  path: "/for",
  title: "Who Mise Is For: HR, GMs, L&D and Hotel Groups | Mise",
  description:
    "Mise hotel operations software for HR Directors, General Managers, L&D Heads and hotel-group founders: standards, evidence and records. Book a 15-min demo.",
  h1: "Hotel operations software for the people accountable for service",
  primaryKeyword: "hotel operations software for managers",
  eyebrow: "Who it's for",
  updated: "2026-09-29",
};
