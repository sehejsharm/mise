"use client";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

/** Scheduler iframe (Cal.com / Calendly). Mounts when visible; fires booking_opened once. */
export default function BookingEmbed({ url, location }: { url: string; location: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShow(true);
        track("booking_opened", { location });
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [location]);

  let valid = true;
  try {
    new URL(url);
  } catch {
    valid = false;
  }
  if (!valid) return null;

  return (
    <div ref={box} className="overflow-hidden rounded-2xl border border-line bg-surface" style={{ minHeight: 620 }}>
      {show ? (
        <iframe
          src={url}
          title="Pick a time for your 15-minute Mise demo"
          className="h-[620px] w-full"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : null}
    </div>
  );
}
