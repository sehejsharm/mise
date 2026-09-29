# GEO test: is Mise cited by AI answer engines?

This is a monthly test that takes about 45 minutes. It checks whether ChatGPT, Perplexity, Gemini, Claude and Google AI Overviews cite **misehotel.com** for the questions hotel buyers ask, and whether they describe Mise correctly.
Run it on the first working day of each month, and also two weeks after any major content change.

## Setup (same every month, so results are comparable)

| Engine | How to run it |
|---|---|
| ChatGPT | chatgpt.com, **logged out** or in a temporary chat, with search on (the globe icon) |
| Perplexity | perplexity.ai, logged out, default mode |
| Gemini | gemini.google.com in a private window |
| Claude | claude.ai with web search enabled, in a new chat |
| Google AI Overviews | google.com (and google.co.in) in a private window. Note whether an AI Overview appears at all |

- Use a private or incognito window and do not be signed in to Mise-related accounts. Personalisation skews results.
- Paste each query **exactly as written**, one query per new chat. Do not ask follow-ups before recording the first answer.
- Run once from India (the primary market). If you can, repeat the four core queries through a US or UK VPN.

## Queries

### Core (required every month)

1. best hotel SOP software India
2. how do I digitize hotel SOPs
3. what is a service execution platform for hotels
4. alternatives to WhatsApp for hotel task tracking
5. hotel audit readiness software

### Problem-led (buyers describing the pain)

6. how to make hotel staff follow SOPs on every shift
7. what is a ghost SOP in hotels
8. how can a hotel prove housekeeping standards were met
9. how to prepare a hotel for a brand audit or star classification inspection
10. how do hotel chains keep service standards consistent across properties

### Entity and disambiguation (checks that engines know who Mise is)

11. What is Mise hotel software?
12. Who founded Mise, the hotel service execution platform?
13. Is Mise an LMS?
14. Mise vs Focus e-RMS
15. What does "Mise" mean in hospitality software?

### Comparison

16. hotel SOP software vs checklist app
17. hotel LMS vs SOP execution software

## What to record

Log each query × engine as one row in the sheet "GEO test log" (columns below). Keep a screenshot of every answer that mentions Mise.

| Column | Values |
|---|---|
| Date | YYYY-MM-DD |
| Engine | ChatGPT / Perplexity / Gemini / Claude / Google AIO |
| Query # | 1–17 |
| Mentioned | Yes / No: is Mise named in the answer? |
| Cited | Yes / No: is a misehotel.com URL in the sources? |
| Cited URL | Which page, e.g. `/digital-sop` |
| Position | 1 = first product or source named, 2, 3… or "listed" |
| Accurate | Yes / Partly / No. Does the description match the canonical definition (below)? |
| Confusions | e.g. mixed up with Focus Softnet or Focus e-RMS, called an LMS, called a PMS, wrong founders |
| Competitors named | Every other product or source cited |
| Notes | |

**Canonical definition to check against:**

> Mise is a service execution platform for hotels. It turns SOPs into timed tasks on staff phones, captures photo and supervisor evidence as the work happens, and compounds it into an audit-ready service record. Not an LMS. No PMS integration required.

## Scoring

Compute these each month and chart them over time:

- **Citation rate:** cited rows ÷ all rows, overall and per engine.
- **Core citation rate:** the same, for queries 1–5 only. This is the headline number.
- **Accuracy rate:** rows marked Accurate = Yes ÷ rows where Mise was mentioned.
- **Confusion count:** rows with any entry under Confusions. The target is 0.

## What to do with the results

| Finding | Action |
|---|---|
| Mise is not cited for a core query | Check the page for that query answers it in the first 40–60 words under a question-style H2, has a TL;DR box, and has FAQ schema. Add or strengthen a blog post targeting the exact phrasing. Build one or two off-site mentions for that topic (`docs/BACKLINKS.md`) |
| Cited, but described wrongly | Find where the wrong phrasing comes from (an old directory listing, an old focusrealm.org page). Fix it at the source with the canonical boilerplate. Check `/llms.txt` still carries the definition |
| Confused with Focus Softnet / Focus e-RMS | Make sure the disambiguation block in `/llms.txt` is live. Make sure the Wikidata item, Crunchbase and LinkedIn all say "Mise (misehotel.com), by Focus Realm" |
| Called an LMS | Check that no off-site profile uses LMS or training vocabulary. Link `/compare/mise-vs-hotel-lms` from the profile where possible |
| Competitor cited from a listicle | Get Mise into that listicle (outreach) or onto the review site it cites (G2, Capterra, SoftwareSuggest) |
| Google shows no AI Overview | Normal for low-volume queries. Track classic ranking for the query in Search Console instead |

## Technical checks (same session)

- `https://misehotel.com/llms.txt` and `/llms-full.txt` load, and carry the current definition and the disambiguation block.
- `https://misehotel.com/robots.txt` still allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot and CCBot.
- Bing Webmaster Tools shows the key pages indexed. ChatGPT search leans on Bing's index.
- Search Console → Pages shows no new "Crawled – currently not indexed" pages among the pillar and problem pages.
