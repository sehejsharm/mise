/**
 * Brand, entity and navigation data — the single source of truth.
 *
 * Every page, the JSON-LD graph, OG images, llms.txt and the footer read from
 * here, so the name, the definition and the founders can never drift apart
 * between surfaces (entity consistency is what AI answer engines key on).
 */

function resolveSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://misehotel.com";
  const withProtocol = raw.startsWith("http") ? raw : `https://${raw}`;
  return withProtocol.replace(/\/$/, "");
}

export const siteUrl = resolveSiteUrl();

export const brand = {
  name: "Mise",
  legalName: "Mise",
  parent: {
    name: "Focus Realm",
    url: "https://focusrealm.org",
  },
  tagline: "Every shift, five-star.",
  category: "Service Execution Platform",
  categoryLine: "The operating system for hotel service standards.",
  /**
   * The canonical one-line definition. Used verbatim in the hero sub-line (in
   * shortened form), meta, schema `description`, llms.txt, About and FAQ.
   * Do not paraphrase it anywhere else.
   */
  definition:
    "Mise is the SOP app for hotels: a service execution platform that turns every department's SOPs into timed tasks on staff phones, captures photo and supervisor evidence as the work happens, and builds an audit-ready service record. Not an LMS. No PMS integration required.",
  /** Hero sub-line: names the departments. */
  definitionShort:
    "Standalone hotel SOP software for front office, housekeeping, F&B, kitchen, engineering, security and spa: every department's SOPs become timed tasks with photo proof and one audit-ready record.",
  spine: ["Standard", "Timed task", "Evidence", "Service record"] as const,
  nameOrigin:
    "Mise comes from mise en place, the kitchen discipline of having everything in its place before service starts. Mise brings that discipline to every department, on every shift.",
  notAnLms: "A service execution platform — not a learning management system.",
  founded: "2024",
  areaServed: ["India", "Sri Lanka", "South Asia"],
  prototypeUrl: "https://fr2-b6s.pages.dev/",
  logoPath: "/brand/mise-logo.svg",
} as const;

export const contact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@misehotel.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 93221 07991",
  get phoneHref() {
    return `tel:${this.phone.replace(/[^+\d]/g, "")}`;
  },
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
} as const;

/** Company social profiles. Emitted as Organization.sameAs once they exist. */
export const socialProfiles: { network: string; href: string }[] = [
  { network: "LinkedIn", href: "https://www.linkedin.com/company/misehotel" },
];

/* ── Founders ─────────────────────────────────────────────────────────── */

export type Founder = {
  slug: string;
  name: string;
  role: string;
  jobTitle: string;
  initials: string;
  photo: string; // key in lib/images.manifest.json
  focus: string[];
  /** Founder thesis lines, approved by each founder. */
  thesis: string;
  bio: string[];
  linkedin: string;
};

export const founders: Founder[] = [
  {
    slug: "sehej-sharma",
    name: "Sehej Sharma",
    role: "Co-Founder & CEO",
    jobTitle: "Co-Founder & Chief Executive Officer",
    initials: "SS",
    photo: "team/sehej-sharma",
    focus: ["Category & positioning", "Product thesis", "Go-to-market"],
    thesis: "A standard only counts when it is the task someone is doing right now.",
    bio: [
      "Sehej leads Mise's category, positioning and go-to-market. He wrote the product thesis the platform is built on: hotels do not have a documentation problem, they have an execution problem, and the fix is to put the standard inside the shift instead of beside it.",
      "He spends most of his time with the people who carry the consequence of inconsistent service — general managers, HR directors and heads of department — and works property by property rather than from a slide.",
    ],
    linkedin: "https://www.linkedin.com/in/sehej-sharma-5b2151234/",
  },
  {
    slug: "ali-electricwala",
    name: "Ali Electricwala",
    role: "Co-Founder & COO",
    jobTitle: "Co-Founder & Chief Operating Officer",
    initials: "AE",
    photo: "team/ali-electricwala",
    focus: ["Pilot design & rollout", "Customer success", "Commercial operations"],
    thesis: "A pilot is only real when the evidence is already piling up in week one.",
    bio: [
      "Ali runs how Mise lands inside a working hotel: pilot design, rollout, customer success and commercial operations. Every pilot is scoped to one property so the service record fills with real, timestamped proof from the first shifts.",
      "He is the route by which floor reality gets back into the product — when a standard is being worked around instead of worked, he usually hears it first.",
    ],
    linkedin: "https://www.linkedin.com/in/ali-electricwala-190821261/",
  },
  {
    slug: "aditya-mishra",
    name: "Aditya Mishra",
    role: "Co-Founder & CTO",
    jobTitle: "Co-Founder & Chief Technology Officer",
    initials: "AM",
    photo: "team/aditya-mishra",
    focus: ["Subtraction-first design", "Platform architecture", "Google Cloud & Firebase"],
    thesis: "Every screen has to earn its place on a 340px phone held in one hand.",
    bio: [
      "Aditya leads platform architecture and Mise's subtraction-first design principle. He built Mise as three separate role interfaces — a one-thumb staff app, a desktop manager dashboard and a desktop standards workspace — instead of one responsive compromise.",
      "The platform runs on Google Cloud and Firebase, in a standard browser, over mobile data, with no PMS integration and no special hardware.",
    ],
    linkedin: "https://www.linkedin.com/in/iadityam/",
  },
];

/**
 * Visual order for every founder lineup (cards, headshots, grids): Sehej sits
 * in the centre. Prose and schema keep the canonical order in `founders`.
 */
export const foundersCentered: Founder[] = ["ali-electricwala", "sehej-sharma", "aditya-mishra"].map(
  (slug) => founders.find((f) => f.slug === slug)!,
);

export function founderBySlug(slug: string) {
  return founders.find((f) => f.slug === slug);
}

/* ── Demo property (fictional) ───────────────────────────────────────── */

export const demoProperty = {
  name: "Aurora Grand Colombo",
  location: "Colombo, Sri Lanka",
  rooms: 468,
  floors: 14,
  staff: 42,
  label: "Aurora Grand Colombo demo data",
  personas: [
    { name: "Maya Fernando", role: "Room attendant", iface: "Staff" },
    { name: "Elena Rossi", role: "Operations manager", iface: "Manager" },
    { name: "Amina Rahman", role: "Standards author", iface: "Standards" },
    { name: "Arjun Rao", role: "Duty manager", iface: "Manager" },
    { name: "Jonas Lee", role: "Incoming shift", iface: "Staff" },
  ],
} as const;

/* ── Navigation ───────────────────────────────────────────────────────── */

export const primaryNav = [
  { href: "/platform", label: "Platform" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/problems", label: "Problems" },
  { href: "/solutions", label: "Solutions", match: "/solutions", menu: true },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

/** The Solutions mega-menu (desktop) and accordion (mobile). Order matters: housekeeping is one of seven. */
export const solutionsMenu = {
  departments: [
    { href: "/solutions/front-office", label: "Front office" },
    { href: "/solutions/housekeeping", label: "Housekeeping" },
    { href: "/solutions/food-and-beverage", label: "F&B service" },
    { href: "/solutions/kitchen", label: "Kitchen" },
    { href: "/solutions/engineering", label: "Engineering & maintenance" },
    { href: "/solutions/security-and-safety", label: "Security & safety" },
    { href: "/solutions/spa-and-wellness", label: "Spa & wellness" },
  ],
  propertyTypes: [
    { href: "/solutions/hotel-chains", label: "Hotel chains" },
    { href: "/solutions/boutique-hotels", label: "Boutique hotels" },
  ],
} as const;

export type FooterLink = { href: string; label: string; external?: boolean };

export const footerColumns: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Platform",
    links: [
      { href: "/platform", label: "Overview" },
      { href: "/platform#staff", label: "Staff app" },
      { href: "/platform#manager", label: "Manager dashboard" },
      { href: "/platform#standards", label: "Standards workspace" },
      { href: "/platform#service-record", label: "Service record" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/roi", label: "ROI calculator" },
      { href: "/for/hr-directors", label: "For HR Directors" },
      { href: "/for/general-managers", label: "For General Managers" },
      { href: "/for/learning-and-development", label: "For L&D Heads" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      ...solutionsMenu.departments,
      ...solutionsMenu.propertyTypes,
      { href: "/solutions", label: "All solutions →" },
    ],
  },
  {
    heading: "The case",
    links: [
      { href: "/problems/supervisor-bottleneck", label: "Supervisor Bottleneck" },
      { href: "/problems/ghost-sop", label: "Ghost SOP" },
      { href: "/problems/invisible-performance-gap", label: "Invisible Performance Gap" },
      { href: "/problems/attrition-bleed", label: "Attrition Bleed" },
      { href: "/problems/star-rating-ceiling", label: "Star Rating Ceiling" },
      { href: "/problems/audit-ambush", label: "Audit Ambush" },
      { href: "/digital-sop", label: "Digital SOP guide" },
      { href: "/audit-readiness", label: "Audit readiness" },
      { href: "/compare", label: "Comparisons" },
      { href: "/glossary", label: "Glossary" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Mise" },
      { href: "/about#founders", label: "Founders" },
      { href: "/advisors", label: "Advisory board" },
      { href: "/blog", label: "Blog" },
      { href: "/about#media-kit", label: "Media kit" },
      { href: "/security", label: "Security" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "https://focusrealm.org", label: "Focus Realm (parent company)", external: true },
    ],
  },
];

export const legalNav: FooterLink[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  if (path === "/") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
