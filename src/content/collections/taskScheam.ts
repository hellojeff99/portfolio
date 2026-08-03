import {z} from "astro/zod";

export const taskSchema = z.union([
    z.string(),
    z.object({
        title: z.string(),
        subtasks: z.array(z.string()).optional(),
    }),
]);

export type Task = z.infer<typeof taskSchema>;
