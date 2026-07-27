import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const v2Skills = defineCollection({
  loader: glob({ pattern: "skills.md", base: "./src/content/v2" }),
  schema: z.object({
    skills: z.array(
      z.object({
        category: z.string(),
        items: z.array(z.string()).min(1),
      }),
    ),
  }),
});
