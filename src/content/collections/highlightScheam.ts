import {z} from "astro/zod";

export const highlightSchema = z.union([
    z.string(),
    z.object({
        title: z.string(),
        subtasks: z.array(z.string()).optional(),
    }),
]);

export type Highlight = z.infer<typeof highlightSchema>;

export function getHighlightTitle(highlight: Highlight): string {
    return typeof highlight === "string" ? highlight : highlight.title;
}