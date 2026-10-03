# misehotel.com

The marketing site for **Mise**, a service execution platform for hotels, built by Focus Realm.

> Mise is a service execution platform for hotels. It turns SOPs into timed tasks on staff phones, captures photo and supervisor evidence as the work happens, and compounds it into an audit-ready service record. Not an LMS. No PMS integration required.

**Stack:**
- Next.js 15 (App Router, React Server Components, static generation), TypeScript and Tailwind CSS v4.
- Motion: GSAP + ScrollTrigger, Lenis and Framer Motion, all lazy-loaded.
- One lazy React Three Fiber hero scene.
- Keystatic CMS, Resend for forms, and GA4 with Consent Mode v2.
- Tooling: Playwright, Lighthouse CI.

`PLAN.md` explains the architecture and the reasons behind it.

| Doc | What it's for |
|---|---|
| [`docs/LAUNCH-CHECKLIST.md`](docs/LAUNCH-CHECKLIST.md) | Everything to do before and at launch: Vercel, DNS, email, Search Console, open decisions |
| [`docs/EDITING-THE-BLOG.md`](docs/EDITING-THE-BLOG.md) | Non-technical guide to Keystatic: publishing posts, adding advisors |
| [`docs/SEO-REPORT.md`](docs/SEO-REPORT.md) | Generated crawl report: title, H1, keyword placement and word counts per URL |
| [`docs/GEO-TEST.md`](docs/GEO-TEST.md) | Monthly test of whether AI answer engines cite Mise |
| [`docs/BACKLINKS.md`](docs/BACKLINKS.md) | Prioritised authority plan with paste-ready boilerplate |
| [`docs/current-site-inventory.md`](docs/current-site-inventory.md) | Facts carried over from focusrealm.org |

---

## Local setup

Requirements: **Node 20.9+** and **pnpm 10** (`corepack enable` picks the version pinned in `package.json`).

```bash
pnpm install
cp .env.example .env.local   # optional: every key has a safe default for local work
pnpm dev                     # http://localhost:3000
```

- Without `RESEND_API_KEY`, form submissions are accepted and logged to the terminal in development, not emailed.
- Draft blog posts are visible locally and on Vercel preview deployments.

### Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Production build. Afterwards it runs, in order:<br>1. the **copy lint** (banned vocabulary and confidential terms);<br>2. the **image check** (every founder and advisor has a portrait);<br>3. **IndexNow** (production only).<br>Any failure fails the build |
| `pnpm start` | Serve the build |
| `pnpm lint` / `pnpm typecheck` / `pnpm format` | ESLint, TypeScript, Prettier |
| `pnpm test:e2e` | Playwright:<br>- every route 200s, with one H1, title ≤ 60, description ≤ 158, self-canonical and valid JSON-LD;<br>- no broken internal links;<br>- GA4 exactly once and consent-gated;<br>- the demo form submits;<br>- reduced motion means no scroll-jacking |
| `pnpm test:visual` | Screenshots every sitemap URL at 390/768/1440/1920 px in dark and light themes, into `qa/screenshots/`. Also checks horizontal overflow and runs axe (WCAG 2.2 AA) at 390 and 1440. Summarise with `node scripts/qa/visual-summary.mjs` |
| `pnpm lhci` | Lighthouse CI on six key pages, mobile then desktop.<br>Performance must be ≥ 95; Accessibility, Best Practices and SEO must be 100 |
| `pnpm seo:report` | Regenerates `docs/SEO-REPORT.md` from the built HTML |
| `pnpm check:links` | Checks every external link in the built pages; `--strict` also fails on unverifiable ones |
| `pnpm audit:copy` | Positioning audit (`scripts/copy-audit.ts`, also run in `postbuild` and CI): fails if housekeeping appears in a title, H1 or meta description outside its own pages, if the homepage over-weights housekeeping, if any demo CTA is a `mailto:`, or on the vocabulary and confidential-term bans. Writes `docs/COPY-AUDIT.md` |
| `pnpm audit:copy:live` | The same audit against every URL in the live sitemap → `docs/COPY-AUDIT-LIVE.md` |
| `node scripts/verify-live.mjs` | Live deployment verification (domain, headers, positioning, CTAs, GA4 and consent, SEO/GEO, OG images, link crawl) → `docs/LIVE-VERIFICATION.md`. Add `--submit-test-lead` to send one real test request through `/demo` |
| `pnpm images` | Re-processes portraits and product screenshots from `assets/raw/` into AVIF/WebP with blur placeholders |
| `pnpm analyze` | Bundle analyser |

- Playwright uses the Chromium at `/opt/pw-browsers/chromium` when it exists. Elsewhere, run `pnpm exec playwright install chromium` once, or set `CHROME_PATH`.
- Run `pnpm build` before `test:e2e`, `test:visual`, `lhci`, `seo:report` or `check:links`.

## Environment variables

Every key, with its purpose, is in [`.env.example`](.env.example). The ones that matter in production:

| Key | Required? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin (`https://misehotel.com`) for canonicals, sitemap, OG and schema |
| — | — | GA4 measurement ID `G-KVTTR7P7BY` is fixed in `lib/analytics.ts` (no env override); the Search Console token is in `app/layout.tsx` (`GOOGLE_SITE_VERIFICATION` can override it) |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE` | No | Public contact details, defaults `hello@misehotel.com` and `+91 93221 07991` |
| `NEXT_PUBLIC_BOOKING_URL` | No | Cal.com/Calendly URL; embeds the scheduler on `/demo` |
| `RESEND_API_KEY`, `DEMO_INBOX_EMAIL`, `RESEND_FROM_EMAIL` | **Yes, for leads** | Email delivery for the `/demo` form, contact form and newsletter. Every demo CTA goes to `/demo`. Without a key in production, the form shows an error with a prefilled email fallback to `NEXT_PUBLIC_CONTACT_EMAIL` instead of dropping the lead |
| `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` | At launch | Search Console and Bing Webmaster verification meta tags |
| `INDEXNOW_KEY` | At launch | Pings IndexNow with the sitemap on each production build |
| `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | For live CMS editing | Keystatic GitHub mode |
| `BLOG_SHOW_DRAFTS` | No | `1` forces drafts on, `0` forces them off. The default is drafts on everywhere except Vercel Production |

`NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.

## Deploying to Vercel

1. **Import.**
   - Go to <https://vercel.com/new> → import `sehejsharm/mise` into the `sehejsharms-projects` team.
   - The framework (Next.js), install command (`pnpm install`) and build command (`pnpm build`) are detected automatically. Do not override them.
2. **Environment variables.** Add the keys above under Project → Settings → Environment Variables, for Production and Preview.
3. **Production branch.**
   - Vercel deploys the repository's default branch to production. Today that is `claude/tender-turing-pf2ike`.
   - To use `main`: merge into it, make it the GitHub default branch, and set Project → Settings → Git → Production Branch to `main`.
   - Every other branch gets a Preview URL. Previews show draft posts.
4. **Deploy.** Pushing to the production branch deploys. Check the build log for the three ✓ post-build lines.

`vercel.json` pins the framework and 301-redirects `www.misehotel.com` to the apex. Security headers (CSP, HSTS and others) are set in `next.config.ts`.

## Pointing misehotel.com at Vercel

1. In Vercel → Project → Settings → **Domains**, add `misehotel.com` and `www.misehotel.com`, with `www` redirecting to the apex.
2. At the domain registrar, create the records Vercel shows. Typically:

   | Host | Type | Value |
   |---|---|---|
   | `@` (apex) | `A` | `76.76.21.21` |
   | `www` | `CNAME` | `cname.vercel-dns.com` |

   Use the exact values on Vercel's Domains page if they differ, and delete any older apex `A`/`AAAA` records.
   Alternatively, point the domain's nameservers at Vercel DNS.
3. Wait for "Valid Configuration" and the TLS certificate (minutes to a few hours).
4. Confirm:
   - `curl -sI https://www.misehotel.com` → `301` to `https://misehotel.com/`;
   - `https://misehotel.com/sitemap.xml` lists `https://misehotel.com/…` URLs.

Then follow `docs/LAUNCH-CHECKLIST.md` §3–5 (email, Search Console, Bing, IndexNow).

## Editing the blog

Posts, authors, categories and advisors are edited in **Keystatic** at `/keystatic`. The full guide is [`docs/EDITING-THE-BLOG.md`](docs/EDITING-THE-BLOG.md).

- **Content** lives in the repo:
  - `content/blog/*.mdoc` (Markdoc with YAML front matter);
  - `content/authors/*.json`, `content/categories/*.json`, `content/advisors/*.json`.
- **Locally**, Keystatic writes files directly. **In production**, it commits through the Keystatic GitHub App (set up in `docs/LAUNCH-CHECKLIST.md` §6), and each save redeploys.
- **Status.** A post's `status` is `draft` or `published`. Drafts render on local and preview builds only, and are excluded from the production sitemap, RSS and listings.
- **Automatic additions.** Each post gets:
  - internal links on the first mention of key terms (`lib/links.ts`);
  - an inline demo card at about 40% of the post;
  - a table of contents, share buttons, related posts;
  - BlogPosting + FAQPage schema and a generated OG image.

## Adding an advisor

Quick path (no code):
1. Open `/keystatic` → **Advisors** → **Add**.
2. Enter the name, plus only the confirmed title, credentials, LinkedIn and bio.
3. Upload a portrait under **Photo (upload)** and save.

Best-quality path (developer):
1. Put the original photo at `assets/raw/advisors/<slug>.jpg`.
2. Add `{ group: "advisors", slug, seo: "<name>-advisory-board-mise" }` to `PEOPLE` and a 4:5 focal box to `CROPS` in `scripts/process-images.mjs`.
3. Run `pnpm images`. It writes AVIF/WebP at 400/800/1200 px and updates `lib/images.manifest.json`.
4. Create `content/advisors/<slug>.json` with `"photo": "advisors/<slug>"`, or set it in Keystatic.
5. Run `pnpm build`.

Rules:
- The build **fails** if any advisor or founder lacks a photo. There are no placeholder silhouettes.
- Never invent a title or bio. Leave the field empty and the card shows the name only.

## Project layout

```
app/                 routes (App Router)
  (site)/            every public page, wrapped in header/footer chrome
  api/lead/          demo, contact and newsletter intake (zod, honeypot, rate limit, Resend)
  keystatic/         CMS UI; API at app/api/keystatic
  og/[key]/          static Open Graph PNGs per page
  llms.txt/  llms-full.txt/  sitemap.ts  robots.ts
components/          ui primitives, site chrome, home sections, page templates, blog, forms, fx
content/             all copy and data: site.ts (brand, founders, nav) + one typed file per page family
lib/                 seo, schema (schema-dts), internal-link engine, markdown renderer, blog reader, analytics, consent, motion
scripts/             copy lint, image pipeline and check, IndexNow, SEO report, link check, QA helpers
tests/               e2e (Playwright) and visual QA
docs/                launch, SEO, GEO, backlinks, CMS docs
```

## Guardrails built into the code

- **One source of truth.** `content/site.ts` holds the canonical definition, founders and contact details. Pages, JSON-LD, OG images and `llms.txt` all read from it.
- **Copy lint** (`scripts/copy-lint.mjs`), run on every build:
  - fails on learning-platform vocabulary outside the Mise-vs-LMS comparison content;
  - fails on the confidential terms listed in the brief, anywhere in the repository.
- **Analytics.** `lib/analytics.ts` is the only caller of `gtag`. Nothing is sent before consent.
- **Claims.** The site states no prices. Industry figures appear only with a linked public source, and the ROI calculator's defaults are the visitor's own editable assumptions.
