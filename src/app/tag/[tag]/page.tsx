import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/libs/client';

type Props = {
  params: Promise<{ tag: string }>;
};

type ImageType = {
  id: string;
  title: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
};

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const data = await client.get({
    endpoint: 'images',
    queries: {
      filters: `tags[contains]${decodedTag}`,
      orders: '-publishedAt',
      limit: 100,
    },
  }).catch(() => null);

  if (!data || data.contents.length === 0) return notFound();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">タグ: #{tag}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.contents.map((item: ImageType) => (
          <Link
            key={item.id}
            href={`/images/${item.id}`}
            className="block bg-white p-2 rounded shadow hover:shadow-md"
          >
            <Image
              src={item.image.url}
              alt={item.title}
              width={item.image.width}
              height={item.image.height}
              className="w-full rounded"
              priority={false}
            />
            <p className="text-sm mt-2">{item.title}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}