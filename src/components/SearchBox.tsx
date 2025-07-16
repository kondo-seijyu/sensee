'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = keyword.trim();
      if (trimmed) {
        router.push(`/search?keyword=${encodeURIComponent(trimmed)}`);
      }
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center max-w-xl mx-auto rounded-full px-4 py-3 shadow-sm mt-6 mb-8">
      <span className="text-gray-400 mr-2">🔍</span>
      <input
        type="text"
        placeholder="キーワードを入力して再検索"
        className="bg-transparent flex-1 focus:outline-none"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleSearch}
        aria-label="画像検索"
      />
    </div>
  );
}