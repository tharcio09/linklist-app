import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const links = await prisma.link.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        id: 'desc', 
      }
    });
    return NextResponse.json(links, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar links do admin:", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const { title, url } = await req.json();

    if (!title || !url) {
      return NextResponse.json({ message: "Título e URL são obrigatórios" }, { status: 400 });
    }

    const newLink = await prisma.link.create({
      data: {
        title,
        url,
        userId: session.user.id,
      }
    });

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar link:", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}