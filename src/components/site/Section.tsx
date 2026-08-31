import type { ReactNode } from "react";

type Surface = "light" | "dark" | "app";

export function Section({
  children,
  surface = "light",
  id,
  narrow = false,
  className,
}: {
  children: ReactNode;
  surface?: Surface;
  id?: string;
  narrow?: boolean;
  className?: string;
}) {
  const scope = surface === "dark" ? "ol-dark" : surface === "app" ? "ol-app" : "ol-light";
  return (
    <section id={id} className={`ol-section ${scope}${className ? ` ${className}` : ""}`}>
      <div className={narrow ? "ol-container ol-container--narrow" : "ol-container"}>{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="ol-eyebrow">{children}</p>;
}

export function Title({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={className}>{children}</h2>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="ol-lead">{children}</p>;
}

export function Hero({
  children,
  surface = "dark",
  center = false,
  compact = false,
}: {
  children: ReactNode;
  surface?: "dark" | "light" | "app";
  center?: boolean;
  compact?: boolean;
}) {
  const scope = surface === "light" ? "ol-light" : surface === "app" ? "ol-app" : "ol-dark";
  const mods = `${center ? " ol-hero--center" : ""}${compact ? " ol-hero--compact" : ""}`;
  return (
    <section className={`ol-section ol-hero ${scope}${mods}`}>
      <div className="ol-container">{children}</div>
    </section>
  );
}
