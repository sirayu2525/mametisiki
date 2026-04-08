"use client";

import { Fragment } from "react";
import EventCell from "./EventCell";

const PERIODS = [
  { key: "PERIOD_1", label: "1限" },
  { key: "PERIOD_2", label: "2限" },
  { key: "LUNCH", label: "昼休み" },
  { key: "PERIOD_3", label: "3限" },
  { key: "PERIOD_4", label: "4限" },
  { key: "PERIOD_5", label: "5限" },
  { key: "AFTER_SCHOOL", label: "放課後" },
];

const WEEKDAYS = ["月", "火", "水", "木", "金"];

interface EventData {
  scheduleId: number;
  date: string;
  periods: string[];
  club: {
    id: number;
    name: string;
    image: string | null;
  };
  campus: string;
}

interface WeekdayCalendarProps {
  weekStart: Date;
  events: EventData[];
  onClubClick: (clubId: number) => void;
}

export default function WeekdayCalendar({
  weekStart,
  events,
  onClubClick,
}: WeekdayCalendarProps) {
  // ローカル日付を "YYYY-MM-DD" 形式で取得（タイムゾーン問題を回避）
  const toLocalDateStr = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 日付ごと・時限ごとにイベントをグループ化
  const getEventsForCell = (dayIndex: number, periodKey: string) => {
    const targetDate = new Date(weekStart);
    targetDate.setDate(targetDate.getDate() + dayIndex);
    const targetDateStr = toLocalDateStr(targetDate);

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      const eventDateStr = toLocalDateStr(eventDate);
      return eventDateStr === targetDateStr && event.periods.includes(periodKey);
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-6 gap-px bg-gray-200 dark:bg-gray-700">
        {/* ヘッダー行 */}
        <div className="bg-gray-100 dark:bg-gray-800 p-2 font-bold text-center text-sm dark:text-gray-200">
          時限
        </div>
        {WEEKDAYS.map((day, index) => {
          const date = new Date(weekStart);
          date.setDate(date.getDate() + index);
          return (
            <div
              key={day}
              className="bg-gray-100 dark:bg-gray-800 p-2 font-bold text-center text-sm dark:text-gray-200"
            >
              <span className="block">{day}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {date.getMonth() + 1}/{date.getDate()}
              </span>
            </div>
          );
        })}

        {/* 各時限行 */}
        {PERIODS.map((period) => (
          <Fragment key={period.key}>
            <div className="bg-gray-50 dark:bg-gray-800 p-2 font-medium text-center text-sm flex items-center justify-center dark:text-gray-200">
              {period.label}
            </div>
            {WEEKDAYS.map((_, dayIndex) => (
              <EventCell
                key={`${period.key}-${dayIndex}`}
                events={getEventsForCell(dayIndex, period.key)}
                maxDisplay={3}
                onClubClick={onClubClick}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
