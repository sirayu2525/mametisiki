"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  // 外部からの値変更に追従
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange(localValue);
      onSearch();
    }
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
    onSearch();
  };

  const handleSearchClick = () => {
    onChange(localValue);
    onSearch();
  };

  return (
    <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
      <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">団体を検索</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="団体名・説明で検索"
            className="w-full border dark:border-gray-600 rounded px-3 py-2 text-sm pl-9 pr-9 bg-white dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500"
          />
          <svg
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {localValue && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="クリア"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        <button
          onClick={handleSearchClick}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-sm font-medium transition whitespace-nowrap border border-gray-300 dark:border-gray-600"
        >
          検索
        </button>
      </div>
    </div>
  );
}
