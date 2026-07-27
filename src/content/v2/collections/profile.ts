import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

export const v2Profile = defineCollection({
  loader: glob({ pattern: "profile.md", base: "./src/content/v2" }),
  schema: z.object({
    name: z.string(),
    engName: z.string(),
    birthDate: z.string().optional(),
    role: z.string(),
    summary: z.string(),
    bio: z.string(),
    email: z.email(),
    phone: z.string(),
    location: z.string(),
    photo: z.string(),
    heroPhoto: z.string(),
    github: z.url(),
  }),
});
