import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12 text-sm text-gray-600">
      <div className="max-w-[1040px] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Image src="/logo.png" alt="ロゴ" width={120} height={40} className="mb-2" />
          <p className="text-sm leading-relaxed">
            Sensee（センシー）は、先生の「見せたい」をやさしく支える画像素材サービスです。
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-800">サイトマップ</h4>
          <ul className="space-y-1">
            <li><Link href="/images" className="hover:underline">画像一覧</Link></li>
            <li><Link href="/chat-search" className="hover:underline">Sensee AI</Link></li>
            <li><Link href="/about" className="hover:underline">Senseeについて</Link></li>
            <li><Link href="/company" className="hover:underline">会社概要</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-800">お問い合わせ</h4>
          <ul className="space-y-1">
            <li><Link href="/contact" className="hover:underline">コンタクトフォーム</Link></li>
            <li><Link href="/request" className="hover:underline">リクエストフォーム</Link></li>
            <li><Link href="/privacy" className="hover:underline">プライバシーポリシー</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center border-t py-4 text-xs text-gray-400">
        © 2025 Sensee / 株式会社リフレクション - All rights reserved.
      </div>
    </footer>
  );
}