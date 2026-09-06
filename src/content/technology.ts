/** Capability-first hardware. Status labels only. No partner named until signed. */

export type DeviceStatus = "Operating" | "In evaluation" | "In development";

export type Device = {
  name: string;
  role: string;
  bullets: readonly string[];
  where: string;
  status: DeviceStatus;
};

export const TECHNOLOGY = {
  metaTitle: "Readiness testing technology | Olynixx",
  metaDescription:
    "Professional testing and recovery systems resolved into one readiness status. Operated in non-medical settings. Hosted in the UAE.",
  eyebrow: "Technology & devices",
  heroTitle: "The hardware behind the numbers.",
  standfirst:
    "Every Olynixx programme — a club, a company, an individual — runs on the same measurement layer. Professional, field-proven, operated in non-medical settings. The method is ours; the hardware serves it, and it changes when something better arrives.",
  reservedEyebrow: "The stack",
  reservedTitle: "Nothing appears before the agreement permits it",
  reserved:
    "New partners are added here as they sign, using the same fields and the correct status label: operating, in evaluation, or in development.",
  measureEyebrow: "The measurement",
  measureTitle: "Four technologies. One status.",
  measure: [
    "A kiosk test takes about a minute. Four technologies — multi-frequency bioimpedance, heart-rate variability, galvanic skin response and digital pulse wave — produce 52 indicators from more than a hundred raw measurements. Our model resolves that into one functional status: which system is the constraint today — nervous, cardiovascular or metabolic.",
    "That status is what a coach acts on, what an employee sees in their report, and what a leadership dashboard aggregates. Everything else on this page exists to produce it reliably.",
  ],
  principleEyebrow: "The principle",
  principleTitle: "We are not a device company",
  principle:
    "Hardware improves, suppliers change, and a business built on one box is a business with one point of failure. The method, the model and the interpretation layer are ours; devices are selected against them and replaced when something measures better. That is why our clients buy a system rather than a machine — and it is why this page will look different next year.",
  devices: [
    {
      name: "MS Fit readiness kiosks",
      role: "The workhorse. A self-contained testing station that captures a full readiness profile in minutes.",
      bullets: [
        "Full readiness profile in minutes, no appointment.",
        "Self-contained station for clubs, offices and events.",
        "Operated and maintained by Olynixx across the fleet.",
      ],
      where: "Clubs, corporate floors, events",
      status: "Operating",
    },
    {
      name: "Oxyterra altitude training (IHT)",
      role: "Altitude delivered at sea level. Controlled low-oxygen sessions train oxygen delivery and recovery.",
      bullets: [
        "Intermittent hypoxic training at sea level.",
        "Readiness reading before and after the session.",
        "Response verified rather than assumed.",
      ],
      where: "Testing clubs and individual programmes",
      status: "Operating",
    },
    {
      name: "MuscleLab performance diagnostics",
      role: "Where most facilities estimate performance, we measure it.",
      bullets: [
        "Jump mechanics, dynamic and isometric strength.",
        "Speed, acceleration and ground-contact timing.",
        "Used in testing clubs and athlete programmes.",
      ],
      where: "Testing clubs and athlete programmes",
      status: "Operating",
    },
    {
      name: "Cognitive modules",
      role: "Reaction speed, working memory and decision speed under fatigue — measured on the same floor as the body.",
      bullets: [
        "Short modules, not a lab day.",
        "Read against the same readiness status.",
        "Used where the last minutes of a shift or a match are decided.",
      ],
      where: "Testing clubs, athlete programmes, selected corporate roles",
      status: "Operating",
    },
    {
      name: "Microcurrent",
      role: "In evaluation against the method. Recovery and readiness support only — no condition names, no therapy claims.",
      bullets: [
        "Trialled where the method asks for a recovery input we can retest.",
        "Status stays in evaluation until it earns its place with numbers.",
        "Not offered as a medical treatment.",
      ],
      where: "Evaluation sites only",
      status: "In evaluation",
    },
    {
      name: "CNS sensor",
      role: "A nervous-system reading layer in development. The partner is unnamed until the agreement permits it.",
      bullets: [
        "Built to sit inside the same one-status model.",
        "In development — not a live product line.",
        "Named here, not sold here, until it is operating.",
      ],
      where: "Development",
      status: "In development",
    },
  ] satisfies readonly Device[],
  dataEyebrow: "Data",
  dataTitle: "Hosted in the UAE, separated by design",
  data: "Test data is processed and hosted in the UAE. Individual results belong to the individual; corporate reporting is anonymised at the point of aggregation, not by a promise afterwards. Access is governed, logged and reviewed, and the environment sits inside our ISO 27001 certification track.",
  dashEyebrow: "Dashboards",
  dashTitle: "Two views, strictly separated",
  dash: [
    "The personal decision dashboard belongs to the individual: readiness profile, recovery trend, today's decision.",
    "The corporate dashboard shows leadership an anonymised workforce picture: readiness distribution, load patterns, direction of travel.",
    "Same engine. Separate data. By design.",
  ],
} as const;
