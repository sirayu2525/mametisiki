import CalendarContainer from "./components/CalendarContainer";
import { prisma } from "@/../lib/prisma";

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

// 今週の月曜日を取得
function getCurrentMonday(): Date {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today);
  monday.setDate(diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

async function getInitialEvents(weekStart: Date): Promise<EventData[]> {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const schedules = await prisma.eventSchedule.findMany({
    where: {
      date: {
        gte: weekStart,
        lte: weekEnd,
      },
      isWeekend: false,
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
  const initialWeekStart = getCurrentMonday();
  const initialEvents = await getInitialEvents(initialWeekStart);

  return (
    <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
      <CalendarContainer
        initialWeekStart={initialWeekStart.toISOString()}
        initialEvents={initialEvents}
      />
    </div>
  );
}
