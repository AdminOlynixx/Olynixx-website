import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function DoorCards({
  doors,
}: {
  doors: readonly { title: string; href: string; body: string }[];
}) {
  return (
    <Reveal stagger={0.12} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {doors.map((d, i) => (
        <Link
          key={d.href}
          href={d.href}
          data-cursor
          className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden border border-rule bg-paper p-7 transition-colors duration-300 hover:border-gold hover:bg-green-deep hover:text-cream"
        >
          <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
          <span className="font-mono text-xs text-gold-text group-hover:text-gold-dark">
            0{i + 1}
          </span>
          <div>
            <h3 className="font-display text-3xl leading-tight">{d.title}</h3>
            <p className="mt-3 text-[15px] text-ink-muted group-hover:text-cream/80">{d.body}</p>
          </div>
          <ArrowUpRight className="self-end transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </Link>
      ))}
    </Reveal>
  );
}
