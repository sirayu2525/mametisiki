"use client"; // ✅ クライアントコンポーネント

import React, { Suspense, useEffect, useState } from "react";
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchArticles(tag?: string): Promise<Article[]> {
  try {
    let url = `${API_BASE_URL}/api/articles`;
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

// ✅ `useSearchParams()` を Suspense 内にラップするコンポーネント
function SearchParamsComponent({ onTagChange }: { onTagChange: (tag: string) => void }) {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") || "";
  useEffect(() => {
    onTagChange(tag);
  }, [tag, onTagChange]);

  return null; // 👀 画面には表示しないが `tag` を更新する
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState<string>("");

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const latestArticles = await fetchArticles(tag);
        setArticles(latestArticles);
      } catch (error) {
        console.error("記事の取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [tag]);

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        {tag ? `タグ: ${tag}` : "記事一覧"}
      </h1>

      {/* ✅ `useSearchParams()` を `Suspense` でラップ */}
      <Suspense fallback={<p className="text-center text-gray-500">検索パラメータを取得中...</p>}>
        <SearchParamsComponent onTagChange={setTag} />
      </Suspense>

      {loading ? (
        <p className="text-center text-gray-500">読み込み中...</p>
      ) : articles.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <p className="text-center text-gray-500">記事が見つかりません</p>
      )}
    </div>
  );
}
