import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const task = z.union([
  z.string(),
  z.object({
    title: z.string(),
    subtasks: z.array(z.string()).optional(),
  }),
]);

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
  meta: z.string().optional(),
  period: z.string(),
  github: optionalUrl,
  tasks: z.array(task).min(1),
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

export function compareProjectIds(firstId: string, secondId: string): number {
  const firstFilename = firstId.split("/").at(-1) ?? firstId;
  const secondFilename = secondId.split("/").at(-1) ?? secondId;

  return firstFilename.localeCompare(secondFilename, undefined, {
    numeric: true,
  });
}
