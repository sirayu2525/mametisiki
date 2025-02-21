import Link from "next/link";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string; // デフォルトで "/articles"
}

export default function Pagination({ currentPage, totalPages, basePath = "/articles" }: PaginationProps) {
  return (
    <div className="flex justify-center space-x-4 mt-6">
      {/* 前のページボタン */}
      {currentPage > 1 && (
        <Link href={`${basePath}?page=${currentPage - 1}`} className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300">
          « 前へ
        </Link>
      )}

      {/* 次のページボタン */}
      {currentPage < totalPages && (
        <Link href={`${basePath}?page=${currentPage + 1}`} className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300">
          次へ »
        </Link>
      )}
    </div>
  );
}
