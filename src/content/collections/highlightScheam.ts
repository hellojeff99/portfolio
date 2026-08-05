import { z } from "astro/zod";

export const highlightSchema = z.union([
    z.string(),
    z.object({
        title: z.string(),
        sub: z.array(z.string()).optional(),
    }),
]);

export type Highlight = z.infer<typeof highlightSchema>;

