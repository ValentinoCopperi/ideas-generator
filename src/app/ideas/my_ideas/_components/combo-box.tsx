"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {  useRouter, useSearchParams } from "next/navigation"

interface Props {
  technologies: string[] | null
}

export function Combobox({ technologies }: Props) {

  const router = useRouter()
  const searchParams = useSearchParams()

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

 

  const handleTechnologyFilter = (tech?: string) => {

    if (!tech) {
      router.push(`/ideas/my_ideas`)
      return;
    }

    const encodedUrl = encodeURIComponent(tech)


    if (searchParams.has("difficulty")) {
      router.push(`/ideas/my_ideas?technology=${encodedUrl}&difficulty=${searchParams.get("difficulty")}`)
    } else {
      router.push(`/ideas/my_ideas?technology=${encodedUrl}`)
    }

  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? technologies?.find((tech) => tech === value && tech)
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="overflow-hidden">
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key={"All"}
                value={"All"}
                onSelect={(currentValue) => {
                  setValue(currentValue === "All" ? "" : currentValue)
                  setOpen(false)
                  handleTechnologyFilter()
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === "All" ? "opacity-100" : "opacity-0"
                  )}
                />
                All
              </CommandItem>
              {technologies?.map((tech) => (
                <CommandItem
                  key={tech}
                  value={tech}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    handleTechnologyFilter(currentValue)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === tech ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {tech}
                </CommandItem>
              ))}

            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
