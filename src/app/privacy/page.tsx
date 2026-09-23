import type { Metadata } from "next";
import { LegalDoc } from "@/components/site/LegalDoc";
import { PRIVACY } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy",
  description: PRIVACY.lead,
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title={PRIVACY.title}
      lead={PRIVACY.lead}
      sections={PRIVACY.sections}
      links={[
        { href: "/terms", label: "Terms of use" },
        { href: "/governance", label: "Governance" },
      ]}
    />
  );
}
