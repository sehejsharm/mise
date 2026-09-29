import type { ReactNode } from "react";
import { cx } from "@/components/ui/primitives";

/** A modern phone, drawn in CSS. Content fills the screen at 9:19.5-ish. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "relative rounded-[2.6rem] bg-gradient-to-b from-[#2b4c52] to-[#0b2127] p-[9px] shadow-float ring-1 ring-white/10",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute top-24 -left-[3px] h-12 w-[3px] rounded-l bg-[#24444b]" />
      <div aria-hidden="true" className="absolute top-40 -left-[3px] h-16 w-[3px] rounded-l bg-[#24444b]" />
      <div aria-hidden="true" className="absolute top-32 -right-[3px] h-20 w-[3px] rounded-r bg-[#24444b]" />
      <div className="relative overflow-hidden rounded-[2.1rem] bg-[#122d35]">
        <div
          aria-hidden="true"
          className="absolute top-2 left-1/2 z-10 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black/90"
        />
        {children}
      </div>
    </div>
  );
}

/** A laptop: bezel, screen, and a hinge/base drawn in CSS. */
export function LaptopFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("relative", className)}>
      <div className="mx-[4.5%] rounded-t-[1.1rem] bg-gradient-to-b from-[#2b4c52] to-[#102a31] p-[10px] pb-[14px] shadow-float ring-1 ring-white/10">
        <div aria-hidden="true" className="mx-auto mb-[6px] size-[5px] rounded-full bg-[#3b5c61]" />
        <div className="overflow-hidden rounded-[4px] bg-[#122d35]">{children}</div>
      </div>
      <div aria-hidden="true" className="relative h-[14px] rounded-b-[14px] bg-gradient-to-b from-[#3b5c61] to-[#16343b]">
        <div className="absolute top-0 left-1/2 h-[5px] w-[16%] -translate-x-1/2 rounded-b-md bg-[#102a31]" />
      </div>
    </div>
  );
}
