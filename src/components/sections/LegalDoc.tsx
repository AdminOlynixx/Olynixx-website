import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { Reveal } from "@/components/motion/Reveal";

export type LegalSection = { title: string; body: readonly string[] };

export function LegalAlso({ links, theme = "light" }: { links: readonly { href: string; label: string }[]; theme?: "dark" | "light" }) {
  return (
    <nav
      aria-label="Related"
      className={`mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6 font-mono text-xs uppercase tracking-[0.1em] ${
        theme === "dark" ? "border-cream/20" : "border-rule"
      }`}
    >
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="underline underline-offset-4 hover:text-gold-text">
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

/** Numbered legal sections under a standard hero. Copy is passed in, never retyped here. */
export function LegalDoc({
  eyebrow,
  title,
  lead,
  sections,
  links,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  sections: readonly LegalSection[];
  links: readonly { href: string; label: string }[];
  breadcrumb?: { href: string; label: string }[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} breadcrumb={breadcrumb} />
      <Section theme="light" narrow>
        <Reveal as="ol" stagger={0.1} className="divide-y divide-rule border-y border-rule">
          {sections.map((section, i) => (
            <li key={section.title} className="grid gap-3 py-9 md:grid-cols-[72px_1fr] md:gap-6">
              <p className="font-mono text-sm text-gold-text">{String(i + 1).padStart(2, "0")}</p>
              <div className="space-y-4 text-ink-muted">
                <h2 className="font-display text-2xl text-ink">{section.title}</h2>
                {section.body.map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
              </div>
            </li>
          ))}
        </Reveal>
        <LegalAlso links={links} />
      </Section>
    </>
  );
}
