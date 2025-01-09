
import { getSavedIdeasAction } from '@/actions/ideas/ideas'
import { Button } from '@/components/ui/button'
import { Bookmark} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const SavedIdeasButton = async() => {

    const savedIdeasQuantity = await getSavedIdeasAction();

    return (
        <Link href={"/ideas/my_ideas"}>
            <Button variant="outline" size="icon" className='relative' >
                <Bookmark className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
                <span className="absolute -bottom-2 -right-1 ">{savedIdeasQuantity.length}</span>
            </Button>
        </Link>
    )
}
