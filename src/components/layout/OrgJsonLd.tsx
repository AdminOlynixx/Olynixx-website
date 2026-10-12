import { JsonLd } from "@/components/sections/JsonLd";
import { organizationJsonLd } from "@/lib/json-ld";

/** Organization structured data. Mount once inside <body> in the root layout. */
export function OrgJsonLd() {
  return <JsonLd data={organizationJsonLd()} />;
}
