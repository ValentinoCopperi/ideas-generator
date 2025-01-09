"use server"

import { sql } from "@/lib/database/db";
import { isLoggedIn } from "@/lib/session/dal"
import { Project } from "@/types/ideas"



export const deleteIdeaAction = async (project: Project) => {


    try {


        const { isAuth, id_user } = await isLoggedIn();

        if (!id_user) return;

        const response = await sql`
        DELETE FROM saved_ideas
        WHERE id_user = ${id_user} AND id = ${project.id};
        `;


    } catch (error) {
        console.log(error)
        throw error
    }

}

