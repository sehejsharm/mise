"use client";
/**
 * The 15-minute demo form. Fires demo_form_submit on success, shows an
 * animated confirmation, and offers the scheduler (NEXT_PUBLIC_BOOKING_URL)
 * immediately after submitting.
 */
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { useState } from "react";
import { Field, inputClass } from "@/components/forms/Field";
import BookingEmbed from "@/components/forms/BookingEmbed";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";
import { DEMO_EMAIL, DEMO_HREF, demoMailto } from "@/lib/demo-mail";

const loadFeatures = () => import("@/lib/framer-features").then((mod) => mod.default);

const roles = ["HR Director", "General Manager", "L&D / Training Head", "Operations / Rooms Division", "Quality / Standards", "Owner / Founder", "Other"];
const propertyCounts = ["1", "2–5", "6–20", "21+"];

export default function DemoForm({ bookingUrl }: { bookingUrl?: string }) {
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [mailHref, setMailHref] = useState(DEMO_HREF);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    // Bots fill the hidden field; humans never see it.
    if (form.company_website) return;
    const problems: Record<string, string> = {};
    const val = (k: string) => (form[k] ?? "").trim();
    if (val("name").length < 2) problems.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val("email"))) problems.email = "Please use a valid work email";
    if (val("hotel").length < 2) problems.hotel = "Please enter your hotel or group";
    if (!val("role")) problems.role = "Please choose your role";
    if (!val("properties")) problems.properties = "Please choose a number of properties";
    setFields(problems);
    if (Object.keys(problems).length) {
      setError("Please check the highlighted fields.");
      setStatus("error");
      return;
    }
    setError("");
    const href = demoMailto({
      name: val("name"),
      email: val("email"),
      hotel: val("hotel"),
      role: val("role"),
      properties: val("properties"),
      phone: val("phone"),
      message: val("message"),
    });
    setMailHref(href);
    track("demo_form_submit", { form: "demo" });
    window.location.href = href;
    setStatus("done");
  }

  const invalid = (name: string) => (fields[name] ? { "aria-invalid": true, "aria-describedby": `demo-${name}-error` } : {});

  return (
    <LazyMotion features={loadFeatures} strict>
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <m.div
            key="done"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-green/40 bg-[linear-gradient(160deg,rgb(79_197_158/0.12),transparent_60%)] p-7"
            role="status"
            data-testid="demo-success"
          >
            <m.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
              className="grid size-14 place-items-center rounded-full bg-green text-[#0c2329]"
            >
              <Icon name="check" size={28} strokeWidth={2.4} />
            </m.div>
            <h2 className="mt-5 font-display text-[1.6rem] font-semibold text-ink">Your email is ready to send.</h2>
            <p className="mt-2 text-[1rem] leading-relaxed text-muted">
              Your email app should have opened with the request addressed to {DEMO_EMAIL}. Press send and we will reply to
              fix a time. {bookingUrl ? "Or pick a slot now:" : "Bring one SOP you would like to see as a timed task."}
            </p>
            <p className="mt-4 text-[0.95rem] text-muted">
              Nothing opened?{" "}
              <a href={mailHref} className="text-ink underline decoration-gold/60 underline-offset-4">
                Open the email again
              </a>{" "}
              or write to{" "}
              <a href={`mailto:${DEMO_EMAIL}`} className="text-ink underline decoration-gold/60 underline-offset-4">
                {DEMO_EMAIL}
              </a>
              .
            </p>
            {bookingUrl ? (
              <div className="mt-6">
                <BookingEmbed url={bookingUrl} location="demo-success" />
              </div>
            ) : null}
          </m.div>
        ) : (
          <m.form
            key="form"
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            onSubmit={onSubmit}
            noValidate
            className="space-y-5 rounded-2xl border border-line bg-surface/70 p-6 sm:p-8"
            aria-label="Book a 15-minute demo"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="demo-name" label="Your name" error={fields.name}>
                <input id="demo-name" name="name" required autoComplete="name" className={inputClass} {...invalid("name")} />
              </Field>
              <Field id="demo-email" label="Work email" error={fields.email}>
                <input id="demo-email" name="email" type="email" required autoComplete="email" className={inputClass} {...invalid("email")} />
              </Field>
            </div>
            <Field id="demo-hotel" label="Hotel or group" error={fields.hotel}>
              <input id="demo-hotel" name="hotel" required autoComplete="organization" className={inputClass} {...invalid("hotel")} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="demo-role" label="Your role" error={fields.role}>
                <select id="demo-role" name="role" required defaultValue="" className={inputClass} {...invalid("role")}>
                  <option value="" disabled>
                    Choose…
                  </option>
                  {roles.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </Field>
              <Field id="demo-properties" label="Number of properties" error={fields.properties}>
                <select id="demo-properties" name="properties" required defaultValue="" className={inputClass} {...invalid("properties")}>
                  <option value="" disabled>
                    Choose…
                  </option>
                  {propertyCounts.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field id="demo-phone" label="Phone" optional error={fields.phone}>
              <input id="demo-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} {...invalid("phone")} />
            </Field>
            <Field id="demo-message" label="Anything we should know?" optional error={fields.message}>
              <textarea
                id="demo-message"
                name="message"
                rows={4}
                placeholder="The SOP you'd like to see as a timed task, your departments, your timeline…"
                className={inputClass}
                {...invalid("message")}
              />
            </Field>
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            {status === "error" && error ? (
              <p role="alert" className="rounded-xl border border-coral/40 bg-coral/10 px-4 py-3 text-[0.92rem] text-coral-ink">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-gold px-7 font-medium text-on-gold shadow-[0_10px_40px_-12px_rgb(229_179_90/0.7)] transition-colors hover:bg-[#eec27a] disabled:opacity-70"
            >
              Book my 15-min demo
              <Icon name="arrowRight" size={17} />
            </button>
            <p className="text-center text-[0.82rem] text-faint">
              We use your details only to arrange the demo. See our <a href="/privacy" className="underline underline-offset-4">privacy policy</a>.
            </p>
          </m.form>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
