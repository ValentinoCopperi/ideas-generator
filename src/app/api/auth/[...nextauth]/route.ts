import { registerAction } from "@/actions/auth/register";
import { signUpAction, signUpActionNextAuth } from "@/actions/auth/signup";
import { getUserId } from "@/actions/user/user-actions";
import { createSession } from "@/lib/session/session";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.CLIENT_SECRET as string
    })],

    cookies: {
        sessionToken: {
            name: `__Secure-next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true,
                maxAge: 0 // Set to 0 to prevent cookie creation
            }
        },
    },

    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                const { name, email } = user
                console.log(name, email)

                if (!name || !email) {
                    return false;
                }


                // Crear un objeto FormData para pasar a registerAction
                const formData = new FormData()
                formData.append('username', name)
                formData.append('email', email)
                formData.append('password', 'google-auth-100')
                formData.append('confirmPassword', 'google-auth-100')


                // Llamar a registerAction
                const result = await signUpActionNextAuth(
                    { errors: {}, message: undefined },
                    formData
                )

                if (result?.errors === undefined) {
                    return true
                } else {
                    console.error("Error registering user:", result?.message)
                    return false
                }
            }
            return true
        },

    }

})

export { handler as GET, handler as POST }

