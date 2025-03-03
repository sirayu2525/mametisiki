"use client"; //  クライアントコンポーネント

import React, { Suspense, useEffect, useState } from "react";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import SearchParamsHandler from "@/components/SearchParamsHandler";
import { useSearchParams } from "next/navigation";


interface Article {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  image: string;
}

 const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

 async function fetchArticles(tag?: string, page: number = 1): Promise<{ articles: Article[], totalPages: number }> {
  try {
    console.log(`fetchArticles 実行: tag=${tag}, page=${page}`);
    let url = `${API_BASE_URL}/api/articles?page=${page}`;
    if (tag) {
      url += `&tag=${encodeURIComponent(tag)}`;
    }

    console.log("fetch URL:", url);
    const res = await fetch(url, { cache: "no-store" });
    console.log("fetch結果:", res.status, res.statusText);
    if (!res.ok) throw new Error("記事の取得に失敗しました");

    const data = await res.json();
    console.log("fetchArticle実行完了", data);
    return {
      articles: Array.isArray(data.articles) ? data.articles : [],
      totalPages: data.totalPages || 1,
    };
  } catch (error) {
    console.error("記事の取得に失敗:", error);
    return { articles: [], totalPages: 1 };
  }
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        console.log("記事の読み込み開始:", tag, currentPage);
        setLoading(true);
        const { articles, totalPages } = await fetchArticles(tag, currentPage);
        setArticles(articles);
        setTotalPages(totalPages);
        console.log("記事の読み込み完了:", articles);
      } catch (error) {
        console.error("記事の取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };
  
    loadArticles();
  }, [tag, currentPage]); 
  

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        {tag ? `タグ: ${tag}` : "記事一覧"}
      </h1>

      {/*  `useSearchParams()` を `Suspense` でラップ */}
      <Suspense
        fallback={
          <p className="text-center text-gray-500">
            検索パラメータを取得中...
          </p>
        }
      > 
        <SearchParamsHandler
          onTagChange={setTag}
          onPageChange={setCurrentPage}
        />
      </Suspense> 


      {loading ? (
        <p className="text-center text-gray-500">読み込み中...</p>
      ) : articles.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <p className="text-center text-gray-500">記事が見つかりません</p>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
