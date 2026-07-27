import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const v2Certifications = defineCollection({
  loader: glob({ pattern: "certifications.md", base: "./src/content/v2" }),
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
