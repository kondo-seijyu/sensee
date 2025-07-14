'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Tag } from '@/types'; 

export default function TagList(
  { tags, selectedTags, onChange }: {
    tags: Tag[];
    selectedTags: Tag[];
    onChange: (newTags: Tag[]) => void;
  }
) {
  const toggle = (tag: Tag) => {
    const exists = selectedTags.some(t => t.id === tag.id);
    const updated = exists
      ? selectedTags.filter(t => t.id !== tag.id)
      : [...selectedTags, tag];
    onChange(updated);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map(tag => (
        <button
          key={tag.id}
          onClick={() => toggle(tag)}
          className={`px-2 py-1 rounded text-xs border ${
            selectedTags.some(t => t.id === tag.id)
              ? 'bg-blue-600 text-white'
              : 'bg-white text-blue-600'
          }`}
        >#{tag.name}</button>
      ))}
    </div>
  );
}