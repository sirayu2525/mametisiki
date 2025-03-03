import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";

export async function GET() {
  try {
    // 最新3記事を取得
    const latestArticles = await prisma.article.findMany({
      take: 3, // 3件のみ取得
      orderBy: { publishedAt: "desc" }, // 投稿日時の降順
    });
    console.log(latestArticles);

    return NextResponse.json(latestArticles);
  } catch (error) {
    console.error("Error fetching latest articles:", error);
    return NextResponse.json({ message: "データ取得に失敗しました" }, { status: 500 });
  }
}
