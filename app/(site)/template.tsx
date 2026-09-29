"use client";
import { useEffect, useState, type ReactNode } from "react";

let hasNavigated = false;

/**
 * Page transition for client-side navigations. The first page load renders
 * without any entrance so the LCP heading paints immediately; later
 * navigations get a short translate/fade. Cross-document navigations use the
 * View Transitions API via `@view-transition` in globals.css.
 */
export default function Template({ children }: { children: ReactNode }) {
  const [animate] = useState(() => hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);
  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
