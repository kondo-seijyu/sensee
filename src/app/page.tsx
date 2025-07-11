'use client';

import { useEffect, useState } from 'react';
import { client } from '@/libs/client';
import Link from 'next/link';
import Image from 'next/image';

type ImageType = {
  id: string;
  title: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
};

export default function HomePage() {
  const [data, setData] = useState<ImageType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await client.get({
          endpoint: 'images',
          queries: { limit: 3, orders: '-publishedAt' },
        });
        setData(res.contents);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    })();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* 上部3カラム：検索・季節おすすめ・センシー */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* 通常検索＋カテゴリ */}
        <div className="space-y-4">
          <h1 class="test-text">Hello!</h1>
          <input
            type="text"
            placeholder="“春っぽい動物”など、あいまいなことばでもOK"
            className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-sensee-sky"
          />
          <Link
            href="/category"
            className="block w-full text-center bg-sensee-green text-white font-semibold py-2 rounded-full shadow hover:bg-green-400 transition"
          >
            📂 カテゴリで探す
          </Link>
        </div>

        {/* 季節のおすすめ */}
        <div className="bg-sensee-ivory rounded-xl shadow p-4">
          <h3 className="font-semibold text-gray-800 mb-2">🎐 季節のおすすめ</h3>
          <ul className="text-sm space-y-1">
            <li><Link href="/tag/夏" className="hover:underline">🌞 夏の素材</Link></li>
            <li><Link href="/tag/行事" className="hover:underline">🎉 行事・イベント</Link></li>
          </ul>
        </div>

        {/* センシーAI */}
        <aside className="flex flex-col justify-between bg-gradient-to-br from-sensee-sky/10 to-white rounded-2xl shadow-xl p-5">
          <div>
            <h3 className="text-base font-bold text-sensee-sky mb-1 leading-tight">💬 センシーとお話してみよう</h3>
            <p className="text-sm text-gray-700 leading-snug">
              画像をどう探せばいいか迷ったら、<br />
              あいまいなことばでも大丈夫です。
            </p>
          </div>
          <div className="mt-4">
            <Link href="/chat-search">
              <button className="w-full bg-sensee-sky hover:bg-sky-500 text-white text-sm py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-150">
                💬 センシーにきいてみる
              </button>
            </Link>
            <div className="mt-3 text-xs text-gray-500 text-right">
              <Link href="/about" className="hover:underline">センシーについて</Link>
            </div>
          </div>
        </aside>
      </section>

      {/* おすすめタグ */}
      <section className="flex flex-wrap gap-2">
        {['やさしい', '春', 'シンプル', '背景', '保育園'].map((tag) => (
          <Link
            key={tag}
            href={`/tag/${tag}`}
            className="px-3 py-1 rounded-full bg-sensee-green text-sm text-white hover:underline"
          >
            #{tag}
          </Link>
        ))}
      </section>

      {/* 新着画像 */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="bg-sensee-sky text-white text-xs px-2 py-1 rounded-full">NEW</span>
          新着画像
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-md transition"
            >
              <Link href={`/images/${item.id}`}>
                <Image
                  src={item.image.url}
                  alt={item.title}
                  width={item.image.width}
                  height={item.image.height}
                  className="object-cover w-full h-auto hover:opacity-80 transition"
                />
              </Link>
              <div className="px-3 py-2">
                <p className="text-sm text-gray-700 truncate">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}