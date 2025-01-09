import { z } from 'zod'

export const signupFormSchema = z.object({
   
    email: z.string().
        email({ message: 'Please enter a valid email.' })
        .nonempty({ message: "This fields must not be empty" })
        .trim(),
    password: z
        .string()
        .min(4, { message: 'Be at least 4  characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .trim()
        .nonempty({ message: "This fields must not be empty" })
})

export type SignUpFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined | null
