import { z } from "zod";

const noteTypeSchema = z.enum(["workflow", "knowledge", "component"]);

export const NoteSchema = z.object({
  title: z.string().nonempty().min(1).max(100),
  type: noteTypeSchema,
  tags: z.array(z.string().nonempty().min(1).max(100)),
  description: z.string().nonempty().min(1).max(100),
  createdAt: z.date(),
  creator: z.string().nonempty().min(1).max(100),
  stars: z.number().int().default(0),
  views: z.number().int().default(0),
  code: z
    .string()
    .nonempty()
    .min(1)
    .max(100)
    .optional()
    .or(z.string().length(0)),
  learnings: z.array(z.string().nonempty().min(1).max(100)),
  stepsToFollow: z.array(z.string().nonempty().min(1).max(100)),
  content: z.string().nonempty().min(1),
  resourcesAndLinks: z.array(
    z.object({
      resource: z.string().nonempty().min(1).max(100),
      url: z.string().nonempty().min(1).max(100),
    })
  ),
  relatedNotes: z.array(z.string().nonempty().min(1).max(100)),
});
