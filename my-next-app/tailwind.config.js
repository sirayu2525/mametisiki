/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // ✅ Next.js の全コンポーネントに適用
  theme: {
    extend: {}, // カスタマイズ可能
  },
  plugins: [], // 必要に応じてプラグインを追加
};
