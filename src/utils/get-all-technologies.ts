import { FilteredProject, Project } from "@/types/ideas";


export const getAllTechnologies = (
    projects: Project[] | FilteredProject[] | null | undefined
): string[] => {
    if (!projects) return [];

    const technologies: string[] = [];

    projects.forEach((proj) => {
        proj.suggested_technologies.forEach((tech) => {
            const techName = typeof tech === "string" ? tech : tech.name;
            if (!technologies.includes(techName)) {
                technologies.push(techName);
            }
        });
    });

    return technologies;
};
