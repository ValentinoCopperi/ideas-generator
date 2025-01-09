
export interface Ideas {
    projects : Project[]
}

export interface Project {
    id? : number
    title : string
    short_description : string
    description : string
    difficulty : string
    suggested_technologies : SuggestedTechnology[] | string[]
}

export interface FilteredProject {
    id? : number
    title : string
    short_description : string
    description : string
    difficulty : string
    suggested_technologies : string[]
}

export interface SuggestedTechnology {
    name : string
}

