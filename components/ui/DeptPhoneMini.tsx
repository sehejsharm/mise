import { PhoneFrame } from "@/components/ui/DeviceFrame";
import { DeptPhoneScreen } from "@/components/ui/DeptPhone";
import type { Department } from "@/content/departments";

/** A department Today screen at thumbnail size: the full 290px screen scaled down, so the type stays proportional. */
export default function DeptPhoneMini({ dept }: { dept: Department }) {
  return (
    <PhoneFrame className="mx-auto w-[200px] rounded-[1.9rem] p-[6px] [&>div:last-child]:rounded-[1.5rem]">
      <div role="img" aria-label={`Mise staff app Today screen for ${dept.label}: ${dept.standardId} ${dept.standardName}`} className="relative h-[388px] overflow-hidden">
        <div className="absolute top-0 left-0 h-[600px] w-[290px] origin-top-left scale-[0.648]">
          <DeptPhoneScreen dept={dept} />
        </div>
      </div>
    </PhoneFrame>
  );
}
