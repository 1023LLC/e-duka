import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/libs/prismadb";
import bcrypt from 'bcrypt';
 

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentilas',
            credentials: {
                email: {
                    label: 'email',
                    type: 'text',
                },
                password: {
                    label: 'password',
                    type: 'password'
                },
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials.password ){
                    throw new Error('Invalid email or password')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user || !user?.hasedPassword){
                    throw new Error('Invalid email or password')
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hasedPassword
                )

                if(isCorrectPassword){
                    throw new Error('Invalid email or password')
                }

                return user;

            }
        }),
    ],
    pages: {
        signIn: '/login'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET

})