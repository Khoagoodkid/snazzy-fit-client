import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" })
  .max(20, { message: "Password must be less than 20 characters" })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message:
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
    }
  );

export const loginSchema = z.object({
  email: z.string().email("Email is not valid"),
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    username: z
      .string()
        .min(3, { message: "Username must be at least 3 characters" })
      .max(50, { message: "Username must be less than 50 characters" })
      .regex(/^[\p{L}0-9 ]+$/u, {
        message: "Username must contain only letters, numbers and spaces",
      })
      .nonempty({ message: "Username is required" }),
    email: z.string().email({ message: "Email is not valid" }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Email is not valid" }),
});
