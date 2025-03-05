// src/components/Footer.tsx
import React from "react";

export default function Footer() {
    return (
<footer className="w-full border-t py-6 px-8 mt-8 bg-white">
  <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
    <div>
      <p>© 2024 大阪公立大学新聞 Hijicho</p>
    </div>
    <ul className="flex gap-6">
      <li>
        <a href="/" className="hover:underline">
          Top
        </a>
      </li>
      <li>
        <a href="/articles&page=1" className="hover:underline">
          記事一覧
        </a>
      </li>
      <li>
        <a href="/begginer" className="hover:underline">
          新入生向け
        </a>
      </li>
    </ul>
  </div>
</footer>

    );
  }
  