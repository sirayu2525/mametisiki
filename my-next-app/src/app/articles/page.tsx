// src/app/articles/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import React from "react";

async function fetchArticles(page: number, limit: number) {
  const res = await fetch(`http://localhost:3000/api/articles?page=${page}&limit=${limit}`);
  return res.json();
}

export default function ArticlesPage() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const limit = 12;

  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadArticles() {
      const data = await fetchArticles(currentPage, limit);
      const articles = data.articles;
      const totalPages = data.totalPages;
      setArticles(articles);
      setTotalPages(totalPages);
    }
    loadArticles();
  }, [currentPage]);

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">記事一覧</h1>

      {/* 記事リスト */}
      <ArticleList articles={articles} />

      {/* ページネーション */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
