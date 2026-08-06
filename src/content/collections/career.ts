import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection, type CollectionEntry } from 'astro:content';
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
    pattern: '**/[0-9][0-9]-*.md',
    base: './src/content/experience/career',
  }),
  schema: careerSchema,
});

export type CareerEntry = CollectionEntry<'career'>;

export type CareerGroups = CareerEntry[];

function createEmptyCareerGroups(): CareerGroups {
  return [];
}

function getCareerFilename(id: string): string {
  return id.split('/').at(-1) ?? id;
}

export function compareCareerIds(firstId: string, secondId: string): number {
  return getCareerFilename(secondId).localeCompare(
    getCareerFilename(firstId),
    undefined,
    { numeric: true },
  );
}

export function groupProjectEntries(entries: CareerEntry[]): CareerGroups {
  return [...entries]
    .sort((first, second) => compareCareerIds(first.id, second.id))
    .reduce<CareerGroups>((groups, entry) => {
      groups.push(entry);
      return groups;
    }, createEmptyCareerGroups());
}
