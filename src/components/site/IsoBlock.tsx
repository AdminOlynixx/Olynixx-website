import Link from "next/link";
import { ISO_FOLLOW, ISO_LONG, ISO_SHORT } from "@/lib/legal-copy";

export function IsoBlock({ follow = false }: { follow?: boolean }) {
  return (
    <div className="ol-iso">
      <p className="ol-eyebrow">{ISO_LONG.eyebrow}</p>
      <h2>{ISO_LONG.title}</h2>
      <p>{ISO_LONG.intro}</p>
      <ol>
        {ISO_LONG.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      <p className="ol-iso__status">{ISO_LONG.status}</p>
      <p>{ISO_LONG.close}</p>
      {follow ? <p>{ISO_FOLLOW}</p> : null}
    </div>
  );
}

export function IsoShort() {
  return (
    <p className="ol-iso-short-block">
      {ISO_SHORT}{" "}
      <Link href="/governance">Full standards layer</Link>
    </p>
  );
}

export function TrustBar({ items }: { items: readonly string[] }) {
  return (
    <div className="ol-trust">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
