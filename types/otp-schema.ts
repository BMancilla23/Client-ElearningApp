import { z } from "zod";

export const otpSchema = z
  .object({
    otp: z
      .string()
      .min(6, "OTP must be at least 6 characters")
      .regex(/^\d+$/, "El código OTP debe contener solo números"),
  })
  .required();

export type OtpSchema = z.infer<typeof otpSchema>;
