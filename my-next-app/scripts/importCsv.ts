import { PrismaClient, Campus, Period } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { parse } from "csv-parse/sync";

const prisma = new PrismaClient();

// Supabase設定
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

type ScheduleColumn = {
  index: number;
  dateStr: string;
};

type CampusScheduleConfig = {
  campusIdx?: number;
  weekdayColumns: ScheduleColumn[];
  weekendColumns: ScheduleColumn[];
};

type ColumnIndices = {
  clubName?: number;
  clubImage?: number;
  instagram?: number;
  twitter?: number;
  scheduleImage?: number;
  scheduleText?: number;
  description?: number;
  hashtags?: number;
  campus1?: number;
  campus2?: number;
  campus3?: number;
  weekday1Columns: ScheduleColumn[];
  weekday2Columns: ScheduleColumn[];
  weekday3Columns: ScheduleColumn[];
  weekend1Columns: ScheduleColumn[];
  weekend2Columns: ScheduleColumn[];
  weekend3Columns: ScheduleColumn[];
};

// 時限の表記揺れ吸収
const PERIOD_MAPPING: Record<string, Period> = {
  "1限": Period.PERIOD_1,
  "１限": Period.PERIOD_1,
  "1限目": Period.PERIOD_1,
  "１限目": Period.PERIOD_1,
  "2限": Period.PERIOD_2,
  "２限": Period.PERIOD_2,
  "2限目": Period.PERIOD_2,
  "２限目": Period.PERIOD_2,
  "昼": Period.LUNCH,
  "昼休み": Period.LUNCH,
  "お昼": Period.LUNCH,
  "3限": Period.PERIOD_3,
  "３限": Period.PERIOD_3,
  "3限目": Period.PERIOD_3,
  "３限目": Period.PERIOD_3,
  "4限": Period.PERIOD_4,
  "４限": Period.PERIOD_4,
  "4限目": Period.PERIOD_4,
  "４限目": Period.PERIOD_4,
  "5限": Period.PERIOD_5,
  "５限": Period.PERIOD_5,
  "5限目": Period.PERIOD_5,
  "５限目": Period.PERIOD_5,
  "放課後": Period.AFTER_SCHOOL,
  "放課": Period.AFTER_SCHOOL,
};

// キャンパス名マッピング
const CAMPUS_MAPPING: Record<string, Campus> = {
  "中百舌鳥": Campus.NAKAMOZU,
  "中百舌鳥キャンパス": Campus.NAKAMOZU,
  "なかもず": Campus.NAKAMOZU,
  "杉本": Campus.SUGIMOTO,
  "杉本キャンパス": Campus.SUGIMOTO,
  "森之宮": Campus.MORINOMIYA,
  "森之宮キャンパス": Campus.MORINOMIYA,
  "森ノ宮": Campus.MORINOMIYA,
  "森ノ宮キャンパス": Campus.MORINOMIYA,
  "学外": Campus.OUTSIDE,
  "オンライン": Campus.ONLINE,
  "online": Campus.ONLINE,
  "Online": Campus.ONLINE,
};

// Google DriveのファイルIDを抽出
function extractGoogleDriveFileId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Google DriveからSupabaseへ画像アップロード
async function uploadImageToSupabase(
  googleDriveUrl: string,
  filename: string
): Promise<string | null> {
  try {
    const fileId = extractGoogleDriveFileId(googleDriveUrl);
    if (!fileId) {
      console.log(`  - Invalid Google Drive URL: ${googleDriveUrl}`);
      return null;
    }

    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    console.log(`  - Downloading from: ${downloadUrl}`);

    const response = await fetch(downloadUrl);
    if (!response.ok) {
      console.log(`  - Download failed: ${response.status}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Supabase Storageにアップロード
    const { data, error } = await supabase.storage
      .from("club-images")
      .upload(`clubs/${filename}`, buffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.error("  - Upload error:", error.message);
      return null;
    }

    // 公開URLを返す
    const { data: urlData } = supabase.storage
      .from("club-images")
      .getPublicUrl(`clubs/${filename}`);

    console.log(`  - Uploaded: ${urlData.publicUrl}`);
    return urlData.publicUrl;
  } catch (error) {
    console.error("  - Image upload failed:", error);
    return null;
  }
}

// 時限文字列をパース（カンマ区切り）
function parsePeriods(periodStr: string): Period[] {
  if (!periodStr || periodStr.trim() === "") return [];

  const periods: Period[] = [];
  const parts = periodStr.split(/[,、]/).map(s => s.trim());

  for (const part of parts) {
    const period = PERIOD_MAPPING[part];
    if (period && !periods.includes(period)) {
      periods.push(period);
    }
  }

  return periods;
}

// 時間文字列をパース（土日用、カンマ区切り）
function parseHours(hourStr: string): number[] {
  if (!hourStr || hourStr.trim() === "") return [];

  const hours: number[] = [];
  const parts = hourStr.split(/[,、]/).map(s => s.trim());

  for (const part of parts) {
    // "9:00" や "9" を解析
    const match = part.match(/^(\d{1,2})/);
    if (match) {
      const hour = parseInt(match[1], 10);
      if (hour >= 9 && hour <= 20 && !hours.includes(hour)) {
        hours.push(hour);
      }
    }
  }

  return hours;
}

// ハッシュタグをパース
function parseHashtags(hashtagStr: string): string[] {
  if (!hashtagStr || hashtagStr.trim() === "") return [];
  return hashtagStr.split(",").map(s => s.trim()).filter(s => s !== "");
}

function getCell(row: string[], index?: number): string {
  return index === undefined ? "" : row[index] || "";
}

// 日付文字列をDateに変換
function parseDate(dateStr: string, year: number = 2026): Date {
  const [month, day] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function parseScheduleHeader(header: string):
  | { place: 1 | 2 | 3; kind: "weekday" | "weekend"; dateStr: string }
  | null {
  const placeMatch = header.match(/場所([①②③])/);
  const dateMatch = header.match(/\[(\d{1,2}\/\d{1,2})\(/);

  if (!placeMatch || !dateMatch) return null;

  const placeMap = { "①": 1, "②": 2, "③": 3 } as const;
  const place = placeMap[placeMatch[1] as keyof typeof placeMap];
  const kind = header.includes("（平日）") ? "weekday" : header.includes("（土日）") ? "weekend" : null;

  if (!place || !kind) return null;

  return {
    place,
    kind,
    dateStr: dateMatch[1],
  };
}

// CSVのヘッダーからインデックスを取得するヘルパー
function getColumnIndices(headers: string[]): ColumnIndices {
  const indices: ColumnIndices = {
    weekday1Columns: [],
    weekday2Columns: [],
    weekday3Columns: [],
    weekend1Columns: [],
    weekend2Columns: [],
    weekend3Columns: [],
  };

  headers.forEach((header, index) => {
    // 基本情報
    if (header === "団体名") indices.clubName = index;
    if (header === "団体画像") indices.clubImage = index;
    if (header === "団体のSNSリンク（インスタ）") indices.instagram = index;
    if (header === "団体のSNSリンク（X）") indices.twitter = index;
    if (header === "日程画像のアップロード") indices.scheduleImage = index;
    if (header === "新歓の詳細説明・日程を入力（日程画像を入力した場合は不要）") indices.scheduleText = index;
    if (header === "団体説明を入力") indices.description = index;
    if (header === "ハッシュタグを選択") indices.hashtags = index;

    // 場所
    if (header === "新歓の開催場所①を入力") indices.campus1 = index;
    if (header === "新歓の開催場所を入力②") indices.campus2 = index;
    if (header === "新歓の開催場所を入力③") indices.campus3 = index;

    const scheduleHeader = parseScheduleHeader(header);
    if (scheduleHeader) {
      const key = `${scheduleHeader.kind}${scheduleHeader.place}Columns` as keyof Pick<
        ColumnIndices,
        | "weekday1Columns"
        | "weekday2Columns"
        | "weekday3Columns"
        | "weekend1Columns"
        | "weekend2Columns"
        | "weekend3Columns"
      >;
      indices[key].push({
        index,
        dateStr: scheduleHeader.dateStr,
      });
    }
  });

  return indices;
}

// 既存データを全削除
async function clearAllData() {
  console.log("Clearing existing data...");

  // 依存関係の順番で削除（子→親）
  await prisma.eventSchedule.deleteMany();
  console.log("  - Deleted all EventSchedule");

  await prisma.welcomeEvent.deleteMany();
  console.log("  - Deleted all WelcomeEvent");

  await prisma.welcomeInfo.deleteMany();
  console.log("  - Deleted all WelcomeInfo");

  await prisma.club.deleteMany();
  console.log("  - Deleted all Club");

  console.log("All existing data cleared.\n");
}

// メインインポート関数
async function importCsv(csvPath: string) {
  console.log(`Reading CSV from: ${csvPath}`);

  // 既存データを削除して宣言的に置き換え
  await clearAllData();
  const fileContent = fs.readFileSync(csvPath, "utf-8");

  const records = parse(fileContent, {
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  });

  const headers = records[0] as string[];
  const dataRows = records.slice(1) as string[][];

  console.log(`Found ${dataRows.length} records`);

  const indices = getColumnIndices(headers);
  console.log("Column indices:", indices);

  if (indices.clubName === undefined) {
    throw new Error("CSV header is missing required column: 団体名");
  }

  for (let rowIndex = 0; rowIndex < dataRows.length; rowIndex++) {
    const row = dataRows[rowIndex];
    const clubName = row[indices.clubName];

    if (!clubName || clubName.trim() === "") {
      console.log(`Skipping row ${rowIndex + 2}: No club name`);
      continue;
    }

    console.log(`\n[${rowIndex + 1}/${dataRows.length}] Processing: ${clubName}`);

    try {
      // 1. 画像をアップロード
      let clubImageUrl: string | null = null;
      let scheduleImageUrl: string | null = null;

      const clubImageDriveUrl = getCell(row, indices.clubImage);
      if (clubImageDriveUrl) {
        console.log("  Uploading club image...");
        clubImageUrl = await uploadImageToSupabase(
          clubImageDriveUrl,
          `club_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.jpg`
        );
      }

      const scheduleImageDriveUrl = getCell(row, indices.scheduleImage);
      if (scheduleImageDriveUrl) {
        // 複数画像がカンマ区切りの場合は最初の1枚のみ
        const firstImageUrl = scheduleImageDriveUrl.split(",")[0].trim();
        console.log("  Uploading schedule image...");
        scheduleImageUrl = await uploadImageToSupabase(
          firstImageUrl,
          `schedule_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.jpg`
        );
      }

      // 2. ハッシュタグをパース
      const hashtags = parseHashtags(getCell(row, indices.hashtags));

      // 3. 団体を作成
      const club = await prisma.club.create({
        data: {
          name: clubName,
          description: getCell(row, indices.description),
          image: clubImageUrl,
          twitterUrl: getCell(row, indices.twitter) || null,
          instagramUrl: getCell(row, indices.instagram) || null,
          hashtags,
        },
      });
      console.log(`  Created club: ID=${club.id}`);

      // 4. 新歓情報を作成
      const welcomeInfo = await prisma.welcomeInfo.create({
        data: {
          clubId: club.id,
          scheduleImage: scheduleImageUrl,
          scheduleText: getCell(row, indices.scheduleText) || null,
        },
      });
      console.log(`  Created welcomeInfo: ID=${welcomeInfo.id}`);

      // 5. 各場所のイベントとスケジュールを作成
      const campusConfigs: CampusScheduleConfig[] = [
        {
          campusIdx: indices.campus1,
          weekdayColumns: indices.weekday1Columns,
          weekendColumns: indices.weekend1Columns,
        },
        {
          campusIdx: indices.campus2,
          weekdayColumns: indices.weekday2Columns,
          weekendColumns: indices.weekend2Columns,
        },
        {
          campusIdx: indices.campus3,
          weekdayColumns: indices.weekday3Columns,
          weekendColumns: indices.weekend3Columns,
        },
      ];

      for (const config of campusConfigs) {
        if (config.campusIdx === undefined) continue;

        const campusStr = row[config.campusIdx];
        if (!campusStr || campusStr.trim() === "") continue;

        const campus = CAMPUS_MAPPING[campusStr];
        if (!campus) {
          console.log(`  Skipping unknown campus: ${campusStr}`);
          continue;
        }

        // イベント作成
        const welcomeEvent = await prisma.welcomeEvent.create({
          data: {
            welcomeInfoId: welcomeInfo.id,
            campus,
          },
        });
        console.log(`  Created event for ${campusStr}: ID=${welcomeEvent.id}`);

        // 平日スケジュール
        for (const column of config.weekdayColumns) {
          const periodStr = row[column.index];
          const periods = parsePeriods(periodStr);

          if (periods.length > 0) {
            const date = parseDate(column.dateStr);
            await prisma.eventSchedule.create({
              data: {
                welcomeEventId: welcomeEvent.id,
                date,
                isWeekend: false,
                periods,
                hours: [],
              },
            });
          }
        }

        // 土日スケジュール
        for (const column of config.weekendColumns) {
          const hourStr = row[column.index];
          const hours = parseHours(hourStr);

          if (hours.length > 0) {
            const date = parseDate(column.dateStr);
            await prisma.eventSchedule.create({
              data: {
                welcomeEventId: welcomeEvent.id,
                date,
                isWeekend: true,
                periods: [],
                hours,
              },
            });
          }
        }
      }

      console.log(`  Completed: ${clubName}`);
    } catch (error) {
      console.error(`  Error processing ${clubName}:`, error);
    }
  }

  console.log("\n=== Import completed! ===");
}

// 実行
const csvPath = process.argv[2] || "../提出情報.csv";
importCsv(csvPath)
  .catch(console.error)
  .finally(() => prisma.$disconnect());
