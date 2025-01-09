"use client"

import { registerAction } from "@/actions/auth/register"
import SubmitBtn from "@/app/ideas/_components/submit-btn"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { RegisterFormState, registerSchema } from "@/lib/zod/register-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { ArrowLeft, } from "lucide-react"
import router from "next/router"
import { useActionState } from "react"
import { Form, FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import TextAreaInput from "./text-area-input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export const RegisterForm = () => {

    const [state, action, peding] = useActionState<RegisterFormState, FormData>(registerAction, null)

    const router = useRouter()

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
    })

    return (
        <Card className="lg:mx-auto mt-8">
            <FormProvider {...form} >
                <form className="flex flex-col" action={action}>
                    <CardHeader>
                        <CardTitle className='flex text-lg'>
                            <div onClick={() => router.back()} className='flex items-center gap-2 cursor-pointer'>
                                <ArrowLeft className='size-4' strokeWidth={3} />
                                <span>Register</span>
                            </div>
                        </CardTitle>
                        <CardDescription>
                            Customize your ideas by filling out the form below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='flex-1 pt-0 space-y-5'>
                        <Separator />
                        <TextAreaInput state={state} name="username" />
                        <TextAreaInput state={state} name="email" />
                        <TextAreaInput state={state} name="password" />
                        <TextAreaInput state={state} name="confirmPassword" />
                    </CardContent>
                    <Separator className='mb-3' />
                    <CardFooter className="flex flex-col">
                        <SubmitBtn content="Register" pendingContent="Register processing..." />
                        <div className="h-8"> {/* Fixed height for error message */}
                            {state?.message && (
                                <h1 className="font-semibold pt-2 text-red-500"> {state.message} </h1>
                            )}
                        </div>
                    </CardFooter>

                </form>
                <div className="flex flex-col justify-center items-center pb-3">
                    <Button
                        onClick={() => signIn('google',{callbackUrl:"/"})}
                    >
                        Register in with google
                    </Button>
                </div>

                <div className="flex flex-col justify-center items-center pb-3">
                    <p>Already have an account?</p>
                    <Link
                        href="/signup"
                        className="py-1 font-semibold underline hover:text-blue-600 transition-colors"
                        aria-label="Create an account"
                    >
                        Sign In
                    </Link>
                </div>
            </FormProvider>
        </Card>
    )
}