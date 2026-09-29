import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import Link from "next/link";
import React, { type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/primitives";
import { DEMO_HREF } from "@/lib/demo-mail";

function InternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href}>{children}</Link>;
}

/** The in-article demo card, inserted by lib/blog.ts at roughly 40% of the post. */
function DemoCta() {
  return (
    <aside className="not-prose my-10 rounded-2xl border border-gold/40 bg-[linear-gradient(150deg,rgb(229_179_90/0.16),transparent_65%)] p-6 sm:p-7" aria-label="Book a demo">
      <p className="eyebrow">See it running</p>
      <p className="mt-2 font-display text-[1.35rem] leading-snug font-semibold text-ink">
        Watch one of your SOPs become a timed task, in 15 minutes.
      </p>
      <p className="mt-2 text-[0.95rem] text-muted">Three interfaces on a live demo property. No feature tour.</p>
      <div className="mt-5">
        <ButtonLink href={DEMO_HREF} arrow trackLocation="blog-inline">
          Book a 15-min demo
        </ButtonLink>
      </div>
    </aside>
  );
}

export default function PostBody({ tree }: { tree: RenderableTreeNode }) {
  return <div className="prose-mise">{Markdoc.renderers.react(tree, React, { components: { InternalLink, DemoCta } })}</div>;
}
