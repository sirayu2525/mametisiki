"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface WelcomeEvent {
  id: number;
  campus: string;
  schedules: {
    id: number;
    date: string;
    isWeekend: boolean;
    periods: string[];
    hours: number[];
  }[];
}

interface WelcomeInfo {
  id: number;
  scheduleImage: string | null;
  scheduleText: string | null;
  events: WelcomeEvent[];
}

interface ClubDetail {
  id: number;
  name: string;
  image: string | null;
  description: string;
  twitterUrl: string | null;
  instagramUrl: string | null;
  hashtags: string[];
  welcomeInfo: WelcomeInfo | null;
}

interface ClubDetailModalProps {
  clubId: number | null;
  onClose: () => void;
}

const CAMPUS_LABELS: Record<string, string> = {
  NAKAMOZU: "中百舌鳥",
  SUGIMOTO: "杉本",
  MORINOMIYA: "森之宮",
  OUTSIDE: "学外",
  ONLINE: "オンライン",
};

// キャンパスごとの色定義
const getCampusBadgeColors = (campus: string) => {
  switch (campus) {
    case "SUGIMOTO":
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
    case "NAKAMOZU":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    case "MORINOMIYA":
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    case "OUTSIDE":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
    case "ONLINE":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
  }
};

const PERIOD_LABELS: Record<string, string> = {
  PERIOD_1: "1限",
  PERIOD_2: "2限",
  LUNCH: "昼休み",
  PERIOD_3: "3限",
  PERIOD_4: "4限",
  PERIOD_5: "5限",
  AFTER_SCHOOL: "放課後",
};

export default function ClubDetailModal({
  clubId,
  onClose,
}: ClubDetailModalProps) {
  const [club, setClub] = useState<ClubDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでのみPortalを使用
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!clubId) {
      setClub(null);
      return;
    }

    const fetchClub = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/clubs/${clubId}`);
        if (!res.ok) {
          throw new Error("団体情報の取得に失敗しました");
        }
        const data = await res.json();
        setClub(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClub();
  }, [clubId]);

  // ESCキーで閉じる
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // モーダルが開いているときはスクロールを無効化
  useEffect(() => {
    if (clubId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [clubId]);

  if (!clubId || !mounted) return null;

  // キャンパス一覧を取得
  const campuses = club?.welcomeInfo?.events.map((e) => e.campus) || [];
  const uniqueCampuses = [...new Set(campuses)];

  // 日付フォーマット
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  };

  // 時間範囲フォーマット
  const formatHours = (hours: number[]) => {
    if (hours.length === 0) return "";
    const sorted = [...hours].sort((a, b) => a - b);
    return `${sorted[0]}:00〜${sorted[sorted.length - 1] + 1}:00`;
  };

  // 時限フォーマット
  const formatPeriods = (periods: string[]) => {
    return periods.map((p) => PERIOD_LABELS[p] || p).join("、");
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white/90 dark:bg-gray-800/90 rounded-full p-1.5 shadow-md hover:bg-white dark:hover:bg-gray-800 transition"
        >
          <svg
            className="w-5 h-5 text-gray-600 dark:text-gray-300"
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

        {/* ローディング */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* エラー */}
        {error && (
          <div className="p-6 text-center text-red-500 dark:text-red-400">
            {error}
          </div>
        )}

        {/* コンテンツ */}
        {club && !isLoading && (
          <>
            {/* 団体画像 */}
            {club.image ? (
              <div className="relative w-full aspect-video">
                <Image
                  src={club.image}
                  alt={club.name}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
            ) : (
              <div className="w-full aspect-video bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-t-xl flex items-center justify-center">
                <span className="text-4xl text-blue-400 dark:text-blue-500">
                  {club.name.charAt(0)}
                </span>
              </div>
            )}

            <div className="p-5 space-y-5">
              {/* 団体名 */}
              <h2 className="text-xl font-bold dark:text-gray-100">
                {club.name}
              </h2>

              {/* 新歓場所 */}
              {uniqueCampuses.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    場所
                  </span>
                  {uniqueCampuses.map((campus) => (
                    <span
                      key={campus}
                      className={`px-2 py-0.5 rounded text-sm font-medium ${getCampusBadgeColors(campus)}`}
                    >
                      {CAMPUS_LABELS[campus] || campus}
                    </span>
                  ))}
                </div>
              )}

              {/* 活動紹介 */}
              {club.description && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    活動紹介
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
                    {club.description}
                  </p>
                </div>
              )}

              {/* 新歓スケジュール */}
              {club.welcomeInfo && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    新歓スケジュール
                  </h3>

                  {/* 日程画像 */}
                  {club.welcomeInfo.scheduleImage && (
                    <div className="relative w-full aspect-video mb-3">
                      <Image
                        src={club.welcomeInfo.scheduleImage}
                        alt="新歓スケジュール"
                        fill
                        className="object-contain bg-gray-100 dark:bg-gray-800 rounded-lg"
                      />
                    </div>
                  )}

                  {/* テキストスケジュール */}
                  {club.welcomeInfo.scheduleText && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap mb-3">
                      {club.welcomeInfo.scheduleText}
                    </p>
                  )}

                  {/* イベント詳細 */}
                  {club.welcomeInfo.events.map((event) =>
                    event.schedules.map((schedule) => (
                      <div
                        key={schedule.id}
                        className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-2"
                      >
                        <div className="flex items-center gap-2 text-sm">
                          <svg
                            className="w-4 h-4 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="font-medium text-blue-700 dark:text-blue-300">
                            {formatDate(schedule.date)}
                          </span>
                          <span className="text-blue-600 dark:text-blue-400">
                            {schedule.isWeekend
                              ? formatHours(schedule.hours)
                              : formatPeriods(schedule.periods)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm mt-1">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-400">
                            {CAMPUS_LABELS[event.campus] || event.campus}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ハッシュタグ */}
              {club.hashtags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    活動タグ
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {club.hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SNSリンク */}
              {(club.twitterUrl || club.instagramUrl) && (
                <div className="flex gap-3 pt-2 border-t dark:border-gray-700">
                  {club.twitterUrl && (
                    <a
                      href={club.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      X
                    </a>
                  )}
                  {club.instagramUrl && (
                    <a
                      href={club.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300 transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      Instagram
                    </a>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
