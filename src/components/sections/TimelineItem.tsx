import type { ReactNode } from "react";

/** One stop on a ScrollTimeline. Pure markup so copy stays server rendered. */
export function TimelineItem({
  kicker,
  title,
  theme = "light",
  children,
}: {
  kicker?: string;
  title: string;
  theme?: "dark" | "light";
  children?: ReactNode;
}) {
  return (
    <li data-tl-item className="relative pb-12 pl-12 last:pb-0 md:pl-16">
      <span
        data-tl-dot
        className={`absolute left-0 top-1 flex h-[30px] w-[30px] items-center justify-center border bg-green-deep font-mono text-[11px] text-gold-dark md:h-9 md:w-9 ${
          theme === "dark" ? "border-gold-dark" : "border-gold"
        }`}
      >
        {kicker}
      </span>
      <div
        className={`border p-6 ${
          theme === "dark" ? "border-cream/15 bg-cream/[0.04]" : "border-rule bg-paper"
        }`}
      >
        <h3 className="font-display text-2xl leading-tight">{title}</h3>
        {children && (
          <div className={`mt-3 text-[15px] ${theme === "dark" ? "text-cream/75" : "text-ink-muted"}`}>{children}</div>
        )}
      </div>
    </li>
  );
}
