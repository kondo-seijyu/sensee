import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sensee - 先生のための画像素材',
  description: '生成AIでつくる、安心して使える教育画像素材サイト',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900">
        {/* ナビゲーションバー */}
        <header className="bg-white shadow sticky top-0 z-50">
          <nav className="max-w-5xl mx-auto px-4 py-3 flex gap-6 text-sm">
            <Link href="/" className="font-bold text-blue-600">Sensee</Link>
            <Link href="/images" className="hover:underline">画像一覧</Link>
            <Link href="/request" className="hover:underline">リクエスト</Link>
            <Link href="/about" className="hover:underline">About</Link>
          </nav>
        </header>

        {/* 各ページ */}
        <main className="mt-6">{children}</main>
      </body>
    </html>
  );
}