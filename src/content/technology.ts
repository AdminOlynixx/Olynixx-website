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
    "Every Olynixx programme, a club, a company or an individual, runs on the same measurement layer. Professional, field-proven, operated in non-medical settings. The method is ours; the hardware serves it, and it changes when something better arrives.",
  reservedEyebrow: "The stack",
  reservedTitle: "The systems we operate",
  reserved:
    "Status labels tell you what is live, in evaluation, or in development. Nothing is named as a partner until the agreement permits it.",
  measureEyebrow: "The measurement",
  measureTitle: "Four technologies. One status.",
  measure: [
    "A kiosk test takes about a minute. Four technologies: multi-frequency bioimpedance, heart-rate variability, galvanic skin response and digital pulse wave. They produce 52 indicators from more than a hundred raw measurements. Our model resolves that into one functional status: which system is the constraint today, nervous, cardiovascular or metabolic.",
    "That status is what a coach acts on, what an employee sees in their report, and what a leadership dashboard aggregates. Everything else on this page exists to produce it reliably.",
  ],
  principleEyebrow: "The principle",
  principleTitle: "Systems, not boxes.",
  principle:
    "Olynixx is the regional agent for the systems on this page. And still, nobody here will sell you a box. Every system we sell or rent arrives inside a measured protocol: readiness tested before, adaptability verified after, people trained to read the numbers. A box changes nothing. A system, measured, does. That is the difference between a device catalogue and this page.",
  systemsCta: "Ask about systems",
  ownTitle: "Own the system.",
  ownBody:
    "The testing, training and recovery systems on this page are available through Olynixx. For clubs, companies and private homes. Always with installation, training and a measurement protocol around them. Tell us the floor it is for, and we bring the numbers that prove it earns its place.",
  sensorName: "The Olynixx Sensor: daily readiness",
  sensorStatus: "in deployment",
  sensorBody:
    "A three-minute morning measurement of the two command systems of performance: brain and heart. The sensor reads the central nervous system directly, DC potential, the deep electrical baseline of readiness, alongside heart-rate variability. Not steps, not sleep scores: the state of the systems that decide what today's training, work and recovery should be. First cohorts run from the end of September, inside Olynixx programmes.",
  firstGulfTitle: "First in the Gulf.",
  firstGulfBody:
    "Direct measurement of the nervous system, DC potential, has guided Olympic sport and special forces preparation for decades. It has never been offered in the Gulf. Olynixx brings it here first, as exclusive agent for the region, not to sell boxes, but to put deeper numbers under every programme and system we deliver.",
  poweredBy: "",
  bestName: "B-E-St microcurrent recovery",
  bestStatus: "from Q4",
  bestBody:
    "Professional bio-energy stimulation technology, used by international sports teams. The recovery half of the readiness equation, delivered as hardware. Prescribed inside Olynixx programmes from each person's test results. On the corporate floor, in the gym recovery zone, in the travel bag. Testing decides the dose; the retest verifies it. Available through Olynixx in the Gulf region: inside programmes, as rentals, and as systems.",
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
      role: "Intermittent hypoxic training: altitude, delivered at sea level. Controlled low-oxygen breathing sessions train the body's oxygen delivery and recovery systems. The strongest training system we operate. We measure readiness before and after every block: the response is verified, not assumed. Olynixx is the Oxyterra agent for the UAE. The system runs inside our programmes, and clubs, companies and individuals can acquire it through Olynixx, deployed the only way we deploy anything: tested before, verified after.",
      bullets: [
        "Altitude delivered at sea level.",
        "Readiness measured before and after every block.",
        "Available through Olynixx for clubs, companies and individuals.",
      ],
      where: "Programmes, clubs, companies and private homes",
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
      role: "Reaction speed, working memory and decision speed under fatigue. Measured on the same floor as the body.",
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
      role: "In evaluation against the method. Recovery and readiness support only. No condition names, no therapy claims.",
      bullets: [
        "Trialled where the method asks for a recovery input we can retest.",
        "Status stays in evaluation until it earns its place with numbers.",
        "Not offered as a medical treatment.",
      ],
      where: "Evaluation sites only",
      status: "In evaluation",
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
