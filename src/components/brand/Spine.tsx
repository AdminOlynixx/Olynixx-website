type SpineProps = {
  ground?: "dark" | "light";
  width?: number;
  className?: string;
};

/** Artwork lockup so tracking and colour split cannot drift. */
export function Spine({ ground = "dark", width = 640, className }: SpineProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/brand/olynixx-spine-on-${ground}.svg`}
      alt="Readiness + Recovery = Perform"
      width={width}
      className={className}
      style={{ width: "100%", maxWidth: width, height: "auto" }}
      decoding="async"
    />
  );
}
