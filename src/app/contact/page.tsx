import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/sections/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { CONTACT } from "@/content/contact";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { publicContact, telHref, whatsappHref } from "@/lib/site-config";

export const metadata: Metadata = withSocial({
  title: { absolute: "Contact | Olynixx" },
  description: CONTACT.lead,
}, "/contact");

const crumbs = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
];

const link = "underline underline-offset-4 hover:text-gold-text";

export default function ContactPage() {
  const details = publicContact();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero eyebrow="Contact" title={CONTACT.title} lead={CONTACT.lead} breadcrumb={crumbs} />

      <Section theme="light">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <Suspense fallback={<p className="text-ink-muted">Loading form…</p>}>
              <ContactForm />
            </Suspense>
          </Reveal>
          <Reveal as="aside" stagger={0.08} className="space-y-3 border-t border-rule pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="eyebrow">{CONTACT.directEyebrow}</p>
            <p className="font-display text-2xl">{details.location}</p>
            {details.address ? <p>{details.address}</p> : null}
            {details.email ? (
              <p>
                <a className={link} href={`mailto:${details.email}`}>
                  {details.email}
                </a>
              </p>
            ) : null}
            {details.phone ? (
              <p>
                <a className={link} href={telHref(details.phone)}>
                  {details.phone}
                </a>
              </p>
            ) : null}
            {details.whatsapp ? (
              <p>
                <a className={link} href={whatsappHref(details.whatsapp)} target="_blank" rel="noopener noreferrer">
                  WhatsApp {details.whatsapp}
                </a>
              </p>
            ) : null}
            {details.mapUrl ? (
              <p>
                <a className={link} href={details.mapUrl} rel="noopener noreferrer">
                  Map
                </a>
              </p>
            ) : null}
            {details.sla ? <p className="text-sm">{details.sla}</p> : null}
            {details.calendar ? (
              <div className="aspect-[4/5] w-full border border-rule">
                <iframe title="Book a conversation" src={details.calendar} loading="lazy" className="h-full w-full" />
              </div>
            ) : null}
            <p className="pt-2 text-sm text-ink-muted">{CONTACT.directNote}</p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
