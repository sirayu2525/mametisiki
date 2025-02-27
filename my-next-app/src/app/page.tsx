import React from "react";
import ArticleList from "@/components/ArticleList";

interface Article {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  image: string;
}

// 最新3記事を取得
async function fetchLatestArticles(): Promise<Article[]> {
  const res = await fetch(`http://localhost:3000/api/articles/latest`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("記事の取得に失敗しました");

  return res.json();
}

export default async function HomePage() {
  const articles = await fetchLatestArticles();

  return (
    <div>
      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-6">最新記事</h1>
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
