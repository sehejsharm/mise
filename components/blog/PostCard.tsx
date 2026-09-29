import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/seo";
import type { PostMeta } from "@/lib/blog";

/** A typographic cover for posts without a cover photo: zero bytes, on brand. */
export function PostCover({ post, large = false }: { post: PostMeta; large?: boolean }) {
  if (post.coverImage) {
    return (
      <Image
        src={post.coverImage}
        alt={post.coverAlt || post.title}
        width={1600}
        height={900}
        sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b1328]" aria-hidden="true">
      <div className="grid-lines absolute inset-0 opacity-60 [--line:rgb(238_242_250/0.06)]" />
      <div className="absolute -right-10 -bottom-16 size-64 rounded-full bg-[radial-gradient(circle,rgb(212_169_79/0.35),transparent_65%)]" />
      <div className="absolute top-5 left-5 font-mono text-[0.66rem] tracking-[0.16em] text-[#d4a94f] uppercase">
        {post.category.name}
      </div>
      <div className={`absolute right-5 bottom-5 left-5 font-display leading-tight font-semibold text-[#eef2fa] ${large ? "text-[1.6rem]" : "text-[1.05rem]"}`}>
        {(post.primaryKeyword || post.title).replace(/^./, (c) => c.toUpperCase())}
      </div>
    </div>
  );
}

export function PostCard({ post, headingLevel = 3, compact = false }: { post: PostMeta; headingLevel?: 2 | 3; compact?: boolean }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 transition-colors hover:border-gold/50">
      <div className="aspect-[16/9] overflow-hidden">
        <div className="h-full w-full transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.03]">
          <PostCover post={post} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className={`font-mono text-[0.7rem] tracking-[0.12em] text-gold-ink uppercase ${compact ? "sr-only" : ""}`}>
          {post.category.name}
          {post.status === "draft" ? <span className="ml-2 rounded bg-coral/15 px-1.5 py-0.5 text-coral-ink">Draft</span> : null}
        </p>
        <H className="mt-2 font-display text-[1.15rem] leading-snug font-semibold text-ink">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </H>
        {compact ? <span className="flex-1" /> : <p className="mt-2 flex-1 text-[0.93rem] leading-relaxed text-muted">{post.excerpt}</p>}
        {compact ? null : (
          <p className="mt-4 font-mono text-[0.72rem] text-faint">
            {post.author.name} · <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </p>
        )}
      </div>
    </article>
  );
}
