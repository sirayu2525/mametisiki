// src/app/components/ArticleList.tsx
import BegginerCard from "./BegginerCard";

interface Article {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  tags?: string[];
  image: string;
}

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {articles.map((article) => (
        <BegginerCard
          key={article.id}
          id={article.id}
          title={article.title}
          description={article.description}
          publishedAt={article.publishedAt}
          tags={article.tags}
          image={article.image} 
        />
      ))}
    </div>
  );
}
