import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const v2Resume = defineCollection({
  loader: glob({ pattern: "resume.md", base: "./src/content/v2" }),
  schema: z.object({
    info: z.object({
      name: z.string(),
      engName: z.string(),
      birthDate: z.string().optional(),
      role: z.string(),
      summary: z.string(),
      bio: z.array(z.string().min(1)).min(1),
      email: z.email(),
      phone: z.string(),
      location: z.string(),
      photo: z.string(),
      links: z.object({
        github: z.url(),
      }),
    }),
    educations: z.array(
      z.object({
        school: z.string(),
        major: z.string().nullable(),
        sub: z.string().optional(),
        gpa: z.string().nullable(),
        period: z.string(),
      }),
    ),
    certifications: z.array(
      z.object({
        name: z.string(),
        issuer: z.string(),
        date: z.string().regex(/^\d{4}\.\d{2}$/),
      }),
    ),
    languages: z.array(
      z.object({
        language: z.string(),
        test: z.string(),
        issuer: z.string(),
        score: z.string(),
        date: z.string().regex(/^\d{4}\.\d{2}$/),
      }),
    ),
    skills: z.record(z.string(), z.array(z.string()).min(1)),
  }),
});
