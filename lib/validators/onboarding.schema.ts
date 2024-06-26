import { z } from "zod";

const learningGoalsSchema = z.object({
  completed: z.boolean(),
  value: z.string().min(2, "Learning goal must be at least 2 characters long"),
});

const knowledgeSchema = z.object({
  value: z.string().min(2, "Knowledge Item must be at least 2 characters long"),
});

const techStackSchema = z.object({
  label: z
    .string()
    .min(2, "Tech Stack Item must be at least 2 characters long"),
  value: z
    .string()
    .min(2, "Tech Stack Item must be at least 2 characters long"),
});

export const OnboardingFormSchema = z.object({
  image: z.union([z.string().url(), z.string().length(0)]),
  name: z.string().min(2, "Full name must be at least 2 characters long"),

  portfolio: z
    .string()
    .url("Your portfolio must be a url with http or https")
    .or(z.string().length(0)),

  location: z
    .string()
    .min(2, "Location must be at least 2 characters long")
    .or(z.string().length(0)),

  learningGoals: z.array(learningGoalsSchema).min(0),

  knowledgeLevels: z.array(knowledgeSchema).min(0),

  techStack: z.array(techStackSchema).min(0),
  startDate: z.date().optional().or(z.literal(null)),

  endDate: z.date().optional().or(z.literal(null)),

  availability: z.boolean(),
});
