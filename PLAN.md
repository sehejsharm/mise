# PLAN — misehotel.com

The marketing site for **Mise**, a service execution platform for hotels built by Focus Realm.
Goals, in order: (1) search and AI-answer visibility, (2) 15-minute demo bookings.

---

## 0. Constraints discovered before building

| Constraint | Impact | Resolution |
|---|---|---|
| The sandbox egress policy blocks `focusrealm.org`, `fr2-b6s.pages.dev`, `drive.google.com`, `fonts.google.com`, `googletagmanager.com`, and the `.gov.in` sites | No live crawl, no live prototype capture, no `gdown`, no `next/font/google`, and GA cannot load in local tests | The current site was inventoried from its source (`sehejsharm/focusrealm`, positioning branch). Real prototype screenshots came from that repo's `assets/platform/`. Photos came through the Google Drive connector. Fonts are self-hosted from npm packages via `next/font/local`. GA behaviour is tested at the `dataLayer` level. Citation URLs were confirmed through search-engine results, with `TODO(verify)` markers to click-check before launch |
| Running the old site's code locally was not permitted | No rendered crawl of the old site | A static read of its source was enough for "structure and facts" |
| The Drive "Advisory Board" folder holds only two photos (`renu-mehra`, `parul-sharma`) and no bio document | Advisor titles are not in the folder | Titles are taken from the current focusrealm.org source and flagged `TODO(sehej)`. No bios were written |
| No client logo files exist anywhere | The proof strip would have nothing to show | Typographic wordmarks (plain text, not recreated trademarks) are used, with `TODO(sehej)` to supply official SVGs with permission |
| The prototype's `/author/platform` screen reads "Lean LMS + Lean SOP" | It contradicts the positioning | `author-pilot-foundation.jpg` is excluded from the image pipeline, and a test asserts it never ships |

---

## 1. Architecture

- **Next.js 15.5 App Router + React 19 + TypeScript.** Every marketing route is SSG (`generateStaticParams` on the dynamic segments). `trailingSlash: false`.
- **Tailwind CSS v4.** Design tokens live in `app/globals.css` under `@theme`. Dark is the default; the light theme uses `[data-theme="light"]`, set before paint by a tiny inline script.
- **Fonts.** `next/font/local` with self-hosted woff2: Space Grotesk (display), Inter (body), Geist Mono (timestamps). Display and body are preloaded, with `display: swap`.
- **Content model** (`content/`):
  - `content/pages/*.ts`: typed long-form pages (problems, solutions, audiences, pillars, comparisons, geo, glossary). Bodies are written in a small Markdown dialect, rendered server-side by `lib/md.tsx`, so they ship zero client JS.
  - `content/blog/*.mdoc`: Keystatic-managed posts (Markdoc), plus `content/authors`, `content/categories` and `content/advisors` as JSON.
  - `content/site.ts`: the canonical definition, brand strings, nav, footer, founders and clients. This is the single source of entity data for pages, schema, OG and `llms.txt`.
- **Internal-linking engine.** `lib/links.ts` maps keywords to URLs. `autolink()` links the first mention of each mapped term, once per page, never to the page itself and never inside an existing link. It runs over every pillar/problem/solution paragraph and every text node of a blog post.
- **SEO/GEO plumbing:**
  - `lib/seo.ts` builds `Metadata` (title ≤60, description ≤158, self-canonical, `hreflang` en / en-IN / x-default, OG/Twitter).
  - `lib/schema.ts` builds a typed `schema-dts` `@graph` per page.
  - `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt`, `app/llms-full.txt` and `app/og/[key]` (static OG PNGs per page) round it out.
- **CMS.** Keystatic is mounted at `/keystatic`, with its API at `/api/keystatic`. It uses GitHub storage when `KEYSTATIC_GITHUB_CLIENT_ID` is set, and local storage otherwise.
- **Forms.**
  - `POST /api/lead` covers the demo, contact and newsletter forms: zod validation, a honeypot plus a minimum fill time, and a per-IP token-bucket rate limit, delivered through Resend.
  - In production a missing `RESEND_API_KEY` returns 503. `LEAD_DRY_RUN=1` enables tests.
- **Analytics.** GA4 `G-X8HT0D7TPW` is set up in `app/layout.tsx`:
  - A Consent Mode v2 defaults snippet (`beforeInteractive`) sets everything to denied, and grants if the first-party `mise_consent` cookie says so.
  - `gtag.js` loads once (`afterInteractive`).
  - `gtag('config')` runs only once analytics consent is granted.
  - `lib/analytics.ts` is the only caller of `gtag` and drops events until consent is given.
- **Security headers** are set in `next.config.ts`: HSTS, CSP (GA4 plus the booking origin), nosniff, Referrer-Policy, Permissions-Policy and frame-ancestors. `vercel.json` handles the `www` → apex 301.

## 2. Motion and performance strategy

The budget is ≤170KB gz of first-load JS on `/`, excluding the 3D chunk, with LCP <2s, CLS <0.05 and INP <200ms.

| Layer | How it stays cheap |
|---|---|
| Reveals, counters, marquee, ticker, progress hairline | CSS plus one shared `IntersectionObserver` hook. The hairline uses CSS scroll-driven animation where supported. No library |
| GSAP + ScrollTrigger | `import()`ed only when a choreographed section nears the viewport. Pinning uses CSS `position: sticky`, so nothing jumps when GSAP arrives; GSAP only scrubs progress |
| Lenis | `import()`ed on idle, only on fine-pointer devices without reduced motion |
| Framer Motion | `LazyMotion` + `m` with async `domAnimation` features, used for tabs, the accordion, form states and the blog filter |
| R3F hero | Client-only `dynamic()`. It loads on the first user interaction (pointer, scroll, key or touch), or on idle after 4s, on capable devices only (WebGL, ≥4 cores, no `saveData`, no reduced motion). Until then an **animated SVG poster** of the same isometric scene is shown; low-power devices keep it permanently |
| LCP | The H1 is plain server-rendered text and is never animated from `opacity: 0` |

Under `prefers-reduced-motion`:
- no pinned sections;
- no scrubbing;
- no Lenis;
- no marquee or ticker movement (a pause control exists anyway);
- simple fades only.

## 3. Information architecture

This is the brief's §4 as specified. Additions:
- `/advisors`, without per-advisor pages, because no bios exist.
- `app/og/[key]` for static OG images.
- `/indexnow-key.txt`.

The page inventory lives in `lib/routes.ts`, which drives the sitemap, the Playwright route test, the SEO report and the visual QA run, so nothing can be orphaned silently.

## 4. Copy rules enforced in code

`scripts/copy-lint.mjs` runs after the build and scans rendered HTML plus the `content/` source.
- **LMS vocabulary.** "LMS", "course", "module", "learner" and "training platform" fail the check everywhere except:
  - `/compare/mise-vs-hotel-lms`;
  - elements marked `data-copy-lint="allow"` (the "Is Mise an LMS?" FAQ, testimonials, the comparison link label);
  - the exact negation in the canonical definition ("Not an LMS.").
- **Confidential terms.** The three confidential words/domains from the brief fail the check anywhere in the repo. The script stores them obfuscated, so the literal strings never appear.

## 5. Build order

1. Scaffold and tooling; tokens; fonts; the image pipeline (`scripts/process-images.mjs` using sharp).
2. Layout: header, footer, consent, GA, theme toggle, cursor, progress hairline; schema and SEO helpers.
3. Homepage sections 1–16.
4. Content system and long-form pages; `/roi`; demo and contact forms.
5. Blog, Keystatic, the six draft posts, RSS, OG.
6. Sitemap, robots, `llms.txt`, IndexNow, the autolinker.
7. Verification (§14 of the brief): build, lint, copy lint, image check, Playwright e2e, Lighthouse CI, visual QA with axe and overflow checks, the SEO report.
8. Docs and README, then push to `claude/tender-turing-pf2ike`.

## 6. Decisions to confirm (tracked as TODOs in code)

- `TODO(sehej)`: show the verbatim Clarks testimonial or omit it (`content/site.ts`, `showClarksTestimonial`, default **off**).
- `TODO(sehej)`: advisor titles and credentials, taken from the current site.
- `TODO(sehej)`: confirm that the `hello@misehotel.com` mailbox exists.
- `TODO(sehej)`: official client logo files.
- `TODO(review)`: founder thesis quotes (newly written) and all six blog posts (seeded as `draft`).
- `TODO(verify)`: click-check each outbound citation from an unrestricted network (`pnpm check:links`).
