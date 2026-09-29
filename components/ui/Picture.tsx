import manifest from "@/lib/images.manifest.json";
import { cx } from "@/components/ui/primitives";

type Entry = { width: number; height: number; avif: string; webp: string; src: string; blurDataURL: string };

export function imageEntry(key: string): Entry {
  const entry = (manifest as Record<string, Entry>)[key];
  if (!entry) throw new Error(`Image "${key}" is missing from lib/images.manifest.json — run pnpm images.`);
  return entry;
}

/**
 * AVIF → WebP <picture> with the blur placeholder painted as the image's own
 * background, so there is no layout shift and no JavaScript.
 */
export function Picture({
  image,
  alt,
  sizes,
  priority = false,
  className,
  imgClassName,
  lead = false,
}: {
  image: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Marks the page's lead image (used by the SEO report). */
  lead?: boolean;
}) {
  const e = imageEntry(image);
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={e.avif} sizes={sizes} />
      <source type="image/webp" srcSet={e.webp} sizes={sizes} />
      <img
        src={e.src}
        alt={alt}
        width={e.width}
        height={e.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className={cx("h-auto w-full bg-cover bg-center", imgClassName)}
        {...(lead ? { "data-lead": "" } : {})}
        style={{ backgroundImage: `url(${e.blurDataURL})` }}
      />
    </picture>
  );
}
