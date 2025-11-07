

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "E-mail e senha são obrigatórios." }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            return NextResponse.json({ message: "Usuário ja existe." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        });

        return NextResponse.json(newUser, { status: 201 });

    } catch (error) {
        console.error("Erro no registro:", error);
        return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
    }
}