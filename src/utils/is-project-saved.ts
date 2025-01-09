import { getSavedIdeasAction } from "@/actions/ideas/ideas";
import { Project } from "@/types/ideas";

export const isProjectSaved = async(project : Project)  => {

    const projects : Project[] = await getSavedIdeasAction();

    return projects.some(proj => proj.title === project.title);

}