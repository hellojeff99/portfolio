import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

export const info = defineCollection({
  loader: glob({ pattern: "info.md", base: "./src/content/" }),
  schema: z.object({
    info: z.object({
      name: z.string(),
      engName: z.string(),
      romanName: z.string(),
      birthDate: z.string().optional(),
      role: z.string(),
      summary: z.string(),
      email: z.string(),
      location: z.string(),
      links: z.object({
        github: z.url(),
      }),
      education: z.object({
        school: z.string(),
        major: z.string().nullable(),
        sub: z.string().optional(),
      }),
    }),
    skills: z.record(z.string(), z.array(z.string()).min(1)),
  }),
});
