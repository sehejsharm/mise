import "server-only";
import Markdoc, { Tag, type Node, type RenderableTreeNode } from "@markdoc/markdoc";
import { createReader } from "@keystatic/core/reader";
import { cache } from "react";
import keystaticConfig from "@/keystatic.config";
import { autolink, createLinkState } from "@/lib/links";
import { slugify } from "@/lib/md";

const reader = createReader(process.cwd(), keystaticConfig);

/**
 * Drafts are visible on local and preview builds, hidden on production.
 * BLOG_SHOW_DRAFTS=1 / 0 overrides either way.
 */
export function showDrafts() {
  if (process.env.BLOG_SHOW_DRAFTS === "1") return true;
  if (process.env.BLOG_SHOW_DRAFTS === "0") return false;
  return process.env.VERCEL_ENV !== "production";
}

export type PostMeta = {
  slug: string;
  title: string;
  status: "draft" | "published";
  excerpt: string;
  tldr: string;
  coverImage: string | null;
  coverAlt: string;
  category: { slug: string; name: string };
  tags: string[];
  author: { slug: string; name: string; role: string; bio: string; founderSlug: string; linkedin: string };
  publishedAt: string;
  updatedAt: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  faq: { q: string; a: string }[];
};

export const getCategories = cache(async () => {
  const all = await reader.collections.categories.all();
  return all
    .map((c) => ({ slug: c.slug, name: c.entry.name, description: c.entry.description }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

export const getAuthors = cache(async () => {
  const all = await reader.collections.authors.all();
  return all.map((a) => ({
    slug: a.slug,
    name: a.entry.name,
    role: a.entry.role,
    bio: a.entry.bio,
    founderSlug: a.entry.founderSlug,
    linkedin: a.entry.linkedin ?? "",
  }));
});

export const getAllPosts = cache(async (): Promise<PostMeta[]> => {
  const [entries, categories, authors] = await Promise.all([
    reader.collections.posts.all(),
    getCategories(),
    getAuthors(),
  ]);
  const posts = entries.map(({ slug, entry }) => {
    const category = categories.find((c) => c.slug === entry.category) ?? { slug: "uncategorised", name: "Notes", description: "" };
    const author =
      authors.find((a) => a.slug === entry.author) ?? { slug: "mise", name: "Mise", role: "", bio: "", founderSlug: "", linkedin: "" };
    return {
      slug,
      title: entry.title,
      status: entry.status as PostMeta["status"],
      excerpt: entry.excerpt,
      tldr: entry.tldr,
      coverImage: entry.coverImage ?? null,
      coverAlt: entry.coverAlt,
      category: { slug: category.slug, name: category.name },
      tags: [...entry.tags],
      author,
      publishedAt: entry.publishedAt ?? "2026-09-29",
      updatedAt: entry.updatedAt ?? entry.publishedAt ?? "2026-09-29",
      primaryKeyword: entry.primaryKeyword,
      secondaryKeywords: [...entry.secondaryKeywords],
      metaTitle: entry.metaTitle,
      metaDescription: entry.metaDescription,
      faq: entry.faq.map((f) => ({ q: f.question, a: f.answer })),
    } satisfies PostMeta;
  });
  return posts
    .filter((p) => p.status === "published" || showDrafts())
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));
});

export async function getPostSlugs() {
  return (await getAllPosts()).map((p) => p.slug);
}

export async function getVisiblePost(slug: string) {
  return (await getAllPosts()).find((p) => p.slug === slug);
}

/** Only link to posts that are visible in this build (drafts vanish on production). */
export async function resolvePosts(slugs: string[] | undefined) {
  if (!slugs?.length) return [];
  const all = await getAllPosts();
  return slugs.map((s) => all.find((p) => p.slug === s)).filter(Boolean) as PostMeta[];
}

/* ── Rendering ─────────────────────────────────────────────────────────── */

function textOf(node: RenderableTreeNode): string {
  if (typeof node === "string") return node;
  if (Tag.isTag(node)) return node.children.map(textOf).join("");
  return "";
}

function nodeText(node: Node): string {
  if (node.type === "text") return String(node.attributes.content ?? "");
  return node.children.map(nodeText).join(node.type === "paragraph" || node.type === "heading" ? " " : "");
}

export function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const markdocConfig = {
  nodes: {
    heading: {
      children: ["inline"],
      attributes: { level: { type: Number, required: true } },
      transform(node: Node, config: Parameters<typeof Markdoc.transform>[1]) {
        const children = node.transformChildren(config ?? {});
        const text = children.map(textOf).join("");
        const level = node.attributes.level as number;
        return new Tag(`h${level}`, { id: slugify(text), className: "scroll-mt-28" }, children);
      },
    },
    table: {
      transform(node: Node, config: Parameters<typeof Markdoc.transform>[1]) {
        const children = node.transformChildren(config ?? {});
        return new Tag("div", { className: "-mx-4 overflow-x-auto px-4", role: "region", "aria-label": "Table", tabIndex: 0 }, [
          new Tag("table", {}, children),
        ]);
      },
    },
    link: {
      children: ["strong", "em", "s", "code", "text", "tag"],
      attributes: { href: { type: String, required: true }, title: { type: String } },
      transform(node: Node, config: Parameters<typeof Markdoc.transform>[1]) {
        const children = node.transformChildren(config ?? {});
        const href = String(node.attributes.href);
        if (/^https?:\/\//.test(href)) {
          return new Tag("a", { href, rel: "noopener", target: "_blank", "data-outbound": "true" }, children);
        }
        return new Tag("InternalLink", { href }, children);
      },
    },
  },
};

const LINKABLE = new Set(["p", "li", "td"]);
const SKIP = new Set(["a", "InternalLink", "h1", "h2", "h3", "h4", "code"]);

function autolinkTree(node: RenderableTreeNode, state: ReturnType<typeof createLinkState>, inLinkable = false): RenderableTreeNode {
  if (!Tag.isTag(node)) return node;
  if (SKIP.has(node.name)) return node;
  const linkable = inLinkable || LINKABLE.has(node.name);
  const children: RenderableTreeNode[] = [];
  for (const child of node.children) {
    if (typeof child === "string" && linkable) {
      for (const seg of autolink(child, state)) {
        children.push(seg.href ? new Tag("InternalLink", { href: seg.href }, [seg.text]) : seg.text);
      }
    } else {
      children.push(autolinkTree(child, state, linkable));
    }
  }
  return new Tag(node.name, node.attributes, children);
}

function reserveLinks(node: RenderableTreeNode, state: ReturnType<typeof createLinkState>) {
  if (!Tag.isTag(node)) return;
  if (node.name === "InternalLink") state.usedHrefs.add(String(node.attributes.href));
  node.children.forEach((c) => reserveLinks(c, state));
}

export type RenderedPost = {
  tree: RenderableTreeNode;
  headings: { id: string; text: string }[];
  words: number;
  plain: string;
};

/**
 * Renders a post body: ids on headings for the table of contents, internal
 * links through next/link, the keyword auto-linker on paragraphs, and a demo
 * CTA card inserted before the heading nearest 40% of the article.
 */
export async function renderPost(slug: string): Promise<RenderedPost | null> {
  const post = await reader.collections.posts.read(slug);
  if (!post) return null;
  const { node } = await post.body();
  const plain = nodeText(node);
  const transformed = Markdoc.transform(node, markdocConfig);
  const state = createLinkState(`/blog/${slug}`);
  reserveLinks(transformed, state);
  let tree = autolinkTree(transformed, state);

  const headings: { id: string; text: string }[] = [];
  if (Tag.isTag(tree)) {
    const top = tree.children;
    top.forEach((c) => {
      if (Tag.isTag(c) && c.name === "h2") headings.push({ id: String(c.attributes.id), text: textOf(c) });
    });
    const total = top.reduce<number>((n, c) => n + textOf(c).length, 0);
    let run = 0;
    let insertAt = -1;
    for (let i = 0; i < top.length; i++) {
      run += textOf(top[i]).length;
      if (run >= total * 0.4) {
        const nextH2 = top.findIndex((c, j) => j > i && Tag.isTag(c) && c.name === "h2");
        insertAt = nextH2 === -1 ? i + 1 : nextH2;
        break;
      }
    }
    if (insertAt > 0) {
      const children = [...top];
      children.splice(insertAt, 0, new Tag("DemoCta", {}, []));
      tree = new Tag(tree.name, tree.attributes, children);
    }
  }
  return { tree, headings, words: wordCount(plain), plain };
}

export function readingMinutes(words: number) {
  return Math.max(1, Math.round(words / 220));
}
