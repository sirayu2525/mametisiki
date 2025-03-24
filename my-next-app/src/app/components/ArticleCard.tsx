// src/app/components/ArticleCard.tsx
import Link from "next/link";
import Image from "next/image";
import probe from "probe-image-size";


interface Article {
  id: number;
  title: string;
  publishedAt: string;
  tags: string[];
  image: string;
}


export async function getImageSize(url: string): Promise<{ width: number; height: number }> {
  const result = await probe(url);
  return {
    width: result.width,
    height: result.height,
  };
}

export default async function ArticleCard({ id, title, publishedAt, tags, image }: Article) {
  const imageWidth = (await getImageSize(image)).width;
  const imageHeight = (await getImageSize(image)).height;
  
  return (
    <div className="w-full border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
      {/* 画像部分 */}
      <Link href={`/articles/${id}`} className="block rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={imageWidth}  // 画像の実サイズ or 適当な値
          height={imageHeight}
          className="rounded-lg object-cover"
        />
      </Link>


      {/* タイトル */}
      <Link href={`/articles/${id}`} className="block mt-4">
        <h2 className="text-xl font-bold text-gray-900 hover:underline">{title}</h2>
      </Link>

      {/* 投稿日 */}
      <p className="text-xs text-gray-500 mt-1">📅 {new Date(publishedAt).toLocaleDateString("ja-JP")}</p>

      {/* 記事の概要
      <p className="text-gray-600 text-sm mt-2">{description}</p> */}

      {/* タグ表示 */}
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/articles?page=1&tag=${encodeURIComponent(tag)}`} //  タグクリックでタグ検索ページへ移動
            className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded hover:bg-blue-200 transition"
          >
            #{tag}
          </Link>
        ))}
      </div>

      {/* 記事詳細リンク */}
      <Link href={`/articles/${id}`} className="text-blue-500 mt-4 inline-block hover:underline">
        詳しく見る »
      </Link>
    </div>
  );
}
