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

export default async function Home() {
  const data = await client.get({ endpoint: 'images' });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">画像一覧</h1>

      {/* カテゴリリンク */}
      <div className="mb-4">
        <Link href="/category" className="text-blue-600 hover:underline text-sm">
          ▶ カテゴリ一覧を見る
        </Link>
      </div>

      {/* 🔍 検索フォーム */}
      <form action="/search" method="GET" className="mb-6">
        <input
          type="text"
          name="q"
          placeholder="キーワードで検索"
          className="border px-2 py-1 rounded mr-2 text-sm w-60"
        />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 text-sm rounded">
          検索
        </button>
      </form>

      {/* 画像一覧 */}
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

            {/* タグ表示エリア */}
            {item.tags && item.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1 text-xs text-blue-600">
                {item.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className="hover:underline"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* カテゴリ表示エリア */}
            {item.category && (
              <div className="mt-1 text-xs text-green-600">
                <Link href={`/category/${item.category.id}`} className="hover:underline">
                  カテゴリ：{item.category.name}
                </Link>
              </div>
            )}

            {/* おすすめ用途エリア */}
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