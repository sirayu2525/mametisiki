"use client";

interface WeekSelectorProps {
  currentWeek: Date;
  onChange: (date: Date) => void;
}

export default function WeekSelector({
  currentWeek,
  onChange,
}: WeekSelectorProps) {
  // 週の木曜日を基準に月と週番号を計算（ISO週番号方式）
  const getWeekInfo = (monday: Date) => {
    // 週の木曜日を取得（月曜+3日）
    const thursday = new Date(monday);
    thursday.setDate(monday.getDate() + 3);

    const month = thursday.getMonth() + 1;
    const year = thursday.getFullYear();

    // その月の最初の木曜日を見つける
    const firstOfMonth = new Date(year, thursday.getMonth(), 1);
    const firstThursday = new Date(firstOfMonth);
    const dayOfWeek = firstOfMonth.getDay();
    // 木曜日=4
    const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
    firstThursday.setDate(firstOfMonth.getDate() + daysUntilThursday);

    // 週番号を計算
    const weekNum = Math.floor((thursday.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;

    return { month, weekNum };
  };

  const formatWeekRange = (monday: Date) => {
    const sunday = new Date(monday);
    sunday.setDate(sunday.getDate() + 6);

    const { month, weekNum } = getWeekInfo(monday);
    const dayStart = monday.getDate();
    const dayEnd = sunday.getDate();

    return {
      main: `${month}月第${weekNum}週`,
      sub: `（${dayStart}日-${dayEnd}日）`,
    };
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    onChange(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    onChange(newDate);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={goToPreviousWeek}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        aria-label="前の週"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="text-center min-w-[140px]">
        <span className="font-medium dark:text-gray-200">
          {formatWeekRange(currentWeek).main}
        </span>
        <span className="block text-xs text-gray-500 dark:text-gray-400">
          {formatWeekRange(currentWeek).sub}
        </span>
      </div>

      <button
        onClick={goToNextWeek}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        aria-label="次の週"
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
