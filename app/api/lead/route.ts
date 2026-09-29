/**
 * Lead intake for the demo form, contact form and footer newsletter.
 * zod validation · honeypot + minimum fill time · per-IP rate limit (after validation) ·
 * delivery through Resend. In production a missing RESEND_API_KEY returns 503
 * instead of silently dropping the lead; LEAD_DRY_RUN=1 accepts without sending
 * (local testing and CI only).
 */
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const text = (max: number) => z.string().trim().max(max);

const common = {
  company_website: z.string().optional(), // honeypot
  elapsedMs: z.number().optional(),
  page: text(200).optional(),
};

const demo = z.object({
  type: z.literal("demo"),
  name: text(120).min(2, "Please enter your name"),
  email: z.string().trim().email("Please use a valid work email").max(200),
  hotel: text(160).min(2, "Please enter your hotel or group"),
  role: text(80).min(2, "Please choose your role"),
  properties: text(40).min(1, "Please choose a number of properties"),
  phone: text(40).optional().or(z.literal("")),
  message: text(2000).optional().or(z.literal("")),
  ...common,
});

const contact = z.object({
  type: z.literal("contact"),
  name: text(120).min(2, "Please enter your name"),
  email: z.string().trim().email("Please use a valid email").max(200),
  company: text(160).optional().or(z.literal("")),
  topic: text(80).min(2),
  message: text(4000).min(10, "Please add a short message"),
  ...common,
});

const newsletter = z.object({
  type: z.literal("newsletter"),
  email: z.string().trim().email("Please use a valid email").max(200),
  ...common,
});

const Lead = z.discriminatedUnion("type", [demo, contact, newsletter]);
type LeadInput = z.infer<typeof Lead>;

/* ── Rate limiting: 6 submissions per 10 minutes per IP, per instance. ───── */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = Number(process.env.LEAD_RATE_LIMIT || 6);
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

function escape(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function render(lead: LeadInput) {
  const rows = Object.entries(lead)
    .filter(([k, v]) => !["company_website", "elapsedMs", "type"].includes(k) && v !== undefined && v !== "")
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#555;vertical-align:top">${escape(k)}</td><td style="padding:6px 12px">${escape(String(v)).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
  const subject =
    lead.type === "demo"
      ? `Demo request: ${lead.hotel} (${lead.name})`
      : lead.type === "contact"
        ? `Website contact: ${lead.topic} (${lead.name})`
        : `Newsletter sign-up: ${lead.email}`;
  return { subject, html: `<h2 style="font-family:sans-serif">${escape(subject)}</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>` };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = Lead.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) fields[String(issue.path[0] ?? "form")] ??= issue.message;
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fields }, { status: 422 });
  }
  const lead = parsed.data;

  // Bots: filled honeypot or an inhumanly fast submission. Accept silently.
  if (lead.company_website || (typeof lead.elapsedMs === "number" && lead.elapsedMs < 1500)) {
    return NextResponse.json({ ok: true });
  }

  // Only well-formed, human-looking submissions count towards the limit, so a
  // visitor correcting validation errors is never locked out.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please try again in a few minutes." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DEMO_INBOX_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@misehotel.com";
  const from = process.env.RESEND_FROM_EMAIL || "Mise website <website@misehotel.com>";

  if (!apiKey) {
    if (process.env.LEAD_DRY_RUN === "1" || process.env.NODE_ENV !== "production") {
      console.info("[lead:dry-run]", lead.type, lead.email);
      return NextResponse.json({ ok: true, dryRun: true });
    }
    console.error("[lead] RESEND_API_KEY is not set; refusing to drop the lead silently.");
    return NextResponse.json(
      { ok: false, error: "We couldn't send that just now. Please email us directly." },
      { status: 503 },
    );
  }

  const { subject, html } = render(lead);
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: lead.email,
      subject,
      html,
      tags: [{ name: "type", value: lead.type }],
    });
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("[lead] send failed", error);
    return NextResponse.json({ ok: false, error: "We couldn't send that just now. Please email us directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
