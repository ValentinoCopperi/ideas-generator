"use server"

import { sql } from "@/lib/database/db";
import { isLoggedIn } from "@/lib/session/dal";
import { FilteredProject} from "@/types/ideas";
import { getAllTechnologies } from "@/utils/get-all-technologies";

export const getSavedIdeasAction = async ( filters? :  { query? : string , technology? : string , difficulty? : string }) : Promise<FilteredProject[]>=> {

    try {
        

        const { isAuth, id_user } = await isLoggedIn();

        if(!isAuth){
            return []
        }

        let query = sql<FilteredProject[]>`SELECT * FROM saved_ideas WHERE id_user = ${Number(id_user)}`;

        if(filters?.technology){
            const decodedTech = decodeURIComponent(filters.technology)
            console.log(decodedTech)
            query = sql<FilteredProject[]>`${query} AND ${decodedTech} = ANY(suggested_technologies)`
        }

        if (filters?.difficulty) {
            query = sql<FilteredProject[]>`${query} AND difficulty = ${filters.difficulty}`
        }

        if(filters?.query){
            query = sql<FilteredProject[]>`${query} AND title ILIKE ${'%' + filters.query + '%'}`
        }

        const response = await query;

        return response;

    } catch (error) {
        console.log(error)
        return []
    }

}

export const getSavedTechnologiesAction = async () => {

    try {
        
        const savedIdeas = await getSavedIdeasAction();

        return getAllTechnologies(savedIdeas)

    } catch (error) {
        console.log(error)
        return []        
    }

}