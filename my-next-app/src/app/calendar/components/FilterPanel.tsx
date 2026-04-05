"use client";

interface CampusOption {
  value: string;
  label: string;
}

interface FilterPanelProps {
  campuses: CampusOption[];
  hashtags: readonly string[];
  selectedCampus: string | null;
  selectedHashtags: string[];
  onCampusChange: (campus: string | null) => void;
  onHashtagsChange: (hashtags: string[]) => void;
}

// キャンパスごとの色設定
const CAMPUS_COLORS: Record<string, { bg: string; text: string; selected: string }> = {
  SUGIMOTO: {
    bg: "bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60",
    text: "text-red-700 dark:text-red-300",
    selected: "bg-red-500 text-white",
  },
  NAKAMOZU: {
    bg: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/40 dark:hover:bg-blue-900/60",
    text: "text-blue-700 dark:text-blue-300",
    selected: "bg-blue-500 text-white",
  },
  MORINOMIYA: {
    bg: "bg-green-100 hover:bg-green-200 dark:bg-green-900/40 dark:hover:bg-green-900/60",
    text: "text-green-700 dark:text-green-300",
    selected: "bg-green-500 text-white",
  },
  OUTSIDE: {
    bg: "bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/40 dark:hover:bg-purple-900/60",
    text: "text-purple-700 dark:text-purple-300",
    selected: "bg-purple-500 text-white",
  },
  ONLINE: {
    bg: "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600",
    text: "text-gray-700 dark:text-gray-300",
    selected: "bg-gray-500 text-white",
  },
};

export default function FilterPanel({
  campuses,
  hashtags,
  selectedCampus,
  selectedHashtags,
  onCampusChange,
  onHashtagsChange,
}: FilterPanelProps) {
  const toggleHashtag = (tag: string) => {
    if (selectedHashtags.includes(tag)) {
      onHashtagsChange(selectedHashtags.filter((t) => t !== tag));
    } else {
      onHashtagsChange([...selectedHashtags, tag]);
    }
  };

  const hasFilters = selectedCampus || selectedHashtags.length > 0;

  const getCampusStyle = (campusValue: string, isSelected: boolean) => {
    const colors = CAMPUS_COLORS[campusValue] || CAMPUS_COLORS.ONLINE;
    if (isSelected) {
      return colors.selected;
    }
    return `${colors.bg} ${colors.text}`;
  };

  return (
    <div className="space-y-4">
      {/* キャンパスフィルター（中央寄せ・色付きチップ） */}
      <div className="flex flex-wrap justify-center gap-2">
        {campuses.map((campus) => {
          const isSelected = selectedCampus === campus.value;
          return (
            <button
              key={campus.value}
              onClick={() =>
                onCampusChange(isSelected ? null : campus.value)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${getCampusStyle(
                campus.value,
                isSelected
              )}`}
            >
              {campus.label}
            </button>
          );
        })}
      </div>

      {/* ハッシュタグフィルター（複数選択・アウトラインチップ） */}
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          タグでAND検索（複数選択可）
        </p>
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag) => {
            const isSelected = selectedHashtags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleHashtag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all border ${
                  isSelected
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* フィルターリセット */}
      {hasFilters && (
        <div className="flex items-center justify-center gap-2 pt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {selectedHashtags.length > 0 && `${selectedHashtags.length}件のタグで絞り込み中`}
          </span>
          <button
            onClick={() => {
              onCampusChange(null);
              onHashtagsChange([]);
            }}
            className="text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-medium flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            リセット
          </button>
        </div>
      )}
    </div>
  );
}
