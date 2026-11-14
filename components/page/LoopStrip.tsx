import { Icon, type IconName } from "@/components/ui/Icon";
import { brand } from "@/content/site";

/**
 * The Mise loop as a small animated diagram for long-form pages:
 * Standard → Timed task → Evidence → Service record. A pulse travels the
 * track and each stage lights as it passes. Pure CSS (no client JS); the
 * global reduced-motion rule stops the loop and leaves the diagram static.
 */
const stages: { icon: IconName; line: string }[] = [
  { icon: "binder", line: "The SOP you already have" },
  { icon: "clock", line: "On the right phone, on the clock" },
  { icon: "camera", line: "Photo and sign-off as it happens" },
  { icon: "ledger", line: "An audit-ready entry, every time" },
];

export default function LoopStrip() {
  return (
    <figure className="loop-strip" data-reveal aria-label="How Mise works: Standard, Timed task, Evidence, Service record">
      <div className="loop-strip-track" aria-hidden="true">
        <span className="loop-strip-pulse" />
      </div>
      <ol className="loop-strip-stages">
        {brand.spine.map((name, i) => (
          <li key={name} style={{ ["--i" as string]: i }}>
            <span className="loop-strip-node" aria-hidden="true">
              <Icon name={stages[i].icon} size={20} />
            </span>
            <span className="loop-strip-name">{name}</span>
            <span className="loop-strip-line">{stages[i].line}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
