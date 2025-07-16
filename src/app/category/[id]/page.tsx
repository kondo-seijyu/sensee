import { client } from '@/libs/client';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

type ImageType = {
  id: string;
  title: string;
  description: string;
  image: { url: string; width: number; height: number };
  tags?: string[];
  category?: { id: string; name: string };
  usage?: string | string[];
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = await client.get({ endpoint: 'categories', contentId: id });
  const data = await client.get({
    endpoint: 'images',
    queries: { filters: `category[equals]${id}` },
  });

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">カテゴリ: {category.name}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.contents.map((item: ImageType) => (
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
            <h2 className="text-sm font-semibold mt-2">{item.title}</h2>
            <p className="text-xs text-gray-600">{item.description}</p>
            {item.tags && (
              <div className="mt-2 flex flex-wrap gap-1 text-xs text-blue-600">
                {item.tags.map((tag) => (
                  <Link key={tag} href={`/tag/${tag}`} className="hover:underline">
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            {item.category && (
              <div className="mt-1 text-xs text-green-600">
                <Link href={`/category/${item.category.id}`} className="hover:underline">
                  カテゴリ：{item.category.name}
                </Link>
              </div>
            )}
            {item.usage && (
              <div className="mt-1 text-xs text-purple-600">
                用途：{Array.isArray(item.usage) ? item.usage.join('・') : item.usage}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}