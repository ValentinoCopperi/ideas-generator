"use server"

import { deleteSession } from "@/lib/session/session"
import { redirect } from "next/navigation"

export const logoutAction = async () => {
 
  await deleteSession()
  redirect('/')

}