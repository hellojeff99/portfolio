import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, type CollectionEntry } from "astro:content";
import {taskSchema} from "./taskScheam.ts";

const projectSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  meta: z.string(),
  period: z.string(),
  highlights: z.array(taskSchema).min(1),
  stack: z.array(z.string()).optional(),
});

export const career = defineCollection({
  loader: glob({
    pattern: "**/[0-9][0-9]-*.md",
    base: "./src/content/experience/career",
  }),
  schema: projectSchema,
});

export type ProjectEntry = CollectionEntry<"career">;

export type ProjectGroups = ProjectEntry[];

export type ProjectSummary = ProjectEntry["data"] & {
  id: string;
  detailHref: string | undefined;
};

function createEmptyProjectGroups(): ProjectGroups {
  return [];
}

function getProjectFilename(id: string): string {
  return id.split("/").at(-1) ?? id;
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
      groups.push(entry);
      return groups;
    }, createEmptyProjectGroups());
}