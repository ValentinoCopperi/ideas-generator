'use server'

import { formSchema } from "@/lib/zod/form-schema"
import { z } from 'zod'
import { genereteIdeas } from "./openai"
import { Ideas } from "@/types/ideas"
import { isAbleToGenerateIdea, verifySession } from "@/lib/session/dal"
import { incrementRequests } from "./user/user-actions"

export type State = | {
    status: "success" | "error",
    message: string,
    ideas?: Ideas,
    errors?: z.inferFlattenedErrors<typeof formSchema>['fieldErrors']
} | null


export interface ResponseData {
    type: string,
    difficulty: string,
    theme: string,
    additionalInfo?: string;
}

export const proccessAndGenerateIdeas = async (prevState: State, data: FormData): Promise<State> => {

    const session = await verifySession();

    if(!(await isAbleToGenerateIdea())){
        return {
            status : "error",
            message : "Reached the limit of 4 requests daily"
        }
    }

   


    const validationResult = formSchema.safeParse({
        type: data.get('type'),
        difficulty: data.get('difficulty'),
        theme: data.get('theme'),
        additionalInfo: data.get('additionalInfo')
    });

    if (!validationResult.success) {
        return {
            status: "error",
            message: "Error validating form data",
            errors: validationResult.error.flatten().fieldErrors
        };
    }

    const validateData = validationResult.data as ResponseData;

    await incrementRequests(Number(session?.id_user))

    
    const ideas = await genereteIdeas(validateData);
    
    return {
        status : "success",
        ideas,
        message : "Ideas generated successfully!"
    }



}