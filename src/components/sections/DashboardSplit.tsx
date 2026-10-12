import { Reveal } from "@/components/motion/Reveal";

/** Two views, one engine, separate data. A hairline wall divides the personal and corporate dashboards. */
export function DashboardSplit({ personal, corporate, note }: { personal: string; corporate: string; note: string }) {
  return (
    <div>
      <Reveal stagger={0.15} className="relative grid gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-0">
        <article className="border border-rule bg-paper p-7 md:p-9">
          <p className="eyebrow mb-4">Personal</p>
          <div aria-hidden className="mb-6 flex h-16 items-end gap-1.5">
            {[40, 62, 48, 80, 66, 90, 74].map((h, i) => (
              <span key={i} className="flex-1 bg-data/70" style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="text-ink-muted">{personal}</p>
        </article>
        <div aria-hidden className="relative hidden w-14 items-center justify-center md:flex">
          <span className="absolute inset-y-0 left-1/2 w-px bg-gold" />
          <span className="relative bg-cream px-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-text [writing-mode:vertical-rl]">
            Separate data
          </span>
        </div>
        <article className="border border-rule bg-paper p-7 md:p-9">
          <p className="eyebrow mb-4">Corporate</p>
          <div aria-hidden className="mb-6 flex h-16 items-end gap-1.5">
            {[20, 38, 62, 86, 70, 44, 26].map((h, i) => (
              <span key={i} className="flex-1 bg-green-deep/70" style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="text-ink-muted">{corporate}</p>
        </article>
      </Reveal>
      <p className="mt-8 font-display text-2xl text-ink">{note}</p>
    </div>
  );
}
