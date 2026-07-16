import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const educations = defineCollection({
  loader: glob({ pattern: "educations.md", base: "./src/content" }),
  schema: z.object({
    educations: z.array(
      z.object({
        school: z.string(),
        major: z.string().nullable(),
        sub: z.string().optional(),
        gpa: z.string().nullable(),
        period: z.string(),
      }),
    ),
  }),
});
