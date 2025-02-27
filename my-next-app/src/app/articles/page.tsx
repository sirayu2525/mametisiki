// src/app/articles/page.tsx
"use client"; // ✅ クライアントコンポーネントに変更

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ArticleList from "@/components/ArticleList";

interface Article {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  image: string;
}

async function fetchArticles(tag?: string): Promise<Article[]> {
  try {
    let url = `http://localhost:3000/api/articles`;
    if (tag) {
      url += `?tag=${encodeURIComponent(tag)}`;
    }

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("記事の取得に失敗しました");

    const data = await res.json();
    return Array.isArray(data.articles) ? data.articles : [];
  } catch (error) {
    console.error("記事の取得に失敗:", error);
    return [];
  }
}


export default function ArticlesPage() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") || "";

  const [articles, setArticles] = useState<Article[]>([]); // ✅ 空の配列をデフォルトに
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      const latestArticles = await fetchArticles(tag);
      setArticles(latestArticles);
      setLoading(false);
    }

    loadArticles();
  }, [tag]);

  return (
    <div>
      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          {tag ? `タグ: ${tag}` : "記事一覧"}
        </h1>
        {loading ? (
          <p className="text-center text-gray-500">読み込み中...</p>
        ) : articles.length > 0 ? ( // ✅ `articles.length` でチェック
          <ArticleList articles={articles} />
        ) : (
          <p className="text-center text-gray-500">記事が見つかりません</p>
        )}
      </div>
    </div>
  );
}
