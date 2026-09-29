import { LaptopFrame, PhoneFrame } from "@/components/ui/DeviceFrame";
import { Picture } from "@/components/ui/Picture";

/** The lead product image of a page, in its device frame. Alt carries the page's primary keyword. */
export default function LeadImage({ image, alt, device, priority = false }: { image: string; alt: string; device: "phone" | "laptop"; priority?: boolean }) {
  return (
    <figure className="relative">
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(56_225_255/0.14),transparent_65%)] blur-2xl" />
      {device === "phone" ? (
        <PhoneFrame className="relative mx-auto w-[min(290px,74vw)]">
          <Picture image={image} alt={alt} sizes="290px" priority={priority} />
        </PhoneFrame>
      ) : (
        <LaptopFrame className="relative mx-auto w-full max-w-[600px]">
          <Picture image={image} alt={alt} sizes="(min-width: 1024px) 560px, 92vw" priority={priority} />
        </LaptopFrame>
      )}
    </figure>
  );
}
