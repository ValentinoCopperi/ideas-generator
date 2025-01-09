"use client"

import { Project } from "@/types/ideas"
import CardProject from "../../_components/card-project"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import './custom-scrollbar.css'
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";



export const IdeasGrid = ({ saved_projects }: { saved_projects: Project[] }) => {

    const searchParams = useSearchParams();

    const areParamSet = searchParams.has("difficulty") || searchParams.has("technology") || searchParams.has("query")

    return (
            <div className={`flex-1 flex flex-col overflow-y-scroll max-h-[600px] custom-scrollbar ${saved_projects.length === 0 && 'justify-center'}`}>
                {
                    saved_projects && saved_projects.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mx-2">
                            {saved_projects.map((project, index) => (
                                <CardProject key={index} project={project} />
                            ))}
                        </div>
                    ) : (
                        <Card className="max-w-sm mx-auto flex flex-col items-center justify-center  text-center space-y-4 p-4  shadow-md ">
                            <h2 className="text-2xl font-semibold">
                                {
                                    saved_projects.length === 0 && areParamSet
                                        ? "No Saved Ideas Found with the Applied Filters"
                                        : "No Saved Ideas Yet"
                                }
                            </h2>
                            <p>
                                {
                                    saved_projects.length === 0 && areParamSet
                                        ? "There are not project found with that applied filters . Try with change them"
                                        : " You haven’t saved any project ideas. Start exploring and saving the ones that inspire you the most!"
                                }
                            </p>
                            <Link href={`${saved_projects.length === 0 && areParamSet ? "/ideas/my_ideas" : "/ideas"}`}>
                                <Button
                                >
                                    {saved_projects.length === 0 && areParamSet ? "Reset Filters" : "Generate"}
                                </Button>
                            </Link>
                        </Card>
                    )
                }
            </div>
    );
};
