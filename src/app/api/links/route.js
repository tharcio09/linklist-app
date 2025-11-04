import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export async function GET(req) {

    try {
        const links = await prisma.link.findMany({
            include: {
                user: true
            }
        });

        return NextResponse.json(links, { status: 200 });

    } catch (error) {
        console.error("Erro ao buscar links:", error);

        return NextResponse.json(
            { message: "Erro ao buscar links", error: error.message },
            { status: 500 }
        );
    }
}