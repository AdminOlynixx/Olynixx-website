import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { LegalDoc } from "@/components/sections/LegalDoc";
import { JsonLd } from "@/components/sections/JsonLd";
import { TERMS } from "@/content/legal";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = withSocial({
  title: { absolute: "Terms of use | Olynixx" },
  description: TERMS.lead,
}, "/terms");

const crumbs = [
  { href: "/", label: "Home" },
  { href: "/terms", label: "Terms of use" },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <LegalDoc
        eyebrow="Legal"
        title={TERMS.title}
        lead={TERMS.lead}
        sections={TERMS.sections}
        breadcrumb={crumbs}
        links={[
          { href: "/privacy", label: "Privacy" },
          { href: "/governance", label: "Governance" },
        ]}
      />
    </>
  );
}
