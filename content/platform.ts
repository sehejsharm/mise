import type { Faq } from "@/content/types";

export type Screen = { image: string; title: string; caption: string; alt: string };

export type RoleInterface = {
  id: "staff" | "manager" | "standards";
  name: string;
  keyword: string;
  device: "phone" | "laptop";
  posture: string;
  who: string;
  persona: string;
  headline: string;
  summary: string;
  capabilities: { title: string; body: string }[];
  screens: Screen[];
};

export const roleInterfaces: RoleInterface[] = [
  {
    id: "staff",
    name: "Staff",
    keyword: "Hotel staff app",
    device: "phone",
    posture: "Mobile-first · one thumb · cheap Android · bright daylight",
    who: "Front desk agents, room attendants, servers, cooks, technicians, security officers and therapists.",
    persona: "Arjun at the front desk, Maya in rooms, Sunil in the kitchen, Nimal in engineering",
    headline: "The hotel staff app built around the next timed task",
    summary: "The standard, on the clock, in one hand. The timed task is the interface.",
    capabilities: [
      { title: "Today, then next", body: "The next timed task first, with a countdown against its target time." },
      { title: "Photo gates", body: "A step that needs proof will not close until the photo lands." },
      { title: "Standards library", body: "Search the way you'd ask a colleague: \"weak shower\", \"guest lost a key\"." },
      { title: "Briefs and sequence", body: "Operating briefs unlock in the order the work happens." },
      { title: "Handover and recovery", body: "Gated shift handover and a guided service recovery flow." },
      { title: "A record they own", body: "Each person's service record: verified standards and feedback." },
    ],
    screens: [
      {
        image: "product/staff-today",
        title: "Today",
        caption: "Next timed task, live countdown",
        alt: "Mise hotel staff app Today screen showing Room 208 guest-ready reset as the next timed task with 18 minutes remaining",
      },
      {
        image: "product/staff-standards",
        title: "Standards",
        caption: "The standard for the work in front of you",
        alt: "Mise service execution platform standards library with HSK-101 Guest Room Reset and Release, 4 of 8 checks complete",
      },
      {
        image: "product/staff-briefs",
        title: "Briefs",
        caption: "Operating briefs paired to today's work",
        alt: "Mise hotel staff app operating briefs screen with one standard due today and seven evidence items sealed this week",
      },
      {
        image: "product/staff-sequence",
        title: "Sequence",
        caption: "Readiness, in the order the work happens",
        alt: "Mise hotel staff app role sequence for the rooms division, guest-ready rooms from entry to release",
      },
      {
        image: "product/staff-service-record",
        title: "Service record",
        caption: "Five-star readiness, shift after shift",
        alt: "Mise hotel staff service record showing a 76 percent five-star ready score across four phases",
      },
      {
        image: "product/staff-inbox",
        title: "Inbox",
        caption: "Assignments, supervisor notes and receipts",
        alt: "Mise hotel staff app operations inbox with assignments, supervisor notes and proof receipts",
      },
    ],
  },
  {
    id: "manager",
    name: "Manager",
    keyword: "Hotel manager dashboard",
    device: "laptop",
    posture: "Desktop-primary · the live service picture",
    who: "Supervisors, duty managers, heads of department and GMs.",
    persona: "Elena Rossi, operations manager",
    headline: "The hotel manager dashboard that puts attention where service needs it",
    summary: "Who needs a decision now, and which standards are moving. One screen, fed by the floor.",
    capabilities: [
      { title: "Live service picture", body: "Readiness, service health and guest signal, together." },
      { title: "Assignments", body: "Push a standard to a role or person, with a deadline." },
      { title: "Acknowledgement desk", body: "Who confirmed the current standard, with a record ID. CSV export." },
      { title: "Team progress", body: "Readiness gaps and service evidence per person." },
      { title: "Standard results", body: "Which standards staff reach for, and which change the shift." },
      { title: "Exceptions first", body: "Blocked rooms, late tasks and missing evidence surface." },
    ],
    screens: [
      {
        image: "product/manager-overview",
        title: "Overview",
        caption: "One hotel, every promise visible",
        alt: "Mise hotel manager dashboard overview for Aurora Grand Colombo: ready 77 percent, service health 84 percent, guest signal 85 percent (demo data)",
      },
      {
        image: "product/manager-assignments",
        title: "Assignments",
        caption: "Set the standard before service starts",
        alt: "Mise hotel manager dashboard assignment desk: scope, promise and dispatch a standard to staff",
      },
      {
        image: "product/manager-readiness",
        title: "Acknowledgements",
        caption: "See who confirmed the current standard",
        alt: "Mise hotel manager dashboard acknowledgement desk with acknowledged, pending and overdue receipts and CSV export",
      },
      {
        image: "product/manager-team-progress",
        title: "Team progress",
        caption: "The person behind every result",
        alt: "Mise hotel manager dashboard team progress: 8 people need manager attention today, 34 of 42 staff ready (demo data)",
      },
      {
        image: "product/manager-standard-results",
        title: "Standard results",
        caption: "What changes the shift",
        alt: "Mise hotel manager dashboard standard results: 8 standards and 1,618 observed outcomes over 30 days (demo data)",
      },
    ],
  },
  {
    id: "standards",
    name: "Standards",
    keyword: "Standards workspace",
    device: "laptop",
    posture: "Desktop-only · where the standard is written",
    who: "Quality, standards or L&D leads, or the head of department who owns the standard.",
    persona: "Amina Rahman, standards author",
    headline: "The standards workspace: write once, publish into the shift",
    summary: "Write it, mark which steps need proof, publish. It is in the next shift.",
    capabilities: [
      { title: "Form, not page builder", body: "Instruction, reference photo, final checklist. Everything else removed." },
      { title: "Evidence by design", body: "Choose which steps are photo gates." },
      { title: "Publish to the shift", body: "One action puts it in the library and on the assignment desk." },
      { title: "Floor feedback", body: "Staff notes arrive with the exact standard version attached." },
    ],
    screens: [
      {
        image: "product/author-create-standard",
        title: "Create standard",
        caption: "Turn the standard into a clear shift sequence",
        alt: "Mise standards workspace form for setting up an existing hotel standard with title, department, audience role and hashtags",
      },
      {
        image: "product/author-feedback-inbox",
        title: "Feedback inbox",
        caption: "What staff are telling you about the standard",
        alt: "Mise standards workspace feedback inbox with version-linked staff notes on each standard",
      },
    ],
  },
];

export const platformMeta = {
  path: "/platform",
  title: "Hotel Service Execution Platform (SEP) Features | Mise",
  description:
    "The hotel service execution platform (SEP): your existing standards run as timed tasks on staff phones with photo proof and supervisor evidence. No PMS needed.",
  h1: "The Service Execution Platform (SEP) Built for Hotel Operations",
  ogTitle: "How Mise Eliminates Ghost SOPs & Supervisor Bottlenecks Across Your Property",
  ogDescription: "Run your hotel's existing standards as timed tasks on staff phones with photo proof and supervisor evidence across every department. No PMS integration required.",
  ogImageAlt: "Mise Hotel Service Execution Platform Dashboard and Staff Mobile App Interface",
  twitterTitle: "Hotel Service Execution Platform (SEP) Features & Tools | Mise",
  twitterDescription: "Discover how Mise implements your hotel's existing standards as timed tasks with real-time photo proof, supervisor evidence, and zero PMS setup.",
  primaryKeyword: "hotel service execution platform",
  metaKeywords: [
    "service execution platform",
    "SEP for hotels",
    "hotel operations software",
    "hotel service execution platform",
    "service execution platform for every department",
    "hotel operations task management",
  ],
  secondaryKeywords: [
    "hotel operations software",
    "SEP for hotels",
    "hotel staff app",
    "hotel manager dashboard",
    "hotel operations task management",
  ],
  eyebrow: "The platform",
  updated: "2026-10-18",
  priority: 0.9,
};

export const platformFaqs: Faq[] = [
  {
    q: "Why does Mise have three separate interfaces?",
    a: "Because the three jobs have nothing in common. Staff need one task, one thumb and a small screen in daylight. Managers need a live picture of the floor on a desktop. Standards owners need a focused authoring workspace. One responsive layout would compromise all three.",
  },
  {
    q: "Does Mise create our SOPs?",
    a: "No. Mise is a service execution platform (SEP): it implements the SOPs you already have. It holds them as versioned standards, but its core job is execution: each standard runs as a timed task on staff phones, with photo evidence and sign-off, building an audit-ready service record.",
  },
  {
    q: "Which hotel departments can use Mise?",
    a: "Every department that runs repeatable standards: front office, housekeeping, F&B service, kitchen, engineering and maintenance, security and safety, spa and wellness, and guest relations. Each runs its own existing standards as timed tasks with photo evidence on the same platform, writing to one service record.",
  },
];

export const howItWorksMeta = {
  path: "/how-it-works",
  title: "How Mise Works | Hotel Service Execution Platform (SEP)",
  description:
    "See how Mise works: the hotel service execution platform (SEP) runs existing standards as timed tasks on staff phones with photo proof and supervisor evidence.",
  h1: "How Mise Powers Hotel Service Execution",
  ogTitle: "From Written Standards to Daily Floor Execution in 4 Simple Steps | Mise",
  ogDescription: "Learn how Mise implements your hotel's existing standards as timed tasks on staff phones with real-time photo proof, remote supervisor sign-offs, and no PMS setup.",
  ogImageAlt: "Mise Service Execution Platform Step-by-Step Workflow Diagram",
  twitterTitle: "How Mise Works | Hotel Service Execution Platform (SEP)",
  twitterDescription: "Discover how Mise turns existing hotel SOPs into timed tasks on staff phones with photo proof and supervisor evidence.",
  primaryKeyword: "hotel service execution",
  secondaryKeywords: ["how a service execution platform works", "timed task hotel", "hotel photo evidence app", "hotel supervisor sign-off app"],
  eyebrow: "One loop, four moves",
  updated: "2026-10-18",
  priority: 0.9,
};

export const loopSteps = [
  {
    id: "standard",
    n: "01",
    name: "Standard",
    line: "Bring the SOPs you have: steps, target time, photo gates.",
    detail:
      "Mise doesn't write your standards. Each SOP you already have is set up in the standards workspace as short steps grouped into four phases (Prepare, Perform, Verify, Release), sets a realistic target time, adds reference photos, and marks which steps need photo evidence. Publishing gives it a version.",
    who: "Standards workspace · desktop",
  },
  {
    id: "timed-task",
    n: "02",
    name: "Timed task",
    line: "It lands on the right phone, on the clock.",
    detail:
      "Assigned to a role or person, the standard arrives on the staff app as a timed task with a live countdown. The steps and reference photos are on screen at the moment of work, in the order the work happens. There is no separate reading step.",
    who: "Staff app · phone",
  },
  {
    id: "evidence",
    n: "03",
    name: "Evidence",
    line: "The step won't close until the photo lands.",
    detail:
      "Every step is timestamped as it closes. Photo-gated steps stay locked until a photo is taken from inside the task. The supervisor reviews the evidence on the manager dashboard and signs off in one action, remotely or after an in-person check.",
    who: "Staff app + manager dashboard",
  },
  {
    id: "service-record",
    n: "04",
    name: "Service record",
    line: "Every close writes a timestamped row.",
    detail:
      "Each completed task adds an attributable entry to the service record: standard and version, person, room or area, times against target, steps, photos and sign-off. Managers see readiness and exceptions live; audits filter and export it.",
    who: "Manager dashboard · desktop",
  },
] as const;

export const howItWorksFaqs: Faq[] = [
  {
    q: "What is a timed task in a hotel?",
    a: "A timed task is a hotel standard delivered as a unit of work on a staff phone, with ordered steps, a target time and a live countdown. It replaces reading a standard with doing it, step by step, at the moment of work.",
  },
  {
    q: "How does the hotel photo evidence app work?",
    a: "Steps marked as photo gates cannot close until a photo is taken from inside the task. Each photo is stored with the room, person, step, time and standard version, so evidence exists for every gated step by design.",
  },
  {
    q: "How does supervisor sign-off work in Mise?",
    a: "Supervisors review task evidence on the manager dashboard and sign off in one action. Sign-off is recorded against the task with name and time, whether the supervisor verified remotely from photos or after an in-person inspection.",
  },
  {
    q: "What does a pilot look like?",
    a: "One property, starting with the department where standards slip most: front office, housekeeping, F&B, kitchen or engineering. We convert your most important standards into timed tasks with you, your team runs them on real shifts, and the service record fills with evidence from the first days. Scope and pricing are agreed after the demo.",
  },
];
