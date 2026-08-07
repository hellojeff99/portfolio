import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';

type ExperienceEntry =
  | CollectionEntry<'career'>
  | CollectionEntry<'projects'>;

const demoImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/experience/*/*/demo/[0-9][0-9]*.{png,jpg,jpeg,webp,avif,gif}',
);

const getDemoPrefix = (entry: ExperienceEntry) =>
  `/src/content/experience/${entry.collection}/${entry.id}/demo/`;

export function hasDemoImages(entry: ExperienceEntry): boolean {
  const prefix = getDemoPrefix(entry);

  return Object.keys(demoImages).some((path) =>
    path.startsWith(prefix),
  );
}

export async function getDemoImages(
  entry: ExperienceEntry,
): Promise<ImageMetadata[]> {
  const prefix = getDemoPrefix(entry);

  const entries = Object.entries(demoImages)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b));

  return Promise.all(
    entries.map(async ([, load]) => {
      const module = await load();
      return module.default;
    })
  );
}
function getDirName(id: string): string {
  return id.split('/').at(-1) ?? id;
}

export function compareIds(firstId: string, secondId: string): number {
  return getDirName(secondId).localeCompare(getDirName(firstId), undefined, {
    numeric: true,
  });
}
