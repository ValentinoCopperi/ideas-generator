
import { logoutAction } from '@/actions/auth/logout'
import { Button } from '@/components/ui/button'
import { isLoggedIn } from '@/lib/session/dal'
import { LogIn, LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const AuthButton = async () => {

    const { isAuth } = await isLoggedIn();
    

    return (
        <>

            {
                isAuth

                    ?
                    <Button variant="outline" size="icon" className='relative'title='Logout' onClick={logoutAction}>
                        <LogOut className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
                    </Button>

                    :

                    <Link href={"/signup"}>
                        <Button variant="outline" size="icon" className='relative' title='Log In'>
                            <LogIn className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
                        </Button>
                    </Link>



            }

        </>
    )
}
