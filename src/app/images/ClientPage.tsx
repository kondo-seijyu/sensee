'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client } from '@/libs/client';
import CategoryList from '@/components/CategoryList';
import ImageCard from '@/components/ImageCard';
import { ImageType, Category, Tag } from '@/types';
import Link from 'next/link';

const PER_PAGE = 60;
const API_LIMIT = 100;

export default function ClientPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const category = searchParams.get('category') || '';
  const tagParams = searchParams.getAll('tags');

  const [images, setImages] = useState<ImageType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const offset = (page - 1) * PER_PAGE;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const filters: string[] = [];
      if (category) filters.push(`category[equals]${category}`);
      tagParams.forEach(tag => filters.push(`tags[contains]${tag}`));
      const filterString = filters.length > 0 ? filters.join('[and]') : undefined;

      if (filterString && process.env.NODE_ENV === 'development') {
        console.log('🧪 MicroCMS filters:', encodeURIComponent(filterString));
      }

      const [catData, tagData, imgData] = await Promise.all([
        client.get({ endpoint: 'categories', queries: { limit: API_LIMIT } }),
        client.get({ endpoint: 'tags', queries: { limit: API_LIMIT } }),
        client.get({
          endpoint: 'images',
          queries: {
            limit: PER_PAGE,
            offset,
            orders: '-publishedAt',
            ...(filterString ? { filters: filterString } : {}),
          },
        }),
      ]);

      setCategories(catData.contents);
      setImages(imgData.contents);
      setTotalCount(imgData.totalCount || 0);

      const visibleTagIds = new Set<string>();
      imgData.contents.forEach((img: ImageType) => {
        (img.tags ?? []).forEach((t: Tag) => visibleTagIds.add(t.id));
      });
      tagParams.forEach(t => visibleTagIds.add(t));

      const filteredTags = tagData.contents.filter((tag: Tag) =>
        visibleTagIds.has(tag.id)
      );
      setTags(filteredTags);

      setIsLoading(false);
    };

    fetchData();
  }, [category, tagParams.join(','), page]);

  const totalPages = Math.ceil(totalCount / PER_PAGE);

  const buildTagQuery = (tagId: string) => {
    const q = new URLSearchParams(searchParams.toString());
    const updated = tagParams.includes(tagId)
      ? tagParams.filter(t => t !== tagId)
      : [...tagParams, tagId];
    q.delete('tags');
    updated.forEach(t => q.append('tags', t));
    if (page > 1) q.set('page', page.toString());
    else q.delete('page');
    return `/images?${q.toString()}`;
  };

  const buildPageQuery = (pn: number) => {
    const q = new URLSearchParams(searchParams.toString());
    if (pn > 1) q.set('page', pn.toString());
    else q.delete('page');
    return `/images?${q.toString()}`;
  };

  return (
    <main className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">画像一覧</h1>

      <h2 className="text-lg font-semibold mb-2">カテゴリ</h2>
      <CategoryList categories={categories} selected={category} />

      <h2 className="text-lg font-semibold mt-6 mb-2">タグ</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => {
          const isSel = tagParams.includes(tag.id);
          return (
            <Link
              key={tag.id}
              href={buildTagQuery(tag.id)}
              className={`px-2 py-1 text-sm rounded border ${isSel
                ? 'bg-blue-500 text-white'
                : 'text-blue-500 border-blue-500 hover:bg-blue-100'
              }`}
            >
              #{tag.name}
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        {isLoading ? (
          <p className="col-span-full text-center">読み込み中...</p>
        ) : (
          images.map(item => <ImageCard key={item.id} item={item} />)
        )}
      </div>

      <div className="flex justify-center gap-2 flex-wrap mb-8">
        {Array.from({ length: totalPages }, (_, i) => {
          const pn = i + 1;
          return (
            <Link
              key={pn}
              href={buildPageQuery(pn)}
              className={`px-3 py-1 text-sm rounded border ${pn === page
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-100'
              }`}
            >
              {pn}
            </Link>
          );
        })}
      </div>
    </main>
  );
}