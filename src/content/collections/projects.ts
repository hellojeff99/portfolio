import { defineCollection, type CollectionEntry } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projectTaskSchema = z.union([
  z.string(),
  z.object({
    title: z.string(),
    subtasks: z.array(z.string()).optional(),
  }),
]);

export type ProjectTask = z.infer<typeof projectTaskSchema>;

const optionalUrl = z.preprocess(
  (value) =>
    value == null || (typeof value === "string" && value.trim() === "")
      ? undefined
      : value,
  z.string().trim().url().optional(),
);

const projectFields = {
  title: z.string(),
  subtitle: z.string().optional(),
  role: z.string(),
  "team-size": z.string(),
  meta: z.string().optional(),
  period: z.string(),
  github: optionalUrl,
  contributions: z.array(projectTaskSchema).min(1),
  highlights: z.array(projectTaskSchema).min(1),
  stack: z.array(z.string()).optional(),
};

export const projects = defineCollection({
  loader: glob({
    pattern: "**/[0-9][0-9]-*.md",
    base: "./src/content/career",
  }),
  schema: z.object(projectFields),
});

export type ProjectCategory = "work" | "featured" | "project" | "experience";
export type ProjectEntry = CollectionEntry<"projects">;
export type ProjectGroups = Record<ProjectCategory, ProjectEntry[]>;
export type ProjectSummary = ProjectEntry["data"] & {
  id: string;
  detailHref: string | undefined;
};

type ProjectCategoryMeta = {
  label: string;
  backHref: string;
  backLabel: string;
};

export const PROJECT_CATEGORY_META = {
  work: {
    label: "Work Experience",
    backHref: "/#work",
    backLabel: "경력 목록으로 돌아가기",
  },
  featured: {
    label: "Featured Project",
    backHref: "/#projects",
    backLabel: "프로젝트 목록으로 돌아가기",
  },
  project: {
    label: "Project",
    backHref: "/#projects",
    backLabel: "프로젝트 목록으로 돌아가기",
  },
  experience: {
    label: "Experience",
    backHref: "/resume#experience",
    backLabel: "경험 목록으로 돌아가기",
  },
} satisfies Record<ProjectCategory, ProjectCategoryMeta>;

export function getProjectCategory(id: string): ProjectCategory {
  const [section, subsection] = id.split("/");

  if (section === "work") return "work";
  if (section === "experience") return "experience";
  if (section === "projects" && subsection === "featured") return "featured";
  if (section === "projects") return "project";

  throw new Error(`Unknown project category: ${id}`);
}

export function getProjectSlug(id: string): string {
  return id.startsWith("projects/") ? id.slice("projects/".length) : id;
}

export function getProjectCategoryMeta(id: string): ProjectCategoryMeta {
  return PROJECT_CATEGORY_META[getProjectCategory(id)];
}

export function compareProjectIds(firstId: string, secondId: string): number {
  const firstFilename = firstId.split("/").at(-1) ?? firstId;
  const secondFilename = secondId.split("/").at(-1) ?? secondId;

  return secondFilename.localeCompare(firstFilename, undefined, {
    numeric: true,
  });
}

export function groupProjectEntries(entries: ProjectEntry[]): ProjectGroups {
  const groups: ProjectGroups = {
    work: [],
    featured: [],
    project: [],
    experience: [],
  };

  [...entries]
    .sort((first, second) => compareProjectIds(first.id, second.id))
    .forEach((entry) => {
      groups[getProjectCategory(entry.id)].push(entry);
    });

  return groups;
}

export function toProjectSummary({
  id,
  data,
  body,
}: ProjectEntry): ProjectSummary {
  return {
    id,
    ...data,
    detailHref: body?.trim() ? `/projects/${getProjectSlug(id)}` : undefined,
  };
}
