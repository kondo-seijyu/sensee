'use client';

import { useState, useEffect } from 'react';
import TagList from './TagList';
import ImageCard from './ImageCard';
import { Tag, ImageType } from '@/types';

type Props = {
  tags: Tag[];
  images: ImageType[];
  initialSelectedTagIds?: string[]; // ← ここがポイント
};

export default function TagListWrapper({ tags, images, initialSelectedTagIds = [] }: Props) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageType[]>([]);
  const [filteredTags, setFilteredTags] = useState<Tag[]>(tags);

  // ✅ 初回マウント時に URL パラメータに応じた選択タグを反映
  useEffect(() => {
    const matchedTags = tags.filter((tag) => initialSelectedTagIds.includes(tag.id));
    setSelectedTags(matchedTags);
  }, [initialSelectedTagIds, tags]);

  // タグ変更・画像更新時のフィルタ処理
  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredImages(images);
      setFilteredTags(tags);
      return;
    }

    const newFilteredImages = images.filter((image) =>
      selectedTags.every((tag) => image.tags?.some((t) => t.id === tag.id))
    );
    setFilteredImages(newFilteredImages);

    const tagSet = new Set(
      newFilteredImages.flatMap((image) => image.tags?.map((t) => t.id) || [])
    );
    const newFilteredTags = tags.filter((tag) => tagSet.has(tag.id));
    setFilteredTags(newFilteredTags);
  }, [selectedTags, images, tags]);

  const handleTagChange = (newTags: Tag[]) => {
    setSelectedTags(newTags);
  };

  const handleResetTags = () => {
    setSelectedTags([]);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={handleResetTags}
          className="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-100 text-sm"
        >
          選択しているタグをリセット
        </button>
      </div>

      <TagList tags={filteredTags} selectedTags={selectedTags} onChange={handleTagChange} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
        {filteredImages.map((item) => (
          <ImageCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}