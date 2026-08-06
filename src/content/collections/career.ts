import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection, type CollectionEntry } from 'astro:content';
import { compareIds } from './experience.ts';
import { highlightSchema } from './highlightScheam.ts';

const careerSchema = z.object({
  title: z.string(),
  company: z.string(),
  role: z.string(),
  period: z.string(),
  highlights: z.array(highlightSchema).min(1),
  stack: z.array(z.string()).optional(),
});

export const career = defineCollection({
  loader: glob({
    pattern: '**/[0-9][0-9]-*/index.md',
    base: './src/content/experience/career',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: careerSchema,
});

export type CareerEntry = CollectionEntry<'career'>;

export type CareerGroups = CareerEntry[];

function createEmptyCareerGroups(): CareerGroups {
  return [];
}

export function groupProjectEntries(entries: CareerEntry[]): CareerGroups {
  return [...entries]
    .sort((first, second) => compareIds(first.id, second.id))
    .reduce<CareerGroups>((groups, entry) => {
      groups.push(entry);
      return groups;
    }, createEmptyCareerGroups());
}
