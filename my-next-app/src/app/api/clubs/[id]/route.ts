import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const club = await prisma.club.findUnique({
    where: { id: Number(id) },
    include: {
      welcomeInfo: {
        include: {
          events: {
            include: {
              schedules: true,
            },
          },
        },
      },
    },
  });

  if (!club) {
    return NextResponse.json(
      { message: "団体が見つかりません" },
      { status: 404 }
    );
  }

  return NextResponse.json(club);
}
