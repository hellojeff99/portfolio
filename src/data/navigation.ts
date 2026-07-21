export type NavItem = {
  label: string;
  href: `#${string}`;
};

export const portfolioNavItems: NavItem[] = [
  { label: "Hero", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const resumeNavItems: NavItem[] = [
  { label: "Profile", href: "#profile" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];
