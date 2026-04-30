import { z } from "zod";

const disposableDomains = [
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "throwaway.email",
  "sharklasers.com",
  "yopmail.com",
  "trashmail.com",
  "fakeinbox.com",
  "dispostable.com",
  "maildrop.cc",
  "getnada.com",
  "10minutemail.com",
  "tempinbox.com",
  "throwam.com",
  "spamgourmet.com",
  "trashmail.me",
  "mailnull.com",
  "spamherelots.com",
  "spaml.com",
  "mailnesia.com",
  "mytemp.email",
  "tempr.email",
  "discard.email",
  "spamgourmet.net",
  "mailexpire.com",
  "filzmail.com",
  "throwam.com",
  "spambox.us",
  "tempinbox.com",
  "mailnull.com",
];

const emailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .max(50, { message: "Email cannot exceed 50 characters" })
  .email({ message: "Please enter a valid email address" })
  .refine(
    (email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      return !disposableDomains.includes(domain);
    },
    { message: "Disposable email addresses are not allowed" },
  )
  .refine(
    (email) => {
      const localPart = email.split("@")[0];
      return (
        /^[a-zA-Z0-9][a-zA-Z0-9._%+\-]*$/.test(localPart) &&
        !localPart.includes("..")
      );
    },
    { message: "Please enter a valid email address" },
  );

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),

  email: emailSchema,

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" }),

  username: z.string(),
});

export const signInFormSchema = formSchema.pick({
  email: true,
  password: true,
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
