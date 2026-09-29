"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export const THEME_KEY = "mise-theme";

/** Inline, pre-paint theme bootstrap. Dark is the default. */
export const themeInitScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('${THEME_KEY}');d.dataset.theme=(t==='light'||t==='dark')?t:'dark';}catch(e){d.dataset.theme='dark';}if('IntersectionObserver' in window){d.classList.add('js-motion');}})();`;

export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as "dark" | "light") ?? "dark");
  }, []);

  const next = theme === "light" ? "dark" : "light";
  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage blocked: the choice lasts for this page view */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${next} theme` : "Toggle colour theme"}
      className={`grid size-10 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-gold hover:text-gold-ink ${className ?? ""}`}
    >
      <Icon name={theme === "light" ? "moon" : "sun"} size={18} />
    </button>
  );
}
