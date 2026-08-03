import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, type CollectionEntry } from "astro:content";

const PROJECT_CATEGORIES = [
  "work",
  "featured",
  "project",
  "experience",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

const taskSchema = z.union([
  z.string(),
  z.object({
    title: z.string(),
    subtasks: z.array(z.string()).optional(),
  }),
]);

export type Task = z.infer<typeof taskSchema>;

const optionalUrlSchema = z.preprocess(
  (value) => {
    if (value == null) {
      return undefined;
    }

    if (typeof value === "string" && value.trim() === "") {
      return undefined;
    }

    return value;
  },
  z.string().trim().url().optional(),
);

const projectSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  role: z.string(),
  type: z.enum(["개인프로젝트", "팀프로젝트"]).optional(),
  "team-size": z.string(),
  meta: z.string().optional(),
  period: z.string(),
  github: optionalUrlSchema,
  contributions: z.array(taskSchema).min(1),
  highlights: z.array(taskSchema).min(1),
  stack: z.array(z.string()).optional(),
});

export const v2Projects = defineCollection({
  loader: glob({
    pattern: "**/[0-9][0-9]-*.md",
    base: "./src/content/v2/experience",
  }),
  schema: projectSchema,
});

export type ProjectEntry = CollectionEntry<"v2Projects">;

export type ProjectGroups = Record<ProjectCategory, ProjectEntry[]>;

export type ProjectSummary = ProjectEntry["data"] & {
  id: string;
  detailHref: string | undefined;
};

export type ProjectCategoryMeta = {
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

function createEmptyProjectGroups(): ProjectGroups {
  return {
    work: [],
    featured: [],
    project: [],
    experience: [],
  };
}

function getProjectFilename(id: string): string {
  return id.split("/").at(-1) ?? id;
}

export function getProjectCategory(id: string): ProjectCategory {
  const [section, subsection] = id.split("/");

  switch (section) {
    case "career":
      return "work";

    case "activity":
      return "experience";

    case "project":
      return subsection === "featured" ? "featured" : "project";

    default:
      throw new Error(`Unknown project category: ${id}`);
  }
}

export function getProjectSlug(id: string): string {
  const projectPrefix = "project/";

  return id.startsWith(projectPrefix)
    ? id.slice(projectPrefix.length)
    : id;
}

export function getProjectCategoryMeta(
  id: string,
): ProjectCategoryMeta {
  return PROJECT_CATEGORY_META[getProjectCategory(id)];
}

export function compareProjectIds(
  firstId: string,
  secondId: string,
): number {
  return getProjectFilename(secondId).localeCompare(
    getProjectFilename(firstId),
    undefined,
    { numeric: true },
  );
}

export function groupProjectEntries(
  entries: ProjectEntry[],
): ProjectGroups {
  return [...entries]
    .sort((first, second) => compareProjectIds(first.id, second.id))
    .reduce<ProjectGroups>((groups, entry) => {
      const category = getProjectCategory(entry.id);

      groups[category].push(entry);

      return groups;
    }, createEmptyProjectGroups());
}

export function toProjectSummary({
  id,
  data,
  body,
}: ProjectEntry): ProjectSummary {
  const hasDetailContent = Boolean(body?.trim());

  return {
    id,
    ...data,
    detailHref: hasDetailContent
      ? `/projects/${getProjectSlug(id)}`
      : undefined,
  };
}
