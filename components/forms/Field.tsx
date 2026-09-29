import type { ReactNode } from "react";

const inputClass =
  "mt-2 block w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-[0.98rem] text-ink placeholder:text-faint transition-colors focus:border-gold focus:outline-none aria-[invalid=true]:border-coral";

export function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[0.92rem] font-medium text-ink">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-faint">(optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[0.85rem] text-coral-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { inputClass };
