import { z } from "zod";

export const UserFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .optional()
    .or(z.literal("")),
});
