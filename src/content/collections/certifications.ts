import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const certifications = defineCollection({
  loader: glob({ pattern: "certifications.md", base: "./src/content" }),
  schema: z.object({
    certifications: z.array(
      z.object({
        name: z.string(),
        issuer: z.string(),
        date: z.string().regex(/^\d{4}\.\d{2}$/),
      }),
    ),
  }),
});
