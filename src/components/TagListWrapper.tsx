'use client';

import { useState, useEffect } from 'react';
import TagList from './TagList';
import ImageCard from './ImageCard';
import { Tag, ImageType } from '@/types';

type Props = {
  tags: Tag[];
  images: ImageType[];
  initialSelectedTagIds?: string[];
};

export default function TagListWrapper({
  tags,
  images,
  initialSelectedTagIds = [],
}: Props) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageType[]>([]);
  const [filteredTags, setFilteredTags] = useState<Tag[]>(tags);

  useEffect(() => {
    const matched = tags.filter((tag) => initialSelectedTagIds.includes(tag.id));
    setSelectedTags(matched);
  }, [initialSelectedTagIds, tags]);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredImages(images);
      setFilteredTags(tags);
      return;
    }

    const filtered = images.filter((image) =>
      selectedTags.every((tag) => image.tags?.some((t) => t.id === tag.id))
    );
    setFilteredImages(filtered);

    const remainingTagIds = new Set(
      filtered.flatMap((img) => img.tags?.map((t) => t.id) || [])
    );
    setFilteredTags(tags.filter((tag) => remainingTagIds.has(tag.id)));
  }, [selectedTags, images, tags]);

  return (
    <div>
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedTags([])}
            className="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-100 text-sm"
          >
            選択しているタグをリセット
          </button>
        </div>
      )}

      <TagList tags={filteredTags} selectedTags={selectedTags} onChange={setSelectedTags} />

      {filteredImages.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">該当する画像がありません。</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
          {filteredImages.map((item) => (
            <ImageCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}