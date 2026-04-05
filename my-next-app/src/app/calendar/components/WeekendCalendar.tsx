"use client";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 9); // 9:00 - 20:00
const HOUR_HEIGHT = 60; // 1時間あたりの高さ（px）

interface EventData {
  scheduleId: number;
  date: string;
  hours: number[];
  club: {
    id: number;
    name: string;
    image: string | null;
  };
  campus: string;
}

interface WeekendCalendarProps {
  weekStart: Date;
  events: EventData[];
  onClubClick: (clubId: number) => void;
}

// キャンパスごとの色定義
const getCampusColors = (campus: string) => {
  switch (campus) {
    case "SUGIMOTO":
      return "bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800";
    case "NAKAMOZU":
      return "bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800";
    case "MORINOMIYA":
      return "bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 border border-green-200 dark:border-green-800";
    case "OUTSIDE":
      return "bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800";
    case "ONLINE":
      return "bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50 border border-gray-200 dark:border-gray-800";
    default:
      return "bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50 border border-gray-200 dark:border-gray-800";
  }
};

const CAMPUS_LABELS: Record<string, string> = {
  SUGIMOTO: "杉本キャンパス",
  NAKAMOZU: "中百舌鳥キャンパス",
  MORINOMIYA: "森之宮キャンパス",
  OUTSIDE: "学外",
  ONLINE: "オンライン",
};

// イベントの時間範囲を計算
interface EventBlock {
  event: EventData;
  startHour: number;
  endHour: number;
  column: number; // 重なり時の列番号
  totalColumns: number; // 重なり時の総列数
}

// 重なりを検出して列を割り当て
function assignColumns(events: EventBlock[]): EventBlock[] {
  if (events.length === 0) return [];

  // 開始時間でソート
  const sorted = [...events].sort((a, b) => a.startHour - b.startHour);
  const result: EventBlock[] = [];

  for (const event of sorted) {
    // このイベントと重なる既存イベントを探す
    const overlapping = result.filter(
      (e) => !(e.endHour <= event.startHour || e.startHour >= event.endHour)
    );

    // 使用されていない最小の列番号を見つける
    const usedColumns = new Set(overlapping.map((e) => e.column));
    let column = 0;
    while (usedColumns.has(column)) column++;

    result.push({ ...event, column });
  }

  // 各グループの総列数を計算
  for (const event of result) {
    const overlapping = result.filter(
      (e) => !(e.endHour <= event.startHour || e.startHour >= event.endHour)
    );
    event.totalColumns = Math.max(...overlapping.map((e) => e.column)) + 1;
  }

  return result;
}

export default function WeekendCalendar({
  weekStart,
  events,
  onClubClick,
}: WeekendCalendarProps) {
  // 土曜日と日曜日の日付を計算
  const saturday = new Date(weekStart);
  saturday.setDate(saturday.getDate() + 5);

  const sunday = new Date(weekStart);
  sunday.setDate(sunday.getDate() + 6);

  // 日付ごとにイベントをグループ化し、時間範囲を計算
  const getEventsForDay = (targetDate: Date): EventBlock[] => {
    const targetDateStr = targetDate.toISOString().split("T")[0];

    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.date).toISOString().split("T")[0];
      return eventDate === targetDateStr;
    });

    // 同じ団体・同じ日のイベントをまとめる
    const groupedEvents = new Map<string, EventData>();
    for (const event of dayEvents) {
      const key = `${event.club.id}`;
      const existing = groupedEvents.get(key);
      if (existing) {
        // 時間を統合
        const mergedHours = [...new Set([...existing.hours, ...event.hours])];
        groupedEvents.set(key, { ...existing, hours: mergedHours });
      } else {
        groupedEvents.set(key, event);
      }
    }

    // EventBlockに変換
    const blocks: EventBlock[] = Array.from(groupedEvents.values()).map(
      (event) => {
        const sortedHours = [...event.hours].sort((a, b) => a - b);
        return {
          event,
          startHour: sortedHours[0],
          endHour: sortedHours[sortedHours.length - 1] + 1,
          column: 0,
          totalColumns: 1,
        };
      }
    );

    return assignColumns(blocks);
  };

  const saturdayEvents = getEventsForDay(saturday);
  const sundayEvents = getEventsForDay(sunday);

  const renderEventBlock = (block: EventBlock) => {
    const top = (block.startHour - 9) * HOUR_HEIGHT;
    const height = (block.endHour - block.startHour) * HOUR_HEIGHT - 2;
    const width = `calc(${100 / block.totalColumns}% - 4px)`;
    const left = `calc(${(block.column / block.totalColumns) * 100}% + 2px)`;

    const campusLabel = CAMPUS_LABELS[block.event.campus] || block.event.campus;

    return (
      <button
        key={`${block.event.scheduleId}-${block.event.club.id}`}
        onClick={() => onClubClick(block.event.club.id)}
        className={`absolute rounded p-2 text-left overflow-hidden transition ${getCampusColors(block.event.campus)}`}
        style={{
          top: `${top}px`,
          height: `${height}px`,
          width,
          left,
        }}
      >
        <div className="font-medium text-sm truncate text-gray-800 dark:text-gray-200">
          {block.event.club.name}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {block.startHour}:00 - {block.endHour}:00
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
          {campusLabel}
        </div>
      </button>
    );
  };

  return (
    <div className="overflow-x-auto">
      <div
        className="grid bg-gray-200 dark:bg-gray-700"
        style={{ gridTemplateColumns: "80px 1fr 1fr" }}
      >
        {/* ヘッダー行 */}
        <div className="bg-gray-100 dark:bg-gray-800 p-3 font-bold text-center text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
          時刻
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 font-bold text-center text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
          <span className="block text-base">土曜日</span>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 font-bold text-center text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
          <span className="block text-base">日曜日</span>
        </div>

        {/* 時間グリッド列 */}
        <div className="bg-white dark:bg-gray-900">
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="border-b border-gray-200 dark:border-gray-700 flex items-start justify-center pt-1 text-sm text-gray-600 dark:text-gray-400"
              style={{ height: `${HOUR_HEIGHT}px` }}
            >
              {hour}:00
            </div>
          ))}
        </div>

        {/* 土曜日イベント */}
        <div
          className="relative bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700"
          style={{ height: `${HOURS.length * HOUR_HEIGHT}px` }}
        >
          {/* 時間グリッド線 */}
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="absolute w-full border-b border-gray-100 dark:border-gray-800"
              style={{ top: `${(hour - 9) * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }}
            />
          ))}
          {/* イベントブロック */}
          {saturdayEvents.map(renderEventBlock)}
        </div>

        {/* 日曜日イベント */}
        <div
          className="relative bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700"
          style={{ height: `${HOURS.length * HOUR_HEIGHT}px` }}
        >
          {/* 時間グリッド線 */}
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="absolute w-full border-b border-gray-100 dark:border-gray-800"
              style={{ top: `${(hour - 9) * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }}
            />
          ))}
          {/* イベントブロック */}
          {sundayEvents.map(renderEventBlock)}
        </div>
      </div>
    </div>
  );
}
