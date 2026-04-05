// 新歓カレンダーで使用するハッシュタグ（あらかじめ定義）
export const PREDEFINED_HASHTAGS = [
  "部室あり",
  "部費無料",
  "上回生歓迎",
  "ガチめ",
  "ゆるめ",
  "スポーツ",
  "ゲーム",
  "芸術",
  "音楽",
  "勉強",
  "インドア",
  "アウトドア",
  "インカレ",
] as const;

export type PredefinedHashtag = (typeof PREDEFINED_HASHTAGS)[number];

// キャンパス定義
export const CAMPUSES = [
  { value: "NAKAMOZU", label: "中百舌鳥キャンパス" },
  { value: "SUGIMOTO", label: "杉本キャンパス" },
  { value: "MORINOMIYA", label: "森之宮キャンパス" },
  { value: "OUTSIDE", label: "学外" },
  { value: "ONLINE", label: "オンライン" },
] as const;
