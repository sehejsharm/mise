import DeptPhone from "@/components/ui/DeptPhone";
import DeptPhoneRotator from "@/components/ui/DeptPhoneRotator";
import { LaptopFrame, PhoneFrame } from "@/components/ui/DeviceFrame";
import { Picture } from "@/components/ui/Picture";
import { departments } from "@/content/departments";

/**
 * The lead visual of a page. A real product screenshot in its device frame, or
 * a department's staff-app screen drawn in code (`dept`), or one that rotates
 * through every department (`dept="rotate"`). Alt/label carries the page's
 * primary keyword.
 */
export default function LeadImage({
  image,
  dept,
  alt,
  device,
  priority = false,
}: {
  image?: string;
  dept?: string;
  alt: string;
  device: "phone" | "laptop";
  priority?: boolean;
}) {
  const glow = <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(174_223_210/0.14),transparent_65%)] blur-2xl" />;
  if (dept) {
    const d = departments.find((x) => x.id === dept);
    return (
      <figure className="relative">
        {glow}
        {d ? <DeptPhone dept={d} label={alt} lead /> : <DeptPhoneRotator label={alt} lead />}
      </figure>
    );
  }
  return (
    <figure className="relative">
      {glow}
      {device === "phone" ? (
        <PhoneFrame className="relative mx-auto w-[min(290px,74vw)]">
          <Picture image={image!} alt={alt} sizes="290px" priority={priority} lead />
        </PhoneFrame>
      ) : (
        <LaptopFrame className="relative mx-auto w-full max-w-[600px]">
          <Picture image={image!} alt={alt} sizes="(min-width: 1024px) 560px, 92vw" priority={priority} lead />
        </LaptopFrame>
      )}
    </figure>
  );
}
