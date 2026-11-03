import Link from "next/link";
import Image from "next/image";
import { FOOTER_NAV, SOCIAL_LINKS } from "@/lib/nav";
import { ISO_SHORT, NON_MEDICAL_DISCLAIMER } from "@/lib/legal-copy";
import { publicContact, publishLongevity, publishPraxis, telHref, whatsappHref } from "@/lib/site-config";

export function Footer() {
  const c = publicContact();
  const longevity = publishLongevity();
  const individuals = FOOTER_NAV.individuals.filter(
    (l) => l.href !== "/individuals/longevity" || longevity,
  );
  const col = (title: string, links: readonly { href: string; label: string }[]) => (
    <div>
      <h2 className="eyebrow !font-mono">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="hover:text-gold-dark">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer data-theme="dark" className="surface-dark">
      <div className="container-ol grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Image
            src="/brand/olynixx-lockup-horizontal-on-dark.svg"
            alt="Olynixx"
            width={410}
            height={128}
            className="h-8 w-auto"
          />
          <Image
            src="/brand/olynixx-spine-on-dark.svg"
            alt=""
            aria-hidden="true"
            width={1148}
            height={95}
            className="mt-6 h-auto w-[220px]"
          />
          <p className="mt-6 text-sm text-cream/80">
            <Link href="/about#book" className="font-display text-lg italic hover:text-gold-dark">
              Rest Is the New Sport
            </Link>
            <br />
            The book behind the system
          </p>
          <ul className="mt-6 flex flex-wrap gap-5 text-sm">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold-dark">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-1 text-sm">
            <p className="eyebrow">Direct</p>
            <p><a href={`mailto:${c.email}`} className="hover:text-gold-dark">{c.email}</a></p>
            <p><a href={telHref(c.phone)} className="hover:text-gold-dark">{c.phone}</a></p>
            <p>
              <a href={whatsappHref(c.whatsapp)} className="hover:text-gold-dark">WhatsApp</a>
            </p>
          </div>
        </div>
        {col("Doors", FOOTER_NAV.doors.filter((l) => l.href !== "/praxis" || publishPraxis()))}
        {col("For individuals", individuals)}
        {col("Company", FOOTER_NAV.company)}
      </div>
      <div className="border-t border-cream/15">
        <div className="container-ol space-y-3 py-8 text-xs text-cream/70">
          <p>{NON_MEDICAL_DISCLAIMER}</p>
          <p>{ISO_SHORT}</p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>© {new Date().getFullYear()} Olynixx. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-gold-dark">Privacy</Link>
            <Link href="/terms" className="hover:text-gold-dark">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
