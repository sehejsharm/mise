"use client";
import { useState } from "react";
import { Field, inputClass } from "@/components/forms/Field";
import { Icon } from "@/components/ui/Icon";

const topics = ["A question about Mise", "Pilot or pricing", "Partnership", "Press or media", "Something else"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    setStatus("sending");
    setFields({});
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "contact", ...payload, elapsedMs: Date.now() - startedAt, page: location.pathname }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setFields(data.fields ?? {});
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError(`We couldn't reach the server. Please try again, or email us at ${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@misehotel.com"}.`);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl border border-green/40 bg-green/10 p-7">
        <Icon name="check" size={26} className="text-green-ink" />
        <h2 className="mt-3 font-display text-[1.4rem] font-semibold text-ink">Thanks. We'll be in touch.</h2>
        <p className="mt-1 text-muted">Your message is with the founding team. We will reply shortly.</p>
      </div>
    );
  }

  const invalid = (name: string) => (fields[name] ? { "aria-invalid": true, "aria-describedby": `contact-${name}-error` } : {});

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-line bg-surface/70 p-6 sm:p-8" aria-label="Contact Mise">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Your name" error={fields.name}>
          <input id="contact-name" name="name" required autoComplete="name" className={inputClass} {...invalid("name")} />
        </Field>
        <Field id="contact-email" label="Email" error={fields.email}>
          <input id="contact-email" name="email" type="email" required autoComplete="email" className={inputClass} {...invalid("email")} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-company" label="Company" optional>
          <input id="contact-company" name="company" autoComplete="organization" className={inputClass} />
        </Field>
        <Field id="contact-topic" label="What is this about?" error={fields.topic}>
          <select id="contact-topic" name="topic" defaultValue={topics[0]} className={inputClass}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="contact-message" label="Message" error={fields.message}>
        <textarea id="contact-message" name="message" rows={5} required className={inputClass} {...invalid("message")} />
      </Field>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      {status === "error" && error ? (
        <p role="alert" className="rounded-xl border border-coral/40 bg-coral/10 px-4 py-3 text-[0.92rem] text-coral-ink">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 font-medium text-on-gold transition-colors hover:bg-[#e2bb66] disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
