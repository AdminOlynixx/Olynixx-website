import { ABOUT } from "@/content/about";
import { CORPORATES } from "@/content/corporates";
import { HOME } from "@/content/home";
import { HUB } from "@/content/individuals";
import { PRAXIS } from "@/content/praxis";
import { ISO_SHORT, NON_MEDICAL_DISCLAIMER } from "@/lib/legal-copy";
import { SOCIAL_LINKS } from "@/lib/nav";
import { publicContact, siteUrl } from "@/lib/site-config";

export function organizationJsonLd() {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Olynixx",
    url,
    logo: `${url}/brand/olynixx-lockup-horizontal-on-dark.svg`,
    description: HOME.standfirst,
    areaServed: "AE",
    email: publicContact().email,
    telephone: "+971585997620",
    sameAs: SOCIAL_LINKS.map((item) => item.href),
  };
}

export function serviceJsonLd() {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Workforce readiness testing",
    serviceType: "Preventive workforce readiness testing",
    provider: { "@type": "Organization", name: "Olynixx", url },
    areaServed: "AE",
    description: CORPORATES.metaDescription,
    url: `${url}/corporates`,
  };
}

export function courseJsonLd() {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Olynixx Praxis",
    description: PRAXIS.heroLead,
    provider: { "@type": "Organization", name: "Olynixx", url },
    url: `${url}/praxis`,
  };
}

export function bookJsonLd() {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: ABOUT.bookName,
    datePublished: ABOUT.bookYear,
    description: ABOUT.bookBody,
    url: `${url}/about#book`,
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: HOME.monitoringTitle,
        acceptedAnswer: { "@type": "Answer", text: HOME.monitoringBody },
      },
      {
        "@type": "Question",
        name: "Do you treat patients?",
        acceptedAnswer: {
          "@type": "Answer",
          text: HUB.trust.find((item) => item.includes("we do not treat patients")) ?? NON_MEDICAL_DISCLAIMER,
        },
      },
      {
        "@type": "Question",
        name: "Are you ISO certified?",
        acceptedAnswer: { "@type": "Answer", text: ISO_SHORT },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: readonly { href: string; label: string }[]) {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${url}${item.href === "/" ? "" : item.href}`,
    })),
  };
}
