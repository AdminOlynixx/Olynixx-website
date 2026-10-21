import type { ReactNode } from "react";
import Link from "next/link";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

type Cta = { href: string; label: string };

/** Dark hero used by every inner page. The persistent star shows through behind it. */
export function PageHero({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  trust,
  breadcrumb,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  primary?: Cta;
  secondary?: Cta;
  trust?: readonly string[];
  breadcrumb?: { href: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section data-theme="dark" data-globe="hero" className="surface-dark relative overflow-hidden pb-20 pt-24 md:pb-28 md:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(79,192,166,0.16),transparent_60%)]" />
      <div className="container-ol">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs uppercase tracking-[0.1em] text-cream/60">
            {breadcrumb.map((b, i) => (
              <span key={b.href}>
                {i > 0 && " / "}
                <Link href={b.href} className="hover:text-gold-dark">
                  {b.label}
                </Link>
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <SplitHeading
          as="h1"
          text={title}
          delay={0.15}
          className="max-w-4xl text-[clamp(2.375rem,5.2vw,4rem)] leading-[1.05] tracking-[-0.02em]"
        />
        <Reveal stagger={0.12} delay={0.6} className="mt-8 max-w-2xl space-y-6">
          {lead && <p className="text-[clamp(1.1875rem,1.6vw,1.3125rem)] text-cream/85">{lead}</p>}
          {(primary || secondary) && (
            <div className="flex flex-wrap gap-4 pt-2">
              {primary && <Button href={primary.href}>{primary.label}</Button>}
              {secondary && (
                <Button href={secondary.href} variant="secondary">
                  {secondary.label}
                </Button>
              )}
            </div>
          )}
        </Reveal>
        {trust && trust.length > 0 && (
          <Reveal stagger={0.08} delay={0.9} className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-cream/15 pt-6">
            {trust.map((t) => (
              <p key={t} className="font-mono text-xs uppercase tracking-[0.08em] text-cream/70">
                {t}
              </p>
            ))}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
