import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";

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

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        {tag ? `タグ: ${tag}` : "記事一覧"}
      </h1>

      {articles.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <p className="text-center text-gray-500">記事が見つかりません</p>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} currentTag={tag} />
    </div>
  );
}
