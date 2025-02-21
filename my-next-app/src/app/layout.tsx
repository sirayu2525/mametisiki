import Footer from "./components/Footer";
import Header from "./components/Header";
import "@/styles/globals.css";

// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-100">
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
