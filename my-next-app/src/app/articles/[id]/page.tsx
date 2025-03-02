// src/pages/articles/[id]/page.tsx
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
  image: string; // ✅ 画像を追加
  tags: string[]; // ✅ タグを追加
}

// ✅ API のエンドポイントを環境変数から取得
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";



// 記事データを取得する関数
async function getArticle(id: string) {
  const API_BASE_URL = "";
  const res = await fetch(`${API_BASE_URL}/api/articles/${id}`);

  if (!res.ok) {
    return null; // 記事が見つからない場合
  }

  return res.json();
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // ✅ 記事を取得
  const article: Article | null = await getArticle(id);

  if (!article) {
    return notFound(); // 404ページを表示
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* ✅ 記事のタイトル */}
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      {/* ✅ 記事の投稿日 */}
      <p className="text-gray-500 mb-4">📅 {new Date(article.publishedAt).toLocaleDateString("ja-JP")}</p>
      
      {/* ✅ 記事の画像 */}
      {article.image && (
        <div className="w-full h-60 relative mb-4">
          <Image src={article.image} alt={article.title} fill className="rounded-lg object-cover" />
        </div>
      )}

      {/* ✅ タグの表示 */}
      <div className="mb-4 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Link
            key={tag}
            href={`/articles?tag=${encodeURIComponent(tag)}`} // ✅ タグクリックでタグ検索
            className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded hover:bg-blue-200 transition"
          >
            #{tag}
          </Link>
        ))}
      </div>

      {/* ✅ 記事の本文 */}
      <p className="text-gray-700">{article.content}</p>
    </div>
  );
}
