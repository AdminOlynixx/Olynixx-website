import Link from "next/link";
import { Hero, Section, Eyebrow } from "@/components/site/Section";

export type LegalSection = {
  title: string;
  body: readonly string[];
};

export function LegalDoc({
  eyebrow,
  title,
  lead,
  sections,
  links,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  sections: readonly LegalSection[];
  links: readonly { href: string; label: string }[];
}) {
  return (
    <>
      <Hero compact>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="ol-hero-title">{title}</h1>
        <p className="ol-lead">{lead}</p>
      </Hero>
      <Section>
        <div className="ol-legal">
          <ol className="ol-legal__articles">
            {sections.map((section, index) => (
              <li key={section.title} className="ol-legal__article">
                <p className="ol-legal__index">{String(index + 1).padStart(2, "0")}</p>
                <div className="ol-legal__copy">
                  <h2>{section.title}</h2>
                  {section.body.map((para) => (
                    <p key={para.slice(0, 48)}>{para}</p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <LegalAlso links={links} />
        </div>
      </Section>
    </>
  );
}

export function LegalAlso({ links }: { links: readonly { href: string; label: string }[] }) {
  return (
    <nav className="ol-legal__also" aria-label="Related">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
