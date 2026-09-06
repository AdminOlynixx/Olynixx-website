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

export function CourseFacts({
  facts,
}: {
  facts: Readonly<Record<string, string>>;
}) {
  const filled = Object.entries(facts).filter(([, value]) => value.trim().length > 0);
  if (filled.length === 0) return null;

  return (
    <dl className="ol-facts">
      {filled.map(([key, value]) => (
        <div key={key} className="ol-facts__row">
          <dt>{FACT_LABELS[key] ?? key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
