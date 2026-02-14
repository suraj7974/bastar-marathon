import { z } from "zod";

const phoneRegex = /^[6-9]\d{9}$/;

export const step1Schema = z.object({
  phone: z
    .string()
    .min(10, "Phone must be 10 digits")
    .max(10, "Phone must be 10 digits")
    .regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
});

export const step2Schema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Enter a valid email"),
  dob: z.string().min(1, "Date of birth is required"),
  category: z.string().min(1, "Please select a category"),
  gender: z.string().min(1, "Please select gender"),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(1, "Please select state"),
  city: z.string().min(2, "District/City is required"),
});

export type Step1Form = z.infer<typeof step1Schema>;
export type Step2Form = z.infer<typeof step2Schema>;
