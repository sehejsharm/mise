/**
 * The staff app's Today screen for one department, drawn in code in the app's
 * own palette (cream screen, deep-teal task card, gold accents). Used wherever
 * a department needs its own phone: the prototype's real screenshots only
 * show housekeeping. Aurora Grand Colombo demo data; server-rendered, no JS.
 */
import { Icon } from "@/components/ui/Icon";
import { PhoneFrame } from "@/components/ui/DeviceFrame";
import type { Department } from "@/content/departments";

export function DeptPhoneScreen({ dept }: { dept: Department }) {
  const t = dept.today;
  return (
    <div className="flex h-full flex-col bg-[#f6f7f1] text-[#162829]">
      {/* App bar */}
      <div className="flex items-center justify-between bg-[#19353c] px-3 pt-8 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-[#e5b35a] font-display text-[0.8rem] font-bold text-[#162829]">M</span>
          <span className="leading-none">
            <span className="block font-display text-[0.78rem] font-semibold text-[#f2f4ee]">Mise</span>
            <span className="block text-[0.5rem] text-[#a0b0ac]">Every shift, five-star</span>
          </span>
        </div>
        <span className="rounded-md border border-white/15 px-1.5 py-0.5 font-mono text-[0.48rem] tracking-[0.14em] text-[#e5b35a]">STAFF</span>
        <span className="grid size-6 place-items-center rounded-full bg-[#e5b35a] font-mono text-[0.48rem] font-bold text-[#162829]">{t.initials}</span>
      </div>

      <div className="flex-1 px-3 pt-2.5">
        <p className="inline-block rounded-full border border-[#a5bfbd] bg-[#eaf1ee] px-2 py-0.5 font-mono text-[0.42rem] tracking-[0.1em] text-[#1b5a47] uppercase">
          Demo pilot · {dept.label} · Aurora Grand
        </p>
        <p className="mt-2 text-[0.56rem] font-semibold text-[#1b5a47]">{t.shift}</p>
        <p className="mt-1 font-display text-[1.28rem] leading-[1.02] font-semibold tracking-[-0.02em]">
          Good morning, {t.person}. Make the next {t.noun} <span className="text-[#1f6e5b]">remarkable.</span>
        </p>
        <p className="mt-1.5 text-[0.58rem] leading-snug text-[#5e6662]">{t.next}</p>

        <div className="mt-2.5 rounded-xl bg-[linear-gradient(160deg,#1f3d44,#15353b)] p-2.5 text-[#f2f4ee]">
          <div className="flex items-center justify-between font-mono text-[0.44rem] tracking-[0.12em] text-[#a0b0ac] uppercase">
            <span className="flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-[#aedfd2]" />
              Live on shift
            </span>
            <span>{t.remaining}</span>
          </div>
          <p className="mt-2 font-mono text-[0.46rem] tracking-[0.14em] text-[#aedfd2] uppercase">Next timed task</p>
          <p className="mt-0.5 font-display text-[0.92rem] leading-tight font-semibold">
            {dept.where} · {dept.task}
          </p>
          <p className="mt-1 font-mono text-[0.5rem] text-[#e5b35a]">
            {dept.standardId} · {dept.standardName}
          </p>
          <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-white/[0.07] px-2 py-1.5 text-[0.52rem] text-[#cdd8d4]">
            <Icon name="camera" size={11} className="text-[#aedfd2]" />
            Photo gate: {dept.photoGate}
          </div>
        </div>

        <p className="mt-3 font-mono text-[0.46rem] tracking-[0.14em] text-[#5e6662] uppercase">Earlier today · service record</p>
        <ul className="mt-1.5 space-y-1">
          {dept.recordRows.map((row) => (
            <li key={row} className="flex items-center gap-1.5 rounded-lg border border-[#dfe5e0] bg-white px-2 py-1.5 text-[0.5rem] text-[#3d4a47]">
              <span className="size-1.5 shrink-0 rounded-full bg-[#278972]" />
              <span className="truncate">{row}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab bar */}
      <div className="mx-2 mb-2 grid grid-cols-5 rounded-2xl bg-[#19353c] px-1 py-1.5 text-center text-[0.44rem] text-[#a0b0ac]">
        {["Today", "SOPs", "Briefs", "Sequence", "Inbox"].map((tab, i) => (
          <span key={tab} className={`rounded-lg py-1 ${i === 0 ? "bg-white/10 font-semibold text-[#e5b35a]" : ""}`}>
            {tab}
          </span>
        ))}
      </div>
    </div>
  );
}

/** A department's Today screen in a phone frame, marked as the page's lead visual. */
export default function DeptPhone({ dept, label, lead = false }: { dept: Department; label: string; lead?: boolean }) {
  return (
    <PhoneFrame className="relative mx-auto w-[min(290px,74vw)]">
      <div role="img" aria-label={label} {...(lead ? { "data-lead": "" } : {})} className="aspect-[290/600]">
        <DeptPhoneScreen dept={dept} />
      </div>
    </PhoneFrame>
  );
}
