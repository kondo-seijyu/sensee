import { client } from '@/libs/client';
import Link from 'next/link';
import Image from 'next/image';

type ImageType = {
  id: string;
  title: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  viewCount?: number;
};

export default async function RankingPage() {
  const data = await client.get({
    endpoint: 'images',
    queries: {
      orders: '-viewCount',
      limit: 10,
    },
  });

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">🔥 人気ランキング（閲覧数順）</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {data.contents.map((item: ImageType, index: number) => (
          <div key={item.id} className="bg-white p-2 rounded shadow">
            <Link href={`/images/${item.id}`}>
              <Image
                src={item.image.url}
                alt={item.title}
                width={item.image.width}
                height={item.image.height}
                className="rounded-lg hover:opacity-80 transition"
              />
            </Link>
            <p className="text-sm mt-2 font-bold">
              🏆 {index + 1}位: {item.title}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}