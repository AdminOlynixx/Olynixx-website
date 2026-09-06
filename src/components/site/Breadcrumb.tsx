import Link from "next/link";
import { JsonLd } from "@/components/site/JsonLd";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export type Crumb = { href: string; label: string };

export function Breadcrumb({ items }: { items: readonly Crumb[] }) {
  return (
    <nav className="ol-breadcrumb" aria-label="Breadcrumb">
      <JsonLd data={breadcrumbJsonLd(items)} />
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.href}>
              {last ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
