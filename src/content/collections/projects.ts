import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection, type CollectionEntry } from 'astro:content';
import { compareIds } from './experience.ts';
import { highlightSchema } from './highlightScheam.ts';

const PROJECT_CATEGORIES = ['featured', 'project'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

const projectSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  role: z.string(),
  type: z.string(),
  period: z.string(),
  github: z.string().optional(),
  highlights: z.array(highlightSchema).min(1),
  stack: z.array(z.string()).optional(),
});

export const projects = defineCollection({
  loader: glob({
    pattern: '**/[0-9][0-9]-*/index.md',
    base: './src/content/experience/projects',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: projectSchema.extend({
    category: z.enum(PROJECT_CATEGORIES),
  }),
});

export type ProjectEntry = CollectionEntry<'projects'>;

export type ProjectGroups = Record<ProjectCategory, ProjectEntry[]>;

function createEmptyProjectGroups(): ProjectGroups {
  return {
    featured: [],
    project: [],
  };
}

export function getProjectCategory(id: string): ProjectCategory {
  const category = id.split('/')[0];
  return category === 'featured' ? 'featured' : 'project';
}

export function groupProjectEntries(entries: ProjectEntry[]): ProjectGroups {
  return [...entries]
    .sort((first, second) => compareIds(first.id, second.id))
    .reduce<ProjectGroups>((groups, entry) => {
      const category = getProjectCategory(entry.id);
      groups[category].push(entry);
      return groups;
    }, createEmptyProjectGroups());
}
