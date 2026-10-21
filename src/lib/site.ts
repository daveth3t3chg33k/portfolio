/* Single source of truth for identity, routes and outbound links. */

export const site = {
  name: "Dave Kamirah",
  alias: "CodeSavant",
  role: "Full-stack engineer",
  email: "mburudave@gmail.com",
  phone: "+254 713 969 865",
  phoneHref: "tel:+254713969865",
  location: "Nairobi, Kenya — EAT+03",
  availability: "Open to work",
  startup: {
    name: "LoyalMini",
    href: "https://loyalmini.com",
    label: "loyalmini.com",
    tagline: "Loyalty that pays with M-PESA",
  },
  employer: {
    name: "Drift Consult",
    href: "https://www.rack.business/",
    product: "Rack",
  },
} as const;

export const navItems = [
  { index: "01", name: "Work", href: "/work" },
  { index: "02", name: "Stack", href: "/stack" },
  { index: "03", name: "About", href: "/about" },
  { index: "04", name: "Contact", href: "/contact" },
] as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/daveth3t3chg33k" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "X / Twitter", href: "https://x.com/" },
  { label: "Email", href: `mailto:${site.email}` },
] as const;

export function mailtoHref() {
  return `mailto:${site.email}`;
}
