import { z } from "zod";

export const PROGRAM_SLUGS = [
  "diploma-in-data-science",
  "certified-drone-pilot",
  "live-streaming-training",
  "embedded-systems-training",
] as const;

export const SOURCE_SLUGS = [
  "instagram",
  "facebook",
  "whatsapp",
  "website",
  "other",
] as const;

export const enrollmentSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters")
    .max(60),
  last_name: z
    .string()
    .trim()
    .min(3, "Last name must be at least 3 characters")
    .max(60),
  email: z.email("Enter a valid email address").trim().toLowerCase().max(120),
  phone: z
    .string()
    .trim()
    .regex(/^0\d{10}$/, { message: "Enter a valid phone number, e.g. 08012345678" }),
  program: z.enum(PROGRAM_SLUGS, "Select a valid training program"),
  source: z.enum(SOURCE_SLUGS).optional(),
  hp: z.string().max(0).optional().or(z.literal("")),
  turnstile_token: z.string().min(10),
});

export type EnrollmentInput = z.infer<typeof enrollmentSchema>;

// Same shape as the server schema, minus fields the client doesn't touch.
// The form runs this against FormData before calling the API so users see
// inline errors without paying a round-trip.
export const clientEnrollmentSchema = enrollmentSchema.omit({
  turnstile_token: true,
  hp: true,
});

export type ClientEnrollmentInput = z.infer<typeof clientEnrollmentSchema>;
