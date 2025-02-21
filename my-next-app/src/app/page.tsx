// src/app/page.tsx
import ArticleList from "@/components/ArticleList";
import React from "react";

async function getArticles() {
  const res = await fetch("http://localhost:3000/api/articles");
  const data = await res.json();
  return data.articles || []; // ✅ articles が undefined の場合、空配列を返す
}


export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">最新記事</h1>
      <ArticleList articles={articles} />
    </div>
  );
}
