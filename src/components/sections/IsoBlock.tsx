import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ISO_FOLLOW, ISO_LONG, ISO_SHORT } from "@/lib/legal-copy";

/** Approved long-form standards block. Copy comes verbatim from legal-copy. */
export function IsoBlock({ follow = false, theme = "dark" }: { follow?: boolean; theme?: "dark" | "light" }) {
  const muted = theme === "dark" ? "text-cream/80" : "text-ink-muted";
  return (
    <Reveal stagger={0.1} className={`max-w-[68ch] space-y-5 ${muted}`}>
      <p className="eyebrow">{ISO_LONG.eyebrow}</p>
      <h2 className="text-[clamp(1.8125rem,3.4vw,2.5rem)] leading-[1.1] text-current">{ISO_LONG.title}</h2>
      <p>{ISO_LONG.intro}</p>
      <ol className="space-y-2 border-y border-current/20 py-4 font-mono text-sm">
        {ISO_LONG.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      <p className="font-medium">{ISO_LONG.status}</p>
      <p>{ISO_LONG.close}</p>
      {follow ? <p>{ISO_FOLLOW}</p> : null}
    </Reveal>
  );
}

/** One-line standards status. The status is never separated from the standard names. */
export function IsoShort({ theme = "light" }: { theme?: "dark" | "light" }) {
  return (
    <Reveal className={`max-w-[68ch] border-l-2 border-gold pl-5 ${theme === "dark" ? "text-cream/85" : "text-ink-muted"}`}>
      <p className="font-mono text-[13px] leading-relaxed">
        {ISO_SHORT}{" "}
        <Link href="/governance" className="whitespace-nowrap underline underline-offset-4 hover:text-gold-dark">
          Full standards layer
        </Link>
      </p>
    </Reveal>
  );
}
