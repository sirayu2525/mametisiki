// src/app/api/articles/[id]/route.ts
import { NextResponse } from "next/server";

const articles = [
  { id: 1, title: "記事1", content: "記事1の詳細な内容です。" },
  { id: 2, title: "記事2", content: "記事2の詳細な内容です。" },
  { id: 3, title: "記事3", content: "記事3の詳細な内容です。" },
];

export async function GET(request: Request, context: { params: { id: string } }) {
  // params を await で解決
  const { id } = await Promise.resolve(context.params);
  // const { id } = context.params;  こっちのほうがいいらしい（未検証）

  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return NextResponse.json({ message: "記事が見つかりません" }, { status: 404 });
  }

  return NextResponse.json(article);
}
