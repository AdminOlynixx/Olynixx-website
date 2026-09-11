export function ProofStrip({
  items,
}: {
  items: readonly { value: string; label: string }[];
}) {
  return (
    <div className="ol-proof" role="list">
      {items.map((item) => (
        <div key={item.label} className="ol-proof__item" role="listitem">
          <p className="ol-proof__value">{item.value}</p>
          <p className="ol-proof__label">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
