import Link from "next/link";

export function SubNav({
  items,
  current,
}: {
  items: readonly { href: string; label: string }[];
  current: string;
}) {
  return (
    <nav className="ol-subnav" aria-label="Section">
      {items.map((item) => (
        <Link key={item.href} href={item.href} aria-current={current === item.href ? "page" : undefined}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
