import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

import CredentialsProvider from 'next-auth/providers/credentials';
const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    throw new Error('Por favor, forneça e-mail e senha.');
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.password) {
                    throw new Error('Usuário não encontrado ou não cadastrado com senha.');
                }
                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordCorrect) {
                    throw new Error('Senha inválida.');
                }

                return user;
            }
        })
    ],

    session: {
        strategy: 'jwt',
    },

    secret: process.env.AUTH_SECRET,

    pages: {
        signIn: '/login',
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };