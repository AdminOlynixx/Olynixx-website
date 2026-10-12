import Link from "next/link";
import { ISO_SHORT } from "@/lib/legal-copy";
import { Reveal } from "@/components/motion/Reveal";

/** Approved short ISO line. Copy comes only from legal-copy. */
export function IsoShortLine({ theme = "light" }: { theme?: "dark" | "light" }) {
  return (
    <Reveal
      className={`max-w-[68ch] border-l-2 border-gold py-1 pl-5 text-[15px] ${
        theme === "dark" ? "text-cream/85" : "text-ink-muted"
      }`}
    >
      <p>
        {ISO_SHORT}{" "}
        <Link href="/governance" className="underline decoration-gold underline-offset-4 hover:text-gold-text">
          Full standards layer
        </Link>
      </p>
    </Reveal>
  );
}
