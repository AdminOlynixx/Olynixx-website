import { Reveal } from "@/components/motion/Reveal";
import { CYCLE1 } from "@/content/corporates";

const BAND_COLOUR = {
  moderate: "bg-band-mid",
  good: "bg-band-good",
  excellent: "bg-band-high",
} as const;

/** Cycle 1 baseline: headline, band chart and the one-in-seven stat. Never names the client. */
export function CycleResults({ theme = "light" }: { theme?: "dark" | "light" }) {
  const dark = theme === "dark";
  const muted = dark ? "text-cream/80" : "text-ink-muted";
  const total = CYCLE1.bands.reduce((sum, b) => sum + b.count, 0);

  return (
    <Reveal stagger={0.1} className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <div className="space-y-6">
        <h3 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-snug">{CYCLE1.headline}</h3>
        <p className={`font-mono text-sm uppercase tracking-[0.08em] ${muted}`}>{CYCLE1.average}</p>

        <div>
          <div
            role="img"
            aria-label={CYCLE1.bands.map((b) => `${b.count} ${b.label}`).join(", ")}
            className="flex h-4 w-full overflow-hidden"
          >
            {CYCLE1.bands.map((b) => (
              <span
                key={b.label}
                className={BAND_COLOUR[b.key]}
                style={{ width: `${(b.count / total) * 100}%`, minWidth: b.count > 0 ? "6px" : 0 }}
              />
            ))}
          </div>
          <ul className="mt-4 grid grid-cols-3 gap-4">
            {CYCLE1.bands.map((b) => (
              <li key={b.label}>
                <p className="flex items-center gap-2">
                  <span aria-hidden className={`inline-block h-2 w-2 ${BAND_COLOUR[b.key]}`} />
                  <span className="font-display text-3xl">{b.count}</span>
                </p>
                <p className={`font-mono text-xs uppercase tracking-[0.1em] ${muted}`}>{b.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`border-l-2 border-gold pl-6 ${muted}`}>
        <p className={`font-display text-[clamp(3rem,6vw,4.5rem)] leading-none ${dark ? "text-gold-dark" : "text-gold-text"}`}>
          {CYCLE1.lowRecovery.stat}
        </p>
        <p className="mt-3 text-[15px]">{CYCLE1.lowRecovery.body}</p>
        <p className="mt-6 text-sm italic">{CYCLE1.retestNote}</p>
      </div>
    </Reveal>
  );
}
