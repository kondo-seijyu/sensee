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
};

type Props = {
  searchParams: {
    q?: string;
  };
};

export default async function SearchPage({ searchParams }: Props) {
  const keyword = searchParams.q || '';

  const data = await client.get({
    endpoint: 'images',
    queries: {
      q: keyword,
    },
  });

  // 🔍 タグ一覧の重複を削除して取得
  const uniqueTags: string[] = Array.from(
    new Set(data.contents.flatMap((item: Image) => item.tags || []))
  );

  // 🔍 カテゴリ一覧をMapでユニーク化
  const uniqueCategories = Array.from(
    new Map<string, Image["category"]>(
      data.contents
        .filter((item: Image) => item.category)
        .map((item: Image) => [item.category!.id, item.category!])
    ).values()
  );

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">検索結果:「{keyword}」</h1>

      {data.contents.length === 0 ? (
        <p className="text-gray-600">該当する画像は見つかりませんでした。</p>
      ) : (
        <>
          {/* 🔁 タグ・カテゴリで再検索リンク */}
          <div className="mb-6">
            {uniqueTags.length > 0 && (
              <>
                <h2 className="text-sm font-bold mb-1">タグで絞り込み:</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  {uniqueTags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag}`}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </>
            )}
            {uniqueCategories.length > 0 && (
              <>
                <h2 className="text-sm font-bold mb-1">カテゴリで絞り込み:</h2>
                <div className="flex flex-wrap gap-2">
                  {uniqueCategories.map((cat: Image["category"]) => (
                    <Link
                      key={cat!.id}
                      href={`/category/${cat!.id}`}
                      className="text-green-600 text-sm hover:underline"
                    >
                      {cat!.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* 🎨 検索結果一覧 */}
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

                {item.tags && item.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1 text-xs text-blue-600">
                    {item.tags.map((tag: string) => (
                      <Link key={tag} href={`/tag/${tag}`} className="hover:underline">
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}

                {item.category && (
                  <div className="mt-1 text-xs text-green-600">
                    <Link href={`/category/${item.category.id}`} className="hover:underline">
                      カテゴリ: {item.category.name}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}