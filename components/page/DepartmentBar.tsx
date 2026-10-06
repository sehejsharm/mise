import Link from "next/link";
import { solutionsMenu } from "@/content/site";

/**
 * "One app, every department": the seven department pages as a pill bar at
 * the top of each department page, the current one highlighted. Server-rendered.
 */
export default function DepartmentBar({ current }: { current: string }) {
  return (
    <nav aria-label="Mise by department" className="mt-8">
      <p className="font-mono text-[0.7rem] tracking-[0.14em] text-faint uppercase">One service execution platform, every department</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {solutionsMenu.departments.map((d) => {
          const on = d.href === current;
          return (
            <li key={d.href}>
              <Link
                href={d.href}
                aria-current={on ? "page" : undefined}
                className={`inline-flex rounded-full px-3 py-1.5 text-[0.85rem] transition-colors ${on ? "bg-gold text-on-gold" : "border border-line-strong text-muted hover:border-gold hover:text-ink"}`}
              >
                {d.label}
              </Link>
            </li>
          );
        })}
        <li>
          <Link href="/solutions" className="inline-flex px-2 py-1.5 text-[0.85rem] text-gold-ink hover:underline">
            All solutions →
          </Link>
        </li>
      </ul>
    </nav>
  );
}
