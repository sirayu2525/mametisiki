// src/components/Header.tsx
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-xl font-bold">📰</div>
      <nav>
        <ul className="flex space-x-6 text-gray-700">
          <li><Link href="/">Top</Link></li>
          <li><Link href="/articles">記事一覧</Link></li>
          <li><Link href="/sinnyusei">新入生向け</Link></li>
        </ul>
      </nav>
    </header>
  );
}
