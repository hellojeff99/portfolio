// 공통 데이터 re-export
export { profile }        from "@/lib/common/profile";
export { skills }         from "@/lib/common/skills";
export { educations }     from "@/lib/common/education";
export { certifications } from "@/lib/common/certifications";

// 타입 re-export
export type { Profile }       from "@/lib/common/profile";
export type { SkillCategory } from "@/lib/common/skills";
export type { Education }     from "@/lib/common/education";
export type { Certification } from "@/lib/common/certifications";
export type { Project, WorkProject, PinnedProject, OtherProject } from "@/lib/common/project";

// 포트폴리오 전용
export { feed }     from "@/lib/home/feed";
export { navItems } from "@/lib/home/nav";
export type { NavItem } from "@/lib/home/nav";