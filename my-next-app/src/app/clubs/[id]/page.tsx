import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/../lib/prisma";
import { Campus } from "@prisma/client";

const CAMPUS_LABELS: Record<Campus, string> = {
  NAKAMOZU: "中百舌鳥キャンパス",
  SUGIMOTO: "杉本キャンパス",
  MORINOMIYA: "森之宮キャンパス",
  OUTSIDE: "学外",
  ONLINE: "オンライン",
};

async function getClub(id: string) {
  return await prisma.club.findUnique({
    where: { id: Number(id) },
    include: {
      welcomeInfo: {
        include: {
          events: {
            include: {
              schedules: true,
            },
          },
        },
      },
    },
  });
}

export default async function ClubDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const club = await getClub(id);

  if (!club) {
    return notFound();
  }

  // キャンパス一覧を取得
  const campuses =
    club.welcomeInfo?.events.map((e) => CAMPUS_LABELS[e.campus]) || [];
  const uniqueCampuses = [...new Set(campuses)];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* 団体画像 */}
      {club.image && (
        <div className="w-full mb-6 relative aspect-video">
          <Image
            src={club.image}
            alt={club.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      )}

      {/* 団体名 */}
      <h1 className="text-3xl font-bold mb-4 dark:text-gray-100">{club.name}</h1>

      {/* 新歓場所 */}
      {uniqueCampuses.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">新歓開催場所</h2>
          <div className="flex flex-wrap gap-2">
            {uniqueCampuses.map((campus) => (
              <span
                key={campus}
                className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-sm"
              >
                {campus}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 自由記述 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">団体について</h2>
        <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{club.description}</p>
      </div>

      {/* 日程画像またはテキストスケジュール */}
      {club.welcomeInfo && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">新歓スケジュール</h2>
          {club.welcomeInfo.scheduleImage && (
            <div className="relative w-full aspect-video mb-4">
              <Image
                src={club.welcomeInfo.scheduleImage}
                alt="新歓スケジュール"
                fill
                className="rounded-lg object-contain bg-gray-100 dark:bg-gray-800"
              />
            </div>
          )}
          {club.welcomeInfo.scheduleText && (
            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {club.welcomeInfo.scheduleText}
            </p>
          )}
        </div>
      )}

      {/* ハッシュタグ */}
      {club.hashtags.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {club.hashtags.map((tag) => (
              <Link
                key={tag}
                href={`/calendar?hashtag=${encodeURIComponent(tag)}`}
                className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 px-3 py-1 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* SNSリンク */}
      <div className="flex gap-4 mb-8">
        {club.twitterUrl && (
          <a
            href={club.twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X (Twitter)
          </a>
        )}
        {club.instagramUrl && (
          <a
            href={club.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Instagram
          </a>
        )}
      </div>

      {/* カレンダーに戻るリンク */}
      <div className="border-t dark:border-gray-700 pt-6">
        <Link
          href="/calendar"
          className="text-blue-500 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          カレンダーに戻る
        </Link>
      </div>
    </div>
  );
}
