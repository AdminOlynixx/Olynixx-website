import type { Metadata } from "next";
import { LegalDoc } from "@/components/site/LegalDoc";
import { TERMS } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of use",
  description: TERMS.lead,
};

export default function TermsPage() {
  return (
    <LegalDoc
      eyebrow="Legal"
      title={TERMS.title}
      lead={TERMS.lead}
      sections={TERMS.sections}
      links={[
        { href: "/privacy", label: "Privacy" },
        { href: "/governance", label: "Governance" },
      ]}
    />
  );
}
