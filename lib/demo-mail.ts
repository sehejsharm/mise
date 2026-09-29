/**
 * Demo requests go straight to the Mise inbox by email: every "Book a demo"
 * button is a mailto: link with the subject and body prefilled, and the /demo
 * form opens the same email with the visitor's answers filled in.
 * Client-safe (no server imports), so the form can use it too.
 */
export const DEMO_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@misehotel.com";
export const DEMO_SUBJECT = "Mise demo request: 15-minute demo";

export type DemoFields = {
  name?: string;
  email?: string;
  hotel?: string;
  role?: string;
  properties?: string;
  phone?: string;
  message?: string;
};

function body(f: DemoFields) {
  const line = (label: string, value?: string) => `${label}: ${value?.trim() || ""}`;
  return [
    "Hi Mise team,",
    "",
    "I'd like to book a 15-minute demo of Mise.",
    "",
    line("Name", f.name),
    line("Work email", f.email),
    line("Hotel or group", f.hotel),
    line("My role", f.role),
    line("Number of properties", f.properties),
    line("Phone", f.phone),
    line("Best days and times for a call", ""),
    "",
    "Anything you should know:",
    f.message?.trim() || "",
    "",
    "Thanks,",
    f.name?.trim() || "",
  ].join("\r\n");
}

/** mailto: URL for a demo request, optionally prefilled with form answers. */
export function demoMailto(fields: DemoFields = {}) {
  const subject = fields.hotel?.trim() ? `${DEMO_SUBJECT} (${fields.hotel.trim()})` : DEMO_SUBJECT;
  return `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body(fields))}`;
}

/** The prefilled link every demo button uses. */
export const DEMO_HREF = demoMailto();
