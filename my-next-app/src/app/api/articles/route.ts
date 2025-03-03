// src/app/api/articles/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";

export async function GET(request: Request) {
  try {
    console.log("APIの起動");
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const tag = searchParams.get("tag");
    const start = (page - 1) * limit;

    let whereCondition = {};
    if (tag) {
      whereCondition = { tags: { has: tag } }; // `tags` カラムに `tag` が含まれているか
    }

    // Prisma を使ってデータ取得
    const articles = await prisma.article.findMany({
      where : whereCondition,
      skip: start,
      take: limit,
      orderBy: { publishedAt: "desc" },
    });
    console.log("APIが実行された", articles);

    // 総記事数を取得
    const totalArticles = await prisma.article.count({ where: whereCondition });


    return NextResponse.json({
      articles,
      total: totalArticles,
      page,
      limit,
      totalPages: Math.ceil(totalArticles / limit),
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ message: "データ取得に失敗しました" }, { status: 500 });
  }
}
