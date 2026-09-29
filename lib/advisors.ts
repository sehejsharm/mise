import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Advisors are data, not code: one JSON file per person in content/advisors,
 * editable in Keystatic (/keystatic → Advisors). Nothing here is invented;
 * missing details simply do not render.
 */
export type Advisor = {
  slug: string;
  name: string;
  title?: string;
  credentials: string[];
  /** Key in lib/images.manifest.json (processed portrait), e.g. "advisors/parul-sharma". */
  photo?: string;
  /** Or a raw uploaded image path from Keystatic, e.g. /images/advisors/uploads/x.jpg */
  photoUpload?: string;
  linkedin?: string;
  bio?: string;
  order: number;
};

const dir = path.join(process.cwd(), "content", "advisors");

export function getAdvisors(): Advisor[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((file) => {
      const raw = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
      return {
        slug: file.replace(/\.json$/, ""),
        name: String(raw.name ?? ""),
        title: raw.title || undefined,
        credentials: Array.isArray(raw.credentials) ? raw.credentials.filter(Boolean) : [],
        photo: raw.photo || undefined,
        photoUpload: raw.photoUpload || undefined,
        linkedin: raw.linkedin || undefined,
        bio: raw.bio || undefined,
        order: Number(raw.order ?? 99),
      } satisfies Advisor;
    })
    .filter((a) => a.name)
    .sort((a, b) => a.order - b.order);
}
