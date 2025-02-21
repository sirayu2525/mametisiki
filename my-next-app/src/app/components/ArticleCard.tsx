import Link from "next/link";
import React from "react";

interface Article {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
}

export default function ArticleCard({ id, title, description, publishedAt, tags }: Article) {
  return (
    <div className="w-full border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
      {/* 画像部分（仮） */}
      <div className="h-40 bg-gray-300 mb-4 rounded-lg"></div>

      {/* タイトル */}
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>

      {/* 投稿日（フォーマット済み） */}
      <p className="text-xs text-gray-500 mt-1">📅 {new Date(publishedAt).toLocaleDateString("ja-JP")}</p>

      {/* 記事の概要 */}
      <p className="text-gray-600 text-sm mt-2">{description}</p>

      {/* タグ表示 */}
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>

      {/* 記事詳細リンク */}
      <Link href={`/articles/${id}`} className="text-blue-500 mt-4 inline-block hover:underline">
        もっと見る »
      </Link>
    </div>
  );
}
