"use client";

interface ViewToggleProps {
  mode: "weekday" | "weekend";
  onChange: (mode: "weekday" | "weekend") => void;
}

export default function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className="flex rounded-lg overflow-hidden border dark:border-gray-600">
      <button
        onClick={() => onChange("weekday")}
        className={`px-4 py-2 text-sm font-medium transition ${
          mode === "weekday"
            ? "bg-blue-500 text-white"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
      >
        平日
      </button>
      <button
        onClick={() => onChange("weekend")}
        className={`px-4 py-2 text-sm font-medium transition ${
          mode === "weekend"
            ? "bg-blue-500 text-white"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
      >
        土日
      </button>
    </div>
  );
}
