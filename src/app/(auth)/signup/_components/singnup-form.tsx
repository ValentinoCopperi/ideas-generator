"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { signupFormSchema, SignUpFormState } from "@/lib/zod/signup-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import TextAreaInput from "./text-area-input-email"
import SubmitBtn from "@/app/ideas/_components/submit-btn"
import { useActionState } from "react"
import { signUpAction } from "@/actions/auth/signup"
import TextAreaInputEmail from "./text-area-input-email"
import TextAreaInputPassword from "./text-area-input-password"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react"



const SignUpForm = () => {

    const [state, action, pending] = useActionState<SignUpFormState, FormData>(
        signUpAction,
        null
    );




    const router = useRouter();

    const form = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
    })


    return (
        <Card className=" lg:mx-auto mt-8">
            <Form {...form} >
                <form className="flex flex-col" action={action}>
                    <CardHeader>
                        <CardTitle className='flex text-lg'>
                            <div onClick={() => router.back()} className='flex items-center gap-2 cursor-pointer'>
                                <ArrowLeft className='size-4' strokeWidth={3} />
                                <span>
                                    Sign In
                                </span>
                            </div>
                        </CardTitle>
                        <CardDescription>
                            Customize your ideas by filling out the form below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='flex-1 pt-0 space-y-5'>
                        <Separator />
                        <TextAreaInputEmail state={state} name="email" />
                        <TextAreaInputPassword state={state} name="password" />
                    </CardContent>
                    <Separator className='mb-5' />
                    <CardFooter className="flex flex-col">
                        <SubmitBtn content="Sign In" pendingContent="Signing in..." />
                        <div className="h-8">
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
                        Sign in with google
                    </Button>
                </div>

                <div className="flex flex-col justify-center items-center pb-3">
                    <p>Don't have an account?</p>
                    <Link
                        href="/register"
                        className="py-1 font-semibold underline hover:text-blue-600 transition-colors"
                        aria-label="Create an account"
                    >
                        Create an account
                    </Link>
                </div>
            </Form>
        </Card>
    )
}

export default SignUpForm