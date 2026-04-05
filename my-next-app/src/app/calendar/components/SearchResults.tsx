"use client";

import Image from "next/image";

interface ClubData {
  id: number;
  name: string;
  image: string | null;
  description: string;
  hashtags: string[];
  welcomeInfo?: {
    events: {
      campus: string;
    }[];
  };
}

interface SearchResultsProps {
  clubs: ClubData[];
  onClose: () => void;
  onClubClick: (clubId: number) => void;
}

// キャンパスごとの色定義
const getCampusBadgeColors = (campus: string) => {
  switch (campus) {
    case "SUGIMOTO":
      return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
    case "NAKAMOZU":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
    case "MORINOMIYA":
      return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
    case "OUTSIDE":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300";
    case "ONLINE":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300";
  }
};

const CAMPUS_LABELS: Record<string, string> = {
  SUGIMOTO: "杉本",
  NAKAMOZU: "中百舌鳥",
  MORINOMIYA: "森之宮",
  OUTSIDE: "学外",
  ONLINE: "オンライン",
};

export default function SearchResults({ clubs, onClose, onClubClick }: SearchResultsProps) {
  if (clubs.length === 0) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
          検索結果が見つかりませんでした。
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
        <h3 className="font-medium text-sm dark:text-gray-200">
          検索結果: {clubs.length}件の団体
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="divide-y dark:divide-gray-700 max-h-[300px] overflow-y-auto">
        {clubs.map((club) => {
          // キャンパス一覧を取得
          const campuses = club.welcomeInfo?.events.map((e) => e.campus) || [];
          const uniqueCampuses = [...new Set(campuses)];

          return (
            <button
              key={club.id}
              onClick={() => onClubClick(club.id)}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition w-full text-left"
            >
              {club.image ? (
                <Image
                  src={club.image}
                  alt={club.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm truncate dark:text-gray-200">{club.name}</p>
                  {uniqueCampuses.length > 0 && (
                    <div className="flex gap-1 flex-shrink-0">
                      {uniqueCampuses.map((campus) => (
                        <span
                          key={campus}
                          className={`text-xs px-1.5 py-0.5 rounded font-medium ${getCampusBadgeColors(campus)}`}
                        >
                          {CAMPUS_LABELS[campus] || campus}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {club.description}
                </p>
                {club.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {club.hashtags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {club.hashtags.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{club.hashtags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <svg
                className="w-4 h-4 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}
