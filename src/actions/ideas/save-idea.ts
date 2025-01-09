"use server"

import { sql } from "@/lib/database/db";
import { isLoggedIn } from "@/lib/session/dal"
import { Project } from "@/types/ideas"
import { redirect, useRouter } from "next/navigation";



export const saveIdeaAction = async (project: Project) => {


  try {


    const { isAuth, id_user } = await isLoggedIn();

    if (!id_user) return;

    const techonologies: string[] = project.suggested_technologies.map(proj => proj.name)

    const response = await sql`
            INSERT INTO saved_ideas (
              id_user,
              title,
              description,
              difficulty,
              short_description,
              suggested_technologies
            ) 
            VALUES (
              ${id_user},
              ${project.title},
              ${project.description},
              ${project.difficulty},
              ${project.short_description},
              ${techonologies} 
            );
        `;

  } catch (error) {
    console.log(error)
    return { message : "Internal Server Error" }
  }

}
