/** Designed empty frame so missing assets never look broken. */
export function MediaSlot({ label }: { label: string }) {
  return (
    <div className="ol-media-slot">
      <p>{label}</p>
    </div>
  );
}
