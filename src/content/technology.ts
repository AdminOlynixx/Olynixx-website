/** Build Pack V2 §9. Six-field device module. No partner named until the agreement allows it. */

export type DeviceStatus = "Operating" | "In pilot" | "In evaluation";

export type Device = {
  name: string;
  role: string;
  bullets: readonly string[];
  where: string;
  status: DeviceStatus;
  imageLabel: string;
};

export const TECHNOLOGY = {
  metaTitle: "Technology & devices — the hardware behind the numbers — Olynixx",
  metaDescription:
    "108 physiological data points resolved into one readiness status. Professional, field-proven, entirely non-medical. Hosted in the UAE.",
  eyebrow: "Technology & devices",
  heroTitle: "The hardware behind the numbers.",
  standfirst:
    "Every Olynixx programme — a club, a company, an individual — runs on the same measurement layer. Professional, field-proven, entirely non-medical. The method is ours; the hardware serves it, and it changes when something better arrives.",
  measureEyebrow: "The measurement",
  measureTitle: "108 data points. One status.",
  measure: [
    "A readiness test captures 108 physiological data points in about a minute. Our own multi-factor model resolves them into one functional readiness status — a single answer to a single question: what can this body absorb today?",
    "That number is what a coach acts on, what an employee sees in their report, and what a leadership dashboard aggregates. Everything else on this page exists to produce it reliably.",
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
      imageLabel: "MS Fit kiosk — photograph pending",
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
      imageLabel: "Oxyterra session — photograph pending",
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
      imageLabel: "MuscleLab diagnostics — photograph pending",
    },
  ] satisfies readonly Device[],
  reserved:
    "New partners are added here as they sign, using the same six fields and the correct status label. Nothing appears before the agreement permits it.",
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
