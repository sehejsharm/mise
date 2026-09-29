# Launch checklist: misehotel.com

Work top to bottom. Each item says where to do it and how to confirm it worked.
A box is ticked only when its check passes.

---

## 1. Put the site on Vercel

- [ ] **Import the repository.**
  - Open <https://vercel.com/new> while signed in to the `sehejsharms-projects` team, and import `sehejsharm/mise`.
  - The Next.js framework is detected automatically.
  - The install command (`pnpm install`, from `packageManager` in `package.json`) and build command (`pnpm build`) need no overrides.
  - Node 20 or newer is required.
- [ ] **Choose the production branch.**
  - All work currently lives on `claude/tender-turing-pf2ike`, which is also the repository's default branch, so Vercel treats it as production.
  - To use `main` instead:
    1. Merge the work into `main`.
    2. Make `main` the GitHub default branch.
    3. Set Vercel → Project → Settings → Git → Production Branch to `main`.
  - Confirm: pushing to the production branch creates a Production deployment, and pushing to any other branch creates a Preview.
- [ ] **Set environment variables** (Vercel → Project → Settings → Environment Variables). Every key is documented in `.env.example`.

  | Key | Production | Preview | Notes |
  |---|---|---|---|
  | `NEXT_PUBLIC_SITE_URL` | `https://misehotel.com` | `https://misehotel.com` | Canonicals and schema always point at the apex |
  | `NEXT_PUBLIC_GA_ID` | `G-X8HT0D7TPW` | (leave empty to use the same) | Already the code default |
  | `NEXT_PUBLIC_CONTACT_EMAIL` | the monitored inbox | same | Resolve TODO(sehej) §4 first |
  | `NEXT_PUBLIC_CONTACT_PHONE` | `+91 93221 07991` | same | |
  | `NEXT_PUBLIC_BOOKING_URL` | Cal.com/Calendly link | same | Optional; embeds the scheduler on `/demo` |
  | `RESEND_API_KEY` | from resend.com | optional | **Required for leads to arrive.** Without it, forms show the contact email instead |
  | `DEMO_INBOX_EMAIL` | inbox for leads | same | |
  | `RESEND_FROM_EMAIL` | `Mise website <website@misehotel.com>` | same | The domain must be verified in Resend (§3) |
  | `GOOGLE_SITE_VERIFICATION` | token from §5 | — | |
  | `BING_SITE_VERIFICATION` | token from §5 | — | |
  | `INDEXNOW_KEY` | 32-char hex (`openssl rand -hex 16`) | — | Set only once DNS points at Vercel |
  | `KEYSTATIC_*` | from §6 | same | CMS editing on the live site |

  `NEXT_PUBLIC_*` values are inlined at build time, so **redeploy after changing any of them.**
- [ ] **Deploy and smoke-test the `*.vercel.app` URL.**
  - The home page, `/demo`, `/llms.txt` and `/sitemap.xml` load.
  - Submitting the demo form shows the confirmation (with Resend set) or the contact email (without it).

## 2. Point misehotel.com at Vercel

- [ ] **Add the domains.**
  - In Vercel → Project → Settings → Domains, add `misehotel.com` and `www.misehotel.com`.
  - Set `www` to redirect to the apex. `vercel.json` also 301s `www` → apex.
- [ ] **Create the DNS records** Vercel shows for each domain, at the registrar.
  - Use the values on that settings page, because they can differ per project.
  - For reference, Vercel's standard records are:
    - apex: `A` → `76.76.21.21`
    - www: `CNAME` → `cname.vercel-dns.com`
  - Remove any older `A`/`AAAA` records for the apex that point elsewhere.
- [ ] **Wait for the Valid Configuration check and TLS.** Both domains should show "Valid Configuration" and a certificate.
  - Confirm: `curl -sI https://www.misehotel.com` returns `301` with `location: https://misehotel.com/`.
  - Confirm: `curl -sI https://misehotel.com` returns `200` and `strict-transport-security`.

## 3. Email

- [ ] **Verify `misehotel.com` in Resend** by adding the SPF/DKIM records it shows.
  - Send a test demo request from the live site.
  - Confirm it lands in `DEMO_INBOX_EMAIL` and that reply-to is the visitor's address.
- [ ] **Make sure the public mailbox exists** (default `hello@misehotel.com`) and someone monitors it.
  - It appears in the footer, `/contact`, the media kit, schema `contactPoint` and `llms.txt`.

## 4. Resolve every open decision before launch

These markers are in the code. `grep -rn "TODO(" --exclude-dir=node_modules --exclude-dir=.next .` lists them.

| # | Item | Where | What to decide |
|---|---|---|---|
| 1 | Contact mailbox | `content/site.ts`, `.env.example` | Confirm `hello@misehotel.com`, or set `NEXT_PUBLIC_CONTACT_EMAIL` |
| 2 | Clarks testimonial | `content/site.ts` → `showClarksTestimonial` (off) | Show the verbatim quote only if Clarks is happy for it to appear on Mise's site |
| 3 | Client logos | `content/site.ts` → `clients[].logo`, `public/images/clients/` | Official SVGs, with written permission. Text wordmarks show until then |
| 4 | Advisor titles and bios | `content/advisors/*.json` (edit in `/keystatic`) | Confirm titles taken from the old site. Resolve the "'ALL' of finesse" credit on Renu Mehra's note. Add bios if wanted |
| 5 | Founder thesis lines | `content/site.ts` → `founders[].thesis` | Each founder approves or rewrites their line |
| 6 | Six blog drafts | `content/blog/*.mdoc` (edit in `/keystatic`) | Review, confirm bylines, then set Status to Published. **Drafts are hidden on Production**, so the blog is empty until at least one is published |
| 7 | Legal pages | `content/legal.ts` | Registered entity name and address, governing law, counsel review of privacy/terms/cookies |
| 8 | Security page facts | `content/legal.ts` | Hosting region(s) and the production access-control model |
| 9 | Multi-property roll-up | `content/solutions.ts` (hotel chains) | Confirm which cross-property views are live today |
| 10 | Mise LinkedIn page | `content/site.ts` → `socialProfiles`, `components/site/Footer.tsx` | Create the company page and swap the footer link, which points at Sehej's profile for now |
| 11 | Outbound citations | `pnpm build && pnpm check:links` | Click-check every "unverified" URL from a normal network (see §7) |
| 12 | Old-site crawl | `docs/current-site-inventory.md` | Built from the old site's source, because focusrealm.org was unreachable from the build sandbox. Spot-check it against the live site |
| 13 | Focus Realm back-links | focusrealm.org | Add the reciprocal links in `docs/BACKLINKS.md` §1 |

## 5. Search engines

- [ ] **Google Search Console.**
  1. Go to <https://search.google.com/search-console> → Add property → **URL prefix** `https://misehotel.com/` → HTML tag method.
  2. Copy only the `content` value into `GOOGLE_SITE_VERIFICATION` and redeploy.
  3. Click Verify.
  4. Submit `https://misehotel.com/sitemap.xml` under Sitemaps.
  - A **Domain** property (DNS TXT record) also works and covers `www`. The meta tag is then unnecessary.
- [ ] **Bing Webmaster Tools.**
  1. Go to <https://www.bing.com/webmasters> → Add site → **HTML Meta Tag** method.
  2. Copy the `content` value into `BING_SITE_VERIFICATION`, redeploy and click Verify. Alternatively, choose "Import from Google Search Console".
  3. Submit the sitemap.
  - Bing's index feeds ChatGPT search, so do not skip this.
- [ ] **IndexNow.**
  - Set `INDEXNOW_KEY` after DNS resolves.
  - Each production build then pings IndexNow with every sitemap URL (`scripts/indexnow.mjs`), and the key file is served at `/indexnow-key.txt`.
  - Confirm: the Vercel build log shows `✓ indexnow: submitted N URLs (HTTP 200)` or `(HTTP 202)`.
- [ ] **Rich results.** Run <https://search.google.com/test/rich-results> on:
  - `/` (Organization, WebSite, SoftwareApplication);
  - `/faq` (FAQPage);
  - `/digital-sop` (HowTo);
  - a published blog post (BlogPosting);
  - `/glossary` (DefinedTermSet).

  There should be no errors.
- [ ] **AI crawlers.** `https://misehotel.com/robots.txt` should list GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot and CCBot as allowed.
  - Also check that Vercel → Firewall has no bot-protection rule blocking them.

## 6. CMS on the live site (Keystatic)

- [ ] **Connect the GitHub App.**
  1. Run the site locally (`pnpm dev`) with the `KEYSTATIC_*` variables empty.
  2. Open `http://localhost:3000/keystatic` and follow "Connect to GitHub". This creates a GitHub App for `sehejsharm/mise`.
  3. Copy the generated `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` into Vercel (Production and Preview) and redeploy.
  4. Add `https://misehotel.com/api/keystatic/github/oauth/callback` as a callback URL in the GitHub App settings.
  - Confirm: `https://misehotel.com/keystatic` asks you to sign in with GitHub, and saving a post creates a commit on the production branch.

## 7. Final pre-launch checks

- [ ] `pnpm build` passes. The post-build copy lint, image check and IndexNow step print ✓ or ↷.
- [ ] `pnpm test:e2e` passes.
- [ ] `pnpm check:links` from a normal network reports **0 broken** and no unverified URLs you have not clicked yourself.
  - LinkedIn answers automated requests with `999`, so click those by hand.
- [ ] `pnpm lhci` passes: Performance ≥ 95, and Accessibility, Best Practices and SEO = 100, on mobile and desktop.
- [ ] Open the live site on a phone in both themes. Accept and reject cookies, and check GA4 Realtime shows your visit only after accepting.
- [ ] **GA4 key events.** In GA4 → Admin → Events, mark `demo_form_submit` and `booking_opened` as key events once they have fired once.
