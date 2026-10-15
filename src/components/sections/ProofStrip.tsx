import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";

export function ProofStrip({ items }: { items: readonly { value: string; label: string }[] }) {
  return (
    <section data-theme="light" className="border-y border-rule py-14">
      <Reveal stagger={0.1} className={`container-ol grid grid-cols-2 gap-8 ${items.length > 4 ? "md:grid-cols-5" : "md:grid-cols-4"}`}>
        {items.map((i) => (
          <div key={i.label}>
            <p className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-data">
              <Counter value={i.value} />
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink-muted">{i.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
