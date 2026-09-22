type LockupProps = {
  product?: "master" | "praxis";
  layout?: "horizontal" | "stacked";
  ground?: "dark" | "light";
  height?: number;
  priority?: boolean;
  className?: string;
};

/** Never re-typeset the wordmark. Use the kit file. */
export function Lockup({
  product = "master",
  layout = "horizontal",
  ground = "dark",
  height = 44,
  priority = false,
  className,
}: LockupProps) {
  const src =
    product === "praxis"
      ? `/brand/olynixx-praxis-lockup-on-${ground}.svg`
      : `/brand/olynixx-lockup-${layout}-on-${ground}.svg`;
  const alt = product === "praxis" ? "Olynixx Praxis" : "Olynixx";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      height={height}
      width={height * 4}
      className={className}
      style={className ? { width: "auto", height } : { height, width: "auto" }}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
