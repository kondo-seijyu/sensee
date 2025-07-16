'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client } from '@/libs/client';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

type ImageType = {
  id: string;
  title: string;
  description: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  tags?: { id: string; name: string }[];
  category?: {
    id: string;
    name: string;
  };
  usage?: string[];
  viewCount?: number;
};

export default function ImageDetailPageWrapper() {
  const params = useParams() as { id: string };
  return <ImageDetailPage id={params.id} />;
}

function ImageDetailPage({ id }: { id: string }) {
  const [data, setData] = useState<ImageType | null>(null);
  const [related, setRelated] = useState<ImageType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const item = await client.get({ endpoint: 'images', contentId: id }).catch(() => null);
      if (!item) return;
      setData(item);

      if (item.category?.id) {
        const res = await client.get({
          endpoint: 'images',
          queries: {
            filters: `category[equals]${item.category.id}[and]id[not_equals]${item.id}`,
            limit: 4,
          },
        });
        setRelated(res.contents || []);
      }

      fetch(`/api/views/${id}`, { method: 'POST' });
    };

    fetchData();
  }, [id]);

  if (!data) return <p className="p-4">読み込み中...</p>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>

      {Array.isArray(data.usage) && data.usage.length > 0 && (
        <p className="text-sm text-purple-600 mb-2">
          用途: {data.usage.join('・')}
        </p>
      )}

      <Image
        src={data.image.url}
        alt={data.title}
        width={data.image.width}
        height={data.image.height}
        className="w-full max-w-md mx-auto rounded-xl mb-4"
      />

      <p className="text-gray-700 whitespace-pre-line mb-4">{data.description}</p>

      <a
        href={data.image.url}
        download
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        画像をダウンロード
      </a>

      {data.category && (
        <div className="mt-6">
          <h2 className="text-sm font-bold mb-2 text-green-600">カテゴリ</h2>
          <Link
            href={`/images?category=${data.category.id}`}
            className="text-sm text-green-700 hover:underline"
          >
            {data.category.name}
          </Link>
        </div>
      )}

      {Array.isArray(data.tags) && data.tags.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-bold mb-2 text-blue-600">タグ</h2>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/images?tags=${tag.id}`}
                aria-label={`タグ ${tag.name} の画像一覧へ`}
                className="text-sm text-blue-700 hover:underline"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold mb-4">関連画像</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((item) => (
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
                <p className="text-sm mt-1">{item.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}