"use client"

import { getSavedIdeasAction } from "@/actions/ideas/ideas"
import { FilteredProject } from "@/types/ideas"
import { getAllTechnologies } from "@/utils/get-all-technologies"
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

type SavedProjectsContextType = undefined | {
    projectsSaved: FilteredProject[] | undefined | null,
    setProjectsSaved: Dispatch<SetStateAction<FilteredProject[] | null | undefined>>
    loading: boolean
    filteredProjects: FilteredProject[] | undefined | null,
    filterByUsedTechnologie: (tech: string) => void
    technologies: string[] | null
    deleteSavedProject: (id: number | undefined) => void
    filterByDifficulty : (diif : string) => void
}

export const SavedProjectsContext = createContext<SavedProjectsContextType>(undefined);

export const SavedProjectsProvider = ({ children }: { children: React.ReactNode }) => {

    const [projectsSaved, setProjectsSaved] = useState<FilteredProject[] | undefined | null>(null)
    const [filteredProjects, setFilteredProjects] = useState<FilteredProject[] | undefined | null>(null)
    const [technologies, setTechnologies] = useState<null | string[]>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchIdeas = async () => {
            setLoading(true)
            const projects = await getSavedIdeasAction();
            const used_technologies = getAllTechnologies(projects);
            setProjectsSaved(projects);
            setTechnologies(used_technologies)
        };

        fetchIdeas().finally(() => setLoading(false));
    }, []);

   
    const filterByUsedTechnologie = (tech: string) => {
        if (tech === "All") {
            setFilteredProjects(projectsSaved);
            return;
        }

        const filtered = projectsSaved?.filter(proj =>
            proj.suggested_technologies.includes(tech)
        );
        setFilteredProjects(filtered)
    };

    const filterByDifficulty = (diff : string) => {

        const filtered = projectsSaved?.filter(proj => proj.difficulty === diff)

        setFilteredProjects(filtered)

    }

    const deleteSavedProject = (id: number | undefined) => {

        if(!id || id === undefined) return;

        const newProjects = projectsSaved?.filter((proj) => proj.id !== id);
        setProjectsSaved(newProjects);
    };


    return (
        <SavedProjectsContext.Provider value={{ filterByDifficulty ,deleteSavedProject, technologies, projectsSaved, setProjectsSaved, loading, filteredProjects, filterByUsedTechnologie }} >
            {children}
        </SavedProjectsContext.Provider>
    )

}

export const useSavedProjects = () => {
    const context = useContext(SavedProjectsContext);
    if (!context) {
        throw new Error(
            "useSavedProjects must be used within a SavedProjectsProvider"
        );
    }
    return context;
};
