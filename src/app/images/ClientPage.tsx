'use client';

import { useEffect, useState } from 'react';
import { client } from '@/libs/client';
import CategoryList from '@/components/CategoryList';
import ImageCard from '@/components/ImageCard';
import { ImageType, Category, Tag } from '@/types';
import Link from 'next/link';

const PER_PAGE = 60;
const API_LIMIT = 100;

type Props = {
  searchParams: string;
};

export default function ClientPage({ searchParams }: Props) {
  const params = new URLSearchParams(searchParams);

  const page = Number(params.get('page') || '1');
  const category = params.get('category') || '';
  const tagParams = params.getAll('tags');

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
  }, [category, tagParams, page, offset]);

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

  const clearTagsQuery = () => {
    const q = new URLSearchParams(searchParams.toString());
    q.delete('tags');
    return `/images?${q.toString()}`;
  };

  return (
    <main className="max-w-[1040px] mx-auto px-4 py-16 space-y-10 font-sans">
      <h1 className="text-2xl font-bold font-rounded text-gray-800">画像一覧</h1>
      <section className="bg-[#F6F4EB] p-6 rounded-2xl shadow-card space-y-4">
        <h2 className="text-lg font-bold font-rounded text-gray-800">カテゴリから探す</h2>
        <CategoryList categories={categories} selected={category} />
      </section>

      <section className="bg-[#F9FAFB] p-6 rounded-2xl shadow-card space-y-4">
        <h2 className="text-lg font-bold font-rounded text-gray-800">タグから探す</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => {
            const isSel = tagParams.includes(tag.id);
            return (
              <Link
                key={tag.id}
                href={buildTagQuery(tag.id)}
                className={`px-2 py-1 text-sm rounded border flex items-center gap-1 ${isSel
                  ? 'bg-blue-500 text-white'
                  : 'text-blue-500 border-blue-500 hover:bg-blue-100'}
                `}
              >
                #{tag.name}
                {isSel && <span className="ml-1">×</span>}
              </Link>
            );
          })}
        </div>
        {tagParams.length > 0 && (
          <div className="mt-2">
            <Link
              href={clearTagsQuery()}
              className="text-sm text-red-500 underline hover:opacity-80"
            >
              タグをすべて解除する
            </Link>
          </div>
        )}
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 my-8 justify-items-center">
        {isLoading ? (
          <div className="col-span-full text-center flex flex-col items-center">
            <span className="loader mb-2" />
            <p>読み込み中...</p>
          </div>
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
              aria-current={pn === page ? 'page' : undefined}
              className={`px-3 py-1 text-sm rounded border ${pn === page
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-100'}
              `}
            >
              {pn}
            </Link>
          );
        })}
      </div>
    </main>
  );
}