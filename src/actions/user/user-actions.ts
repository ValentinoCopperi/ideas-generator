"use server"

import { sql } from "@/lib/database/db";
import { decrypt } from "@/lib/session/session";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { cache } from "react";

export const getUser = cache(async () => {
    
    const cookie = (await cookies()).get('session')?.value
    const  session = await decrypt(cookie)
    
    if (!session || !cookie) return null

    const userId = Number(session.userId);

    try {

        const [userFromDb] = await sql<User[]>`SELECT * FROM users_table WHERE id_user = ${userId}`
        return userFromDb;

    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})


export const incrementRequests = async (id_user: number) => {
    try {
        await sql`
            UPDATE users_table
            SET total_requests = total_requests + 1
            WHERE id_user = ${id_user}`;

    } catch (error) {
        console.error(error);  // Using console.error for errors is better practice
        throw error;  // Re-throw the error so the caller can handle it if needed
    }
}

export const getUserId = async (email : string) => {
    try {
        const [user] =  await sql<User[]>`SELECT * FROM users_table WHERE email = ${email}`

        if(!user.id_user) return false;

        return user.id_user
    } catch (error) {
        console.log(error)
        return false
    }
}
