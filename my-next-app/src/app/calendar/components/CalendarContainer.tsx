"use client";

import { useState, useEffect, useCallback } from "react";
import WeekSelector from "./WeekSelector";
import ViewToggle from "./ViewToggle";
import FilterPanel from "./FilterPanel";
import SearchBar from "./SearchBar";
import WeekdayCalendar from "./WeekdayCalendar";
import WeekendCalendar from "./WeekendCalendar";
import SearchResults from "./SearchResults";
import ClubDetailModal from "./ClubDetailModal";
import { PREDEFINED_HASHTAGS, CAMPUSES } from "../config";

interface CalendarContainerProps {
  initialWeekStart: Date;
}

interface EventData {
  scheduleId: number;
  date: string;
  isWeekend: boolean;
  periods: string[];
  hours: number[];
  campus: string;
  club: {
    id: number;
    name: string;
    image: string | null;
    hashtags: string[];
  };
}

interface ClubData {
  id: number;
  name: string;
  image: string | null;
  description: string;
  hashtags: string[];
}

export default function CalendarContainer({
  initialWeekStart,
}: CalendarContainerProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date(initialWeekStart));
  const [viewMode, setViewMode] = useState<"weekday" | "weekend">("weekday");
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");

  const [events, setEvents] = useState<EventData[]>([]);
  const [searchResults, setSearchResults] = useState<ClubData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClubId, setSelectedClubId] = useState<number | null>(null);

  // 検索実行
  const handleSearch = useCallback(() => {
    setAppliedSearchQuery(searchQuery);
  }, [searchQuery]);

  // イベント取得
  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const weekEnd = new Date(currentWeek);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const params = new URLSearchParams({
        weekStart: currentWeek.toISOString().split("T")[0],
        weekEnd: weekEnd.toISOString().split("T")[0],
        isWeekend: String(viewMode === "weekend"),
      });

      if (selectedCampus) {
        params.set("campus", selectedCampus);
      }
      if (selectedHashtags.length > 0) {
        params.set("hashtags", selectedHashtags.join(","));
      }
      if (appliedSearchQuery.trim()) {
        params.set("q", appliedSearchQuery.trim());
      }

      const res = await fetch(`/api/calendar/events?${params}`);
      const data = await res.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentWeek, viewMode, selectedCampus, selectedHashtags, appliedSearchQuery]);

  // 検索実行（検索クエリ、キャンパス、タグのいずれかがある場合）
  const fetchSearchResults = useCallback(async () => {
    // フィルターが何もない場合は結果をクリア
    if (!appliedSearchQuery.trim() && !selectedCampus && selectedHashtags.length === 0) {
      setSearchResults(null);
      return;
    }

    try {
      const params = new URLSearchParams();
      if (appliedSearchQuery.trim()) {
        params.set("q", appliedSearchQuery);
      }
      if (selectedCampus) {
        params.set("campus", selectedCampus);
      }
      if (selectedHashtags.length > 0) {
        params.set("hashtags", selectedHashtags.join(","));
      }

      const res = await fetch(`/api/calendar/events/search?${params}`);
      const data = await res.json();
      setSearchResults(data.clubs || []);
    } catch (error) {
      console.error("Failed to search:", error);
      setSearchResults([]);
    }
  }, [appliedSearchQuery, selectedCampus, selectedHashtags]);

  // イベント取得（週・表示モード・フィルター変更時）
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // 検索実行（検索クエリ変更時）
  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  return (
    <div className="space-y-4">
      {/* ヘッダー：タイトル＆検索 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <svg
            className="w-6 h-6 text-gray-600 dark:text-gray-400"
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
          <h1 className="text-xl font-bold dark:text-gray-100">
            2026年度 新歓時間割カレンダー
          </h1>
        </div>
        <div className="w-full sm:w-auto">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>
      </div>

      {/* 週切り替え＆表示モード（中央寄せ） */}
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <WeekSelector currentWeek={currentWeek} onChange={setCurrentWeek} />
        <ViewToggle mode={viewMode} onChange={setViewMode} />
      </div>

      {/* フィルター */}
      <FilterPanel
        campuses={[...CAMPUSES]}
        hashtags={PREDEFINED_HASHTAGS}
        selectedCampus={selectedCampus}
        selectedHashtags={selectedHashtags}
        onCampusChange={setSelectedCampus}
        onHashtagsChange={setSelectedHashtags}
      />

      {/* 検索結果 */}
      {searchResults && (
        <SearchResults
          clubs={searchResults}
          onClose={() => {
            setSearchQuery("");
            setAppliedSearchQuery("");
            setSelectedCampus(null);
            setSelectedHashtags([]);
            setSearchResults(null);
          }}
          onClubClick={(clubId) => setSelectedClubId(clubId)}
        />
      )}

      {/* ローディング */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* カレンダー表示 */}
      {!isLoading && (
        <>
          {viewMode === "weekday" ? (
            <WeekdayCalendar
              weekStart={currentWeek}
              events={events}
              onClubClick={(clubId) => setSelectedClubId(clubId)}
            />
          ) : (
            <WeekendCalendar
              weekStart={currentWeek}
              events={events}
              onClubClick={(clubId) => setSelectedClubId(clubId)}
            />
          )}
        </>
      )}

      {/* イベントがない場合 */}
      {!isLoading && events.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>この週の新歓イベントはありません</p>
        </div>
      )}

      {/* 団体詳細モーダル */}
      <ClubDetailModal
        clubId={selectedClubId}
        onClose={() => setSelectedClubId(null)}
      />
    </div>
  );
}
