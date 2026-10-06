# Live verification

Target: **http://localhost:3100** (local rehearsal, not the live site) · run 2026-10-06T07:43:03.823Z · `node scripts/verify-live.mjs --base http://localhost:3100 --out docs/LIVE-VERIFICATION-LOCAL.md`

**20 PASS · 0 FAIL · 5 SKIP**

## Domain & transport

| Check | Result | Evidence |
|---|---|---|
| http://localhost:3100 returns 200 | **PASS** | HTTP 200 |
| HTTP → HTTPS and www → apex redirects | **SKIP** | Not applicable to a local server |
| Valid TLS certificate | **SKIP** | Not applicable to a local server |
| Security headers (HSTS, CSP, nosniff, Referrer-Policy, Permissions-Policy) | **PASS** | strict-transport-security: max-age=63072000; includeSubDomains; preload<br>content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline' https:<br>x-content-type-options: nosniff<br>referrer-policy: strict-origin-when-cross-origin<br>permissions-policy: camera=(), microphone=(), geolocation=(), payment=(), usb=() |

## Fix is live

| Check | Result | Evidence |
|---|---|---|
| Homepage <title> and H1 name Mise the service execution platform (SEP) | **PASS** | title: Hotel Service Execution Platform (SEP) \| Mise \| H1: The service execution platform for hotels. Every department, every shift. |
| Nav "Solutions" goes to /solutions | **PASS** | href=/solutions |
| /solutions and the 4 new department pages return 200 | **PASS** | /solutions 200, /solutions/kitchen 200, /solutions/engineering 200, /solutions/security-and-safety 200, /solutions/spa-and-wellness 200 |
| Zero mailto demo CTAs; every "Book a 15-min demo" → /demo | **PASS** | 314 demo CTAs across 65 pages, all → /demo |
| llms.txt contains "Departments covered" | **PASS** | ## Departments covered<br><br>Mise is the service execution platform (SEP) for every hotel department, not a single-department tool. It implements the SOPs a hotel already has; it does not |

## SEO / GEO

| Check | Result | Evidence |
|---|---|---|
| sitemap.xml lists all routes including the new ones | **PASS** | 65 URLs; new pages present |
| sitemap lastModified for the changed pages is the repositioning date or later (2026-10-01; today 2026-10-06) | **PASS** | / 2026-10-06, /platform 2026-10-01, /solutions 2026-10-01, /solutions/kitchen 2026-10-01, /solutions/engineering 2026-10-01, /solutions/security-and-safety 2026-10-01, /solutions/spa-and-wellness 2026-10-01 |
| robots.txt allows the AI crawlers and blocks /keystatic and /api | **PASS** | all 10 crawlers listed; /keystatic and /api disallowed |
| /llms.txt returns 200 as text/plain | **PASS** | HTTP 200, text/plain; charset=utf-8 |
| /llms-full.txt returns 200 as text/plain | **PASS** | HTTP 200, text/plain; charset=utf-8 |
| Every page: one H1, self-canonical on https://misehotel.com, title ≤60, description ≤160, parseable JSON-LD | **PASS** | 65 pages checked |
| Organization / SoftwareApplication descriptions name the service execution platform (SEP); FAQ "What is Mise?" is the canonical definition | **PASS** | Organization: Mise is the service execution platform (SEP) for hotels. It implements… \| FAQ: Mise is the service execution platform (SEP) for h… |
| OG images resolve (200, 1200×630) for home, /solutions and each new solution page | **PASS** | home 200 1200×630, solutions 200 1200×630, solutions--kitchen 200 1200×630, solutions--engineering 200 1200×630, solutions--security-and-safety 200 1200×630, solutions--spa-and-wellness 200 1200×630 |
| Zero broken internal links / 404s across a full crawl | **PASS** | 75 unique internal links, all < 400 |
| IndexNow ping sent for changed URLs | **SKIP** | Logged in the Vercel production build output (scripts/indexnow.mjs); requires INDEXNOW_KEY in Production env |

## Google tag

| Check | Result | Evidence |
|---|---|---|
| G-KVTTR7P7BY present in the homepage HTML | **PASS** | 5 occurrences in raw HTML |
| gtag/js loads exactly once per page | **PASS** | /: 1, /solutions: 1, /platform: 1, /demo: 1 |
| Before consent: analytics_storage denied and no collect hits | **PASS** | first consent call: ["consent","default",{"ad_storage":"denied","ad_user_data":"denied","ad_personalization":"denied","analytics_storage":"denied","functionality_storage":"granted","security_storage":"granted","wait_for_update":500}]; collect hits: 0 |
| After Accept: page_view hit to /g/collect with tid=G-KVTTR7P7BY | **SKIP** | Google is not reachable from a local rehearsal; run against the live site |
| Clicking a demo CTA fires demo_cta_click | **PASS** | events: demo_cta_click; CTA href /demo |

## Demo form

| Check | Result | Evidence |
|---|---|---|
| Live /demo submission | **SKIP** | Not submitted. Re-run with --submit-test-lead to send one real test request |

## Separate commands

- Copy audit against the live sitemap: `node scripts/copy-audit.ts --base http://localhost:3100 --out docs/COPY-AUDIT-LIVE.md`
- Lighthouse (mobile + desktop) on live `/`, `/solutions`, `/platform`, `/demo`: `pnpm exec lhci collect --url=http://localhost:3100/ --url=http://localhost:3100/solutions --url=http://localhost:3100/platform --url=http://localhost:3100/demo && pnpm exec lhci collect --preset=desktop ...`
- Screenshots (390 / 1440, dark + light): `node scripts/qa/shot.mjs http://localhost:3100/solutions out.png 390 dark`
