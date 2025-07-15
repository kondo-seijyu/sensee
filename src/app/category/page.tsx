import { client } from '@/libs/client';
import Link from 'next/link';
import Image from 'next/image';
import { Category, ImageType } from '@/types';

const API_LIMIT = 100;

const fetchAllImages = async (): Promise<ImageType[]> => {
  const first = await client.get({ endpoint: 'images', queries: { limit: API_LIMIT, offset: 0 } });
  const second = await client.get({ endpoint: 'images', queries: { limit: API_LIMIT, offset: API_LIMIT } });
  const third = await client.get({ endpoint: 'images', queries: { limit: API_LIMIT, offset: API_LIMIT * 2 } });
  return [...first.contents, ...second.contents, ...third.contents] as ImageType[];
};

export default async function CategoryPage() {
  const [catRes, images] = await Promise.all([
    client.get({ endpoint: 'categories', queries: { limit: API_LIMIT } }),
    fetchAllImages(),
  ]);

  const categories = catRes.contents as Category[];

  const thumbnailMap: Record<string, ImageType> = {};
  images.forEach((img) => {
    const catId = img.category?.id;
    if (catId && !thumbnailMap[catId]) {
      thumbnailMap[catId] = img;
    }
  });

  return (
    <main className="max-w-[1040px] mx-auto px-4 py-16 space-y-10 font-sans">
      <h1 className="text-2xl font-bold font-rounded text-gray-800">カテゴリー</h1>
      <section className="bg-[#F9FAFB] p-6 rounded-2xl shadow-card space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const thumb = thumbnailMap[cat.id];
            return (
              <Link
                key={cat.id}
                href={`/images?category=${cat.id}`}
                className="border rounded-xl p-4 flex flex-col items-center hover:shadow transition"
              >
                {thumb ? (
                  <Image
                    src={thumb.image.url}
                    alt={cat.name}
                    width={120}
                    height={120}
                    className="rounded mb-2 object-contain"
                  />
                ) : (
                  <div className="w-[120px] h-[120px] bg-gray-100 rounded mb-2 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">画像なし</span>
                  </div>
                )}
                <h2 className="text-lg font-bold">{cat.name}</h2>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}