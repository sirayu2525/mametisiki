import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  image: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchArticles(
  tag?: string,
  page: number = 1
): Promise<{ articles: Article[]; totalPages: number }> {
  let url = `${API_BASE_URL}/api/articles?page=${page}`;
  if (tag) {
    url += `&tag=${encodeURIComponent(tag)}`;
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("記事の取得に失敗しました");

  const data = await res.json();
  return {
    articles: Array.isArray(data.articles) ? data.articles : [],
    totalPages: data.totalPages || 1,
  };
}


// type Params = Promise<{ tag?: string; page: number }>;


export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ tag?: string; page: number }> }) {
  console.log(searchParams);
  const tag = (await searchParams).tag;
  const currentPage = Number((await searchParams).page);
  console.log(tag);
  console.log(currentPage);

  const { articles, totalPages } = await fetchArticles(tag, currentPage);

  const tags = ["雑学","施設・設備","学外","飲食","空きコマ","終了済","その他","行事","勉強","新入生向け","おすすめ","杉本キャンパス","中百舌鳥キャンパス","お得情報"];

  return (
  <>
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        {tag ? `タグ: ${tag}` : "まめちしき一覧"}
      </h1>

      {articles.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <p className="text-center">記事が見つかりません</p>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} currentTag={tag} />
    </div>
    {/* ハッシュタグ一覧を追加 */}
    <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-6">タグ一覧</h1>
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Link href={`/articles?page=1&tag=${encodeURIComponent(tag)}`} className="bg-blue-100 text-blue-600 text-2xl px-2 py-1 rounded hover:bg-blue-200 transition">#{tag}</Link>
            </li>
          ))}
        </ul>
    </div>
  </>
  );
}
