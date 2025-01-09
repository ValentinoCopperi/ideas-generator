import { z } from "zod";

const registerSchema = z
    .object({
        username: z
            .string({
                errorMap: () => ({ message: "Username must be a string" }),
            })
            .min(4, {
                message: "Insert at least 4 characters",
            })
            .max(30, {
                message: "The maximum number of characters is 30.",
            }),

        email: z.string().email({ message: "Please enter a valid email." }).trim(),

        password: z
            .string({
                errorMap: () => ({ message: "Password must be a string" }),
            })
            .min(4, {
                message: "Insert at least 4 characters",
            })
            .max(30, {
                message: "The maximum number of characters is 30.",
            })
            .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
            .regex(/[0-9]/, { message: "Contain at least one number." }),

        confirmPassword: z.string({
            errorMap: () => ({ message: "Confirm Password must be a string" }),
        }),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords must match.",
        }
    );

export type RegisterFormState =
    | {
        errors?: {
            username ? : string[]
            email?: string[]
            password?: string[]
            confirmPassword? : string[]
        }
        message?: string
    }
    | undefined | null

export { registerSchema };
