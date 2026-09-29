# Current site inventory — focusrealm.org

**Purpose:** a record of the current site's structure and facts, used to plan misehotel.com. **No copy from focusrealm.org is reused on misehotel.com.** Every sentence on the new site is newly written, so the two domains do not compete as duplicate content.

## How this inventory was produced

The build sandbox's network policy blocks `focusrealm.org`, `fr2-b6s.pages.dev` and `drive.google.com`, so a live crawl was not possible. Two substitutes were used instead:

- **Site source.** The Next.js source of the marketing site was read statically from `github.com/sehejsharm/focusrealm`, branch `claude/focus-realm-positioning-jwfvz7` (commit `097dea0`, 2026-09-28, "Add the SEO + GEO keyword master list across the site"). The README for that branch calls it "the public site for Focus Realm Hospitality". The `deploy_ready_fb_2026-09-03*` branches are older Firebase snapshots of the same site.
- **Product screenshots.** Real captures of the live prototype (`fr2-b6s.pages.dev`) live in that branch's `assets/platform/`. These are the "product imagery" source for the new site. Playwright could not reach the prototype.

> Re-run a live crawl from a machine that can reach focusrealm.org before launch, to confirm that production matches this branch. `TODO(sehej)`

---

## Global

| Element | Current state |
|---|---|
| Brand | "Focus Realm Hospitality" (short name "Focus Realm"). "Mise" appears only as a keyword / in-product name |
| Tagline | "Every shift, five-star." |
| Category line | "Service Execution Platform" / "The operating system for hotel service standards." |
| Primary nav | Platform · Problems · About · Team · Contact, plus a demo CTA |
| Primary CTA | "Book a 15-min demo" → `/demo` |
| Secondary CTA | "See the platform" → `/platform` |
| Contact | One address on the `focusrealm.org` domain (not reused, since the new site uses `hello@misehotel.com`) |
| Consent | Consent banner + "Cookie preferences" footer link that reopens it |
| Legal | Jurisdiction: India. Courts: Jaipur, Rajasthan. Law cited: Digital Personal Data Protection Act, 2023 (+ UK/EU GDPR where applicable). Effective date 11 Aug 2026 |
| Generated | `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/llms.txt`, `/llms-full.txt`, OG images, icons |

### Footer columns (current)
- **Platform:** Overview · Staff · mobile · Manager · desktop · Standards · desktop · The service record
- **The case:** The six pains · Ghost SOP · Audit ambush · About us · Why this is not an LMS · Hotel SOP guides · Hotel SOP software · Digitize hotel SOPs
- **Company:** Team · Sehej Sharma · Ali Electricwala · COO · Aditya Mishra · CTO · Contact
- **Get started:** Book a 15-min demo · What a demo covers · Live prototype (external) · Sitemap
- **Legal bar:** Privacy Policy · Terms of Service · Cookie Policy · Cookie preferences

---

## Routes and structure

### `/` — Home
Title pattern: "Focus Realm | Hotel SOP Management & Service Execution Platform".
Sections, in order:
1. **Hero.** Eyebrow "Service execution platform". H1 is a two-line hotel-SOPs-inside-the-shift statement, followed by a tagline subhead and a descriptive lede. CTAs: Book a 15-min demo, See the platform. Visual: a live "service record · writing now" event stream.
2. **The five-second question.** H2 = "Was room 208 reset to standard this morning, and can you prove it?". Two columns: a five-step phone-call chain ending in "no proof" vs one service-record row.
3. **Trusted by.** Client wordmark strip.
4. **Mechanism.** Three steps: standard inside the task → work produces evidence → evidence compounds into a service record.
5. **Pain snowball.** The six pains as linked cards (anchors into `/problems#…`).
6. **Convergence.** "Five places, one platform". Five jobs (write the standard, get it onto the floor, run it to standard, prove it happened, produce it for the audit) collapse into one.
7. **Role showcase.** Tabs for Staff / Manager / Standards, each with capabilities and screenshots.
8. **Testimonials.** Early-deployment quotes with a "language is theirs" note.
9. **Team strip.** Three founders.
10. **Guides strip.** Links into topic pages.
11. **FAQ.** Accordion, `FAQPage` schema.

### `/platform`
H1 concerns the three role interfaces and one service record. Each role (Staff, Manager, Standards) has persona, capabilities and screenshots, with anchors `#staff`, `#manager`, `#author`, `#service-record`. CTA to `/demo`.

### `/problems`
One long page. Each of the six pains has Status quo → Impact chain → The wound → The answer, with anchors per pain. CTAs to `/demo` and `/platform`.

### `/about`
Thesis in three sentences, an architecture diagram, and a "not an LMS" section. Four principles: subtraction first; three interfaces, not one responsive compromise; evidence is a gate, not a report; independence by design. Then a team strip and CTA.

### `/team`, `/team/[slug]`
Founders (Sehej Sharma, Ali Electricwala, Aditya Mishra) and a "Board of advisors" block. Profile pages have H1 name + role, bio, focus list, traits, a quote, `Person` schema, `rel="me"` profile links and an OG image per person.

### `/demo`
H1 "Book a 15-minute demo". Form fields: name, work email, role, property/group, property size, timeline, sharpest pain, notes. "What you see" block (your floor; Staff live on a phone; Manager and Author; pilot shape). Reassurance cards (no systems project; bring your worst standard; one property first).

### `/contact`
Form: name, email, company, topic, message. Three routing cards (comparing to an LMS / want to see it first / already know the pain).

### `/guides` and `/[topic]` (≈30 topic pages)
Topic slugs include: what-is-focus-realm, mise, hotel-sop-software, service-execution-platform, hotel-operations-software, hotel-task-management-software, hotel-timed-task-software, digitize-hotel-sops, replace-hotel-sop-binders, replace-whatsapp-hotel-operations, hotel-sop-app, hotel-sop-automation, hotel-shift-management, hotel-photo-evidence-app, hotel-audit-software, hotel-compliance-software, hotel-sop-compliance (ghost SOP), hotel-housekeeping-sop-software, hotel-department-sop-software, hotel-supervisor-workload, hotel-service-consistency, standalone-hotel-sop-software, multi-property-hotel-sop-software, hotel-sop-software-india, hotel-sop-software-for-managers, hotel-sop-software-vs-lms, best-hotel-sop-software.

> Planning note: several of these target the same keywords as the new misehotel.com pages. After launch, focusrealm.org should **301 its hospitality topic pages to the matching misehotel.com URL**, or trim them to short summaries that link across, so that only one of the two domains competes for each query. See `docs/BACKLINKS.md`.

### `/about-sehej-sharma`
A photo gallery (Wikimedia Commons) for the CEO. Not needed on misehotel.com.

### `/privacy`, `/terms`, `/cookies`
Standard policies (India / DPDP Act 2023).

---

## FAQ questions (current homepage)
1. What is Focus Realm Hospitality?
2. Is Focus Realm a hotel LMS or a training platform?
3. How does Focus Realm handle SOP management for hotels?
4. What evidence does the platform capture?
5. Does Focus Realm need a PMS integration?
6. Who are the three role interfaces for?
7. How does a Focus Realm pilot work?
8. Who founded Focus Realm Hospitality?

## Objections handled (current)
"Our staff will not use another app" · "We already have an LMS" · "IT will take six months to approve this" · "Our standards are not written down properly yet".

---

## Facts carried over (facts only, re-expressed in new copy)

**Product**
- Three role interfaces: Staff (mobile-first), Manager (desktop-primary), Standards/Author (desktop-only). Each is built separately.
- A standard carries a target time, fixed steps and four phases: **Prepare, Perform, Verify, Release**.
- A step marked for photo evidence **cannot be ticked until the photo is captured**.
- Runs in a browser on staff phones over mobile data. No PMS integration, no hardware. Platform runs on Google Cloud and Firebase.
- Pilots are one property, typically starting with housekeeping; evidence accumulates over the first 30 days. Pricing is scoped per property on a call (not published).
- The prototype shows "Default pilot · 1 property · 50 people · 30 days".

**Demo property (fictional): Aurora Grand Colombo, Colombo, Sri Lanka**
- 468 rooms · 14 guest floors · 42 staff on site.
- Manager overview snapshot: Ready 77% · Service health 84% · Guest signal 85%.
- Example record: Room 208 · Floor 2 · HSK-101 Guest Room Reset & Release · completed 08:39 · 24 min against a 26 min target · photo at step 4 · sign-off E. Rossi 08:42.
- Team progress: 34 of 42 staff ready for their current operation.
- SOP results view: 8 SOPs · 1,618 observed outcomes in 30 days (demo data).
- Personas: Maya Fernando (room attendant), Elena Rossi (operations manager), Amina Rahman (standards author), Arjun Rao (duty manager), Jonas Lee (incoming shift).

**Founders**
- Sehej Sharma: Co-Founder & CEO. Category & positioning, product thesis, go-to-market.
- Ali Electricwala: Co-Founder & COO. Pilot design & rollout, customer success, commercial operations.
- Aditya Mishra: Co-Founder & CTO. Subtraction-first design, platform architecture, Google Cloud & Firebase.

**Advisors** (as listed on the current site; no bio doc in the Drive folder)
- Parul Sharma: listed as "Hospitality Training Consultant"; credentials "Ex-Faculty, IHM Aurangabad" and "Co-Founder, 'All' of Finesse".
- Renu Mehra: listed as "Luxury & Celebrity Image Consultant & Corporate Trainer"; credential "Founder, RMIC".
- ⚠ The current site's client list separately says "Renu Mehra's 'ALL' of finesse". That is inconsistent with the advisor block. `TODO(sehej)` confirm.

**Clients (hospitality only on the new site)**
- Clarks Hotels & Resorts (multi-property hotel group).
- The Hosteller (distributed properties).
- The current site also lists non-hospitality clients (a school, SaaS teams, startups). These are **excluded** on misehotel.com per the brief.

**Testimonial (Clarks, verbatim, predates repositioning)**
> "Focus Realm provided a flexible LMS solution that improved staff training, automated compliance tracking, and enhanced reporting efficiency across multiple hotel properties."

On misehotel.com this is shown only behind a flag, with the framing "from an early deployment, in the client's own words". `TODO(sehej)` decide whether to show it.

**Screenshot set** (from `assets/platform/`, captured from the live prototype)
- Staff (812×1364, 2×): today, standards, briefs, sequence, service record, inbox.
- Manager (1372×888, 2×): overview, assignments, readiness (HR status), team progress, standard results.
- Standards/Author (1054×682, 2×): create standard, feedback inbox.
- **Excluded:** `author-pilot-foundation.jpg`, the `/author/platform` screen whose eyebrow reads "Lean LMS + Lean SOP".
