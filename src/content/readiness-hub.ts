/** Shared Readiness Hub. Corporates and Gyms. */

export const READINESS_HUB = {
  eyebrow: "The Readiness Hub",
  title: "Base, Advanced, Complete.",
  intro:
    "A hub is the installed system: the kiosk, the protocol, the reporting, and the people who can read it. A hub is for operators who will actually run the cycle, not a machine in the lobby for a photograph.",
  tiers: [
    {
      title: "Base",
      body: "MS Fit readiness testing on your floor. One-minute tests, individual reports, anonymised leadership view for companies. The measurement backbone.",
    },
    {
      title: "Advanced",
      body: "Base, plus MuscleLab performance testing and cognitive modules: reaction, working memory, decision speed under fatigue.",
    },
    {
      title: "Complete",
      body: "Advanced, plus altitude training, steered recovery systems, and certified coaches delivering the cycle on site.",
    },
  ],
} as const;
