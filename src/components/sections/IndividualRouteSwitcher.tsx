import Link from "next/link";
import { INDIVIDUAL_DOORS } from "@/lib/nav";
import { publishLongevity } from "@/lib/site-config";

/** Overview / route switcher under the hero. Longevity only shows when published, or on its own page. */
export function IndividualRouteSwitcher({ current }: { current: string }) {
  const doors =
    publishLongevity() || current === "/individuals/longevity"
      ? INDIVIDUAL_DOORS
      : INDIVIDUAL_DOORS.filter((d) => d.href !== "/individuals/longevity");
  const items = [{ href: "/individuals", label: "Overview" }, ...doors];
  return (
    <nav data-theme="light" aria-label="Individual routes" className="relative z-10 border-b border-rule bg-cream">
      <div className="container-ol flex flex-wrap gap-x-8">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            aria-current={current === it.href ? "page" : undefined}
            className={`inline-flex min-h-[48px] items-center border-b-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors ${
              current === it.href ? "border-gold text-ink" : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {it.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
