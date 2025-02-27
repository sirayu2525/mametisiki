import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
        📰ハムバス
      </Link>
      <nav>
        <ul className="flex space-x-6 text-gray-700">
          <li><Link href="/">Top</Link></li>
          <li><Link href="/articles">記事一覧</Link></li>
          <li><Link href="/begginer">新入生向け</Link></li>
          {/* Twitterは外部リンクなので <a> を使用 */}
          <li>
            <a href="https://x.com/omuichinen" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Twitter
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
