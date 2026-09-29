"use client";
import { useState } from "react";
import { track } from "@/lib/analytics";

/** Footer newsletter capture. Posts to /api/lead tagged `newsletter`. */
export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "newsletter",
          email: form.get("email"),
          company_website: form.get("company_website"),
          elapsedMs: Date.now() - startedAt,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      track("newsletter_signup", { location: "footer" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="text-[0.92rem] text-green-ink">You're on the list. One useful email a month, at most.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm" noValidate={false}>
      <label htmlFor="newsletter-email" className="block text-[0.9rem] font-medium text-ink">
        Field notes on hotel service execution
      </label>
      <div className="mt-3 flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@hotel.com"
          className="h-11 min-w-0 flex-1 rounded-full border border-line-strong bg-surface px-4 text-[0.92rem] text-ink placeholder:text-faint focus:border-gold focus:outline-none"
        />
        {/* Honeypot: invisible to people, irresistible to bots. */}
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="h-11 shrink-0 rounded-full border border-gold/60 px-4 text-[0.9rem] font-medium text-gold-ink transition-colors hover:bg-gold hover:text-on-gold disabled:opacity-60"
        >
          {status === "sending" ? "Joining…" : "Subscribe"}
        </button>
      </div>
      {status === "error" ? (
        <p role="alert" className="mt-2 text-[0.85rem] text-coral-ink">
          That didn't go through. Please try again, or email us directly.
        </p>
      ) : null}
    </form>
  );
}
