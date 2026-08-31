import Link from "next/link";

export function CtaBand({
  title,
  href,
  label,
  standfirst,
  secondaryHref,
  secondaryLabel,
  surface = "dark",
}: {
  title: string;
  href: string;
  label: string;
  standfirst?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  surface?: "dark" | "app";
}) {
  return (
    <section className={`ol-section ${surface === "app" ? "ol-app" : "ol-dark"}`}>
      <div className="ol-container ol-cta-band">
        <h2>{title}</h2>
        {standfirst ? <p className="ol-lead" style={{ marginInline: "auto" }}>{standfirst}</p> : null}
        <div className="ol-actions">
          <Link className="ol-btn ol-btn--primary" href={href}>
            {label}
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link className="ol-btn ol-btn--secondary" href={secondaryHref}>
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
