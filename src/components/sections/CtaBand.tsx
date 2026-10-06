import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function CtaBand({
  title,
  standfirst,
  href,
  label,
  secondary,
}: {
  title: string;
  standfirst?: string;
  href: string;
  label: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section data-theme="dark" className="surface-dark relative overflow-hidden py-28 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,163,62,0.14),transparent_65%)]" />
      <Reveal stagger={0.1} className="container-ol relative flex flex-col items-center gap-6">
        <h2 className="max-w-3xl text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.08]">{title}</h2>
        {standfirst && <p className="max-w-xl text-cream/80">{standfirst}</p>}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Button href={href}>{label}</Button>
          {secondary && (
            <Button href={secondary.href} variant="secondary">
              {secondary.label}
            </Button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
