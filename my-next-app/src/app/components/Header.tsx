import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
        <Image
          src="/images/hamubasu.jpg"
          alt="ハムバス ロゴ"
          width={160} // サイズ調整はここで
          height={10}
          className="h-auto w-auto"
        />
      </Link>
      <nav>
        <ul className="flex space-x-6 text-gray-700">
          <li><Link href="/">Top</Link></li>
          <li><Link href="/articles?page=1">まめちしき一覧</Link></li>
          <li><Link href="/begginer">新入生向け</Link></li>
          {/* Twitterは外部リンクなので <a> を使用 */}
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
    </header>
  );
}
