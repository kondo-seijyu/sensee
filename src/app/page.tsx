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
  const [seasonalData, setSeasonalData] = useState<ImageType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await client.get({
          endpoint: 'images',
          queries: { limit: 6, orders: '-publishedAt' },
        });
        setData(res.contents);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    })();
  }, []);

  useEffect(() => {
    const getSeasonTag = () => {
      const month = new Date().getMonth() + 1;
      if ([3, 4, 5].includes(month)) return '春';
      if ([6, 7, 8].includes(month)) return '夏';
      if ([9, 10, 11].includes(month)) return '秋';
      return '冬';
    };

    const fetchSeasonalImages = async () => {
      try {
        const seasonTag = getSeasonTag();
        const res = await client.get({
          endpoint: 'images',
          queries: {
            filters: `tags[contains]${seasonTag}`,
            limit: 6,
            orders: '-_sys.updatedAt',
          },
        });
        setSeasonalData(res.contents);
      } catch (err) {
        console.error('Seasonal fetch error:', err);
      }
    };

    fetchSeasonalImages();
  }, []);

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-12 space-y-16">
      {/* メインビジュアル */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Sensee</h1>
        <div className="leading-relaxed">
          <p className="font-semibold">せんせいの“見せたい”をやさしく支える。</p>
          <p className="text-gray-500">〜安心して使える画像は、センシーにまかせて。〜</p>
        </div>

        {/* カテゴリタグ */}
        <div className="flex flex-wrap justify-center gap-2">
          {['人物', '季節', '背景', '保育園', '食べ物', '動物', '自然'].map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="bg-[#F6F4EB] text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-primary/30 transition"
            >
              {cat}
            </Link>
          ))}
          <Link
            href="/category"
            className="text-sm text-blue-500 hover:underline self-center"
          >
            もっと見る
          </Link>
        </div>

        {/* 検索ボックス */}
        <div className="bg-gray-100 flex items-center justify-center max-w-xl mx-auto rounded-full px-4 py-3 shadow-sm">
          <span className="text-gray-400 mr-2">🔍</span>
          <input
            type="text"
            placeholder="検索キーワードを入力"
            className="bg-transparent flex-1 focus:outline-none"
          />
        </div>

        {/* 人気のタグ */}
        <div className="flex flex-wrap justify-center gap-2">
          {['やさしい', 'シンプル', '保育園', '春', '背景'].map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag}`}
              className="px-3 py-1 rounded-full bg-[#B5D8B1] text-sm text-white hover:bg-opacity-90 transition"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* センシーAI */}
        <div>
          <Link href="/chat-search">
            <button className="bg-[#A7D8DE] text-white font-semibold py-2 px-6 rounded-full shadow hover:scale-[1.02] hover:bg-opacity-90 transition-transform">
              センシーにきいてみる
            </button>
          </Link>
        </div>
      </section>

      {/* 新着画像 */}
      <section className="text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4 font-rounded">新着画像</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-md transition text-center w-[150px]"
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
<p
  className="text-sm font-sans line-clamp-2 leading-snug w-[150px] mx-auto px-2"
  style={{ minHeight: '2.5em' }}
>
  {item.title}
</p>
            </div>
          ))}
        </div>
      </section>

      {/* 季節のおすすめ */}
      <section className="text-center">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4 font-rounded">
          季節のおすすめ
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {seasonalData.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-md transition text-center w-[150px]"
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
              <p
                className="text-sm font-sans line-clamp-2 leading-snug w-[150px] mx-auto px-2"
                style={{ minHeight: '2.5em' }}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}