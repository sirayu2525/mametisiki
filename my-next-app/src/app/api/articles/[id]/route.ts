import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";

export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;

    // Prisma を使って ID に一致する記事を取得
    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
    });

    if (!article) {
      return NextResponse.json({ message: "記事が見つかりません" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json({ message: "データ取得に失敗しました" }, { status: 500 });
  }
}
