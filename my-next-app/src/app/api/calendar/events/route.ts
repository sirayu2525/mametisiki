import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";
import { Campus } from "@prisma/client";

// Fisher-Yates シャッフル
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const weekStart = url.searchParams.get("weekStart");
  const weekEnd = url.searchParams.get("weekEnd");
  const campus = url.searchParams.get("campus");
  const hashtagsParam = url.searchParams.get("hashtags");
  const isWeekend = url.searchParams.get("isWeekend");
  const query = url.searchParams.get("q") || "";

  // 日付範囲は必須
  if (!weekStart || !weekEnd) {
    return NextResponse.json(
      { message: "weekStart and weekEnd are required" },
      { status: 400 }
    );
  }

  // "YYYY-MM-DD" 形式の文字列をローカル時間のDateに変換
  // new Date("YYYY-MM-DD") はUTCとして解釈されるため、ローカル時間に変換する
  const parseLocalDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // 週の開始日（ローカル時間の0:00）
  const weekStartDate = parseLocalDate(weekStart);
  // 週の終了日（ローカル時間の23:59:59.999）
  const weekEndDate = parseLocalDate(weekEnd);
  weekEndDate.setHours(23, 59, 59, 999);

  // ハッシュタグをパース（カンマ区切り）
  const hashtags = hashtagsParam
    ? hashtagsParam.split(",").filter((t) => t.trim())
    : [];

  // クエリ構築
  const schedules = await prisma.eventSchedule.findMany({
    where: {
      date: {
        gte: weekStartDate,
        lte: weekEndDate,
      },
      ...(isWeekend !== null && { isWeekend: isWeekend === "true" }),
      welcomeEvent: {
        ...(campus && { campus: campus as Campus }),
        welcomeInfo: {
          club: {
            // 複数ハッシュタグ: すべてを含む（AND検索）
            ...(hashtags.length > 0 && { hashtags: { hasEvery: hashtags } }),
            // 検索クエリ（団体名または説明）
            ...(query && {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            }),
          },
        },
      },
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

  // レスポンス用にフラット化してシャッフル
  const events = shuffle(schedules.map((schedule) => ({
    scheduleId: schedule.id,
    date: schedule.date,
    isWeekend: schedule.isWeekend,
    periods: schedule.periods,
    hours: schedule.hours,
    campus: schedule.welcomeEvent.campus,
    club: schedule.welcomeEvent.welcomeInfo.club,
  })));

  return NextResponse.json({ events });
}
