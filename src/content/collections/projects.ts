import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, type CollectionEntry } from "astro:content";
import {highlightSchema} from "./highlightScheam.ts";

const PROJECT_CATEGORIES = [
  "featured",
  "project",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

const projectSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  role: z.string(),
  type: z.string(),
  period: z.string(),
  github: z.string().optional(),
  highlights: z.array(highlightSchema).min(1),
  stack: z.array(z.string()).optional(),
});

export const projects = defineCollection({
  loader: glob({
    pattern: "**/[0-9][0-9]-*.md",
    base: "./src/content/experience/projects",
  }),
  schema: projectSchema,
});

export type ProjectEntry = CollectionEntry<"projects">;

export type ProjectGroups = Record<ProjectCategory, ProjectEntry[]>;

export type ProjectSummary = ProjectEntry["data"] & {
  id: string;
  detailHref: string | undefined;
};

function createEmptyProjectGroups(): ProjectGroups {
  return {
    featured: [],
    project: [],
  };
}

function getProjectFilename(id: string): string {
  return id.split("/").at(-1) ?? id;
}

export function getProjectCategory(id: string): ProjectCategory {
  const subsection = id.split("/")[0];
  return subsection === "featured" ? "featured" : "project";
}

export function getProjectSlug(id: string): string {
  const projectPrefix = "/";

  return id.startsWith(projectPrefix)
    ? id.slice(projectPrefix.length)
    : id;
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
      ? `/${getProjectSlug(id)}`
      : undefined,
  };
}
