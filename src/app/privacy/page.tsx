import type { Metadata } from "next";
import { LegalDoc } from "@/components/sections/LegalDoc";
import { JsonLd } from "@/components/sections/JsonLd";
import { PRIVACY } from "@/content/legal";
import { breadcrumbJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: { absolute: "Privacy | Olynixx" },
  description: PRIVACY.lead,
};

const crumbs = [
  { href: "/", label: "Home" },
  { href: "/privacy", label: "Privacy" },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <LegalDoc
        eyebrow="Legal"
        title={PRIVACY.title}
        lead={PRIVACY.lead}
        sections={PRIVACY.sections}
        breadcrumb={crumbs}
        links={[
          { href: "/terms", label: "Terms of use" },
          { href: "/governance", label: "Governance" },
        ]}
      />
    </>
  );
}
