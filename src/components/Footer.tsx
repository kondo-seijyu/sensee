import Link from 'next/link';
import Image from 'next/image';

const footerLinks = [
  {
    title: 'サイトマップ',
    items: [
      { name: '画像一覧', href: '/images' },
      { name: 'Sensee AI', href: '/chat-search' },
      { name: 'Senseeについて', href: '/about' },
      { name: '会社概要', href: '/company' },
    ],
  },
  {
    title: 'お問い合わせ',
    items: [
      { name: 'コンタクトフォーム', href: '/contact' },
      { name: 'リクエストフォーム', href: '/request' },
      { name: 'プライバシーポリシー', href: '/privacy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12 text-sm text-gray-600">
      <div className="max-w-[1040px] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Image src="/images/logo.png" alt="ロゴ" width={120} height={40} className="mb-2 min-w-[120px]" />
          <p className="text-sm leading-relaxed">
            Sensee（センシー）は、先生の「見せたい」をやさしく支える画像素材サービスです。
          </p>
        </div>
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold mb-2 text-gray-800">{section.title}</h4>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center border-t py-4 text-xs text-gray-400">
        © 2025 Sensee / 株式会社リフレクション - All rights reserved.
      </div>
    </footer>
  );
}