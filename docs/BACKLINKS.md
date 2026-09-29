# Backlinks and authority plan

misehotel.com is a new domain. Its authority comes from three places:
1. Focus Realm's existing site passing authority across.
2. Consistent entity profiles, which search engines and AI answer engines cross-check.
3. Citations from hospitality and software directories.

Work through the list in priority order. Every profile uses the **same name, definition, founders and logo**. Inconsistency costs more than a missing profile.

> **Before linking or listing any URL, open it and confirm it resolves.** The directory URLs below are the services' public homepages. Signup paths change often, so start from the homepage.

---

## Copy to paste (use verbatim)

**Name:** Mise

**Website:** https://misehotel.com

**Category:** Service Execution Platform (hotel software)

**One-liner (≤ 80 characters):**
Every shift, five-star. Hotel SOPs as timed tasks, with evidence.

**Short description (canonical, ≤ 300 characters):**
> Mise is a service execution platform for hotels. It turns SOPs into timed tasks on staff phones, captures photo and supervisor evidence as the work happens, and compounds it into an audit-ready service record. Not an LMS. No PMS integration required.

**Long description (boilerplate):**
> Mise is a service execution platform for hotels. It turns SOPs into timed tasks on staff phones, captures photo and supervisor evidence as the work happens, and compounds it into an audit-ready service record. Not an LMS. No PMS integration required. Mise is built by Focus Realm and founded by Sehej Sharma, Ali Electricwala and Aditya Mishra. Its name comes from mise en place, the kitchen discipline of having everything in its place before service starts.

**Founders:** Sehej Sharma (Co-Founder & CEO), Ali Electricwala (Co-Founder & COO), Aditya Mishra (Co-Founder & CTO).

**Parent company:** Focus Realm, https://focusrealm.org

**Logo:** `public/brand/mise-logo-512.png` (square) and `public/brand/mise-logo.svg`. The full pack is at `/brand/mise-logo-pack.zip`.

**Contact:** the public inbox in `NEXT_PUBLIC_CONTACT_EMAIL` (default hello@misehotel.com), +91 93221 07991

**Markets:** India, Sri Lanka, South Asia

**Do not** state prices, customer counts, results percentages or certifications on any profile. Where a form requires pricing, choose "Contact vendor" or "Request a demo".

---

## 1. Focus Realm → Mise (do first; highest value, fully in our control)

Add these to **focusrealm.org**. Each is a plain `<a href>` without `rel="nofollow"`.

| Where on focusrealm.org | Target URL | Anchor text |
|---|---|---|
| Main navigation | https://misehotel.com/ | Mise — our hospitality platform |
| Footer ("Products" or "Our platforms") | https://misehotel.com/ | Mise — hotel service execution platform |
| Home page, the section about hospitality | https://misehotel.com/platform | Mise, our service execution platform for hotels |
| Team page, on each founder's card | https://misehotel.com/team/sehej-sharma (and the `ali-electricwala` and `aditya-mishra` pages) | Sehej Sharma on Mise |
| Any page mentioning the hotel SOP product | https://misehotel.com/digital-sop | digital SOPs for hotels |
| Old product/platform pages | **301 redirect** to the matching misehotel.com page, e.g. → `/platform` or `/how-it-works` | — |

- The old "author/platform" screen describes the product in LMS terms. Retire it or redirect it; do not link to it.
- misehotel.com already links back: the footer and About page link to focusrealm.org as the parent company.

## 2. Entity profiles (week 1)

| Priority | Profile | Start at | What to set | Link to | Anchor text / field |
|---|---|---|---|---|---|
| 1 | **LinkedIn company page** for Mise | https://www.linkedin.com/company/setup/new/ | Name "Mise", tagline = one-liner, About = long description, website, industry "Software Development", logo. Founders list Mise as their current position | https://misehotel.com/ | Website field |
| 2 | **Google Business Profile** | https://business.google.com/ | Only if eligible (Google requires in-person contact or a service area). Category "Software company", description = short description | https://misehotel.com/ | Website field |
| 3 | **Crunchbase** | https://www.crunchbase.com/ | Organization "Mise", parent organization Focus Realm, founders as people, description = short description | https://misehotel.com/ | Website field |
| 4 | **Wikidata** item | https://www.wikidata.org/wiki/Special:NewItem | See the recipe below | https://misehotel.com/ | "official website" (P856) |

After each profile goes live, add its URL to `socialProfiles` in `content/site.ts`. It then flows into Organization `sameAs` in the JSON-LD and the footer. Replace the footer's temporary LinkedIn link (TODO(sehej)) with the company page.

**Wikidata recipe.**
- Create the item only when at least one independent source exists (e.g. a press article or a directory listing), or it may be deleted.
- Label: `Mise`.
- Description: `hotel service execution platform by Focus Realm`.
- Also known as: `Mise hotel`, `misehotel.com`.
- Statements:
  - instance of (P31) → software (Q7397) or business (Q4830453);
  - official website (P856) → `https://misehotel.com`;
  - developer (P178) or parent organization (P749) → the Focus Realm item (create it first, with its own official website);
  - founded by (P112) → founder items only if they meet notability;
  - inception (P571) → 2024.
- Add a reference URL to each statement.

## 3. Software directories (weeks 2–4)

Use the short description, and the long description where there is room. Category: hotel management / hospitality operations / task management / SOP software, whichever the site offers.

| Priority | Directory | Start at | Notes |
|---|---|---|---|
| 1 | **G2** | https://www.g2.com/ | Claim a free vendor profile; ask the two pilot clients for reviews only with their permission |
| 2 | **Capterra** | https://www.capterra.com/ | One Gartner Digital Markets listing also feeds GetApp and Software Advice |
| 3 | **GetApp** | https://www.getapp.com/ | Usually created through the Capterra listing |
| 4 | **SoftwareSuggest** | https://www.softwaresuggest.com/ | Strong for India buyer searches |
| 5 | **SaaSworthy** | https://www.saasworthy.com/ | |
| 6 | **GoodFirms** | https://www.goodfirms.co/ | List Mise under software, not under services |

Every listing links to https://misehotel.com/ (or `/demo` where a separate "demo URL" field exists). When one goes live, add it to `socialProfiles`; the brief lists G2/Capterra for `sameAs`.

## 4. Launch moments (month 2)

| Item | Start at | Plan |
|---|---|---|
| **Product Hunt** | https://www.producthunt.com/ | Launch on a Tuesday–Thursday.<br>Tagline: "Every shift, five-star: hotel SOPs as timed tasks, with evidence".<br>First comment from Sehej: the mise en place story plus a 60-second loop video.<br>Link: https://misehotel.com/ |
| **Case study co-publishing** with **The Hosteller** and **Clarks Hotels & Resorts** | Their marketing and PR teams | Only with written approval of every word and number.<br>Publish on misehotel.com's blog and ask each to post or link it from their newsroom or LinkedIn.<br>Anchor: "Mise, the service execution platform we use for SOPs" |

## 5. Hospitality associations and directories (months 2–3)

| Target | Start at | Route |
|---|---|---|
| Hotel Association of India (HAI) | https://www.hotelassociationofindia.com/ | Allied or associate membership, if eligible. Its member directory links members |
| FHRAI | https://www.fhrai.com/ | Allied member or supplier directory, if eligible |
| Regional hotel associations (state and city) | Each association's site | Supplier listings; sponsor or speak at a chapter meeting |
| Hospitality education (IHMs) | Institute sites | Guest lectures on SOP execution. Faculty pages and event write-ups often link speakers' companies |

Check eligibility and membership terms before applying. List only what Mise actually qualifies for.

## 6. Founder-led content (ongoing)

**Podcasts and webinars (hospitality operations, HR in hospitality, Indian SaaS).** Pitch topics:
- "Why hotel SOPs die on the floor (the ghost SOP)"
- "Audit readiness as a by-product of the shift, not a scramble"
- "Replacing WhatsApp groups in hotel operations"

Ask for a show-notes link to https://misehotel.com/ or the relevant pillar page.

**Guest articles (hospitality trade publications and HR/ops blogs).** Rules:
- The byline links to the founder's `/team/<slug>` page.
- At most one contextual link to a pillar page, using descriptive anchors such as "digital SOPs for hotels" → `/digital-sop` or "hotel audit readiness" → `/audit-readiness`.
- Never exact-match anchors on every piece.

**LinkedIn.** Each founder posts one piece a month linking a new blog post, and lists Mise under Experience with the website set.

## 7. What not to do

- No paid link schemes, link exchanges, PBNs or bulk directory submissions. They risk a manual penalty on a new domain.
- No profile that states prices, invented metrics, awards or certifications.
- No mention of partner agreements, commercial terms or internal deal structures anywhere.
- No profile under a different name ("Mise App", "Mise Hotel Software") or with a different logo. Entity consistency is the whole point.

## Tracking

Keep a sheet with these columns: Profile, URL, Date live, Link type (dofollow/nofollow/none), Anchor, Owner, Next check.
Re-check every live profile quarterly for drift from the canonical description.
