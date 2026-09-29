/**
 * Keystatic CMS — edit at /keystatic.
 *
 * Content lives in this repository (content/**), so nothing is locked in a
 * database. With KEYSTATIC_GITHUB_CLIENT_ID set (production), edits are
 * committed to GitHub through the Keystatic GitHub App and redeploy the site.
 * Without it (local development), edits are written straight to disk.
 *
 * Non-technical guide: docs/EDITING-THE-BLOG.md
 */
import { collection, config, fields } from "@keystatic/core";

const useGitHub = Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID || process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG);

export default config({
  storage: useGitHub ? { kind: "github", repo: { owner: "sehejsharm", name: "mise" } } : { kind: "local" },
  ui: {
    brand: { name: "Mise" },
    navigation: {
      Blog: ["posts", "categories", "authors"],
      Company: ["advisors"],
    },
  },
  collections: {
    posts: collection({
      label: "Blog posts",
      slugField: "title",
      path: "content/blog/*",
      format: { contentField: "body" },
      entryLayout: "content",
      columns: ["title", "status", "publishedAt"],
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { length: { min: 10, max: 110 } } },
          slug: { label: "URL slug", description: "Lowercase words joined by hyphens. Changing it after publishing breaks links." },
        }),
        status: fields.select({
          label: "Status",
          description: "Drafts show on preview deployments only. Set to Published to put the post on misehotel.com.",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
          ],
          defaultValue: "draft",
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "One or two sentences shown on blog cards.",
          multiline: true,
          validation: { length: { min: 40, max: 240 } },
        }),
        tldr: fields.text({
          label: "TL;DR",
          description: "The answer in 40–60 words. Shown in a box at the top of the post.",
          multiline: true,
        }),
        coverImage: fields.image({
          label: "Cover image",
          description: "Optional. 1600×900 or larger. Without one, the post uses its generated social card.",
          directory: "public/images/blog",
          publicPath: "/images/blog/",
        }),
        coverAlt: fields.text({ label: "Cover image alt text", description: "Describe the image for screen readers." }),
        category: fields.relationship({ label: "Category", collection: "categories", validation: { isRequired: true } }),
        tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags", itemLabel: (props) => props.value }),
        author: fields.relationship({ label: "Author", collection: "authors", validation: { isRequired: true } }),
        publishedAt: fields.date({ label: "Published date", validation: { isRequired: true } }),
        updatedAt: fields.date({ label: "Last updated", description: "Change whenever the content changes meaningfully." }),
        primaryKeyword: fields.text({ label: "Primary keyword", description: "Use it in the title, the first 100 words and one heading." }),
        secondaryKeywords: fields.array(fields.text({ label: "Keyword" }), {
          label: "Secondary keywords",
          itemLabel: (props) => props.value,
        }),
        metaTitle: fields.text({
          label: "SEO title",
          description: "≤ 60 characters, ending in “| Mise”. Leave empty to use the title.",
          validation: { length: { max: 60 } },
        }),
        metaDescription: fields.text({
          label: "SEO description",
          description: "140–158 characters. End with a call to action.",
          multiline: true,
          validation: { length: { max: 158 } },
        }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          { label: "FAQ", itemLabel: (props) => props.fields.question.value || "Question" },
        ),
        body: fields.markdoc({
          label: "Body",
          options: {
            image: { directory: "public/images/blog", publicPath: "/images/blog/" },
          },
        }),
      },
    }),
    categories: collection({
      label: "Categories",
      slugField: "name",
      path: "content/categories/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        description: fields.text({ label: "Description", multiline: true }),
      },
    }),
    authors: collection({
      label: "Authors",
      slugField: "name",
      path: "content/authors/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        role: fields.text({ label: "Role" }),
        bio: fields.text({ label: "Short bio", multiline: true }),
        founderSlug: fields.text({
          label: "Founder profile slug",
          description: "If this author is a founder, their /team/ slug, e.g. sehej-sharma.",
        }),
        linkedin: fields.url({ label: "LinkedIn URL" }),
      },
    }),
    advisors: collection({
      label: "Advisors",
      slugField: "name",
      path: "content/advisors/*",
      format: { data: "json" },
      columns: ["name", "title"],
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        title: fields.text({ label: "Title", description: "Leave empty if not confirmed. Never guess." }),
        credentials: fields.array(fields.text({ label: "Credential" }), {
          label: "Credentials",
          itemLabel: (props) => props.value,
        }),
        photo: fields.text({
          label: "Processed photo key",
          description: "Set by the image script, e.g. advisors/parul-sharma. Leave as is.",
        }),
        photoUpload: fields.image({
          label: "Photo (upload)",
          description: "For a new advisor: upload a portrait. A developer can run `pnpm images` to optimise it.",
          directory: "public/images/advisors/uploads",
          publicPath: "/images/advisors/uploads/",
        }),
        linkedin: fields.url({ label: "LinkedIn URL" }),
        bio: fields.text({ label: "Bio", description: "Only approved text.", multiline: true }),
        order: fields.integer({ label: "Display order", defaultValue: 10 }),
        notes: fields.text({ label: "Internal notes (not shown on the site)", multiline: true }),
      },
    }),
  },
});
