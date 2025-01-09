import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'
import { decrypt } from './session'
import { redirect } from 'next/navigation'
import { getUser } from '@/actions/user/user-actions'

export const verifySession = cache(async () => {

  const cookie = (await cookies()).get('session')?.value

  

  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/signup')
    return;
  }


  return { isAuth: true, id_user: session.userId }
})

export const isLoggedIn = async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    return {isAuth : false};
  }


  return { isAuth: true, id_user: session.userId }
}


export const isAbleToGenerateIdea = async (): Promise<boolean> => {


  try {

    const user = await getUser();

    if (!user || (user.total_requests !== undefined && user.total_requests >= 4)) {
      return false;
    }

    return true;

  } catch (error) {
    console.log(error)
    return false;
  }

}