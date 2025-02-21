// src/app/api/articles/route.ts
import { NextResponse } from "next/server";

interface Article {
    id: number;
    title: string;
    description: string;
    publishedAt: string;
    tags: string[];
}
  
const articles: Article[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `記事${i + 1}`,
    description: `記事${i + 1}の概要`,
    publishedAt: "2020-01-01",
    tags: ["タグ1", "タグ2"],
}));
  

export async function GET(request: Request) {
  console.log(request);
  const url = new URL(request.url);
  const searchParams = url.searchParams;  
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedArticles = articles.slice(start, end);

  return NextResponse.json({
    articles: paginatedArticles,
    total: articles.length,
    page,
    limit,
    totalPages: Math.ceil(articles.length / limit),
  });
}
