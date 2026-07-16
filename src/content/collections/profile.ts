import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

export const profile = defineCollection({
  loader: glob({ pattern: "profile.md", base: "./src/content" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    email: z.email(),
    phone: z.string(),
    location: z.string(),
    photo: z.string(),
    heroPhoto: z.string(),
    github: z.url(),
    linkedin: z.string(),
  }),
});
