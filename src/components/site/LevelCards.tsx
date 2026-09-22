import { HUB } from "@/content/individuals";

export function LevelCards({ note }: { note?: string }) {
  return (
    <>
      <div className="ol-levels">
        {HUB.levels.map((level) => (
          <article key={level.title} className="ol-card ol-level">
            <h3>{level.title}</h3>
            <p className="ol-small ol-price-anchor">
              from AED <span className="ol-price-slot">{level.price}</span> /month
            </p>
            <p>{level.body}</p>
          </article>
        ))}
      </div>
      <p className="ol-small" style={{ marginTop: "var(--s3)" }}>
        {HUB.levelsPriceNote}
      </p>
      {note ? (
        <p className="ol-muted" style={{ marginTop: "var(--s2)" }}>
          {note}
        </p>
      ) : null}
    </>
  );
}
