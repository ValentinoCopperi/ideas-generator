"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Combobox } from './combo-box'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { DifficultyFilterCheckbox } from './difficulty-checkbox'
import TitleInputFilter from './title-input-filter'
import { Button } from '@/components/ui/button'



export const FilterCard = ({ technologies }: { technologies: string[] }) => {

    const router = useRouter();


    return (
            <Card className=' w-full lg:w-1/3 lg:mx-10 max-h-[600px]'>
                <CardHeader>
                    <CardTitle className='flex text-lg'>
                        <div onClick={() => router.back()} className='flex items-center gap-2 cursor-pointer'>
                            <ArrowLeft className='size-4' strokeWidth={3} />
                            <span>
                                NextIdea
                            </span>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        Filter your saved projects.
                    </CardDescription>
                </CardHeader>
                <Separator className='mb-4' />
                <CardContent className='flex-1 pt-0 space-y-5'>
                    <h1>Title:</h1>
                    <TitleInputFilter />
                    <Separator className='my-2' />
                    <h1>Used Technologies:</h1>
                    <Combobox technologies={technologies} />
                    <Separator className='my-2' />
                    <h1>Difficulty:</h1>
                    <DifficultyFilterCheckbox />
                    <Separator className='my-2' />
                    <Button className='w-full' onClick={() => {
                        router.push("/ideas/my_ideas")
                        router.refresh()
                    }}>
                        Reset Filters
                    </Button>
                </CardContent>
            </Card>
    )
}
