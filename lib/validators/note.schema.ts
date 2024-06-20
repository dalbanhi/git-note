import { z } from "zod";

const noteTypeSchema = z.enum(["workflow", "knowledge", "component"], {
  errorMap: (issue, ctx) => ({ message: "Please pick a type for your note!" }),
});

const stepsToFollowSchema = z.object({
  value: z
    .string()
    .min(2, "Your step to follow must be at least 2 characters long"),
});

const whatYouLearnedSchema = z.object({
  value: z
    .string()
    .min(2, "What you learned must be at least 2 characters long"),
});

const tagsSchema = z.object({
  label: z.string().min(2, "Tag must be at least 2 characters long"),
  value: z.string().min(2, "Tag must be at least 2 characters long"),
});

export const NoteSchema = z.object({
  title: z
    .string()
    .min(1, "Title should be at least one character long!")
    .max(100, "Your title can't be longer than 100 characters!"),
  description: z
    .string()
    .min(1, "Description should be at least one character long")
    .max(300, "Description can't be longer than 300 characters!"),
  stars: z.number().int().default(0),
  views: z.number().int().default(0),
  type: noteTypeSchema,
  tags: z.array(tagsSchema).min(0),
  content: z.string().min(1, "Content must be at least one character long!"),
  resourcesAndLinks: z.array(
    z.object({
      resource: z
        .string()
        .min(1, "Your resource must have a label of at least 1 character")
        .max(100),
      url: z.string().url(),
    })
  ),
  code: z.string().min(2, "Code must be at least 2 characters long").optional(),
  stepsToFollow: z
    .array(stepsToFollowSchema)
    .min(1, "You must have at least one step to follow")
    .optional(),
  whatYouLearned: z
    .array(whatYouLearnedSchema)
    .min(1, "You must have at least one thing you learned!")
    .optional(),
});
