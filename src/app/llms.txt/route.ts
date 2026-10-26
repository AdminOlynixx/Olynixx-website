import { siteUrl } from "@/lib/site-config";

export const dynamic = "force-static";

/** /llms.txt: a short, plain summary of the site for AI crawlers and answer engines. Uses only wording already on the site. */
export function GET() {
  const base = siteUrl();
  const page = (path: string, label: string, note: string) => `- [${label}](${base}${path}): ${note}`;

  const body = `# Olynixx

> Olynixx is a preventive readiness system for workforces, clubs and individuals in the UAE. A one-minute test, a personal report the same day, and a retest that shows whether it moved. Readiness + Recovery = Perform.

Olynixx measures how much the body can absorb today, acts on what holds it back, and measures again. It gives lifestyle guidance, not a diagnosis or treatment. Data is hosted in the UAE. ISO 27001, 45001 and 45003 certification is in progress and not yet certified.

## Programmes
${page("/corporates", "Corporates", "Workforce readiness testing on site, with a 12-week pilot and KPIs agreed before the first test.")}
${page("/corporates/events", "Events and keynotes", "A readiness testing kiosk and the Rest Is the New Sport keynote at company events.")}
${page("/corporates/government", "Government and public sector", "Readiness programmes for public-sector workforces, anonymised at cohort level.")}
${page("/gyms", "Gyms, clubs and spas", "Licensed testing system for clubs and recovery facilities.")}
${page("/spas", "Spas", "Guest readiness testing at arrival for spas and recovery facilities.")}
${page("/individuals", "Individuals", "Personal readiness testing and coaching, with a free intake call.")}
${page("/individuals/everyday-health", "Everyday health", "One test and a simple plan for people who are tired, want to lose weight or want to feel better.")}
${page("/individuals/corporate-athlete", "Corporate athlete", "Readiness testing for professionals and leaders under work load.")}
${page("/individuals/sport-athlete", "Sport athlete", "Readiness and performance testing for competitive athletes.")}
${page("/praxis", "Olynixx Praxis", "Continuing education and certification for health professionals in the UAE.")}

## About and trust
${page("/about", "About", "The method, the team and the book Rest Is the New Sport.")}
${page("/technology", "Technology", "The testing and recovery systems Olynixx operates.")}
${page("/governance", "Governance", "Standards status, data handling and certification progress.")}

## Contact
${page("/contact", "Contact", "Contact form. Email info@olynixx.com, phone 058 599 7620, UAE.")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
