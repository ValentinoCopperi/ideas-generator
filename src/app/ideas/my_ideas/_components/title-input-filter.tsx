"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"


const TitleInputFilter = () => {
    const router = useRouter()
    const[query,setQuery] = useState("")
    
    const onSubmit = () => {

        
        router.push(`/ideas/my_ideas?query=${query}`)
        
    }

  return (
    <div className="w-full flex flex-row space-x-2">
        <Input placeholder="Insert word..." className="w-[70%]" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button onClick={onSubmit} className="w-[30%]" >
            Search
        </Button>
    </div>
  )
}

export default TitleInputFilter