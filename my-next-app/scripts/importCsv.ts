import { PrismaClient, Campus, Period } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { parse } from "csv-parse/sync";

const prisma = new PrismaClient();

// Supabase設定
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 平日の日付リスト (2026年4月)
const WEEKDAY_DATES = [
  "4/1", "4/2", "4/3", "4/6", "4/7", "4/8", "4/9", "4/10",
  "4/13", "4/14", "4/15", "4/16", "4/17", "4/20", "4/21",
  "4/22", "4/23", "4/24", "4/27", "4/28", "4/29", "4/30"
];

// 土日の日付リスト (2026年4月)
const WEEKEND_DATES = [
  "4/4", "4/5", "4/11", "4/12", "4/18", "4/19", "4/25", "4/26"
];

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
  const parts = periodStr.split(",").map(s => s.trim());

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
  const parts = hourStr.split(",").map(s => s.trim());

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

// 日付文字列をDateに変換
function parseDate(dateStr: string, year: number = 2026): Date {
  const [month, day] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

// CSVのヘッダーからインデックスを取得するヘルパー
function getColumnIndices(headers: string[]) {
  const indices: Record<string, number> = {};

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
  });

  // 平日日程のインデックス（場所①）
  indices.weekday1Start = headers.findIndex(h => h.includes("場所①での新歓日程を入力（平日）"));

  // 平日日程のインデックス（場所②）
  indices.weekday2Start = headers.findIndex(h => h.includes("場所②での新歓日程を入力（平日）"));

  // 平日日程のインデックス（場所③）
  indices.weekday3Start = headers.findIndex(h => h.includes("場所③での新歓日程を入力（平日）"));

  // 土日日程のインデックス
  indices.weekend1Start = headers.findIndex(h => h.includes("場所①の新歓日程を入力（土日）"));
  indices.weekend2Start = headers.findIndex(h => h.includes("場所②の新歓日程を入力（土日）"));
  indices.weekend3Start = headers.findIndex(h => h.includes("場所③の新歓日程を入力（土日）"));

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

      const clubImageDriveUrl = row[indices.clubImage];
      if (clubImageDriveUrl) {
        console.log("  Uploading club image...");
        clubImageUrl = await uploadImageToSupabase(
          clubImageDriveUrl,
          `club_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.jpg`
        );
      }

      const scheduleImageDriveUrl = row[indices.scheduleImage];
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
      const hashtags = parseHashtags(row[indices.hashtags] || "");

      // 3. 団体を作成
      const club = await prisma.club.create({
        data: {
          name: clubName,
          description: row[indices.description] || "",
          image: clubImageUrl,
          twitterUrl: row[indices.twitter] || null,
          instagramUrl: row[indices.instagram] || null,
          hashtags,
        },
      });
      console.log(`  Created club: ID=${club.id}`);

      // 4. 新歓情報を作成
      const welcomeInfo = await prisma.welcomeInfo.create({
        data: {
          clubId: club.id,
          scheduleImage: scheduleImageUrl,
          scheduleText: row[indices.scheduleText] || null,
        },
      });
      console.log(`  Created welcomeInfo: ID=${welcomeInfo.id}`);

      // 5. 各場所のイベントとスケジュールを作成
      const campusConfigs = [
        { campusIdx: indices.campus1, weekdayStart: indices.weekday1Start, weekendStart: indices.weekend1Start },
        { campusIdx: indices.campus2, weekdayStart: indices.weekday2Start, weekendStart: indices.weekend2Start },
        { campusIdx: indices.campus3, weekdayStart: indices.weekday3Start, weekendStart: indices.weekend3Start },
      ];

      for (const config of campusConfigs) {
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
        if (config.weekdayStart >= 0) {
          for (let i = 0; i < WEEKDAY_DATES.length; i++) {
            const periodStr = row[config.weekdayStart + i];
            const periods = parsePeriods(periodStr);

            if (periods.length > 0) {
              const date = parseDate(WEEKDAY_DATES[i]);
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
        }

        // 土日スケジュール
        if (config.weekendStart >= 0) {
          for (let i = 0; i < WEEKEND_DATES.length; i++) {
            const hourStr = row[config.weekendStart + i];
            const hours = parseHours(hourStr);

            if (hours.length > 0) {
              const date = parseDate(WEEKEND_DATES[i]);
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
      }

      console.log(`  Completed: ${clubName}`);
    } catch (error) {
      console.error(`  Error processing ${clubName}:`, error);
    }
  }

  console.log("\n=== Import completed! ===");
}

// 実行
const csvPath = process.argv[2] || "../../提出情報.csv";
importCsv(csvPath)
  .catch(console.error)
  .finally(() => prisma.$disconnect());
