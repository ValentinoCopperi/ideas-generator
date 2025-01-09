'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Project } from "@/types/ideas"
import { FC, useEffect, useState } from "react"
import ProjectDetails from "./project-details"
import { Bookmark, BookmarkX, LoaderIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { saveIdeaAction } from "@/actions/ideas/save-idea"
import { toast } from 'sonner'
import { isProjectSaved } from "@/utils/is-project-saved"
import { usePathname, useRouter } from "next/navigation"
import { deleteIdeaAction } from "@/actions/ideas/delete-idea"
import { useSavedProjects } from "@/context/saved-projects"
import { Badge } from "@/components/ui/badge"

interface Props {
  project: Project
}

const CardProject: FC<Props> = ({ project }) => {
  const router = useRouter();
  const pathname = usePathname()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const isSavedProject = pathname === "/ideas/my_ideas"

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleSaveProject = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLoading(true)
    await saveIdeaAction(project)
      .then(() => {
        toast.success("Project saved successfully!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Error saving project");
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteProject = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLoading(true)
    await deleteIdeaAction(project)
      .then(() => {
        toast.success("Project deleted successfully!");
        router.refresh();
      })
      .catch(() => {
        toast.error("Error deleting project");
      })
      .finally(() => setIsLoading(false));;
  };

  return (
    <>
      <Card className="rounded-2xl cursor-pointer" onClick={handleOpenDrawer}>
        <CardHeader className="rounded-t-2xl bg-gray-100 border-b border-border p-5">
          <div className="flex justify-between items-center gap-2">
            <div className="flex flex-col space-y-2">
              <CardTitle className="dark:text-black">{project.title}</CardTitle>
              <Badge className="w-fit px-2 py-1 text-sm font-semibold dark:text-white">
                {project.difficulty.toLocaleUpperCase()}
              </Badge>
            </div>


            {isSavedProject ? (
              <Button
                variant="outline"
                size="icon"
                className="relative"
                title="Delete"
                onClick={handleDeleteProject}
              >
                {
                  isLoading
                    ?
                    <LoaderIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all z-40" />
                    :
                    <BookmarkX className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all z-40" />
                }
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                className="relative"
                title="Save"
                onClick={handleSaveProject}
              >
                {
                  isLoading
                    ?
                    <LoaderIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all z-40" />
                    :
                    <Bookmark className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all z-40" />
                }
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <p className="text-sm">{project.description}</p>
        </CardContent>
      </Card>
      <ProjectDetails
        project={project}
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </>
  );
};

export default CardProject;
