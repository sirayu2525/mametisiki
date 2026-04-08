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
  const query = url.searchParams.get("q") || "";
  const campus = url.searchParams.get("campus");
  const hashtagsParam = url.searchParams.get("hashtags");

  // ハッシュタグをパース（カンマ区切り）
  const hashtags = hashtagsParam
    ? hashtagsParam.split(",").filter((t) => t.trim())
    : [];

  // 検索条件を構築
  const clubs = await prisma.club.findMany({
    where: {
      AND: [
        // 検索クエリ（団体名または説明）
        query
          ? {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
                {
                  welcomeInfo: {
                    scheduleText: { contains: query, mode: "insensitive" },
                  },
                },
              ],
            }
          : {},
        // ハッシュタグフィルター（複数: すべてを含む・AND検索）
        hashtags.length > 0 ? { hashtags: { hasEvery: hashtags } } : {},
        // キャンパスフィルター
        campus
          ? {
              welcomeInfo: {
                events: {
                  some: { campus: campus as Campus },
                },
              },
            }
          : {},
        // 新歓情報を持つ団体のみ
        {
          welcomeInfo: {
            isNot: null,
          },
        },
      ],
    },
    include: {
      welcomeInfo: {
        include: {
          events: {
            include: {
              schedules: true,
            },
          },
        },
      },
    },
  });

  // ランダム化して返す
  return NextResponse.json({ clubs: shuffle(clubs) });
}
