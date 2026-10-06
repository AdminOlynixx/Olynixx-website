import { Reveal } from "@/components/motion/Reveal";

const FACT_LABELS: Record<string, string> = {
  format: "Format",
  duration: "Duration",
  location: "Location",
  language: "Language",
  cohort: "Cohort",
  hours: "Hours",
  dates: "Dates",
  fee: "Fee",
  exam: "Exam",
};

/** Renders nothing while every value is empty. */
export function PraxisCourseFacts({ facts }: { facts: Readonly<Record<string, string>> }) {
  const filled = Object.entries(facts).filter(([, v]) => v.trim().length > 0);
  if (filled.length === 0) return null;
  return (
    <Reveal as="dl" stagger={0.06} className="divide-y divide-rule border-y border-rule">
      {filled.map(([k, v]) => (
        <div key={k} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr]">
          <dt className="eyebrow">{FACT_LABELS[k] ?? k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </Reveal>
  );
}
