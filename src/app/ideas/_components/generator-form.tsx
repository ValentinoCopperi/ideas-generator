"use client"

import { proccessAndGenerateIdeas, State } from "@/actions/generator";
import { formSchema } from "@/lib/zod/form-schema";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useIdeas } from "@/context/ideas-context";
import DifficultyCheckbox from "./difficulty-checkbox";
import ProjectTypeSelector from "./project-type-selector";
import ProjectThemeSelector from "./project-theme-selector";
import AditionalInfoTextarea from "./additional-info";
import SubmitBtn from "./submit-btn";

const GenerateForm = () => {

    const router = useRouter();

    const [formState, formAction] = useActionState<State, FormData>(proccessAndGenerateIdeas, null)

    const ideasContext = useIdeas();

    if(!ideasContext){
        throw new Error("Use Ideas context well")
    }

    const  { setIdeas } = ideasContext;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            difficulty: "Easy"
        }
    })


    useEffect(() => {
        if (!formState) {
            return;
        }

        if(formState.status === 'error'){
            toast.error(formState.message)
            return;
        }

        if (formState.status === "success" && formState.ideas) {
            toast.success("Ideas generated succesfully")
            setIdeas( formState.ideas )
        }

    }, [ setIdeas , formState ])


    return (
        <Card className="h-fit rounded-2xl">
            <Form {...form}>
                <form action={formAction} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className='flex text-lg'>
                            <div onClick={() => router.push('/')} className='flex items-center gap-2 cursor-pointer'>
                                <ArrowLeft className='size-4' strokeWidth={3} />
                                <span>
                                    NextIdea
                                </span>
                            </div>
                        </CardTitle>
                        <CardDescription>
                            Customize your ideas by filling out the form below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='flex-1 pt-0 space-y-5'>
                        <Separator />
                        <DifficultyCheckbox form={form} formState={formState} />
                        <ProjectTypeSelector form={form} formState={formState} />
                        <ProjectThemeSelector form={form} formState={formState} />
                        <AditionalInfoTextarea form={form} formState={formState} />
                    </CardContent>
                    <Separator className='mb-5' />
                    <CardFooter>
                        <SubmitBtn content="Generate" pendingContent="Generating..." />
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}

export default GenerateForm;