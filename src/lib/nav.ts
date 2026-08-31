export const PRIMARY_NAV = [
  { href: "/", label: "Home" },
  { href: "/praxis", label: "Praxis" },
  { href: "/gyms", label: "Gyms, Clubs & Spas" },
  {
    href: "/corporates",
    label: "Corporates",
    children: [
      { href: "/corporates", label: "Preventive health" },
      { href: "/corporates/events", label: "Events & keynotes" },
      { href: "/corporates/government", label: "Government" },
    ],
  },
  { href: "/individuals", label: "Individuals" },
  { href: "/technology", label: "Technology" },
  { href: "/about", label: "About" },
] as const;

export const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/company/olynixx", label: "LinkedIn" },
  { href: "https://www.instagram.com/olynixx", label: "Instagram" },
  { href: "https://x.com/olynixx", label: "X" },
  { href: "https://www.youtube.com/@olynixx", label: "YouTube" },
] as const;

export const FOOTER_NAV = {
  doors: [
    { href: "/gyms", label: "Gyms, clubs & spas" },
    { href: "/corporates", label: "Corporates" },
    { href: "/praxis", label: "Praxis" },
    { href: "/technology", label: "Technology" },
  ],
  individuals: [
    { href: "/individuals", label: "Overview" },
    { href: "/individuals/corporate-athlete", label: "Corporate athlete" },
    { href: "/individuals/sport-athlete", label: "Sport athlete" },
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
  { href: "/corporates/government", label: "Government" },
] as const;

export const INDIVIDUAL_DOORS = [
  { href: "/individuals/corporate-athlete", label: "Corporate athlete" },
  { href: "/individuals/sport-athlete", label: "Sport athlete" },
  { href: "/individuals/longevity", label: "Longevity" },
] as const;
