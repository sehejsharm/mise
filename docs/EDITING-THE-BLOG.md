# Editing the blog (and advisors)

The blog is managed in **Keystatic**, a visual editor that lives at `/keystatic` on the site.
Every post is stored as a file in this repository (`content/blog/<slug>.mdoc`), so there is no database to back up.
Saving in the editor makes a commit, and Vercel redeploys the site automatically, usually within two minutes.

## Where to edit

| Where | How it saves | When to use it |
|---|---|---|
| `https://misehotel.com/keystatic` | Commits to GitHub through the Keystatic GitHub App. Sign in with a GitHub account that has access to `sehejsharm/mise` | Day-to-day editing, once the App is connected (`docs/LAUNCH-CHECKLIST.md` §6) |
| `http://localhost:3000/keystatic` after `pnpm dev` | Writes files on your computer; commit and push them yourself | Developers, or before the App is connected |

## Publishing a post

1. Open **Blog posts** and pick a post, or click **Add**.
2. Fill in the fields. The ones that matter most:

   | Field | Rule |
   |---|---|
   | Title | The H1. Put the primary keyword near the front |
   | URL slug | Lowercase words with hyphens, e.g. `housekeeping-sop-checklist`. **Do not change it after publishing:** it breaks links and loses rankings |
   | Status | **Draft** shows only on preview deployments. **Published** puts the post on misehotel.com |
   | Excerpt | 40–240 characters, shown on blog cards |
   | TL;DR | The direct answer in 40–60 words, shown in a box at the top. AI answer engines quote this, so make it a complete answer |
   | Category, Author | Required. Authors are the three founders; add more under **Authors** |
   | Published date, Last updated | Change *Last updated* whenever the content changes meaningfully. It is shown on the page and sent to search engines |
   | Primary keyword | Use it in the title, the first 100 words and at least one H2 |
   | SEO title | 60 characters or fewer, ending in `\| Mise`. Leave empty to use the title |
   | SEO description | 140–158 characters, ending in a call to action such as "Book a 15-min demo." |
   | FAQ | 3–5 real questions with 40–60 word answers. They render on the page and as FAQ schema |
   | Cover image | Optional, at least 1600×900. Without one, the post uses its generated card. Always fill in the alt text |

3. Write the **Body**. Use H2 (`##`) for sections and H3 for sub-points.
   - Where a heading is a question, answer it in the first sentence underneath (40–60 words), then go into detail.
   - Lists, tables and numbered steps are good: search and AI engines lift them directly.
4. Set **Status** to **Published** and click **Save**. The post appears on `/blog`, in the sitemap, in the RSS feed and on its author and category pages after the redeploy.

## Things the site does for you

- **Internal links.**
  - The first mention of terms like "service execution platform", "ghost SOP" or "audit readiness" is linked automatically to the matching page (`lib/links.ts`).
  - Do not add those links by hand. Link other things normally.
- **A demo call-to-action** is inserted about 40% of the way down every post. The post also ends with one.
- **Reading time, table of contents, share buttons, related posts, schema and the social image** are all generated.

## Words to avoid

The build fails if a published page uses **"LMS", "course", "module", "learner" or "training platform"**.
- Mise is a service execution platform, so say *standard*, *timed task*, *evidence*, *service record*, *team*, *staff* instead.
- Call Mise the service execution platform (SEP), never "SOP software", "SOP app" or "SOP platform" (the build fails on these). Mise implements the SOPs a hotel already has; it does not write them.
- The only exceptions are the Mise-vs-LMS comparison content, which is already set up.
- Never mention internal partners, commercial terms or pricing. The CTA is always the demo.

## Claims

Only publish numbers you can link to a public, verifiable source, and link that source in the sentence.
- No invented statistics, customers, awards or certifications.
- Do not name clients or show their logos or quotes.

## Adding an advisor

1. In Keystatic, open **Advisors** → **Add**, and enter the **Name**.
2. Add a **Title**, **Credentials**, **LinkedIn** and **Bio** only if the advisor has confirmed them. Leave anything unconfirmed empty; the card then shows the name only. Never guess.
3. Upload a portrait under **Photo (upload)**: a square or portrait photo, at least 800 px wide.
4. Set **Display order** to place them on `/advisors` and on the About page.

The build refuses to ship an advisor without a photo; it never falls back to a silhouette.
For the best quality, a developer can add the photo to `assets/raw/advisors/<slug>.jpg`, then:
- add the person to `PEOPLE` and a crop box to `CROPS` in `scripts/process-images.mjs`;
- run `pnpm images`;
- set the advisor's **Processed photo key** to `advisors/<slug>`.

This produces AVIF/WebP at three sizes with a blur placeholder.

## Categories

**Categories** hold the name and a one-paragraph description, which is the intro on the category page.
A category page is indexed only once it has at least one published post.
