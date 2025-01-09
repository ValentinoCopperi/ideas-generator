"use server"

import { sql } from "@/lib/database/db"
import { createSession } from "@/lib/session/session"
import { signupFormSchema, SignUpFormState } from "@/lib/zod/signup-form-schema"
import { User } from "@/types/user"
import { redirect } from "next/navigation"
import {registerActionNextAuth } from "./register"
import { getUserId } from "../user/user-actions"

export const signUpAction = async (prevState: SignUpFormState, formData: FormData) => {


    const validatedFields = signupFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validatedFields.data

    const [userFromDb] = await sql<User[]>`SELECT * FROM users_table WHERE email = ${email}`

    if (!userFromDb) {
        return {
            message: "User doest not exists"
        }
    }

    if (userFromDb.password !== password) {
        return {
            message: "Wrong password"
        }
    }
    await createSession(String(userFromDb.id_user))
    redirect('/')

}

export const signUpActionNextAuth = async (prevState: SignUpFormState, formData: FormData) => {


    const validatedFields = signupFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validatedFields.data

    const [userFromDb] = await sql<User[]>`SELECT * FROM users_table WHERE email = ${email}`

    if (!userFromDb) {
        await registerActionNextAuth(prevState, formData)
        const userId = await getUserId(email)
        await createSession(String(userId))
        return
    } else {
        if (userFromDb.password !== password) {
            return {
                message: "Wrong password"
            }
        }
    }

    await createSession(String(userFromDb.id_user))

}