import type { Longform } from "@/content/types";
import { departmentSolutions } from "@/content/solutions-departments";

export type Solution = Longform & { slug: string; name: string; short: string; group: "department" | "property" };

const coreSolutions: Solution[] = [
  {
    slug: "housekeeping",
    group: "department",
    name: "Housekeeping",
    short: "Room reset, turndown and release as timed tasks with photo gates.",
    meta: {
      path: "/solutions/housekeeping",
      title: "Housekeeping SOP App with Photo Evidence | Mise",
      description:
        "A housekeeping SOP app that runs room reset, turndown and release as timed tasks with photo evidence and sign-off. No PMS needed. Book a demo.",
      h1: "The housekeeping SOP app that proves every room is guest-ready",
      primaryKeyword: "housekeeping SOP app",
      secondaryKeywords: [
        "housekeeping task management software",
        "digital housekeeping checklist",
        "room inspection checklist app",
      ],
      eyebrow: "Solutions · Housekeeping",
      updated: "2026-10-01",
      priority: 0.8,
    },
    eyebrow: "Solutions · Housekeeping",
    lede:
      "Housekeeping is one of seven departments Mise runs, and Mise is a housekeeping SOP app built for the room attendant's phone and the housekeeping manager's desk. Each room becomes a timed task: the standard's steps on screen, a countdown against the target time, photo gates on the details guests notice, and supervisor sign-off before release. Every room adds a line to an audit-ready service record.",
    tldr:
      "Mise runs housekeeping standards such as guest room reset and release as timed tasks on attendants' phones. Key steps need a photo before they close, supervisors sign off from evidence, and every room writes to a service record. It needs no PMS integration or hardware.",
    leadImage: {
      key: "product/staff-today",
      alt: "Mise housekeeping SOP app showing Room 208 guest-ready reset as the next timed task with a live countdown",
      device: "phone",
    },
    body: `
## What does a housekeeping SOP app need to do?

A housekeeping SOP app needs to put the room standard in the attendant's hand at the moment of work, time it against a realistic target, capture proof on the steps that matter, and let a supervisor release the room without walking to it. Anything less is a list, and lists are what [ghost SOPs](/problems/ghost-sop) are made of.

## How a room runs in Mise

Take a standard such as HSK-101, Guest Room Reset & Release:

1. **The task arrives.** Room 208 appears on the attendant's Today screen as the next timed task, with a countdown against its target time.
2. **The standard is on screen.** Steps are grouped into Prepare, Perform, Verify and Release, with reference photos and a short note on why each matters.
3. **Evidence is a gate.** The bathroom finish, bed presentation and amenity placement steps will not tick until a photo is taken, from inside the task.
4. **Sign-off and release.** The supervisor reviews the evidence on the manager dashboard, signs off, and the room is released. Every step, photo and time is now part of the service record.

## Housekeeping task management software, without the chasing

Housekeeping task management software usually means assigning rooms. Mise goes further: it manages how each room is done, not only who does it. The manager dashboard shows rooms in progress, blocked rooms and missing evidence first, so housekeeping managers spend their time on exceptions.

- **Floor view:** progress by floor and room, with blocked rooms flagged.
- **Exceptions first:** late tasks, missing photos and pending sign-offs.
- **Handover:** unfinished rooms, guest promises and blocked rooms passed to the next shift through a gated handover.

## A digital housekeeping checklist that proves itself

A digital housekeeping checklist that only records ticks is easy to complete and hard to trust. Mise's checklist is the standard itself, and a gated step cannot be ticked without its photo. The result is a checklist that proves itself: every room carries evidence tied to the person, the time and the version of the standard.

## Room inspection checklist app for supervisors

As a room inspection checklist app, Mise lets supervisors review completed rooms from photo evidence, inspect in person where it matters, and record sign-off against the task. Inspections become targeted rather than exhaustive, which is how the [supervisor bottleneck](/problems/supervisor-bottleneck) is broken.

## What housekeeping standards teams convert first

| Standard | Why it goes first |
|---|---|
| Guest room reset and release | Highest volume; directly affects arrivals |
| Turndown service | Visible to guests; easy to evidence |
| VIP and amenity setup | High stakes; benefits from reference photos |
| Public area checks | Frequently audited; often undocumented |
| Linen and minibar par checks | Repeatable counts with clear evidence |

## Built for the housekeeping floor

The staff app is designed for one thumb, a 340px screen and bright daylight on a budget Android phone. It runs in the browser over mobile data. There is nothing to install on the property network and no PMS integration to wait for.
`,
    faqs: [
      {
        q: "Does the housekeeping SOP app work without our PMS?",
        a: "Yes. Mise needs no PMS integration. Rooms and standards are set up in Mise, and staff use a browser on their own phones over mobile data. Many properties run it alongside their PMS from day one of a pilot without any IT project.",
      },
      {
        q: "What stops attendants taking the same photo every time?",
        a: "Photos are captured inside the task, at the gated step, and are stored with the room, person, step and time. Supervisors review them against the reference photo on the manager dashboard, and missing or doubtful evidence surfaces as an exception.",
      },
      {
        q: "Can supervisors still do physical room inspections?",
        a: "Yes. Supervisors can inspect any room in person and record sign-off against the task. Photo evidence lets them target inspections at the rooms that need them instead of walking every room on every floor.",
      },
    ],
    related: [
      { href: "/problems/supervisor-bottleneck", label: "The supervisor bottleneck", note: "Why inspections queue." },
      { href: "/digital-sop", label: "Digitize hotel SOPs", note: "Convert your housekeeping binder." },
      { href: "/solutions/front-office", label: "Front desk SOP software", note: "Room release meets arrival." },
      { href: "/solutions", label: "All departments", note: "One SOP app for the whole hotel." },
    ],
    relatedPosts: ["housekeeping-sop-checklist", "how-to-digitize-hotel-sops"],
  },
  {
    slug: "front-office",
    group: "department",
    name: "Front office",
    short: "Arrival, check-in and service recovery standards that run on every shift.",
    meta: {
      path: "/solutions/front-office",
      title: "Front Desk SOP Software for Hotels | Mise",
      description:
        "Front desk SOP software that runs arrivals, handovers and service recovery as timed tasks with evidence, so every guest gets it. Book a demo.",
      h1: "Front desk SOP software for consistent arrivals and service recovery",
      primaryKeyword: "front desk SOP software",
      secondaryKeywords: ["hotel front office task management"],
      eyebrow: "Solutions · Front office",
      updated: "2026-09-29",
      priority: 0.7,
    },
    eyebrow: "Solutions · Front office",
    lede:
      "Front desk SOP software has a harder job than most: the standard has to hold during a queue, a late flight and a complaint. Mise turns front office standards (arrival preparation, check-in, shift handover and service recovery) into timed tasks and guided workflows on staff devices, with evidence of what was done and when, so hotel front office task management leaves a record.",
    tldr:
      "Mise runs front office standards as timed tasks and guided workflows: arrival readiness, check-in steps, gated shift handovers and a Listen, Acknowledge, Resolve, Follow up service recovery flow. Each action is timestamped into the service record, so managers can see consistency at the desk, not just occupancy.",
    leadImage: {
      dept: "front-office",
      alt: "Mise front desk SOP software on the agent's phone: FO-204 VIP arrival as the next timed task with ID and room-ready photo gates",
      device: "phone",
    },
    body: `
## Why front office standards drift

Front office standards drift because the desk runs on interruption. The arrival sequence is clear in the SOP, but a queue, a phone call and a guest complaint all arrive at once, and whoever is on shift improvises. Without the standard in view and a record of what happened, each shift develops its own version.

## What front desk SOP software should cover

Front desk SOP software should cover the standards that shape a guest's first and last impression, and the moments where things go wrong:

- **Arrival readiness:** VIP and repeat-guest preparation, room status confirmation and amenity requests, checked before the guest arrives.
- **Check-in and check-out:** the steps your brand promises, in order, at a pace the desk can keep.
- **Shift handover:** unfinished requests, guest promises and blocked rooms passed on through a handover that cannot be sent until its checklist is complete.
- **Service recovery:** a guided Listen, Acknowledge, Resolve, Follow up workflow, with the staff member's spend authorisation limit shown and a shared incident timeline.

## Hotel front office task management with evidence

Hotel front office task management often lives in a logbook or a group chat. In Mise, tasks carry the standard, the time and the person, and each completed step writes to the service record. A duty manager can see which arrivals were prepared to standard and which promises were handed over, without reading back through messages.

## Handover that closes the loop

The shift handover is where front office promises are most often lost. Mise gates the handover behind a short checklist: unfinished work, guest promises and blocked rooms must be addressed before it can be sent, and the incoming shift acknowledges it. The record shows who handed over what, and who picked it up.

## Service recovery, guided

When a guest complaint lands, the Mise service recovery flow walks the staff member through four stages, **Listen, Acknowledge, Resolve, Follow up**, and shows what they are authorised to offer. Every action is added to a shared incident timeline, so the next person who meets the guest knows what has already been done.

## Working with housekeeping

Front office and housekeeping meet at room release. When housekeeping releases a room in Mise, the evidence and sign-off are already recorded, so the desk is not relying on a radio call. See the [housekeeping SOP app](/solutions/housekeeping).
`,
    faqs: [
      {
        q: "Does Mise replace our front office PMS?",
        a: "No. Mise is not a PMS and does not handle reservations, folios or room inventory. It runs the service standards around them (arrival readiness, handover and service recovery) as timed tasks with evidence, alongside whichever PMS you use, with no integration required.",
      },
      {
        q: "How does the shift handover work?",
        a: "The outgoing staff member completes a short gated checklist covering unfinished work, guest promises and blocked rooms before the handover can be sent. The incoming shift acknowledges it, and both actions are timestamped in the service record.",
      },
      {
        q: "What is the service recovery workflow?",
        a: "It is a guided four-stage flow of Listen, Acknowledge, Resolve and Follow up. It shows the staff member's spend authorisation limit and records each action on a shared incident timeline, so every colleague can see what has already been done for the guest.",
      },
    ],
    related: [
      { href: "/solutions/housekeeping", label: "Housekeeping SOP app", note: "Room release with evidence." },
      { href: "/glossary/shift-handover", label: "Shift handover, defined", note: "What a gated handover includes." },
      { href: "/problems/star-rating-ceiling", label: "The star rating ceiling", note: "Why the desk decides reviews." },
      { href: "/platform#staff", label: "The staff app", note: "Built for one hand." },
    ],
    relatedPosts: ["replace-whatsapp-hotel-task-tracking"],
  },
  {
    slug: "food-and-beverage",
    group: "department",
    name: "F&B service",
    short: "Outlet opening, hygiene and service standards with dated evidence.",
    meta: {
      path: "/solutions/food-and-beverage",
      title: "Hotel F&B SOP Software for Outlets & Kitchens | Mise",
      description:
        "Hotel F&B SOP software that runs outlet opening, hygiene checks and service standards as timed tasks with photo evidence and sign-off. Book a 15-min demo.",
      h1: "Hotel F&B SOP software for outlets, kitchens and banquets",
      primaryKeyword: "hotel F&B SOP software",
      secondaryKeywords: ["F&B task management software", "hotel food and beverage SOP"],
      eyebrow: "Solutions · Food & beverage",
      updated: "2026-09-29",
      priority: 0.7,
    },
    eyebrow: "Solutions · Food & beverage",
    lede:
      "Hotel F&B SOP software has to work at the pace of service and at the standard of an inspection. Mise turns food and beverage standards (outlet opening and closing, hygiene checks, mise en place and table service) into timed tasks with photo evidence and supervisor sign-off, so every shift leaves a dated record of what was done.",
    tldr:
      "Mise runs hotel food and beverage SOPs as timed tasks on staff phones: outlet opening and closing, hygiene and cleaning checks, station setup and service standards. Photo gates capture evidence at the steps inspectors check, and each task writes to a service record you can filter before a hygiene inspection.",
    leadImage: {
      dept: "food-and-beverage",
      alt: "Mise hotel F&B SOP software on a server's phone: FB-310 breakfast close as the next timed task with a table setup photo gate",
      device: "phone",
    },
    body: `
## Why F&B standards are hard to hold

Food and beverage runs on repetition under pressure. Outlets open and close daily, stations are set before each service, and hygiene checks recur throughout the day. When those standards live on laminated sheets and paper logs, they are filled in when there is time, which is rarely when the work happens.

The name Mise comes from the kitchen: *mise en place*, having everything in its place before service starts. We built the platform to bring that discipline to every department. F&B is where the idea started.

## What hotel F&B SOP software should run

- **Outlet opening and closing:** equipment, temperatures, stock, cleanliness and security, in order, with evidence.
- **Hygiene and cleaning schedules:** recurring checks as timed tasks, so a missed check is visible the same day.
- **Station and table setup:** reference photos of what ready looks like, and a gate on the final check.
- **Banquet and event setup:** room layouts and service standards, verified before guests arrive.
- **Service standards:** the steps of your service sequence, available at the moment of service.

## F&B task management software with evidence built in

F&B task management software often schedules tasks but cannot show how they were done. Mise records who carried out each check, when, against which version of the standard, with photos on gated steps and supervisor sign-off. The outlet manager sees exceptions first: missed checks, late setups and missing evidence.

## Hotel food and beverage SOPs and food safety

Food safety obligations come from regulation and your brand. In India, FSSAI sets them and publishes guidance, including its [Hygiene Rating Scheme guidance document](https://www.fssai.gov.in/docs/eri/Hygiene_Rating_Document_Jan21_VerIV.pdf). Mise does not interpret or certify those requirements. It runs the procedures you have written to meet them, consistently, and keeps dated evidence that they ran. That turns inspection preparation into filtering a record. See [hotel audit readiness](/audit-readiness).

## Built for the pass and the floor

The staff app works on any phone in a browser, with large touch targets and high-contrast screens that stay readable in a bright kitchen or on a terrace. Managers work from a desktop dashboard. There is no hardware to install and no PMS or POS integration required.
`,
    faqs: [
      {
        q: "Can Mise run hygiene checks for hotel kitchens?",
        a: "Yes. Recurring hygiene and cleaning checks can run as timed tasks with photo evidence and sign-off, so each check is dated and attributable. Mise does not set or certify food safety requirements; it helps you carry out the procedures you have written to meet them.",
      },
      {
        q: "Does Mise integrate with our POS?",
        a: "Mise does not need a POS or PMS integration. It runs F&B standards as timed tasks on staff phones in a browser, alongside whatever systems your outlets already use.",
      },
      {
        q: "Which F&B standards do teams start with?",
        a: "Most start with outlet opening and closing and recurring hygiene checks, because they are frequent, clearly defined and often inspected. Station setup and banquet setup follow, using reference photos of what ready looks like.",
      },
    ],
    related: [
      { href: "/audit-readiness", label: "Hotel audit readiness", note: "Inspection prep as a filter." },
      { href: "/about", label: "Why we are called Mise", note: "Mise en place, every department." },
      { href: "/solutions/hotel-chains", label: "Multi-property SOP software", note: "One standard across outlets." },
      { href: "/digital-sop", label: "Digitize hotel SOPs", note: "From laminated sheet to timed task." },
    ],
    relatedPosts: ["how-to-digitize-hotel-sops", "hotel-audit-readiness-audit-trail"],
  },
  {
    slug: "hotel-chains",
    group: "property",
    name: "Hotel chains",
    short: "One standards library, executed and evidenced at every property.",
    meta: {
      path: "/solutions/hotel-chains",
      title: "Multi-Property Hotel SOP Software for Groups | Mise",
      description:
        "Multi-property hotel SOP software: write group standards once, run them as timed tasks at each property and compare execution evidence. Book a 15-min demo.",
      h1: "Multi-property hotel SOP software for groups and chains",
      primaryKeyword: "multi-property hotel SOP software",
      secondaryKeywords: ["hotel group standards software", "digital SOP software for hotel chains"],
      eyebrow: "Solutions · Hotel chains",
      updated: "2026-09-29",
      priority: 0.8,
    },
    eyebrow: "Solutions · Hotel chains",
    lede:
      "Multi-property hotel SOP software has one job that single-property tools do not: keep a group's standards identical in intent and visible in execution across every property. Mise lets a group write its standards once, run them as timed tasks at each property, and see from the service record where execution holds and where it drifts.",
    tldr:
      "For hotel groups, Mise turns brand and group standards into timed tasks that run the same way at every property, with photo evidence and sign-off. Each property's service record shows how its standards actually ran. Rollout starts with a one-property pilot and expands property by property.",
    leadImage: {
      key: "product/manager-standard-results",
      alt: "Mise dashboard comparing SOP results and observed outcomes, used as multi-property hotel SOP software",
      device: "laptop",
    },
    body: `
## The group standards problem

Hotel groups invest heavily in standards: brand manuals, service sequences, audit criteria. Then each property interprets them. A general manager adapts, a department head simplifies, and within a year the group has as many versions of each standard as it has properties. Group operations teams find out from audits and reviews.

That is the [ghost SOP](/problems/ghost-sop) at group scale, and it caps ratings across the portfolio, which is the [star rating ceiling](/problems/star-rating-ceiling) multiplied.

## What multi-property hotel SOP software should do

- **One source of standards.** Group standards are written once, with versions, and published to properties.
- **Execution, not distribution.** Standards arrive at each property as timed tasks on staff phones, not as PDFs in an inbox.
- **Evidence per property.** Each property builds its own service record: who did what, to which version, with what evidence.
- **Comparable signals.** Task times, missed steps and evidence gaps are measured the same way everywhere, so properties can be compared fairly.

## How hotel group standards software rolls out

We roll out one property at a time, on purpose:

1. **Pilot one property.** Choose a representative property and the department where standards slip most. Convert the group standards that matter most.
2. **Prove the record.** Within the first shifts, the service record fills with evidence. Group operations sees execution, not a rollout plan.
3. **Extend the library.** Add departments and standards based on what the pilot shows.
4. **Add properties.** Publish the proven standards to the next property, adapting only what genuinely differs.

This is slower than a big-bang launch and much more likely to stick. Pilots are scoped per property, and pricing follows the scope rather than a rate card.

## Digital SOP software for hotel chains: what changes

| Today | With Mise |
|---|---|
| Brand manual in each property's shared drive | Standards published as timed tasks |
| Each property interprets differently | Same steps, target time and evidence gates |
| Group sees execution at audit time | Service record shows execution every shift |
| Updates take months to reach the floor | Next shift runs the new version |

## Group-level visibility

Group operations teams need to see where standards hold across properties. Mise records execution in the same structure at every property, which is what makes comparison meaningful. Group-level views are shown in the demo; ask us to walk through them for your portfolio.
`,
    faqs: [
      {
        q: "Can Mise manage standards across multiple hotels?",
        a: "Yes. Standards are written once and published to each property, where they run as timed tasks with evidence. Each property builds its own service record in the same structure, so every property's execution is recorded the same way.",
      },
      {
        q: "How do hotel groups roll out Mise?",
        a: "One property at a time. A pilot starts at a representative property in one department, proves the service record in the first weeks, then extends to more standards, departments and properties, adapting only what genuinely differs.",
      },
    ],
    related: [
      { href: "/problems/star-rating-ceiling", label: "The star rating ceiling", note: "Variance across properties." },
      { href: "/for/general-managers", label: "For General Managers", note: "Property-level visibility." },
      { href: "/solutions/boutique-hotels", label: "Digital SOP for boutique hotels", note: "When the group is small." },
      { href: "/how-it-works#pilot", label: "How a pilot works", note: "One property, first." },
    ],
    relatedPosts: ["what-is-a-service-execution-platform"],
  },
  {
    slug: "boutique-hotels",
    group: "property",
    name: "Boutique hotels",
    short: "Five-star consistency without a large operations team.",
    meta: {
      path: "/solutions/boutique-hotels",
      title: "Digital SOP for Boutique Hotels | Mise",
      description:
        "A digital SOP for boutique hotels: run your signature standards as timed tasks on staff phones, with evidence, even with a small team. Book a 15-min demo.",
      h1: "A digital SOP for boutique hotels that makes signature service repeatable",
      primaryKeyword: "digital SOP for boutique hotels",
      secondaryKeywords: ["hotel operations software for small hotels"],
      eyebrow: "Solutions · Boutique hotels",
      updated: "2026-09-29",
      priority: 0.7,
    },
    eyebrow: "Solutions · Boutique hotels",
    lede:
      "A digital SOP for boutique hotels has to protect what makes the property different. Boutique hotels sell signature details, and those details usually live in the heads of a few long-serving people. Mise turns those details into timed tasks with reference photos and evidence, so the signature experience survives busy nights, new joiners and a lean team.",
    tldr:
      "Boutique hotels depend on a few people who know how things are done. Mise captures those signature standards as timed tasks with reference photos and photo gates, so any staff member can deliver them, and owners can see from the service record that they were delivered, without adding managers or hardware.",
    leadImage: {
      dept: "rotate",
      alt: "Mise staff app across every department of a property, a digital SOP for boutique hotels",
      device: "phone",
    },
    body: `
## Why boutique hotels need standards more, not less

Small properties often resist formal SOPs because they fear losing personality. The opposite tends to happen without them. The signature welcome, the particular turndown and the way breakfast is laid all depend on who is working. When a key person leaves, the signature goes with them. That is the [attrition bleed](/problems/attrition-bleed), and it hits smaller teams hardest.

## Hotel operations software for small hotels

Hotel operations software for small hotels has to be light. There is no operations department to configure it and no IT team to integrate it. Mise is built for that:

- **No integrations.** No PMS integration, no hardware; staff use a browser on their own phones.
- **Form-based authoring.** The owner or GM writes standards in a simple form with steps, a target time, reference photos and evidence gates. Everything else was removed on purpose.
- **Publish straight to the shift.** A new standard is in tonight's tasks, without an approval workflow.
- **One screen for the owner.** See what ran, what did not and what needs a decision.

## Signature standards that survive a busy night

The details guests remember are the ones most likely to slip under pressure. Put them in the task:

- The welcome amenity, with a photo of how it should look.
- The turndown touches that make the room yours.
- The breakfast setup that appears on every review.
- The farewell step your team is known for.

Each becomes a timed task with a reference photo and, where it matters, a photo gate. Any staff member can deliver it, and the service record shows it was delivered.

## Owners who are not on site

Many boutique owners run more than one business or live elsewhere. The service record gives them a view of execution without a phone call: which standards ran, where evidence is missing, and what the duty manager signed off.
`,
    faqs: [
      {
        q: "Is Mise too complex for a small hotel?",
        a: "No. Mise was built subtraction-first. Authoring is a simple form, there is no PMS integration or hardware, and staff use a browser on their phones. A boutique property can run its first standards within days of starting a pilot.",
      },
      {
        q: "Will standard procedures make our service feel generic?",
        a: "Only if the standards are generic. Mise runs your standards, including the signature details that make the property distinctive, and helps make sure they are delivered every time rather than only when the right person is on shift.",
      },
      {
        q: "Can an owner see what is happening remotely?",
        a: "Yes. The manager dashboard runs in any desktop browser and shows which standards ran, where evidence is missing and what needs a decision, based on the service record written during each shift.",
      },
    ],
    related: [
      { href: "/problems/attrition-bleed", label: "The attrition bleed", note: "When the signature walks out." },
      { href: "/digital-sop", label: "Digitize hotel SOPs", note: "Write your first standards." },
      { href: "/solutions", label: "Solutions by department", note: "Every department, one app." },
      { href: "/roi", label: "ROI calculator", note: "Estimate with your own figures." },
    ],
    relatedPosts: ["how-to-digitize-hotel-sops"],
  },
];

const order = [
  "front-office",
  "housekeeping",
  "food-and-beverage",
  "kitchen",
  "engineering",
  "security-and-safety",
  "spa-and-wellness",
  "hotel-chains",
  "boutique-hotels",
];

/** Every solution page, departments first (housekeeping is one of seven), then property types. */
export const solutions: Solution[] = [...coreSolutions, ...departmentSolutions].sort(
  (a, b) => order.indexOf(a.slug) - order.indexOf(b.slug),
);
export const departments = solutions.filter((s) => s.group === "department");
export const propertyTypes = solutions.filter((s) => s.group === "property");

export function solutionBySlug(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

export const solutionsHubMeta = {
  path: "/solutions",
  title: "Hotel SOP App for Every Department | Mise",
  description:
    "The hotel SOP app for every department, from front office and F&B to kitchen, engineering, security and spa, with photo evidence. Book a 15-min demo.",
  h1: "Hotel SOP app for every department",
  primaryKeyword: "hotel SOP app",
  secondaryKeywords: ["hotel department SOP software", "hotel departmental workflow software", "SOP app for hotels"],
  eyebrow: "Solutions",
  updated: "2026-10-01",
};
