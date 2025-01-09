"use client"

import { Button } from '@/components/ui/button'
import { DialogHeader, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/types/user'
import { DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog'

const DialogProfileContent = ({ user }: { user: User }) => {


    const getRemainingRequests = () => {

        

        if(user.total_requests === undefined || user.total_requests >= 4){
            return 0
        }else if(user.total_requests === 0){
            return 4
        }

        return 4 - user.total_requests 

    }

    return (
        <>
            <DialogHeader>
                <DialogTitle className='font-semibold'>My Profile</DialogTitle>
                <DialogDescription>
                    Check out your profile information here.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Usename
                    </Label>
                    <Input
                        id="name"
                        defaultValue={user.name}
                        disabled={true}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Email
                    </Label>
                    <Input
                        id="name"
                        defaultValue={user.email}
                        disabled={true}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Remaining Requests
                    </Label>
                    <Input
                        id="name"
                        defaultValue={getRemainingRequests()}
                        disabled={true}
                        className="col-span-3"
                    />
                </div>
            </div>
            
        </>
    )
}

export default DialogProfileContent