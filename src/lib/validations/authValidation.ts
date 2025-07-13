import { z } from "zod";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone?: string) => {
  if (!phone) return false;

  try {
    const cleaned = phone.replace(/\s+/g, "");
    const parsed = phoneUtil.parseAndKeepRawInput(cleaned);

    return phoneUtil.isValidNumber(parsed);
  } catch {
    return false;
  }
};

export const registerUserSchema = z
  .object({
    first_name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" })
      .regex(/^[\p{L}\s]+$/u, {
        message: "Name can only contain letters and spaces",
      }),

    last_name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" })
      .regex(/^[\p{L}\s]+$/u, {
        message: "Name can only contain letters and spaces",
      }),

    email: z.string().email({ message: "Invalid email, kindly retry." }),

    password: z
      .string()
      .min(8, {
        message: "Password must be between 8 and 24 characters in length",
      })
      .max(24, {
        message: "Password must be between 8 and 24 characters in length",
      })
      .regex(/(?=.*[a-z])(?=.*[A-Z])/, {
        message:
          "Password must contain one uppercase character (A-Z), one lowercase character (a-z)",
      })
      .regex(/\W|_/, {
        message: "Password must contain one special case character",
      })
      .regex(/\d/, {
        message: "Password must contain one number (0-9)",
      }),

    phoneNumber: z.string().refine(isPhoneValid, {
      message: "Invalid phone number",
    }),

    interest: z.enum(["Cars", "Music", "Sport"]),

    selection: z.string().min(1, { message: "This field is required" }),

    acceptTerms: z.boolean().refine((val) => val, {
      message: "You must accept the terms and conditions",
    }),
  })
  .superRefine((data, ctx) => {
    const validOptions = interestOptions[data.interest];
    if (!validOptions.includes(data.selection)) {
      ctx.addIssue({
        path: ["selection"],
        code: z.ZodIssueCode.custom,
        message: `Invalid selection for ${data.interest}`,
      });
    }
  });
export const emailVerificationSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Enter a valid email address"),

  code: z
    .string()
    .nonempty("Verification code is required")
    .min(4, "Code must be at least 4 characters"),
});
export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormType = z.infer<typeof loginSchema>;

export type RegisterUserFormType = z.infer<typeof registerUserSchema>;
export type EmailVerificationFormType = z.infer<typeof emailVerificationSchema>;

export const interestOptions: Record<string, string[]> = {
  Music: ["Pop", "Rock", "Hip Hop", "Jazz", "Classical"],
  Cars: ["Sedan", "SUV", "Truck", "Coupe", "Electric"],
  Sports: ["Football", "Basketball", "Tennis", "Running", "Swimming"],
};
