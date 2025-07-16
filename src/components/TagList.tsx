'use client';

import { Tag } from '@/types';

export default function TagList({
  tags,
  selectedTags,
  onChange,
}: {
  tags: Tag[];
  selectedTags: Tag[];
  onChange: (newTags: Tag[]) => void;
}) {
  const toggle = (tag: Tag) => {
    const exists = selectedTags.some((t) => t.id === tag.id);
    const updated = exists
      ? selectedTags.filter((t) => t.id !== tag.id)
      : [...selectedTags, tag];
    onChange(updated);
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => toggle(tag)}
          className={`px-2 py-1 rounded text-xs border transition ${
            selectedTags.some((t) => t.id === tag.id)
              ? 'bg-blue-600 text-white'
              : 'bg-white text-blue-600'
          }`}
        >
          #{tag.name}
        </button>
      ))}

      {selectedTags.length > 0 && (
        <button
          onClick={clearAll}
          className="ml-2 px-3 py-1 rounded text-xs bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          タグ全解除
        </button>
      )}
    </div>
  );
}