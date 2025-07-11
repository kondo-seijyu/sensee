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

export default async function HomePage() {
  const data = await client.get({
    endpoint: 'images',
    queries: { limit: 3, orders: '-publishedAt' },
  });

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">📚 Sensee（センセエ）</h1>
      <p className="text-lg text-gray-700 mb-8">
        先生のための、<br />
        安心して使える生成AI画像素材サイトです。
      </p>

      <div className="flex flex-col gap-4 items-center">
        <Link
          href="/images"
          className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700 transition"
        >
          ▶ 画像をさがす
        </Link>

        <Link href="/ranking" className="text-red-600 text-sm hover:underline">
          🔥 人気ランキングを見る
        </Link>

        <Link href="/request" className="text-blue-600 text-sm hover:underline">
          🌟 画像をリクエストする
        </Link>

        <Link href="/about" className="text-gray-600 text-sm hover:underline">
          このサイトについて
        </Link>
      </div>

      {/* 🆕 新着画像 */}
      <div className="mt-12 text-left">
        <h2 className="text-xl font-bold mb-4">🆕 新着画像</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.contents.map((item: ImageType) => (
            <div key={item.id} className="bg-white p-2 rounded shadow">
              <Link href={`/images/${item.id}`}>
                <Image
                  src={item.image.url}
                  alt={item.title}
                  width={item.image.width}
                  height={item.image.height}
                  className="rounded-lg hover:opacity-80 transition"
                  priority={false}
                />
              </Link>
              <p className="text-sm mt-2">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}