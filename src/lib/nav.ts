export const PRIMARY_NAV = [
  { href: "/", label: "Home" },
  {
    href: "/corporates",
    label: "Corporates",
    children: [
      { href: "/corporates", label: "Preventive health" },
      { href: "/corporates/events", label: "Events & keynotes" },
      { href: "/corporates/government", label: "Government & public sector" },
    ],
  },
  { href: "/gyms", label: "Gyms, clubs & spas" },
  {
    href: "/individuals",
    label: "Individuals",
    children: [
      { href: "/individuals", label: "Overview" },
      { href: "/individuals/corporate-athlete", label: "Corporate athlete" },
      { href: "/individuals/sport-athlete", label: "Sport athlete" },
      { href: "/individuals/longevity", label: "Longevity" },
    ],
  },
  { href: "/praxis", label: "Praxis" },
  { href: "/technology", label: "Technology" },
  { href: "/about", label: "About" },
] as const;

export const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/company/olynixx", label: "LinkedIn" },
] as const;

export const FOOTER_NAV = {
  doors: [
    { href: "/corporates", label: "Corporates" },
    { href: "/gyms", label: "Gyms, clubs & spas" },
    { href: "/individuals", label: "Individuals" },
    { href: "/praxis", label: "Praxis" },
    { href: "/technology", label: "Technology" },
  ],
  individuals: [
    { href: "/individuals", label: "Overview" },
    { href: "/individuals/corporate-athlete", label: "Corporate athlete" },
    { href: "/individuals/sport-athlete", label: "Sport athlete" },
    { href: "/individuals/longevity", label: "Longevity" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/about#book", label: "The book" },
    { href: "/contact", label: "Contact" },
    { href: "/governance", label: "Governance" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;

export const CORP_SUBNAV = [
  { href: "/corporates", label: "Preventive health" },
  { href: "/corporates/events", label: "Events & keynotes" },
  { href: "/corporates/government", label: "Government & public sector" },
] as const;

export const INDIVIDUAL_DOORS = [
  { href: "/individuals/corporate-athlete", label: "Corporate athlete" },
  { href: "/individuals/sport-athlete", label: "Sport athlete" },
  { href: "/individuals/longevity", label: "Longevity" },
] as const;
