export function Divider({ className }: { className?: string }) {
  return <div className={className ? `ol-divider ${className}` : "ol-divider"} aria-hidden />;
}
