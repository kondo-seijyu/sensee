'use client';

import Link from 'next/link';
import Image from 'next/image';

export type ImageCardItem = {
  id: string;
  title: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
};

type ImageCardProps = {
  item: ImageCardItem;
};

export default function ImageCard({ item }: { item: ImageCardProps["item"] }) {
  const hasImage =
    item.image &&
    typeof item.image.url === 'string' &&
    item.image.url.startsWith('http');

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-md transition text-center w-[150px]">
      <Link href={`/images/${item.id}`}>
        {hasImage ? (
          <Image
            src={item.image.url as string}
            alt={item.title}
            width={item.image.width || 400}
            height={item.image.height || 300}
            className="object-cover w-full h-auto hover:opacity-80 transition"
            priority
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
          />
        ) : (
          <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </Link>

      <p
        className="text-sm font-sans line-clamp-2 leading-snug w-[150px] mx-auto px-2 mt-1"
        style={{ minHeight: '2.5em' }}
      >
        {item.title}
      </p>
    </div>
  );
}