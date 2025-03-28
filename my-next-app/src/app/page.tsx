import React from "react";
import ArticleList from "@/components/ArticleList";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  image: string;
}

//  API のエンドポイントを環境変数から取得
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// 最新3記事を取得
async function fetchLatestArticles(): Promise<Article[]> {
  const res = await fetch(`${API_BASE_URL}/api/articles/latest`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("記事の取得に失敗しました");

  return res.json();
}

export default async function HomePage() {
  const articles = await fetchLatestArticles();
  const tags = ["雑学","施設・設備","学外","飲食","空きコマ","終了済","その他","行事","勉強","新入生向け","おすすめ","杉本キャンパス","中百舌鳥キャンパス","お得情報"];

  return (
    <div>
      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-6">最新記事</h1>
        <ArticleList articles={articles} />
      </div>

      {/* ハッシュタグ一覧を追加 */}
      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-6">タグ一覧</h1>
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Link href={`/articles?page=1&tag=${encodeURIComponent(tag)}`} className="bg-blue-100 text-blue-600 text-2xl px-2 py-1 rounded hover:bg-blue-200 transition">#{tag}</Link>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
