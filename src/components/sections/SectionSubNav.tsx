import Link from "next/link";

/** Sticky-feeling in-section tab row (e.g. corporates sub-pages). Server component. */
export function SectionSubNav({
  items,
  current,
}: {
  items: readonly { href: string; label: string }[];
  current: string;
}) {
  return (
    <nav
      aria-label="Section"
      data-theme="light"
      className="relative z-10 border-b border-rule bg-cream/90 backdrop-blur"
    >
      <ul className="container-ol flex gap-2 overflow-x-auto py-2">
        {items.map((item) => {
          const active = item.href === current;
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-[44px] items-center border-b-2 px-4 text-sm transition-colors ${
                  active ? "border-gold font-medium text-ink" : "border-transparent text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
