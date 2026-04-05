"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* ロゴ */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/hamubasu.jpg"
            alt="ハムバス ロゴ"
            width={160}
            height={40}
            className="h-auto w-auto"
          />
        </Link>

        {/* ハンバーガーアイコン（スマホのみ表示） */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="メニューを開く"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12" // Xマーク
                  : "M4 6h16M4 12h16M4 18h16" // ハンバーガー
              }
            />
          </svg>
        </button>

        {/* ナビゲーション（PC） */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 text-gray-700">
            <li><Link href="/">Top</Link></li>
            <li><Link href="/articles?page=1">まめちしき一覧</Link></li>
            <li><Link href="/begginer">新入生向け</Link></li>
            <li><Link href="/calendar" className="text-blue-600 font-medium">新歓カレンダー</Link></li>
            <li>
              <a href="https://x.com/omuichinen" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://marshmallow-qa.com/ekhlp8qbaul4gqr" target="_blank" rel="noopener noreferrer" className="hover:underline">
                質問・ネタ提供
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* ナビゲーション（スマホ） */}
      {isOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col space-y-4 text-gray-700 text-center">
            <li><Link href="/" onClick={() => setIsOpen(false)}>Top</Link></li>
            <li><Link href="/articles?page=1" onClick={() => setIsOpen(false)}>まめちしき一覧</Link></li>
            <li><Link href="/begginer" onClick={() => setIsOpen(false)}>新入生向け</Link></li>
            <li><Link href="/calendar" onClick={() => setIsOpen(false)} className="text-blue-600 font-medium">新歓カレンダー</Link></li>
            <li>
              <a href="https://x.com/omuichinen" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://marshmallow-qa.com/ekhlp8qbaul4gqr" target="_blank" rel="noopener noreferrer" className="hover:underline">
                質問・ネタ提供
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
