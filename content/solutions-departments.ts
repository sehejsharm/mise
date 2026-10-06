import type { Solution } from "@/content/solutions";

/**
 * Department pages added when Mise was positioned as the service execution platform for every
 * hotel department. Same structure as the original solution pages: TL;DR, a
 * three-step example standard, the evidence captured, the pains it closes,
 * FAQ and related links. No compliance claims: Mise captures evidence; it does
 * not certify anything.
 */
export const departmentSolutions: Solution[] = [
  {
    slug: "kitchen",
    name: "Kitchen",
    group: "department",
    short: "Cold-chain checks, temperature logs and hygiene rounds, timed and evidenced.",
    meta: {
      path: "/solutions/kitchen",
      title: "Hotel Kitchen Execution: Hygiene & Cold-Chain Checks | Mise",
      description:
        "Hotel kitchen execution that runs cold-chain checks, temperature logs and hygiene rounds as timed tasks with photo evidence. Book a 15-min demo.",
      h1: "Hotel kitchen execution: every hygiene and cold-chain check, evidenced",
      primaryKeyword: "hotel kitchen execution",
      secondaryKeywords: ["FSSAI hygiene checklist app", "kitchen temperature log app", "cold chain checklist for hotels"],
      eyebrow: "Solutions · Kitchen",
      updated: "2026-10-01",
      priority: 0.8,
    },
    eyebrow: "Solutions · Kitchen",
    lede:
      "Mise is the service execution platform for the people who keep a kitchen safe between inspections. Cold-chain checks, temperature logs, receiving checks and closing hygiene rounds run as timed tasks on the cook's phone, with a photo of the reading or the station at each gated step. Every check writes to the property's audit-ready service record.",
    tldr:
      "Mise runs kitchen standards such as the walk-in temperature log, goods receiving and closing hygiene round as timed tasks on staff phones. Each reading or station is photographed inside the task, the sous chef signs off from the evidence, and the log builds itself. It captures evidence; it does not certify compliance.",
    leadImage: {
      dept: "kitchen",
      alt: "Mise hotel kitchen execution on a cook's phone: KIT-115 walk-in temperature log as the next timed task with a thermometer photo gate",
      device: "phone",
    },
    body: `
## What does hotel kitchen execution need to do?

Hotel kitchen execution needs to put the check in front of the cook at the time it is due, capture the reading or the state of the station as it is taken, and show the head chef which checks were missed before anyone else finds out. A clipboard log on the walk-in door records numbers; it rarely proves when they were taken.

## An example standard: KIT-115 Cold-chain check

1. **The task is due.** Every four hours, the walk-in temperature log appears as a timed task on the commis or sous chef's phone, with the target range on screen.
2. **The reading is evidence.** The step does not close until a photo of the thermometer reading is taken inside the task. Out-of-range readings ask for the corrective action taken.
3. **Sign-off and record.** The sous chef reviews the reading and photo, signs off, and the check joins the service record with the person, the time and the version of the standard.

## What evidence Mise captures in the kitchen

| Standard | Evidence at the gate |
|---|---|
| Walk-in and reach-in temperature log | Photo of the thermometer reading, with time |
| Goods receiving | Photo of the delivery temperature and labels |
| Closing hygiene round | Photo of each station after the clean-down |
| Allergen station check | Photo of separated tools and labelled containers |
| Pest-control walk | Photo of each checked point |

## An FSSAI hygiene checklist app, without the paper

India's food regulator publishes a [hygiene rating scheme](https://www.fssai.gov.in/docs/eri/Hygiene_Rating_Document_Jan21_VerIV.pdf) that inspects how food businesses handle, store and clean. Mise does not certify anything against it. What Mise gives a hotel kitchen is the daily evidence those inspections ask about: who logged which temperature, when, and what was done when it was out of range. Used as an FSSAI hygiene checklist app, it turns your own checklist into timed, photographed checks.

## Which hotel problems does it close?

- **[The audit ambush](/problems/audit-ambush):** the temperature log is already complete, timestamped and evidenced when an inspector or brand auditor asks.
- **[The ghost SOP](/problems/ghost-sop):** the cold-chain standard runs on the shift, not in a binder in the chef's office.
- **[The supervisor bottleneck](/problems/supervisor-bottleneck):** the sous chef checks exceptions instead of every fridge.
`,
    faqs: [
      {
        q: "Does Mise make our kitchen FSSAI compliant?",
        a: "No software can do that on its own, and Mise makes no compliance claim. Mise runs your own kitchen checks as timed tasks and captures the reading or station photo at each step, so the evidence an inspection asks about already exists, with names and times attached.",
      },
      {
        q: "Can cooks log temperatures with greasy hands or gloves?",
        a: "The staff app is built for one thumb on a budget Android phone. A temperature check is a single task with a photo and a number. Kitchens often keep one shared phone at the pass for logs, and every entry still records who completed it.",
      },
      {
        q: "What happens when a reading is out of range?",
        a: "The task asks for the corrective action taken before it closes, and the out-of-range reading surfaces on the manager dashboard as an exception for the head chef, with the photo and time attached.",
      },
    ],
    related: [
      { href: "/solutions/food-and-beverage", label: "F&B service execution", note: "Restaurant, bar and banquets." },
      { href: "/audit-readiness", label: "Audit readiness", note: "Evidence before the auditor asks." },
      { href: "/problems/audit-ambush", label: "The audit ambush", note: "Why inspections become scrambles." },
      { href: "/solutions", label: "All departments", note: "One service execution platform for the whole hotel." },
    ],
  },
  {
    slug: "engineering",
    name: "Engineering & maintenance",
    group: "department",
    short: "Fault response and preventive checklists, timed from complaint to fixed and tested.",
    meta: {
      path: "/solutions/engineering",
      title: "Hotel Maintenance Task Tracking & PM Checklists | Mise",
      description:
        "Hotel maintenance task tracking for engineering teams: fault response and preventive checklists as timed tasks with fixed-and-tested photos. Book a demo.",
      h1: "Hotel maintenance task tracking, from complaint to fixed and tested",
      primaryKeyword: "hotel maintenance task tracking",
      secondaryKeywords: ["preventive maintenance checklist app", "hotel engineering execution", "room fault response"],
      eyebrow: "Solutions · Engineering",
      updated: "2026-10-01",
      priority: 0.8,
    },
    eyebrow: "Solutions · Engineering",
    lede:
      "Mise brings hotel maintenance task tracking into the same system as every other department's standards. A guest's AC complaint or a weekly plant-room check becomes a timed task on the technician's phone, with the steps of your engineering standard, a target time and a photo once it is fixed and tested. The chief engineer sees what is open, late or unproven.",
    tldr:
      "Mise runs engineering standards such as fault first response and preventive maintenance rounds as timed tasks on technicians' phones. The fix is not closed until it is photographed as fixed and tested, the chief engineer signs off from evidence, and every job writes to the service record shared with front office and housekeeping.",
    leadImage: {
      dept: "engineering",
      alt: "Mise hotel maintenance task tracking on a technician's phone: ENG-402 AC complaint in room 512 with a fixed-and-tested photo gate",
      device: "phone",
    },
    body: `
## What should hotel maintenance task tracking prove?

Hotel maintenance task tracking should prove three things: that the right technician responded within the target time, that the fault was fixed and tested before the room went back to the guest, and that preventive checks happened on schedule. A job ticket that says "done" proves none of them.

## An example standard: ENG-402 Fault first response

1. **The complaint becomes a task.** The front desk logs "AC not cooling, room 512". It arrives on the duty technician's phone as a timed task with a 15-minute response target.
2. **The standard guides the fix.** Steps cover isolation, the likely causes, and what to tell the guest. Parts used and the cause found are recorded in the task.
3. **Fixed and tested is a gate.** The task closes only with a photo of the working unit or reading, and the front desk sees the room is resolved without a phone call.

## A preventive maintenance checklist app for the plant room

Preventive rounds are where standards slip quietly: the generator test, pump-room check, pool chemistry, lift log. As a preventive maintenance checklist app, Mise schedules each round as a recurring timed task, gates the readings with photos, and flags any round not completed on time on the chief engineer's dashboard.

| Round | Evidence at the gate |
|---|---|
| Generator weekly test | Photo of the panel readings |
| Pump and plant-room check | Photo of gauges and any leaks found |
| Pool water test | Photo of the test-kit result |
| Room PM (filters, drains, fittings) | Photo of each checked fitting |

## Which hotel problems does it close?

- **[The invisible performance gap](/problems/invisible-performance-gap):** response times and repeat faults are visible by technician and by room.
- **[The star rating ceiling](/problems/star-rating-ceiling):** guest-facing faults get fixed and tested the same way every time.
- **[The audit ambush](/problems/audit-ambush):** preventive rounds are evidenced as they happen, not reconstructed later.
`,
    faqs: [
      {
        q: "Does Mise replace our CMMS or asset register?",
        a: "No. Mise runs the standards your engineering team follows and records the evidence. Properties with a CMMS keep it for assets and spares; Mise covers response standards and checklists, and needs no integration to do it.",
      },
      {
        q: "How does front office know a room fault is fixed?",
        a: "The fault task closes only with a fixed-and-tested photo, and its status is visible on the manager dashboard straight away, so the front desk can update the guest without chasing engineering on the phone.",
      },
      {
        q: "Can recurring preventive checks be scheduled?",
        a: "Yes. Preventive rounds run as recurring timed tasks on the schedule you set, and any round that is late or missing evidence appears as an exception for the chief engineer.",
      },
    ],
    related: [
      { href: "/solutions/front-office", label: "Front office service execution", note: "Where complaints are logged." },
      { href: "/problems/invisible-performance-gap", label: "The invisible performance gap", note: "See response by technician." },
      { href: "/standards-to-execution", label: "Standards to execution", note: "Set up your first engineering standard." },
      { href: "/solutions", label: "All departments", note: "One service execution platform for the whole hotel." },
    ],
  },
  {
    slug: "security-and-safety",
    name: "Security & safety",
    group: "department",
    short: "Fire-exit rounds and safety checks with a photo at every exit and checkpoint.",
    meta: {
      path: "/solutions/security-and-safety",
      title: "Hotel Security Round App & Fire Safety Checklists | Mise",
      description:
        "A hotel security round app that runs fire-exit rounds and safety checks as timed tasks with a photo at every checkpoint, building an audit trail. Book a demo.",
      h1: "The hotel security round app that proves every exit was checked",
      primaryKeyword: "hotel security round app",
      secondaryKeywords: ["fire safety checklist software", "hotel night round checklist", "fire exit inspection app"],
      eyebrow: "Solutions · Security & safety",
      updated: "2026-10-01",
      priority: 0.8,
    },
    eyebrow: "Solutions · Security & safety",
    lede:
      "Mise is a hotel security round app for the rounds nobody sees until something goes wrong. A night fire-exit round, a key-control check or an evacuation-route walk runs as a timed task on the security officer's phone, with a photo at each exit or checkpoint. Every round writes a timestamped entry to the service record.",
    tldr:
      "Mise runs security and safety standards such as the fire-exit round, key control and equipment checks as timed tasks on officers' phones. Each exit or checkpoint needs a photo before the round closes, the security manager signs off from evidence, and missed rounds surface the next morning instead of after an incident.",
    leadImage: {
      dept: "security-and-safety",
      alt: "Mise hotel security round app on an officer's phone: SEC-020 night fire-exit round with a photo at every exit",
      device: "phone",
    },
    body: `
## What does a hotel security round app need to prove?

A hotel security round app needs to prove that the round happened at the time it was due, that every exit and checkpoint on it was actually seen, and what was found. A signature on a round sheet proves only that someone signed. Fire safety depends on the exits being clear at 3am, not on the sheet being complete at 7am.

## An example standard: SEC-020 Fire-exit round

1. **The round is due.** At 02:00 the night round across floors 1 to 14 appears on the officer's phone as a timed task, with the route in order.
2. **Each exit is a gate.** Every fire exit on the route needs a photo showing it clear and closed. A blocked exit asks for what was done and who was told.
3. **Close and record.** The round closes when every checkpoint has evidence. The security manager sees completion, timing and any issues first thing in the morning.

## Fire safety checklist software for the routine checks

Beyond rounds, the same mechanism runs the fixed checks that fire safety plans depend on. Used as fire safety checklist software, Mise schedules each check, gates it with a photo and keeps the history in one place.

| Check | Evidence at the gate |
|---|---|
| Fire-exit and escape-route round | Photo of each exit, clear and closed |
| Extinguisher and hose-reel check | Photo of the gauge and tag |
| Key and access-card control | Photo of the key cabinet log |
| Lobby and perimeter round | Photo at each checkpoint |

Mise records that checks were done and what was found. It does not replace your fire safety plan, statutory inspections or certification.

## Which hotel problems does it close?

- **[The audit ambush](/problems/audit-ambush):** round history is ready when the brand, insurer or authority asks.
- **[The ghost SOP](/problems/ghost-sop):** the night round follows the written route, not memory.
- **[The supervisor bottleneck](/problems/supervisor-bottleneck):** the security manager reviews exceptions, not every sheet.
`,
    faqs: [
      {
        q: "Does a photo at each exit slow the round down?",
        a: "Each checkpoint is one photo inside the task, taken in a couple of seconds on the officer's phone. Rounds run to a target time, so a round that takes far longer or far less time than usual is itself visible.",
      },
      {
        q: "Does Mise make the hotel fire-safety compliant?",
        a: "No. Mise makes no compliance claim and does not replace your fire safety plan or statutory inspections. It runs your own rounds and checks as timed tasks and records evidence that they happened.",
      },
      {
        q: "Can rounds run at night with a small team?",
        a: "Yes. Rounds are assigned to whoever is on shift, run on their own phone over mobile data, and close only with evidence. The morning review shows exactly what was done overnight.",
      },
    ],
    related: [
      { href: "/audit-readiness", label: "Audit readiness", note: "An audit trail every shift." },
      { href: "/problems/audit-ambush", label: "The audit ambush", note: "When the evidence is missing." },
      { href: "/solutions/engineering", label: "Engineering & maintenance", note: "Faults found on rounds." },
      { href: "/solutions", label: "All departments", note: "One service execution platform for the whole hotel." },
    ],
  },
  {
    slug: "spa-and-wellness",
    name: "Spa & wellness",
    group: "department",
    short: "Treatment room turnover and hygiene resets on a target time, with a photo before the next guest.",
    meta: {
      path: "/solutions/spa-and-wellness",
      title: "Spa Service Execution for Hotels | Mise",
      description:
        "Spa service execution for hotels: treatment room turnover, hygiene resets and opening checks run as timed tasks with photo evidence. Book a 15-min demo.",
      h1: "Spa service execution for hotels: every treatment room reset on time",
      primaryKeyword: "spa service execution for hotels",
      secondaryKeywords: ["treatment room turnover checklist", "spa hygiene checklist app", "spa service execution"],
      eyebrow: "Solutions · Spa & wellness",
      updated: "2026-10-01",
      priority: 0.7,
    },
    eyebrow: "Solutions · Spa & wellness",
    lede:
      "Mise is the service execution platform for hotels whose spa promises calm and needs precision behind the door. Treatment room turnover, linen and hygiene resets, opening checks and product handling run as timed tasks on the therapist's phone, with a photo of the reset room before the next guest walks in. Every turnover writes to the service record.",
    tldr:
      "Mise runs spa standards such as treatment room turnover, opening checks and hygiene resets as timed tasks on therapists' phones. The reset room is photographed before the task closes, the spa manager signs off from evidence, and the signature details of your spa are delivered the same way by every therapist.",
    leadImage: {
      dept: "spa-and-wellness",
      alt: "Mise spa service execution for hotels on a therapist's phone: SPA-210 treatment room turnover with a room reset photo gate",
      device: "phone",
    },
    body: `
## What should spa service execution for hotels cover?

Spa service execution for hotels should cover the moments guests never see but always feel: the turnover between treatments, the hygiene reset, the opening check of steam, sauna and relaxation areas, and the small signature touches. It should time them against the treatment schedule and prove they were done.

## An example standard: SPA-210 Treatment room turnover

1. **The turnover starts.** When a treatment ends, the turnover appears on the therapist's phone as a timed task with a 12-minute target before the next booking.
2. **The standard is on screen.** Steps cover linen change, surface and equipment hygiene, product reset, temperature and lighting, and the signature welcome details.
3. **The reset room is the gate.** A photo of the reset room closes the task, and the spa manager can see every room is ready before the next guest arrives.

## What evidence Mise captures in the spa

| Standard | Evidence at the gate |
|---|---|
| Treatment room turnover | Photo of the reset room |
| Opening check (steam, sauna, pool) | Photo of temperatures and readiness |
| Linen and product par | Photo of stocked shelves |
| Signature welcome setup | Photo of the welcome details |

## Which hotel problems does it close?

- **[The star rating ceiling](/problems/star-rating-ceiling):** signature details are delivered consistently, not only by the best therapist.
- **[The attrition bleed](/problems/attrition-bleed):** new therapists follow the spa's own standard from their first shift.
- **[The invisible performance gap](/problems/invisible-performance-gap):** turnover times and missed steps are visible per room.
`,
    faqs: [
      {
        q: "Will timed tasks feel rushed in a spa?",
        a: "The timer is for the turnover behind the door, not the treatment. It protects the next guest's start time and makes sure the reset is complete, so therapists are not rushing the moment the guest walks in.",
      },
      {
        q: "Can we include our own signature rituals?",
        a: "Yes. Mise runs your spa's own standards, including the signature details, with reference photos in each step, so every therapist delivers them the same way.",
      },
      {
        q: "Does the spa need separate software from the rest of the hotel?",
        a: "No. The spa runs on the same Mise standards library, staff app and service record as every other department, so the general manager sees the whole property in one place.",
      },
    ],
    related: [
      { href: "/solutions/boutique-hotels", label: "Boutique hotels", note: "Signature service, every time." },
      { href: "/problems/star-rating-ceiling", label: "The star rating ceiling", note: "Why consistency matters." },
      { href: "/platform#staff", label: "The staff app", note: "One thumb, one shift." },
      { href: "/solutions", label: "All departments", note: "One service execution platform for the whole hotel." },
    ],
  },
];
