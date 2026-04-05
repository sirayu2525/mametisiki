"use client";

import { useState } from "react";

interface EventData {
  scheduleId: number;
  club: {
    id: number;
    name: string;
  };
  campus: string;
}

interface EventCellProps {
  events: EventData[];
  maxDisplay?: number;
  onClubClick: (clubId: number) => void;
}

// キャンパスごとの色定義
const getCampusColors = (campus: string) => {
  switch (campus) {
    case "SUGIMOTO":
      return "bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 border-red-200 dark:border-red-800";
    case "NAKAMOZU":
      return "bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 border-blue-200 dark:border-blue-800";
    case "MORINOMIYA":
      return "bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 border-green-200 dark:border-green-800";
    case "OUTSIDE":
      return "bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 border-purple-200 dark:border-purple-800";
    case "ONLINE":
      return "bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50 border-gray-200 dark:border-gray-800";
    default:
      return "bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50 border-gray-200 dark:border-gray-800";
  }
};

export default function EventCell({ events, maxDisplay = 3, onClubClick }: EventCellProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (events.length === 0) {
    return <div className="border dark:border-gray-700 p-1 min-h-[80px] bg-gray-50 dark:bg-gray-800 overflow-hidden"></div>;
  }

  const displayEvents = isExpanded ? events : events.slice(0, maxDisplay);
  const hasMore = events.length > maxDisplay;

  return (
    <div className="border dark:border-gray-700 p-1 min-h-[80px] bg-white dark:bg-gray-900 overflow-hidden">
      <div className="space-y-1 overflow-hidden">
        {displayEvents.map((event) => (
          <button
            key={`${event.scheduleId}-${event.club.id}`}
            onClick={() => onClubClick(event.club.id)}
            className={`block w-full text-left p-1 rounded text-xs transition overflow-hidden border ${getCampusColors(event.campus)}`}
          >
            <span className="block truncate dark:text-gray-200">{event.club.name}</span>
          </button>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-blue-500 dark:text-blue-400 hover:underline mt-1 w-full text-left"
        >
          {isExpanded ? "閉じる" : `+${events.length - maxDisplay}件を表示`}
        </button>
      )}
    </div>
  );
}
