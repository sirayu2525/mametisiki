import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";
import { Campus } from "@prisma/client";

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

  // ハッシュタグをパース（カンマ区切り）
  const hashtags = hashtagsParam
    ? hashtagsParam.split(",").filter((t) => t.trim())
    : [];

  // クエリ構築
  const schedules = await prisma.eventSchedule.findMany({
    where: {
      date: {
        gte: new Date(weekStart),
        lte: new Date(weekEnd),
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

  // ランダムシャッフル
  const shuffled = schedules.sort(() => Math.random() - 0.5);

  // レスポンス用にフラット化
  const events = shuffled.map((schedule) => ({
    scheduleId: schedule.id,
    date: schedule.date,
    isWeekend: schedule.isWeekend,
    periods: schedule.periods,
    hours: schedule.hours,
    campus: schedule.welcomeEvent.campus,
    club: schedule.welcomeEvent.welcomeInfo.club,
  }));

  return NextResponse.json({ events });
}
