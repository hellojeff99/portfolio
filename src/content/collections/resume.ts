import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

export const v2Resume = defineCollection({
  loader: glob({ pattern: "resume.md", base: "./src/content/" }),
  schema: z.object({
    info: z.object({
      name: z.string(),
      engName: z.string(),
      romanName: z.string(),
      birthDate: z.string().optional(),
      role: z.string(),
      summary: z.string(),
      bio: z.array(z.string().min(1)).min(1),
      email: z.string(),
      phone: z.string(),
      location: z.string(),
      photo: z.string(),
      links: z.object({
        github: z.url(),
        portfolio: z.string(),
      }),
    }),
    desiredTreatment: z.object({
      finalSalary: z.string(),
      desiredSalary: z.string(),
      desiredPosition: z.string(),
      desiredRole: z.string(),
      availableStartDate: z.string(),
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
    awards: z.array(
      z.object({
        name: z.string(),
        issuer: z.string(),
        result: z.string(),
        date: z.string().regex(/^\d{4}\.\d{2}$/),
      }),
    ),
    languages: z.array(
      z.object({
        language: z.string(),
        name: z.string(),
        issuer: z.string(),
        score: z.string(),
        date: z.string().regex(/^\d{4}\.\d{2}$/),
      }),
    ),
    skills: z.record(z.string(), z.array(z.string()).min(1)),
  }),
});
