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

const projectFields = {
  title: z.string(),
  subtitle: z.string().optional(),
  meta: z.string().optional(),
  period: z.string(),
  github: z.string().url(),
  tasks: z.array(task).min(1),
  stack: z.array(z.string()).optional(),
};

export const projects = defineCollection({
  loader: glob({
    pattern: "**/[0-9][0-9]-*.md",
    base: "./src/content/projects",
  }),
  schema: z.object({
    kind: z.enum(["work", "pinned", "other", "activity"]),
    ...projectFields,
  }),
});
