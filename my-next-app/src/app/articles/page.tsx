// src/app/articles/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import React from "react";

interface Article {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  image: string;
}

async function fetchArticles(page: number, limit: number, tag?: string) {
  let url = `/api/articles?page=${page}&limit=${limit}`;
  if (tag) {
    url += `&tag=${encodeURIComponent(tag)}`;
  }
  
  const res = await fetch(url);
  return res.json();
}

export default function ArticlesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const limit = 12;
  const currentTag = searchParams.get("tag") || ""; // 現在のタグ

  const [articles, setArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadArticles() {
      const data = await fetchArticles(currentPage, limit, currentTag);
      setArticles(data.articles);
      setTotalPages(data.totalPages);
    }
    loadArticles();
  }, [currentPage, currentTag]);

  // タグをクリックしたときの処理
  const handleTagClick = (tag: string) => {
    router.push(`/articles?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        {currentTag ? `タグ: ${currentTag}` : "記事一覧"}
      </h1>

      {/* 記事リスト */}
      <ArticleList articles={articles} onTagClick={handleTagClick} />

      {/* ページネーション */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
