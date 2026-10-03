"use client";
/**
 * A department Today screen that rotates through every department (front
 * office to spa) with the shared switcher underneath. Under reduced motion the
 * switcher is a static grid and nothing rotates.
 */
import DeptSwitcher, { useDepartmentRotation } from "@/components/home/DeptSwitcher";
import { PhoneFrame } from "@/components/ui/DeviceFrame";
import { DeptPhoneScreen } from "@/components/ui/DeptPhone";

export default function DeptPhoneRotator({ label, lead = false, tone = "theme" }: { label: string; lead?: boolean; tone?: "dark" | "theme" }) {
  const rot = useDepartmentRotation(4500);
  return (
    <div ref={rot.ref} {...rot.pauseProps} data-copy-budget="exclude">
      <PhoneFrame className="relative mx-auto w-[min(290px,74vw)]">
        <div role="img" aria-label={label} {...(lead ? { "data-lead": "" } : {})} className="aspect-[290/600]">
          <div key={rot.dept.id} className="h-full animate-[fade-in_400ms_var(--ease-out-expo)]">
            <DeptPhoneScreen dept={rot.dept} />
          </div>
        </div>
      </PhoneFrame>
      <DeptSwitcher
        index={rot.index}
        select={rot.select}
        reduced={rot.reduced}
        rotating={rot.rotating}
        label="Show the staff app for a department"
        tone={tone}
        className="mx-auto mt-5 max-w-[420px] justify-center"
      />
    </div>
  );
}
