/** Infinite horizontal ticker. Pure CSS, pauses on hover, static under reduced motion. */
export function Marquee({ items }: { items: readonly string[] }) {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-12 whitespace-nowrap font-display text-2xl italic">
          {t}
          <span className="text-gold-dark">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group flex overflow-hidden border-y border-rule py-6" data-theme="light">
      <div className="flex animate-[marquee_38s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
