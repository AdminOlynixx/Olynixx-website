/** Renders one or more schema.org objects as JSON-LD. */
export function PageJsonLd({ data }: { data: Record<string, unknown> | readonly Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
