import CalendarContainer from "./components/CalendarContainer";

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

export default function CalendarPage() {
  const initialWeekStart = getCurrentMonday();

  return (
    <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
      <CalendarContainer initialWeekStart={initialWeekStart} />
    </div>
  );
}
