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
            title: "新入生向けページ",
            description: "新入生向けのページです。",
            publishedAt: "2022-01-01",
            image: "https://oplydfuaxpsebwxjwipq.supabase.co/storage/v1/object/public/ArticleImages//1.jpg",
        },
        {
            id: 2,
            title: "新入生向けページ",
            description: "新入生向けのページです。",
            publishedAt: "2022-01-01",
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
