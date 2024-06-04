import { z } from "zod";

export const OnboardingFormSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .optional()
    .or(z.literal("")),
  portfolio: z.string().url().optional().or(z.literal("")),
});
