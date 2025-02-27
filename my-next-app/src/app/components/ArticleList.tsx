"use client";

import ArticleCard from "./ArticleCard";

interface Article {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  image: string;
}

interface ArticleListProps {
  articles: Article[];
  onTagClick?: (tag: string) => void;
}

export default function ArticleList({ articles, onTagClick }: ArticleListProps) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          id={article.id}
          title={article.title}
          description={article.description}
          publishedAt={article.publishedAt}
          tags={article.tags}
          image={article.image} 
          onTagClick={onTagClick}
        />
      ))}
    </div>
  );
}
