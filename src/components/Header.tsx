'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/images', label: '画像一覧' },
    { href: '/chat-search', label: 'Sensee AI' },
    { href: '/about', label: 'Senseeについて' },
    { href: '/company', label: '会社概要' },
    { href: '/request', label: 'リクエスト' },
    { href: '/contact', label: 'お問い合わせ' },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Senseeロゴ" width={100} height={40} priority />
        </Link>

        <button
          className="md:hidden p-2"
          aria-label="メニュー"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* PC */}
        <nav className="hidden md:flex gap-6 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">{item.label}</Link>
          ))}
          <Link href="/login" className="text-blue-600 hover:underline">ログイン / 会員登録</Link>
        </nav>
      </div>

      {/* SP overlay*/}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center text-lg space-y-4 md:hidden">
          <div className="absolute top-4 left-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image src="/logo.png" alt="Senseeロゴ" width={100} height={40} />
            </Link>
          </div>
          <button
            className="absolute top-4 right-4 p-2"
            onClick={() => setIsOpen(false)}
            aria-label="閉じる"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline" onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/login" className="text-blue-600 hover:underline" onClick={() => setIsOpen(false)}>
            ログイン / 会員登録
          </Link>
          <div className="text-center py-4 text-xs text-gray-400">
            © 2025 Sensee / 株式会社リフレクション
          </div>
        </div>
      )}
    </header>
  );
}