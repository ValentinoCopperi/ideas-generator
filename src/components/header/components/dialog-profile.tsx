"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { User } from "@/types/user"
import DialogProfileContent from "./dialog-profile-content"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {  UserCircle2 } from "lucide-react"
import Link from "next/link"

interface Props {
    user: User | null
}

export const DialogProfile = ({ user }: Props) => {


    return (
        <Dialog>
            <DialogTrigger className="">
                <Button variant="outline">
                    Profile
                </Button>
            </DialogTrigger>

            <DialogContent
                className="sm:max-w-[425px]"
            >

                {

                    user ? (
                        <DialogProfileContent user={user} />
                    )
                        : (
                            <Alert className="flex flex-col items-center text-center">
                                <div className="flex flex-col items-center justify-center">
                                    <UserCircle2 className="h-12 w-12 text-gray-400 mb-2" />
                                    <DialogTitle>Error</DialogTitle>
                                    <AlertTitle className="text-lg font-semibold mb-2">Not Logged In</AlertTitle>
                                </div>
                                <AlertDescription className="mb-4">
                                    You need to be logged in to view and edit your profile.
                                </AlertDescription>
                                <Link href="/signup" passHref>
                                    <Button variant="default">Sign In</Button>
                                </Link>
                            </Alert>
                        )


                }
            </DialogContent>
        </Dialog>
    )
}