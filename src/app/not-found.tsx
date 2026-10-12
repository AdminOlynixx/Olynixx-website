import { Section } from "@/components/sections/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { NotFoundStar } from "@/components/sections/NotFoundStar";

export default function NotFound() {
  return (
    <Section theme="dark" className="relative overflow-hidden !pb-28 !pt-36 text-center md:!pt-44">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
        <NotFoundStar />
        <p className="eyebrow">Not found</p>
        <SplitHeading as="h1" text="This page is not on the map." className="text-[clamp(2.375rem,5.2vw,4rem)] leading-[1.05]" />
        <Reveal stagger={0.1} delay={0.4} className="flex flex-col items-center gap-8">
          <p className="max-w-xl text-cream/85">
            The Olynixx site is small on purpose. Four doors. One engine. Start where you belong.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/corporates">Corporates</Button>
            <Button href="/gyms" variant="secondary">Gyms &amp; Spas</Button>
            <Button href="/individuals" variant="secondary">Individuals</Button>
            <Button href="/praxis" variant="secondary">Certification</Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
