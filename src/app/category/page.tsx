import { client } from '@/libs/client';
import Link from 'next/link';

type Image = {
  id: string;
  title: string;
  description: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  tags?: string[];
  category?: {
    id: string;
    name: string;
  };
  usage?: string;
};

type PageProps = {
  params: { id: string };
};

export default async function CategoryPage({ params }: PageProps) {
  const { id } = params;

  // カテゴリ名の取得
  const category = await client.get({
    endpoint: 'categories',
    contentId: id,
  });

  // 画像一覧の取得
  const data = await client.get({
    endpoint: 'images',
    queries: {
      filters: `category[equals]${id}`,
    },
  });

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">カテゴリ: {category.name}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.contents.map((item: Image) => (
          <div key={item.id} className="bg-white p-2 rounded shadow">
            <Link href={`/images/${item.id}`}>
              <img
                src={item.image.url}
                alt={item.title}
                className="rounded-lg hover:opacity-80 transition"
              />
            </Link>
            <h2 className="text-sm font-semibold mt-2">{item.title}</h2>
            <p className="text-xs text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}