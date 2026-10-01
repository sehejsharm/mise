# Live verification: misehotel.com

## Status: live run not yet executed

None of the checks below have been run against https://misehotel.com. Running `node scripts/verify-live.mjs` against the live site overwrites this file with the real PASS/FAIL table.

Why the live run was blocked:

1. **Network.** The build session's sandbox network policy denies `misehotel.com` (`curl: CONNECT tunnel failed, response 403`). Web fetch tools are blocked for that domain too.
2. **Vercel access.** The Vercel connection available to the build session sees one team, "sehejsharm's projects", which has no `mise` project. Creating one returned `403 forbidden`. The project serving misehotel.com is in a team that connection cannot read, so it could not:
   - confirm the deployment is Ready and aliased;
   - read the Production environment variables (`RESEND_API_KEY`, `DEMO_INBOX_EMAIL`);
   - read the build log (IndexNow response).

Deployment: the fix is pushed to `claude/tender-turing-pf2ike`, the repository's default branch. The Vercel project linked to the repo deploys it automatically.

## Run it against the live site

From any machine with network access:

```bash
pnpm install
node scripts/verify-live.mjs --submit-test-lead   # writes docs/LIVE-VERIFICATION.md
pnpm audit:copy:live                              # writes docs/COPY-AUDIT-LIVE.md
```

- `--submit-test-lead` sends one real demo request ("TEST — ignore", hello@misehotel.com) through live `/demo`.
- Whether Resend delivered it must be confirmed in the Resend dashboard and the inbox. The script never claims delivery.

## Rehearsal: the same script against the local production build

Result: **22 PASS · 0 FAIL · 5 SKIP**. Full table in [LIVE-VERIFICATION-LOCAL.md](LIVE-VERIFICATION-LOCAL.md).

The 5 SKIPs can only be answered by the live site:
- HTTP→HTTPS and www→apex redirects;
- the TLS certificate;
- GA4 `page_view` collect hits (Google is unreachable from the sandbox);
- the IndexNow response (Vercel build log);
- Resend delivery.

| Area | Rehearsal result |
|---|---|
| Fix is live | Title and H1 contain "SOP app for hotels". Nav Solutions → `/solutions`. `/solutions` and the 4 new department pages return 200. **318 demo CTAs across 66 pages, all → `/demo`, zero mailto.** llms.txt has "Departments covered" |
| Security headers | HSTS, CSP, nosniff, Referrer-Policy and Permissions-Policy all present |
| Google tag | `G-X8HT0D7TPW` in the HTML. gtag/js requested exactly once on `/`, `/solutions`, `/platform` and `/demo`. Consent defaults to denied, with no collect hits before Accept. `demo_cta_click` fires on a CTA click, and `demo_form_submit` fires on submit |
| Demo form | `POST /api/lead` returned 200 and the success state was shown. This was a dry run: the local server has `LEAD_DRY_RUN=1` and no Resend key |
| SEO / GEO | 66 sitemap URLs, including the new ones, with `lastmod` 2026-10-01 on the changed pages. robots allows the 10 AI crawlers and blocks `/keystatic` and `/api`. llms files are 200 `text/plain`. Every page has 1 H1, a self-canonical, title ≤60, description ≤158 and parseable JSON-LD. Schema descriptions match the canonical definition. OG images are 1200×630. 76 internal links, 0 broken |

### Lighthouse (local production build, median of 3 runs)

Budget: Performance ≥90 on mobile and ≥95 on desktop; Accessibility, Best Practices and SEO = 100.

| Page | Mobile (Perf / A11y / BP / SEO) | Desktop (Perf / A11y / BP / SEO) |
|---|---|---|
| `/` | 93 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/solutions` | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/platform` | 92 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/demo` | 94 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

All within budget. `pnpm lhci` asserts these thresholds. Live numbers will differ with Vercel's CDN and real network conditions.

## Manual steps for the owner

1. **Google Search Console:** resubmit `https://misehotel.com/sitemap.xml` and request indexing for `/`, `/solutions` and `/platform`.
2. **Bing Webmaster Tools:** the same.
3. **GA4 Realtime:** accept cookies on the live site, then confirm the `page_view`, `demo_cta_click` and `demo_form_submit` hits appear.
4. **Mise LinkedIn page:** create it, then replace the Focus Realm LinkedIn link in `content/site.ts` (`socialProfiles`) and `components/site/Footer.tsx`.
5. **Vercel Production env:** confirm `RESEND_API_KEY`, `DEMO_INBOX_EMAIL` and `RESEND_FROM_EMAIL` are set, and that `misehotel.com` is verified in Resend. Without these, `/demo` shows an error and offers the email fallback.
