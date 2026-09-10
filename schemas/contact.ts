import { z } from "zod";

export const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Must have at least 2 charcaters"),
    email: z
        .email("Invaid email"),
    message: z
        .string()
        .min(10, "Must have at least 10 charcacters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;