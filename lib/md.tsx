/**
 * A deliberately small Markdown dialect for long-form marketing pages.
 * Server-rendered to React elements, so long-form content ships zero client JS.
 *
 * Blocks:  ## H2 {#optional-id} · ### H3 · paragraphs · "- " lists · "1. " lists
 *          "> " callouts · "| a | b |" tables (first row = header)
 * Inline:  **bold** · *italic* · `code` · [text](href)
 *
 * Paragraph, list and table-cell text runs through the internal-linking
 * engine (lib/links.ts); headings never do.
 */
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { autolink, reserveHref, type LinkState } from "@/lib/links";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type Block =
  | { type: "h2" | "h3"; text: string; id: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export function parseBlocks(source: string): Block[] {
  const lines = source
    .replace(/\r/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }
    const heading = /^(#{2,3})\s+(.*?)(?:\s*\{#([\w-]+)\})?$/.exec(line);
    if (heading) {
      const text = heading[2].trim();
      blocks.push({ type: heading[1].length === 2 ? "h2" : "h3", text, id: heading[3] ?? slugify(text) });
      i++;
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }
    if (line.startsWith(">")) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        parts.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "quote", text: parts.join(" ") });
      continue;
    }
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const row = lines[i].trim();
        if (!/^\|[\s:-]+\|/.test(row) || /[a-z0-9]/i.test(row)) {
          rows.push(
            row
              .replace(/^\|/, "")
              .replace(/\|$/, "")
              .split("|")
              .map((c) => c.trim()),
          );
        }
        i++;
      }
      const [head, ...rest] = rows;
      blocks.push({ type: "table", head: head ?? [], rows: rest });
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3}\s|[-*]\s|\d+\.\s|>|\|)/.test(lines[i].trim())) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: "p", text: para.join(" ") });
  }
  return blocks;
}

const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

function renderText(text: string, state: LinkState | undefined, keyPrefix: string): ReactNode[] {
  if (!state) return [text];
  return autolink(text, state).map((seg, i) =>
    seg.href ? (
      <Link key={`${keyPrefix}-a${i}`} href={seg.href}>
        {seg.text}
      </Link>
    ) : (
      <Fragment key={`${keyPrefix}-t${i}`}>{seg.text}</Fragment>
    ),
  );
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function renderInline(text: string, state?: LinkState, keyPrefix = "i"): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let n = 0;
  for (const match of text.matchAll(INLINE)) {
    const idx = match.index ?? 0;
    if (idx > last) out.push(...renderText(text.slice(last, idx), state, `${keyPrefix}-${n++}`));
    const token = match[0];
    const key = `${keyPrefix}-${n++}`;
    if (token.startsWith("**")) {
      out.push(<strong key={key}>{renderInline(token.slice(2, -2), state, key)}</strong>);
    } else if (token.startsWith("`")) {
      out.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("[")) {
      const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)!;
      const [, label, href] = m;
      if (isExternal(href)) {
        out.push(
          <a key={key} href={href} rel="noopener" target="_blank" data-outbound="true">
            {label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>,
        );
      } else {
        if (state) reserveHref(state, href);
        out.push(
          <Link key={key} href={href}>
            {label}
          </Link>,
        );
      }
    } else {
      out.push(<em key={key}>{renderInline(token.slice(1, -1), state, key)}</em>);
    }
    last = idx + token.length;
  }
  if (last < text.length) out.push(...renderText(text.slice(last), state, `${keyPrefix}-${n++}`));
  return out;
}

/** Collects every explicit internal link in the source so the autolinker never duplicates one. */
export function reserveExplicitLinks(source: string, state: LinkState) {
  for (const m of source.matchAll(/\]\((\/[^)]*)\)/g)) reserveHref(state, m[1]);
}

export function Markdown({ source, state, className }: { source: string; state?: LinkState; className?: string }) {
  const blocks = parseBlocks(source);
  if (state) reserveExplicitLinks(source, state);
  return (
    <div className={className ?? "prose-mise"}>
      {blocks.map((block, i) => {
        const k = `b${i}`;
        switch (block.type) {
          case "h2":
            return (
              <h2 key={k} id={block.id} className="scroll-mt-28">
                {renderInline(block.text, undefined, k)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={k} id={block.id} className="scroll-mt-28">
                {renderInline(block.text, undefined, k)}
              </h3>
            );
          case "p":
            return <p key={k}>{renderInline(block.text, state, k)}</p>;
          case "ul": {
            const checklist = block.items.every((item) => item.startsWith("[ ] "));
            return (
              <ul key={k} className={checklist ? "checklist" : undefined}>
                {block.items.map((item, j) =>
                  checklist ? (
                    <li key={j}>
                      <span aria-hidden="true" className="checkbox" />
                      {renderInline(item.slice(4), state, `${k}-${j}`)}
                    </li>
                  ) : (
                    <li key={j}>{renderInline(item, state, `${k}-${j}`)}</li>
                  ),
                )}
              </ul>
            );
          }
          case "ol":
            return (
              <ol key={k}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item, state, `${k}-${j}`)}</li>
                ))}
              </ol>
            );
          case "quote":
            return <blockquote key={k}>{renderInline(block.text, state, k)}</blockquote>;
          case "table":
            return (
              <div key={k} className="-mx-4 overflow-x-auto px-4" role="region" aria-label="Comparison table" tabIndex={0}>
                <table>
                  <thead>
                    <tr>
                      {block.head.map((cell, j) => (
                        <th key={j} scope="col">
                          {renderInline(cell, undefined, `${k}-h${j}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, j) =>
                          j === 0 ? (
                            <th key={j} scope="row">
                              {renderInline(cell, undefined, `${k}-${r}-${j}`)}
                            </th>
                          ) : (
                            <td key={j}>{renderInline(cell, state, `${k}-${r}-${j}`)}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}

/** Extracts H2s for a table of contents. */
export function headingsOf(source: string) {
  return parseBlocks(source)
    .flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text.replace(/\*\*|\*|`/g, "") }] : []));
}

/** Plain text (for word counts, llms-full.txt and search index). */
export function toPlainText(source: string) {
  return source
    .replace(/\{#[\w-]+\}/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*|`/g, "")
    .replace(/(^|\s)\*([^*]+)\*/g, "$1$2")
    .replace(/^\|[\s:|-]+\|$/gm, "")
    .replace(/^#{2,3}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .trim();
}
