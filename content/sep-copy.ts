/**
 * On-page copy from the Mise SEO optimisation pack (SEP positioning), one entry
 * per route. `lede` opens the hero; `body` is placed ahead of the page's
 * existing sections. Rendered with lib/md, so internal links are added there.
 */

export type SepCopy = { lede: string; body: string };

export const sepCopy: Record<string, SepCopy> = {
  "/problems/supervisor-bottleneck": {
    lede: "Transition from micromanagement and physical inspections to photo-verified, self-executing hotel operations.",
    body: `
## What is the supervisor bottleneck?

In traditional hotel operations, floor staff cannot complete workflows without physical supervisor sign-offs. Rooms sit unreleased, maintenance tasks stay open, and shift handovers drag on because supervisors are stuck manually verifying every step. [Mise](/) eliminates this operational delay by introducing timed tasks, mandatory photo proof, and remote supervisor sign-offs across all property departments.

## Why physical supervision holds hotel teams back

When floor supervisors spend their entire shift walking corridors to inspect room setups, temperature logs, or maintenance fixes, your operational flow slows down. This reliance on physical presence creates severe operational friction:

- **Delayed Room Turnarounds:** Cleaned guest rooms remain blocked in "inspection pending" status while room attendants wait for floor managers to walk down hall after hall.
- **Shift Handover Delays:** Duty managers lose critical check-in time trying to reconcile paper clipboards and missing verbal updates across shift changes.
- **Unfocused Supervisory Effort:** Floor leaders spend much of their shift verifying routine SOPs rather than handling VIP guest experiences, training staff, or resolving complex escalations.

## How Mise eliminates the supervisor bottleneck

The [Mise platform](/platform) changes how hotel work is verified. Instead of waiting for a physical walkthrough, staff verify their own work visually in real time:

1. **Timed Mobile Task Sequences:** Floor staff receive structured, timed routines directly on their mobile devices for housekeeping, engineering, and front desk tasks.
2. **Mandatory Photo Proof:** Attendants and technicians capture timestamped visual evidence of completed tasks, such as a finished room setup, a clean kitchen line, or a fixed AC unit.
3. **Remote Supervisor Sign-Offs:** Department heads review photo evidence and sign off remotely, releasing completed work without leaving their desk or current floor.

Learn more about [how Mise works](/how-it-works) to drive daily accountability across active shifts.

## The operational benefits of removing the bottleneck

- **Faster Check-In & Room Release:** Convert turnover rooms to guest-ready status faster by removing physical corridor wait times.
- **Higher Employee Accountability:** Floor staff get clear ownership of their tasks with verifiable digital records.
- **Audit-Ready Work History:** Every photo upload, timestamp, and remote approval is saved automatically into a permanent operational audit trail.
- **Zero PMS Integration Required:** Deploy across your entire property immediately without waiting for Property Management System API connections or IT approvals.
`,
  },
  "/problems/ghost-sop": {
    lede: "Turn static binders and unverified checklists into live, photo-verified shift execution.",
    body: `
## What is a "Ghost SOP"?

A Ghost SOP occurs when a hotel has documented operating procedures, but staff mark them as "completed" on paper clipboards or messaging groups without physically executing them on the floor. The standard exists in corporate binders or training decks, but disappears during live shifts. [Mise](/) eliminates Ghost SOPs by embedding standards directly into daily work as timed tasks with mandatory photo proof.

## Why Ghost SOPs threaten hotel guest satisfaction and star ratings

Most hotels do not lack operational guidelines; they lack a reliable mechanism to enforce and verify standards on every shift. When SOPs exist beside the work instead of inside it, critical errors slip through to the guest:

- **Pencil-Whipped Checklists:** Staff tick off paper forms, WhatsApp messages, or static digital forms in seconds without conducting physical inspections.
- **Brand Standard Drift:** Variations across morning, evening, and weekend shifts lead to inconsistent guest experiences and falling OTA star ratings.
- **Audit Ambush:** Corporate quality audits uncover compliance gaps because managers have no verifiable digital evidence of daily floor activity.

## How Mise converts binders into active floor execution

The [Mise platform](/platform) puts standards directly into the hands of floor staff, transforming static guidelines into verifiable actions:

1. **Timed Mobile Tasks:** Convert long SOP documents into clear, sequential steps on staff mobile devices with countdown timers.
2. **Mandatory Photo Gates:** Require timestamped visual evidence for critical touchpoints, such as bathroom presentation, buffet setups, or HVAC filter replacements, before a task can be closed.
3. **Remote Supervisor Evidence:** Managers review visual proof and sign off remotely, creating a complete operational service record.

Discover [how Mise works](/how-it-works) to embed accountability across all hotel shifts.

## Key benefits of eliminating Ghost SOPs

- **Consistent Service:** Every room reset, food prep schedule, and security patrol follows your brand standard, every shift.
- **Audit Readiness:** Replace missing paper logs with a searchable digital record complete with timestamped photos and sign-offs.
- **Zero PMS Integration Required:** Deploy immediately across housekeeping, front office, F&B, and engineering without complex IT implementation.
`,
  },
  "/problems/invisible-performance-gap": {
    lede: "Bridge the friction between corporate brand expectations and daily shift reality.",
    body: `
## What is the invisible performance gap?

The Invisible Performance Gap is the operational blind spot where general managers assume brand standards are being executed, but actual shift performance quietly degrades. Because traditional hotel reporting relies on verbal check-ins or paper logs filled out after the shift, breakdowns remain hidden until negative guest reviews, high turnover, or failed quality audits bring them to light. [Mise](/) makes floor performance visible in real time through timed tasks and photo proof.

## Why silent performance leaks hurt hotel operations

When leadership lacks real-time visibility into daily shifts, small micro-failures compound across departments:

- **Blind Shift Transitions:** Evening and night shifts operate without live data, leading to inconsistent room setups, unmonitored public areas, and missed guest requests.
- **Lagging Audit Signals:** Managers only discover missed maintenance, skipped hygiene checks, or compromised cleanliness days or weeks later, during formal audits.
- **Unidentified Bottlenecks:** Leaders cannot improve staffing or workflows because they have no objective data on task completion times or recurring floor delays.

## How Mise provides real-time operational visibility

The [Mise platform](/platform) replaces delayed paper reports with immediate, actionable operational information:

1. **Live Floor Status:** Track which timed tasks are in progress, completed, or delayed across housekeeping, front office, F&B, and engineering in real time.
2. **Visual Proof Gates:** Staff capture mandatory timestamped photos of completed work, giving management an objective view of execution quality without micromanaging.
3. **Actionable Shift Reports:** Identify bottlenecks, high-performing teams, and recurring service delays from the service record.

Discover [how Mise works](/how-it-works) to bring operational transparency to your property.

## The benefits of real-time operational transparency

- **Proactive Risk Prevention:** Catch missed tasks and delays mid-shift, before they affect the guest's stay.
- **Data-Driven Staff Recognition:** Identify top-performing floor teams objectively using verified completion data and remote supervisor sign-offs.
- **Zero PMS Integration Required:** Deploy across your hotel workforce immediately without waiting for Property Management System API connections.
`,
  },
  "/problems/attrition-bleed": {
    lede: "Reduce onboarding friction and staff turnover, and support floor teams with intuitive mobile workflows.",
    body: `
## What is the attrition bleed?

Hotel teams turn over often. "Attrition Bleed" occurs when new hires are put on the floor with vague verbal directions, thick binder SOPs, or passive videos that fail to prepare them for live shift pressure. Frustration sets in, errors escalate, and staff leave early. [Mise](/) helps stop the attrition bleed by delivering clear, self-guiding timed tasks and instant visual feedback straight to mobile devices.

## Why operational chaos drives hotel staff away

High turnover is rarely just an HR issue; it is often a symptom of floor-level operational confusion:

- **Overwhelming Onboarding Friction:** New housekeepers, kitchen staff, and front desk agents struggle to remember complex brand guidelines without active guidance.
- **Lack of Real-Time Feedback:** Staff finish shifts unsure whether their work met the supervisor's expectations, leading to unearned reprimands or quiet disengagement.
- **Burnout from Constant Rework:** When team members miss steps because instructions were unclear, senior staff redo the work, causing friction across shifts.

## How Mise supports staff and shortens onboarding

The [Mise platform](/platform) gives every team member a clear, intuitive roadmap for every shift:

1. **Step-by-Step Timed Tasks:** Turn long operational manuals into easy-to-follow visual steps on the phone that guide new hires through their shift from day one.
2. **Instant Photo-Proof Verification:** Staff capture quick photos of completed setups, giving them confidence that their work matches the brand standard.
3. **Constructive Remote Approvals:** Supervisors review visual evidence in real time, giving sign-offs and guidance without micromanaging.

Discover [how Mise works](/how-it-works) to bring operational clarity to your team.

## The impact of lower turnover

- **Faster Time to Productivity:** Help seasonal and new employees work independently sooner.
- **Lower Recruiting & Retraining Overhead:** Keep skilled floor staff longer by removing daily frustration and ambiguity.
- **Zero PMS Integration Required:** Deploy across housekeeping, F&B, front office, and engineering immediately without IT delays or API integrations.
`,
  },
  "/problems/star-rating-ceiling": {
    lede: "Eliminate micro-service failures and lift guest reviews with photo-verified precision.",
    body: `
## What is the "star rating ceiling"?

Many hotels invest in renovations, linens, and staff training, yet stay stuck at a plateau on Tripadvisor, Google, and OTA review scores. This "Star Rating Ceiling" is rarely caused by major breakdowns; it comes from small, recurring micro-defects such as a forgotten bath towel, a dusty air vent, or a delayed luggage delivery. [Mise](/) catches micro-failures before they reach the guest by requiring timed task execution and mandatory visual proof.

## Why micro-service breakdowns stall guest review growth

Guests rarely leave poor reviews because of catastrophic failures; they leave them because small details were overlooked during their stay:

- **Inconsistent Room Presentation:** Dust on high surfaces, missing welcome amenities, or an unreplenished minibar undermine an otherwise great stay.
- **Sluggish Service Delivery:** Delayed engineering fixes or slow housekeeping requests turn minor guest requests into public review complaints.
- **Unverified Quality Checks:** Department heads lack the bandwidth to physically check every room and public space, so small defects slip through to arriving guests.

## How Mise makes execution consistent

The [Mise platform](/platform) turns brand excellence from a goal into a verifiable, shift-by-shift requirement:

1. **Timed Precision Workflows:** Housekeeping, front desk, and room service tasks run against time targets for prompt delivery.
2. **Visual Quality Gates:** Staff capture mandatory photo proof of completed room staging, cleaned bathrooms, and dining setups before marking a task complete.
3. **Remote Quality Verification:** Supervisors inspect visual evidence remotely and approve work, so rooms that meet the standard are released faster.

Explore [how Mise works](/how-it-works) to safeguard your property's reputation.

## The business impact of breaking the review ceiling

- **Stronger Rate Position:** Consistent review scores support the room rates a property can command.
- **More Direct Bookings:** Consistent guest feedback builds brand trust and reduces reliance on third-party channels.
- **Zero PMS Integration Required:** Deploy across housekeeping, front office, F&B, and engineering immediately without IT friction.
`,
  },
  "/platform": {
    lede: "Turn written standards into accountable, timed execution across every department.",
    body: `
Mise is the service execution platform (SEP) for hotels. It does not write your standards: it implements the SOPs your hotel already has, running them as timed tasks on staff phones in every department, capturing photo and supervisor evidence as the work happens, and building an audit-ready service record. Not an LMS. No PMS integration required.

## Core Capabilities of Our Hotel Service Execution Platform

Our hotel SEP software gives general managers and operational leaders complete floor visibility by turning static operational procedures into active, trackable execution.

- **Timed Tasks on Staff Phones:** Delivering scheduled workflows directly to frontline staff devices ensures tasks happen at exact operational intervals—from morning room inspections and public area sanitation to evening turndown services.
- **Photo Proof & Visual Verification:** As a dedicated photo proof execution platform, Mise stops "ghost SOPs" by requiring staff to upload timestamped visual proof as work is completed on the floor.
- **Remote Supervisor Evidence & Sign-Offs:** Functioning as a high-accountability supervisor verification execution software, floor managers can review image proof and sign off on completed shift tasks remotely from their mobile screens, eliminating inspection bottlenecks.
- **Audit-Ready Service Records:** Every verified action is compiled automatically into permanent, searchable digital logs, providing immediate proof of compliance for brand standard inspections and HR audits.

## Multi-Department Operations Execution Platform

Unlike single-department tools, Mise is designed as a broad hotel operations execution platform that powers service consistency across your entire property:

1. **Front Office & Guest Services:** Manage shift handovers, VIP amenity setups, and lobby inspection checks seamlessly with real-time logs.
2. **Housekeeping & Public Areas:** Enforce room turnarounds, deep cleaning protocols, and linen tracking with timestamped visual proof.
3. **Engineering & Maintenance:** Execute routine equipment maintenance, safety checks, and work orders with verified supervisor sign-offs.
4. **Food & Beverage Operations:** Track kitchen prep schedules, temperature logs, and restaurant opening checklists prior to guest service.

## Built for Rapid Deployment

Deploying a modern hotel service execution platform shouldn't require months of technical delays or vendor API negotiations.

- **No PMS Integration Required:** Launch immediately in the browser on any iOS or Android phone, and on the web, without modifying or connecting to your Property Management System.
- **Not an LMS:** Mise does not replace your learning management system or force staff through passive training videos; it drives active daily execution where work actually happens on the floor.
`,
  },
  "/problems": {
    lede: "Why written standards fail on the floor, and how a service execution platform (SEP) fixes it.",
    body: `
Most hotels don't suffer from a lack of standard operating procedures; they suffer from a breakdown in floor execution. Paper binders, static spreadsheets, and unstructured chat apps leave leadership blind to what is actually happening during shifts.

Mise is the service execution platform (SEP) built specifically to bridge this gap across every hotel department—without requiring complex PMS integrations and without acting as an LMS.

## The Critical Operational Failures We Solve

### The "Ghost SOP" Problem
- **The Failure:** Paper checklists and digital checkboxes allow staff to mark tasks as completed without executing the actual work. Unverified task completions lead to guest complaints, missed maintenance steps, and failed brand audits.
- **The Solution:** Mise operates as an accountable service execution platform, requiring frontline staff to submit real-time, timestamped photo proof directly from their mobile devices before a task can be logged as complete.

### Floor Supervisor Bottlenecks
- **The Failure:** Supervisors spend hours physically pacing corridors to inspect rooms, verify public areas, or check kitchen prep routines—creating major operational delays during peak hours.
- **The Solution:** Our platform enables remote supervisor verification. Floor managers review incoming visual evidence on their phones, clearing inspection bottlenecks and approving completed work instantly.

### WhatsApp & Spreadsheet Chaos
- **The Failure:** Using WhatsApp group chats and Excel sheets to coordinate operations results in buried maintenance requests, lost photos, zero shift accountability, and privacy risks.
- **The Solution:** Mise replaces unstructured messaging with scheduled timed tasks, automated duty manager shift handover logs, and searchable service records built for multi-department alignment.

### Complex IT & PMS Integration Barriers
- **The Failure:** Traditional operations software requires months of IT setup, expensive vendor API fees, and complex PMS integrations before floor teams can even use the software.
- **The Solution:** Mise operates completely standalone with zero PMS integration required. Launch across housekeeping, front office, engineering, and F&B on day one using standard mobile devices and web browsers.

## SOP Implementation & Continuous Maintenance

Solving operational failures requires more than a one-time fix. Mise ensures long-term operational standards execution through a continuous 3-step cycle:

1. **Implement Existing Standards:** Bring your hotel's current SOPs; Mise converts them into structured timed tasks delivered straight to staff phones.
2. **Execute with Proof:** Staff capture mandatory visual evidence on the floor as work happens, eliminating ghost SOPs across every department.
3. **Maintain Compliance:** Automated audit-ready service records maintain permanent shift logs, ensuring your property is perpetually ready for brand audits and compliance reviews.
`,
  },
  "/solutions": {
    lede: "One platform to run your property’s existing standards with photo proof and timed tasks.",
    body: `
Mise is the service execution platform (SEP) for hotels. It does not write your standards: it implements the SOPs your hotel already has, running them as timed tasks on staff phones in every department, capturing photo and supervisor evidence as the work happens, and building an audit-ready service record. Not an LMS. No PMS integration required.

## Tailored Solutions for Every Department

Mise breaks down operational silos by delivering a unified hotel operations execution platform built for total property alignment:

### Housekeeping Operations

Implement room setup standards, turndown routines, and public area cleaning protocols as scheduled, timed tasks. Frontline staff capture mandatory timestamped photo proof inside the platform, eliminating "ghost SOPs" and ensuring every guest room meets brand standards before check-in.

### Front Office & Duty Managers

Replace manual shift logs and unorganized chat groups with automated duty manager handover logs. Capture VIP arrivals, guest requests, and shift incidents in real time, building a permanent service record that keeps operational transitions seamless.

### Engineering & Preventive Maintenance

Execute scheduled equipment servicing, room repair tickets, and safety inspections with mandatory visual verification. Supervisors review and sign off on completed work orders remotely, ensuring total accountability across physical asset upkeep.

### Food & Beverage

Enforce kitchen prep schedules, buffet layout standards, and temperature log compliance prior to guest service. Timed task reminders on staff phones guarantee pre-shift standards are met on schedule every day.

## SOP Implementation & Continuous Maintenance Across Departments

Maintaining service quality requires consistent execution across all teams, shifts, and property areas:

1. **Departmental Onboarding:** Bring your hotel's existing standards; Mise puts them straight into execution as active timed tasks without forcing staff through passive classroom training.
2. **Visual Proof & Sign-Offs:** Every team member submits real-time visual evidence as work happens, allowing department heads to clear supervisor bottlenecks remotely.
3. **Property-Wide Compliance:** Permanent, searchable digital logs aggregate multi-department task records, keeping your hotel perpetually audit-ready.
`,
  },
  "/how-it-works": {
    lede: "From written standards to daily floor execution in 4 simple steps.",
    body: `
Mise is the service execution platform (SEP) for hotels. It does not write your standards: it implements the SOPs your hotel already has, running them as timed tasks on staff phones in every department, capturing photo and supervisor evidence as the work happens, and building an audit-ready service record. Not an LMS. No PMS integration required.

## Step-by-Step Platform Execution

### Step 1: Bring Your Existing Standards

There is no need to write new SOPs or rebuild your brand guidelines. Simply bring the operational procedures your hotel already owns. Mise digitizes your existing rules into structured schedules ready for daily execution.

### Step 2: Timed Tasks Delivered to Staff Phones

Frontline teams receive scheduled, department-specific tasks directly on their mobile devices as work needs to happen. Timed notifications ensure housekeeping turndowns, maintenance checks, and front office handovers are completed on schedule throughout every shift.

### Step 3: Real-Time Photo Proof & Visual Evidence

To eliminate "ghost SOPs," staff capture timestamped visual evidence directly within the platform as tasks are performed. Photo verification ensures standards are met with concrete visual proof rather than passive checkmarks.

### Step 4: Mobile Supervisor Evidence & Audit Readiness

Floor supervisors review incoming task evidence remotely on their phones. Managers approve or flag work instantly, clearing inspection bottlenecks. Every verified action builds an automated, permanent service record for total audit readiness.

## SOP Implementation and Maintenance Built In

Maintaining service quality isn't a one-time project: it's an active daily commitment:

- **SOP Implementation:** Deploy your property’s operational standards directly onto staff phones on day one with zero PMS integration delays.
- **SOP Maintenance:** Prevent operational decay across shifts with mandatory visual evidence, timed schedules, and structured supervisor sign-offs.
`,
  },
  "/for/hr-directors": {
    lede: "Bridge the gap between written HR policies and daily floor execution.",
    body: `
For Hotel HR Directors and Talent Leaders, establishing standards in policy handbooks is only half the battle. Ensuring those standards are executed daily across every shift, department, and property is where compliance breaks down.

Mise is the service execution platform (SEP) for hotels. It does not write your standards: it implements the SOPs your hotel already has, running them as timed tasks on staff phones in every department, capturing photo and supervisor evidence as the work happens, and building an audit-ready service record. Not an LMS. No PMS integration required.

## Why Hotel HR Directors Partner with Mise

Maintaining workforce compliance and operational alignment requires active floor tools, not passive classroom sessions:

- **Active Execution Over Passive Learning (Not an LMS):** Traditional learning management systems train staff passively via classroom slides, but offer zero visibility into whether safety routines and operating standards are executed on shift. Mise delivers active, timed tasks straight to staff phones during working hours.
- **Continuous Audit Readiness & Permanent Compliance Logs:** Whether facing internal brand standard audits, safety inspections, or labor compliance checks, Mise compiles searchable, time-stamped visual records of every completed task and supervisor sign-off automatically.
- **Eliminating Shift Ambiguity & "Ghost SOPs":** Staff know exactly what is expected, when it needs to be executed, and how to submit visual verification. Mandatory photo proof ensures tasks are completed correctly, removing gray areas and liability on the floor.
- **Seamless Multi-Department Adoption:** Deploy effortlessly across Housekeeping, Front Desk, F&B, and Engineering without needing complex Property Management System (PMS) integrations or IT delays.

## SOP Implementation & Continuous Standards Maintenance for HR Teams

Mise simplifies how HR leaders maintain brand excellence across rotating shifts and high staff turnover:

1. **Immediate Implementation:** Upload your property's existing operational and compliance standards; Mise converts them into structured daily task schedules.
2. **Visual Evidence & Sign-Offs:** Staff complete timed tasks with required photo proof, while floor managers review and sign off remotely to maintain supervisor accountability.
3. **Continuous Standards Maintenance:** New hires and seasonal staff follow clear, on-device execution paths on day one, maintaining total brand consistency across all teams.
`,
  },
  "/for/general-managers": {
    lede: "Protect brand reputation, eliminate operational failures, and guarantee audit readiness.",
    body: `
As a Hotel General Manager, your property's reputation hinges on daily consistency across every shift and department. Yet, managing floor execution through physical binder checks, fragmented WhatsApp groups, and verbal updates leaves you vulnerable to missed standards, guest complaints, and audit failures.

Mise is the service execution platform (SEP) for hotels. It does not write your standards: it implements the SOPs your hotel already has, running them as timed tasks on staff phones in every department, capturing photo and supervisor evidence as the work happens, and building an audit-ready service record. Not an LMS. No PMS integration required.

## Why General Managers Choose Mise

Mise equips GMs with top-down executive oversight while empowering frontline teams with clear, accountable floor workflows:

- **Complete Floor-Level Visibility:** Access real-time operational execution data across Housekeeping, Front Office, Maintenance, and F&B directly from your phone or desktop.
- **Elimination of "Ghost SOPs":** Ensure tasks aren't just marked as "done" on paper. Mandatory timestamped photo verification guarantees that room setups, safety checks, and repairs are physically completed to standard.
- **Instant Brand Audit Readiness:** Every verified task, photo log, and supervisor sign-off compiles automatically into a permanent, searchable digital ledger – giving you total confidence during brand standards inspections and corporate reviews.
- **Rapid Multi-Department Deployment:** Launch across your entire property on day one without waiting for complex PMS integrations, IT approvals, or software vendor API access.

## SOP Implementation & Continuous Maintenance for GMs

Mise bridges executive vision and floor reality through an accountable execution cycle:

1. **Seamless Implementation:** Bring your existing brand standards; Mise converts them into active, timed tasks delivered straight to frontline staff phones.
2. **Real-Time Floor Execution:** Staff capture visual evidence as work happens, while department heads sign off remotely clearing floor bottlenecks instantly.
3. **Continuous Standards Maintenance:** Maintain high compliance across rotating shifts, high turnover, and seasonal peaks without constant micromanagement.
`,
  },
  "/for/learning-and-development": {
    lede: "Turn classroom standards into daily on-the-job habits across every department.",
    body: `
For Hotel Learning & Development (L&D) Managers and Trainers, conducting workshops and publishing training videos is only step one. The biggest challenge is ensuring that what staff learn in training translates into active, daily compliance during busy floor shifts.

Mise is the service execution platform (SEP) for hotels. It does not write your standards: it implements the SOPs your hotel already has, running them as timed tasks on staff phones in every department, capturing photo and supervisor evidence as the work happens, and building an audit-ready service record. Not an LMS. No PMS integration required.

## Why Hotel L&D Leaders Partner with Mise

Mise complements your existing training strategy by providing an active execution layer directly on the floor:

- **Active Execution Over Passive Learning (Not an LMS):** While a traditional learning management system delivers passive training videos and quizzes, Mise drives daily active execution. It puts trained standards directly into staff hands as scheduled, timed tasks during actual working shifts.
- **Rapid Onboarding for Rotating Staff:** Reduce onboarding time for new hires and seasonal team members. Mise guides staff step-by-step on their mobile devices, ensuring daily SOPs are followed correctly from day one without constant one-on-one shadowing.
- **Elimination of "Ghost SOPs":** Ensure trained procedures aren't forgotten after orientation. Mandatory timestamped photo verification requires staff to prove tasks were executed according to brand standards.
- **Real-Time Operational Feedback:** Supervisor mobile sign-offs give L&D leaders immediate visibility into which operational standards are being mastered and where refresher training is needed.

## SOP Implementation & Continuous Standards Maintenance for L&D

Mise turns training content into sustainable daily habits across all teams:

1. **Immediate Implementation:** Upload your property's existing operational training guidelines; Mise converts them into active, timed task workflows on staff phones.
2. **On-the-Job Visual Execution:** Staff execute trained tasks on shift and submit photo proof, while supervisors verify quality remotely to eliminate floor bottlenecks.
3. **Long-Term Standards Maintenance:** Prevent standard decay over time by embedding daily task execution and automated audit records into shift culture.
`,
  },
  "/solutions/front-office": {
    lede: "Turn front desk standards into accountable, timed tasks and digital handover logs.",
    body: `
## What is the Mise Front Office SEP?

Mise is a dedicated service execution platform (SEP) designed for hotel front offices. It does not write your standards: it implements the front office SOPs your hotel already has, running them as timed tasks on staff mobile phones, capturing supervisor sign-offs as work happens, and building an audit-ready service record. Not an LMS. No PMS integration required.

## Core Front Office Operational Challenges Solved

Front desk operations require absolute precision during every shift transition. Traditional reliance on messy WhatsApp chats, verbal briefings, and paper logs creates severe accountability gaps. Mise provides a structured operational framework:

- **Automated Duty Manager Handover Logs:** Replace lost shift notes and verbal oversights with a secure, centralized digital ledger. Duty managers log ongoing guest issues, incidents, and handovers seamlessly between shifts.
- **VIP & Room Arrival Checklists:** Ensure special guest preferences, welcome amenities, and pre-arrival inspections are executed on schedule with verified supervisor sign-offs.
- **Replacing WhatsApp & Excel Chaos:** Maintain professional internal coordination across front desk teams with secure, searchable task records instead of personal chat threads.

## How the Front Office Service Execution Platform Works
1. **Instant Implementation:** Bring your front desk's existing operating procedures; Mise deploys them as structured timed tasks on staff mobile devices on day one.
2. **Remote Supervisor Verification:** Floor managers review and sign off on shift tasks remotely, removing front desk bottlenecks during peak check-in and check-out hours.
3. **Permanent Audit Trails:** Maintain complete, searchable historical records of every shift log and guest issue resolution for management reviews and quality audits.

## Why Front Office Leaders Choose Mise
- **Zero PMS Integration Required:** Deploy immediately across the front desk without waiting for Property Management System vendors, IT approvals, or complex API connections.
- **Not an LMS:** Mise drives active, daily on-the-shift execution rather than passive training sessions or videos.
- **Multi-Department Alignment:** Connect front office workflows seamlessly with housekeeping, maintenance, and F&B under a unified property execution platform.
`,
  },
  "/solutions/housekeeping": {
    lede: "Turn room turnaround standards into accountable timed tasks with mandatory photo proof.",
    body: `
## What is the Mise Housekeeping SEP?

Mise is a dedicated service execution platform (SEP) built specifically for hotel housekeeping departments. It does not write your standards: it implements the housekeeping SOPs your hotel already has, running them as timed tasks on staff mobile phones, requiring real-time photo verification for room setups, and capturing supervisor sign-offs as work happens. Not an LMS. No PMS integration required.

## Critical Housekeeping Operational Challenges Solved

Housekeeping efficiency directly dictates guest satisfaction and brand audit scores. Traditional paper checklists and basic digital checkboxes allow "ghost SOPs"—tasks marked as finished without actual floor execution. Mise provides rigorous operational control:

- **Eliminating "Ghost SOPs" with Photo Verification:** Housekeeping staff must capture timestamped visual proof for room setups, amenity placements, and deep cleaning routines directly inside the app before a room status can be logged as complete.
- **Streamlined Room Turnaround & Turndown Routines:** Deliver scheduled, timed cleaning tasks straight to room attendants' mobile devices to optimize pacing across peak check-out and check-in windows.
- **Public Area & Deep Cleaning Schedules:** Maintain absolute accountability for lobbies, corridors, and spa zones through recurring timed task assignments and remote manager audits.

## How the Housekeeping Service Execution Platform Works
1. **Instant Implementation:** Bring your existing room cleaning procedures; Mise deploys them as structured timed tasks on staff mobile devices on day one.
2. **Visual Proof & Remote Sign-Offs:** Room attendants upload mandatory photo evidence upon completion, allowing floor supervisors to inspect and approve room standards remotely without walking every corridor.
3. **Audit-Ready Service Records:** Every verified task and photo log is automatically compiled into a searchable digital archive for brand quality reviews.

## Why Housekeeping Directors Choose Mise
- **Zero PMS Integration Required:** Deploy immediately across room attendants and supervisors without waiting for Property Management System vendor approvals or complex IT setup.
- **Not an LMS:** Mise drives active, real-time shift execution on the floor rather than passive video training or classroom sessions.
- **Seamless Multi-Department Connectivity:** Align housekeeping room statuses smoothly with front desk arrivals and engineering maintenance tickets under one unified execution platform.
`,
  },
  "/solutions/food-and-beverage": {
    lede: "Turn kitchen prep schedules, sanitation logs, and dining standards into accountable timed tasks.",
    body: `
## What is the Mise F&B SEP?

Mise is a dedicated service execution platform (SEP) engineered for hotel Food & Beverage (F&B) operations. It does not write your culinary or service standards: it implements the F&B SOPs your hotel already owns, running them as timed tasks on staff mobile devices, requiring photo verification for pre-service setups, and capturing supervisor sign-offs as work happens. Not an LMS. No PMS integration required.

## Core F&B Operational Challenges Solved

Food and beverage operations across hotel restaurants, room service, banquets, and kitchens require strict timing and hygiene compliance. Relying on paper clipboards, verbal check-ins, or unorganized messaging leads to skipped steps and health audit risks. Mise provides active operational control:

- **Kitchen Prep Schedules & Temperature Logging:** Ensure line cooks and kitchen staff complete mandatory cold storage temperature checks, line preps, and food safety logs on a strict timed schedule with visual evidence.
- **Buffet Setup & Dining Room Standards:** Require floor staff to submit timestamped photo proof of buffet presentations, table settings, and bar prep prior to opening doors for service.
- **Banquet & Event Execution:** Coordinate multi-stage banquet setups, beverage station refills, and breakdown routines seamlessly across rotating event shifts.

## How the F&B Service Execution Platform Works
1. **Instant Implementation:** Upload your existing kitchen and restaurant operating procedures; Mise converts them into active, timed task workflows on staff mobile devices on day one.
2. **Visual Proof & Remote Supervisor Approvals:** Culinary and restaurant staff upload required photo evidence, allowing Executive Chefs and F&B Managers to verify quality standards remotely without leaving the pass.
3. **Audit-Ready Health & Safety Logs:** Every verified food prep task, temperature log, and sanitation check is automatically archived into a searchable digital ledger for internal and regulatory audits.

## Why F&B Directors Choose Mise
- **Zero PMS Integration Required:** Deploy instantly across outlets, kitchens, and bars without waiting for POS or Property Management System vendor integrations.
- **Not an LMS:** Mise drives active, shift-by-shift execution on the floor rather than passive food safety training videos or classroom training.
- **Seamless Property Alignment:** Connect F&B service routines directly with housekeeping and maintenance teams under one unified operational platform.
`,
  },
  "/solutions/kitchen": {
    lede: "Enforce culinary prep schedules, HACCP compliance, and sanitation standards as timed tasks.",
    body: `
## What is the Mise Kitchen SEP?

Mise is a dedicated service execution platform (SEP) built specifically for hotel kitchen operations and culinary teams. It does not write your recipes or health guidelines: it implements the culinary and hygiene SOPs your hotel already owns, running them as timed tasks on staff mobile devices, capturing timestamped photo proof for line prep and food safety, and recording Executive Chef sign-offs as work happens. Not an LMS. No PMS integration required.

## Core Hotel Kitchen Challenges Solved

Hotel kitchens operate in high-pressure, fast-paced environments where skipping health checks or line preps leads to food quality failures and regulatory penalties. Paper clipboards grease up, pencil-whipped logs compromise safety, and verbal handovers cause shift miscommunication. Mise provides rigorous operational discipline:

- **Automated HACCP & Temperature Logs:** Cold room, freezer, and hot-holding temperature audits pop up as scheduled, timed tasks on line cooks' phones, requiring instant visual verification before being logged.
- **Line Prep & Mise en Place Timing:** Ensure prep stations are fully stocked, labeled, and prepared according to brand standards well ahead of breakfast, lunch, and dinner services.
- **Deep Sanitation & Kitchen Closing Routines:** End-of-shift deep cleaning, hood grease checks, and waste disposal protocols require mandatory photo evidence before kitchen leads sign off on closing.

## How the Kitchen Service Execution Platform Works
1. **Instant Implementation:** Bring your existing kitchen operational guidelines; Mise deploys them as structured, timed task workflows on culinary team devices on day one.
2. **Visual Proof & Executive Chef Verification:** Cooks upload mandatory photo proof of prep stations and clean lines, allowing Executive Chefs and Sous Chefs to approve standards remotely without leaving the pass.
3. **Audit-Ready Health Records:** Every temperature entry, cleaning log, and equipment check is compiled into a permanent digital record ready for internal quality audits and municipal health inspections.

## Why Executive Chefs & Hotel Operations Teams Choose Mise
- **Zero PMS Integration Required:** Deploy immediately across main kitchens, pastry stations, and banquet prep areas without waiting for POS or Property Management System vendor integrations.
- **Not an LMS:** Mise drives active, shift-by-shift execution on the pass rather than passive culinary training videos or classroom training.
- **Property-Wide Coordination:** Link kitchen equipment maintenance tickets directly with engineering and stewards under one unified operational execution platform.
`,
  },
  "/solutions/engineering": {
    lede: "Turn preventive maintenance routines and asset safety standards into accountable timed tasks.",
    body: `
## What is the Mise Engineering SEP?

Mise is a dedicated service execution platform (SEP) engineered specifically for hotel engineering and facility maintenance teams. It does not write your technical maintenance manuals: it implements the engineering SOPs your hotel already owns, running them as timed tasks on technicians' mobile devices, requiring mandatory photo proof of repairs and boiler/HVAC inspections, and logging Chief Engineer sign-offs as work happens. Not an LMS. No PMS integration required.

## Core Hotel Engineering & Maintenance Challenges Solved

Deferring preventive maintenance or relying on pencil-whipped paper logs leads to costly equipment breakdowns, guest room out-of-order delays, and severe safety audit risks. Unstructured chat groups cause maintenance tickets to get lost or delayed. Mise provides total operational control and accountability:

- **Preventive Maintenance (PM) Schedules:** Deliver recurring, timed tasks straight to technicians' phones for HVAC servicing, pool chemistry checks, generator tests, and water treatment routines before failures occur.
- **Photo-Verified Work Order Completion:** Eliminate "ghost repairs." Technicians must attach timestamped visual proof (before and after photos) showing fixed fixtures, repainted walls, or cleared AC filters before closing a ticket.
- **Plant Room & Safety Inspection Logs:** Enforce daily life safety, fire pump, and electrical room inspections with structured mobile task sequences and mandatory supervisor sign-offs.

## How the Engineering Service Execution Platform Works
1. **Instant Implementation:** Upload your property's existing preventive maintenance checklists; Mise converts them into active, timed task schedules on technician mobile devices on day one.
2. **Visual Evidence & Remote Chief Engineer Sign-Offs:** Technicians capture required photo proof upon work completion, allowing Chief Engineers to inspect and approve repair quality remotely.
3. **Audit-Ready Asset History:** Every verified inspection log, photo proof, and repair ticket is automatically archived into an permanent, searchable digital ledger for safety audits and capital budget planning.

## Why Chief Engineers & Property Directors Choose Mise
- **Zero PMS Integration Required:** Deploy immediately across engineering staff, duty engineers, and subcontractors without waiting for complex Property Management System API connections.
- **Not an LMS:** Mise drives active, shift-by-shift maintenance execution on the plant room floor rather than passive training videos or classroom training.
- **Multi-Department Issue Tracking:** Connect engineering work orders directly with housekeeping room flags, front desk requests, and F&B kitchen equipment issues under one unified execution platform.
`,
  },
  "/solutions/security-and-safety": {
    lede: "Turn guard patrol routines, fire safety audits, and incident reporting into accountable timed tasks.",
    body: `
## What is the Mise Security & Safety SEP?

Mise is a dedicated service execution platform (SEP) engineered for hotel security and loss prevention teams. It does not write your emergency response plans or security manuals: it implements the safety SOPs your property already owns, running them as timed tasks on officers' mobile devices, capturing timestamped photo proof of perimeter checks and hazard clearings, and recording Security Director sign-offs as work happens. Not an LMS. No PMS integration required.

## Critical Hotel Security & Life Safety Vulnerabilities Solved

Relying on paper guard logs, physical logbooks, or unmonitored patrol runs leaves hotel properties exposed to severe liability, unverified perimeter access, and life safety violations. Pencil-whipped checklists during night shifts create critical security blind spots. Mise provides complete risk mitigation and floor-level accountability:

- **Timed Guard Patrols & Perimeter Audits:** Deliver recurring, scheduled patrol routes straight to security officers' mobile devices for floor-by-floor walk-throughs, parking area checks, and emergency exit verification.
- **Photo-Verified Hazard & Fire Safety Checks:** Eliminate unverified checks. Guards must submit real-time visual proof showing clear fire exits, functional panic hardware, and operational CCTV monitors before a patrol route can be marked complete.
- **Structured Incident Logging & Night Shift Handovers:** Standardize shift incident reporting, key control handovers, and lost & found logs into a permanent, time-stamped digital record accessible by senior leadership.

## How the Security & Safety Execution Platform Works
1. **Instant Implementation:** Upload your property's security procedures and life safety guidelines; Mise converts them into active, timed task schedules on security staff mobile devices on day one.
2. **Visual Evidence & Remote Director Approval:** Security officers capture required photo evidence during rounds, enabling Risk Managers and Security Directors to review and approve patrol compliance remotely.
3. **Audit-Ready Liability Records:** Every verified patrol, fire route check, and incident log is stored in a permanent digital archive for corporate audits, insurance compliance, and local authority reviews.

## Why Security Directors & Risk Officers Choose Mise
- **Zero PMS Integration Required:** Deploy immediately across security personnel, night auditors, and third-party guard forces without waiting for complex Property Management System API setups.
- **Not an LMS:** Mise drives active, shift-by-shift security execution on the floor rather than passive safety training videos or online quizzes.
- **Property-Wide Safety Coordination:** Connect security hazard flags directly with engineering maintenance and front desk management under a single, unified execution platform.
`,
  },
  "/solutions/spa-and-wellness": {
    lede: "Turn treatment room turnarounds, hygiene protocols, and wellness standards into accountable timed tasks.",
    body: `
## What is the Mise Spa & Wellness SEP?

Mise is a dedicated service execution platform (SEP) engineered for hotel spa and wellness centers. It does not write your wellness standards or treatment manuals: it implements the spa SOPs your hotel already owns, running them as timed tasks on therapists' and attendants' mobile devices, requiring mandatory photo proof of pristine room setups, and recording supervisor sign-offs as work happens. Not an LMS. No PMS integration required.

## Critical Hotel Spa & Wellness Challenges Solved

Maintaining a tranquil, immaculate guest experience requires rigorous attention to detail across rapid room turnovers, equipment sterilization, and lounge sanitation. Relying on paper clipboards or unorganized messaging leads to skipped sanitation steps and inconsistent room readiness. Mise provides absolute operational discipline:

- **Rapid Treatment Room Turnovers:** Deliver timed cleaning and resetting schedules straight to spa attendants' mobile devices to ensure treatment rooms are fully sanitized, stocked, and prepared between back-to-back guest appointments.
- **Photo-Verified Hygiene & Equipment Checklists:** Eliminate skipped hygiene checks. Attendants must submit timestamped visual proof of sterilized equipment, fresh linens, and aromatic setups before a room can be marked ready.
- **Hydrotherapy & Wellness Facility Audits:** Enforce daily safety and cleanliness logs for saunas, steam rooms, Jacuzzis, and relaxation lounges through structured mobile task sequences.

## How the Spa & Wellness Execution Platform Works
1. **Instant Implementation:** Upload your property's existing spa operating standards; Mise converts them into active, timed task workflows on therapist and attendant devices on day one.
2. **Visual Evidence & Spa Manager Sign-Offs:** Staff capture required photo proof upon completing room turnovers, allowing Spa Directors to inspect and verify readiness remotely.
3. **Audit-Ready Compliance Logs:** Every verified sanitation check, room reset, and facility audit is archived into a permanent digital record for internal quality reviews and health inspections.

## Why Spa Directors & Hotel Operations Leaders Choose Mise
- **Zero PMS Integration Required:** Deploy immediately across spa receptionists, therapists, and attendants without waiting for Property Management System vendor approvals or complex API setups.
- **Not an LMS:** Mise drives active, shift-by-shift floor execution in the wellness center rather than passive training videos or wellness quizzes.
- **Property-Wide Service Connectivity:** Link spa guest requests and facility maintenance tickets directly with engineering and front desk teams under one unified execution platform.
`,
  },
  "/solutions/hotel-chains": {
    lede: "Scale brand standards, eliminate operational drift, and guarantee consistency across multiple properties.",
    body: `
## What is the Mise Hotel Chain SEP?

Mise is a dedicated service execution platform (SEP) engineered for enterprise hotel chains and multi-property groups. It does not write your brand standards: it implements the SOPs your corporate group already owns, running them as timed tasks on staff mobile devices across all properties, capturing timestamped photo proof of execution, and recording supervisor sign-offs in real time. Not an LMS. No PMS integration required.

## Core Multi-Property Operational Challenges Solved

Scaling a hotel brand across regional properties introduces severe compliance risks. Inconsistent local checklists, "ghost SOPs" marked as done without physical verification, and lack of corporate visibility lead to brand degradation and failed audits. Mise provides centralized enterprise control:

- **Eliminating "Brand Standard Drift":** Ensure every property – from flagship urban hotels to regional franchise locations—executes daily housekeeping, engineering, and guest service standards identically through structured mobile task sequences.
- **Centralized Multi-Property Visibility:** Corporate leaders, regional directors, and brand compliance officers gain a bird's-eye view of operational execution across all locations without micromanaging local shifts.
- **Instant Corporate Audit Readiness:** Automatically aggregate timestamped photo proof, completed schedules, and manager sign-offs into searchable, brand-wide compliance archives.

## How the Enterprise Service Execution Platform Works
1. **Enterprise Standards Rollout:** Upload your brand's core operating standards once; Mise deploys them as timed task workflows across multiple properties and departments on day one.
2. **Local Execution & Remote Verification:** Staff complete tasks on their phones with mandatory photo proof, while property supervisors and regional managers verify quality remotely.
3. **Cross-Property Comparison:** Every property writes to the service record in the same structure, so compliance rates, completion times and bottlenecks can be compared across your portfolio.

## Why Corporate Hotel Executives Choose Mise
- **Zero PMS Integration Required:** Deploy rapidly across new or existing properties without navigating complex, multi-vendor Property Management System API approvals or IT roadblocks.
- **Not an LMS:** Mise drives active, daily shift-by-shift floor execution rather than passive corporate training sessions or online classroom sessions.
- **Unified Brand Alignment:** Connect housekeeping, front office, F&B, engineering, and safety teams under a single, enterprise-grade service execution standard.
`,
  },
  "/solutions/boutique-hotels": {
    lede: "Empower lean teams, protect unique brand standards, and ensure flawless guest experiences.",
    body: `
## What is the Mise Boutique Hotel SEP?

Mise is a dedicated service execution platform (SEP) built specifically for boutique and independent hotels. It does not write your unique brand standards: it implements the bespoke hospitality SOPs your property already owns, running them as timed tasks on staff mobile devices, capturing timestamped photo proof of room setups and guest amenities, and recording manager sign-offs in real time. Not an LMS. No PMS integration required.

## Critical Boutique Hotel Operational Challenges Solved

Boutique and independent hotels thrive on intimate guest touchpoints, unique aesthetics, and agile service. However, running lean teams often leads to cross-departmental communication gaps, reliance on personal group chats, and inconsistent execution during seasonal staff turnovers. Mise provides lightweight, rigorous operational discipline without enterprise software bloat:

- **Empowering Lean & Multi-Role Teams:** When staff wear multiple hats across front-of-house, housekeeping, and guest services, Mise delivers crystal-clear, timed mobile task schedules that prevent dropped responsibilities.
- **Preserving Bespoke Luxury Standards:** Ensure signature welcome amenities, customized room staging, and boutique cleanliness standards are executed identically every single time through mandatory photo verification.
- **Replacing WhatsApp & Clipboard Chaos:** Keep internal team communication organized, professional, and accountable with secure digital logs instead of messy personal messaging apps.

## How the Boutique Hotel Execution Platform Works
1. **Instant Implementation:** Upload your property's unique operating procedures; Mise deploys them as structured timed task workflows on staff mobile devices on day one.
2. **Visual Evidence & Remote Manager Sign-Offs:** Staff capture required photo proof upon completing room turnovers or guest requests, allowing property managers to inspect and approve quality remotely.
3. **Audit-Ready Service Records:** Every verified task, photo log, and supervisor sign-off is compiled into a searchable digital archive for management reviews and brand quality checks.

## Why Boutique Hotel Owners & General Managers Choose Mise
- **Zero PMS Integration Required:** Deploy immediately across your property without navigating complex Property Management System vendor restrictions, IT bottlenecks, or expensive API setups.
- **Not an LMS:** Mise drives active, daily shift-by-shift floor execution rather than passive training videos or online classroom sessions.
- **Agile & Lightweight:** Designed specifically for independent properties that require high performance and rapid adoption without cumbersome enterprise software overhead.
`,
  },
};

/** Puts a route's pack copy ahead of the page's own lede and body. */
export function withSepCopy<T extends { meta: { path: string }; lede: string; body: string }>(page: T): T {
  const copy = sepCopy[page.meta.path];
  return copy ? { ...page, lede: `${copy.lede} ${page.lede}`, body: `${copy.body}\n${page.body}` } : page;
}
