import BegginerList from "@/components/BegginerList";

interface Article {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  tags?: string[];
  image: string;
}


export default function BegginerPage(){
    const articles:Article[] = [
        {
            id: 1,
            title: "履修登録のやり方",
            description: "煩雑な履修登録のやり方をいくつかのTipsを紹介しながら解説します",
            publishedAt: "2025-03-26",
            image: "https://oplydfuaxpsebwxjwipq.supabase.co/storage/v1/object/public/ArticleImages//1.jpg",
        },
        {
            id: 2,
            title: "新入生が迷いやすいことについての解説・アドバイス",
            description: "一般的な疑問について回答しました",
            publishedAt: "2025-03-26",
            image: "https://oplydfuaxpsebwxjwipq.supabase.co/storage/v1/object/public/ArticleImages//1.jpg",
        },
        {
            id: 3,
            title: "合格後のスケジュール・各手続きの手順",
            description: "数多ある手続きを簡潔にまとめました",
            publishedAt: "2025-03-26",
            image: "https://oplydfuaxpsebwxjwipq.supabase.co/storage/v1/object/public/ArticleImages//1.png",
        },
        {
            id: 4,
            title: "学生生活における注意点",
            description: "学生生活において気をつけるべき点を紹介します",
            publishedAt: "2025-03-26",
            image: "https://oplydfuaxpsebwxjwipq.supabase.co/storage/v1/object/public/ArticleImages//1.jpg",
        }
    ]

    return (
        <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-6">
            新入生向けページ
        </h1>
            <BegginerList articles={articles} />
        </div>
    );
    }
