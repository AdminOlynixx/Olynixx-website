import Link from "next/link";
import { BookOpen, Instagram, Linkedin, Twitter, Youtube } from "react-feather";
import { Lockup } from "@/components/brand/Lockup";
import { Spine } from "@/components/brand/Spine";
import { ISO_SHORT, NON_MEDICAL_DISCLAIMER } from "@/lib/legal-copy";
import { entityIdentity, publishLongevity } from "@/lib/site-config";
import { FOOTER_NAV, SOCIAL_LINKS } from "@/lib/nav";

const SOCIAL_ICONS = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  X: Twitter,
  YouTube: Youtube,
} as const;

export function Footer() {
  const entity = entityIdentity();
  const year = new Date().getFullYear();
  const individualLinks = publishLongevity()
    ? FOOTER_NAV.individuals
    : FOOTER_NAV.individuals.filter((link) => link.href !== "/individuals/longevity");

  return (
    <footer className="ol-footer ol-app">
      <div className="ol-container">
        <div className="ol-footer__grid">
          <div className="ol-footer__brand">
            <Lockup product="master" layout="horizontal" ground="dark" height={32} />
            <div className="ol-footer__spine">
              <Spine ground="dark" width={220} />
            </div>
            <Link href="/about#book" className="ol-book">
              <span className="ol-book__cover" aria-hidden>
                <BookOpen size={14} strokeWidth={1.6} />
              </span>
              <span>
                Rest Is the New Sport
                  <span className="ol-book__caption">The book behind the system</span>
              </span>
            </Link>
            <nav className="ol-social" aria-label="Social media">
              {SOCIAL_LINKS.map((item) => {
                const Icon = SOCIAL_ICONS[item.label];
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                  >
                    <Icon size={14} strokeWidth={1.6} aria-hidden />
                  </a>
                );
              })}
            </nav>
          </div>

          {(
            [
              { title: "Doors", links: FOOTER_NAV.doors },
              { title: "For individuals", links: individualLinks },
              { title: "Company", links: FOOTER_NAV.company },
            ] as { title: string; links: readonly { href: string; label: string }[] }[]
          ).map((col) => (
            <nav key={col.title} className="ol-footer__col" aria-label={col.title}>
              <p className="ol-eyebrow">{col.title}</p>
              <ul className="ol-footer__list">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="ol-footer__meta">
          <p className="ol-disclaimer">{NON_MEDICAL_DISCLAIMER}</p>
          <div className="ol-footer__meta-row">
            <p className="ol-iso-short">{ISO_SHORT}</p>
            <p className="ol-legal-entity">
              {entity.legalName
                ? `© ${year} ${entity.legalName.replace(/\.$/, "")}. All rights reserved.`
                : `© ${year} Olynixx. Legal entity — pending confirmation.`}
              {entity.address ? ` ${entity.address}` : ""}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
