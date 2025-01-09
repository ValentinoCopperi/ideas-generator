import { signupFormSchema } from "@/lib/zod/signup-form-schema"
import { z } from "zod"

export interface UserSingup {
    email : string
    password : string
}

export interface User {
    id_user : number;
    name : string;
    email : string;
    phone : number;
    total_requests? : number
    password? : string;
}


export type StateSingup = | {
    status: "success" | "error",
    message: string,
    user?: User,
    errors?: z.inferFlattenedErrors<typeof signupFormSchema>['fieldErrors']
} | null


export interface SessionPayload {
    [key: string]: string | number | boolean | Date;  // Puedes agregar otros tipos según lo necesites
  }
  
