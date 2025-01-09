import { logoutAction } from "@/actions/auth/logout"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { isLoggedIn } from "@/lib/session/dal"
import { User2Icon } from "lucide-react"
import Link from "next/link"
import { DialogProfile } from "./dialog-profile"
import { getUser } from "@/actions/user/user-actions"

const ProfileButton = async () => {

    const { isAuth } = await isLoggedIn()
    const user_data = await getUser()


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="outline" size="icon" className='relative'>
                    <User2Icon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem>
                    <Link href="/ideas">
                        Generate ideas
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/ideas/my_ideas">
                        Saved projects
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    {
                        isAuth
                            ? <p onClick={logoutAction} className="cursor-pointer w-full">Logout</p>
                            : <Link className="min-w-full" href="/signup" >Sign In</Link>
                    }
                </DropdownMenuItem>
                <DialogProfile  user={user_data} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileButton