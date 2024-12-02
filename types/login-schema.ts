import { z } from "zod";

// Define the input schema for the login form

// Regular expression for password validation (at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)
const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordValidation,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export type LoginSchema = z.infer<typeof loginSchema>;
