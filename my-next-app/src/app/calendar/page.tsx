import CalendarContainer from "./components/CalendarContainer";
import { prisma } from "@/../lib/prisma";

const JAPAN_TIME_ZONE = "Asia/Tokyo";

type JapanToday = {
  year: number;
  month: number;
  day: number;
  weekday: number;
};

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

// Fisher-Yates シャッフル
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getTodayInJapan(): JapanToday {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: JAPAN_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  const parts = formatter.formatToParts(new Date());
  const getPart = (type: "year" | "month" | "day" | "weekday") =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    year: Number(getPart("year")),
    month: Number(getPart("month")),
    day: Number(getPart("day")),
    weekday: weekdayMap[getPart("weekday")] ?? 0,
  };
}

// 今日が属する週の月曜日を取得
function getCurrentMonday(todayInJapan: JapanToday): Date {
  const monday = new Date(
    todayInJapan.year,
    todayInJapan.month - 1,
    todayInJapan.day
  );
  const diff = todayInJapan.weekday === 0 ? -6 : 1 - todayInJapan.weekday;
  monday.setDate(monday.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function getInitialViewMode(todayInJapan: JapanToday): "weekday" | "weekend" {
  const { weekday } = todayInJapan;
  return weekday === 0 || weekday === 6 ? "weekend" : "weekday";
}

async function getInitialEvents(
  weekStart: Date,
  viewMode: "weekday" | "weekend"
): Promise<EventData[]> {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const schedules = await prisma.eventSchedule.findMany({
    where: {
      date: {
        gte: weekStart,
        lte: weekEnd,
      },
      isWeekend: viewMode === "weekend",
    },
    include: {
      welcomeEvent: {
        include: {
          welcomeInfo: {
            include: {
              club: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  hashtags: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return shuffle(
    schedules.map((schedule) => ({
      scheduleId: schedule.id,
      date: schedule.date.toISOString(),
      isWeekend: schedule.isWeekend,
      periods: schedule.periods,
      hours: schedule.hours,
      campus: schedule.welcomeEvent.campus,
      club: schedule.welcomeEvent.welcomeInfo.club,
    }))
  );
}

export default async function CalendarPage() {
  const todayInJapan = getTodayInJapan();
  const initialWeekStart = getCurrentMonday(todayInJapan);
  const initialViewMode = getInitialViewMode(todayInJapan);
  const initialEvents = await getInitialEvents(initialWeekStart, initialViewMode);

  return (
    <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
      <CalendarContainer
        initialWeekStart={initialWeekStart.toISOString()}
        initialViewMode={initialViewMode}
        initialEvents={initialEvents}
      />
    </div>
  );
}
