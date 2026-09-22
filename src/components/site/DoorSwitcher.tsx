import Link from "next/link";
import { INDIVIDUAL_DOORS } from "@/lib/nav";
import { publishLongevity } from "@/lib/site-config";

export function DoorSwitcher({ current }: { current: string }) {
  const longevityOnThisPage = current === "/individuals/longevity";
  const doors =
    publishLongevity() || longevityOnThisPage
      ? INDIVIDUAL_DOORS
      : INDIVIDUAL_DOORS.filter((item) => item.href !== "/individuals/longevity");

  return (
    <nav className="ol-switcher" aria-label="Individual routes">
      <Link href="/individuals" aria-current={current === "/individuals" ? "page" : undefined}>
        Overview
      </Link>
      {doors.map((item) => (
        <Link key={item.href} href={item.href} aria-current={current === item.href ? "page" : undefined}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
