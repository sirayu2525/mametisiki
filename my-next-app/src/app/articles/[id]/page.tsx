// src/app/articles/[id]/page.tsx
import { notFound } from "next/navigation";

interface Article {
  id: number;
  title: string;
  content: string;
}

// 記事データを取得する関数
async function getArticle(id: string) {
  const res = await fetch(`http://localhost:3000/api/articles/${id}`);

  if (!res.ok) {
    return null; // 記事が見つからない場合
  }

  return res.json();
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  // params を await する
  const { id } = await Promise.resolve(params);
  // const { id } = params; これでいいらしい（未検証）

  const article: Article | null = await getArticle(id);

  if (!article) {
    return notFound(); // 404ページを表示
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-700">{article.content}</p>
    </div>
  );
}
