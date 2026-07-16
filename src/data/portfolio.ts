export type NavItem = {
  label: string;
  href: `#${string}`;
};

export const navItems: NavItem[] = [
  { label: "Hero", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Work Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
