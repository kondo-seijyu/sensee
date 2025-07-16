'use client';

import { Category } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryList({
  categories,
  selected,
}: {
  categories: Category[];
  selected?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = (id: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (id === selected) {
      newParams.delete('category');
    } else {
      newParams.set('category', id);
      newParams.set('page', '1');
    }

    router.replace(`/images?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3 text-blue-600 text-sm">
      {categories.map((cat) => {
        const isSelected = selected === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => handleClick(cat.id)}
            className={`hover:underline ${
              isSelected ? 'font-bold underline' : ''
            }`}
            aria-pressed={isSelected}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}