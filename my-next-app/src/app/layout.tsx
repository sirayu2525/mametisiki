import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "@/styles/globals.css";
import Script from "next/script"; // 追加！

export const metadata = {
  title: 'ハムバス ～大阪公立大学専用 豆知識サイト~',
  description: '大阪公立大学に関する豆知識を見やすく・探しやすくまとめたWebサイト。新入生や在学生が大学生活をより豊かに楽しめる情報を提供します。',
  keywords: ['大阪公立大学', 'ハム大', '新入生', '大学生活', '豆知識', '履修登録', '新歓', '学生生活'],
  openGraph: {
    title: '大阪公立大学専用 豆知識サイト',
    description: 'X (旧Twitter) の投稿をもとに、大阪公立大学の学生に役立つ情報をまとめました。履修登録・時間割・新歓など、大学生活に必要な知識がここに！',
    url: 'https://hamubasu.com', // あなたの実際のドメインに変更
    siteName: 'ハムバス ～大阪公立大学専用 豆知識サイト~',
    // images: [
    //   {
    //     url: 'https://yourdomain.com/og-image.png', // SNSシェア用画像URL
    //     width: 1200,
    //     height: 630,
    //     alt: '大阪公立大学 豆知識サイトのOG画像',
    //   },
    // ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@omuichinen', // 実際のアカウントがあれば
    title: '大阪公立大学専用 豆知識サイト',
    description: '大阪公立大学の学生向け豆知識を集約！履修登録・新歓・おすすめアプリなどを分かりやすく掲載。',
    // images: ['https://yourdomain.com/og-image.png'],
    },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        {/* Google Analytics スクリプトを読み込み */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JBVP4HWJR6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JBVP4HWJR6');
          `}
        </Script>
      </head>
      <body className="bg-gray-100">
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
