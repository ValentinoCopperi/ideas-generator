"use server"

import { sql } from "@/lib/database/db"
import { RegisterFormState, registerSchema } from "@/lib/zod/register-form-schema"
import { User } from "@/types/user"
import { redirect } from "next/navigation"

export const registerAction = async (prevState: RegisterFormState, formData: FormData): Promise<RegisterFormState> => {
    
    try {
        const validatedFields = registerSchema.safeParse({
            username: formData.get("username"),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get("confirmPassword")
        })
    
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }
    
        const { email, username , password } = validatedFields.data
    
        const [userFromDb] = await sql<User[]>`SELECT * FROM users_table WHERE email = ${email} OR NAME = ${username}`
    
        if(userFromDb){
            return {
                message : "User already exists!"
            }
        }

        const response = await sql`
            INSERT INTO users_table (name,email,password) VALUES (${username},${email},${password})
        `

        return {
            message : "User Created Succesfully!"
        }
        
    } catch (error) {
        console.log(error)
        return { message : "Internal Server Error" }
    }
} 


export const registerActionNextAuth = async (prevState: RegisterFormState, formData: FormData): Promise<RegisterFormState> => {
    
    try {
        const validatedFields = registerSchema.safeParse({
            username: formData.get("username"),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get("confirmPassword")
        })
    
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }
    
        const { email, username , password } = validatedFields.data
    
        const [userFromDb] = await sql<User[]>`SELECT * FROM users_table WHERE email = ${email} OR NAME = ${username}`
    
        if(userFromDb){
            return {
                message : "User already exists!"
            }
        }

        const response = await sql`
            INSERT INTO users_table (name,email,password) VALUES (${username},${email},${password})
        `

        
    } catch (error) {
        console.log(error)
        return { message : "Internal Server Error" }
    }
} 