'use client';

import { useState } from 'react';

const OPTIONS = ['運動会', '教室', '保健室', '春の行事', '黒板', '掲示物アイコン', 'プリント背景'];

export default function RequestPage() {
  const [voted, setVoted] = useState<string | null>(null);

  const handleVote = (label: string) => {
    setVoted(label);
    // ★あとでDB or GoogleSheets連携も可能
    console.log(`投票: ${label}`);
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">画像のご要望受付</h1>

      {/* 🔘 ボタン式アンケート */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-2">どんな画像が欲しいですか？</h2>
        <div className="flex flex-wrap gap-3">
          {OPTIONS.map((label) => (
            <button
              key={label}
              onClick={() => handleVote(label)}
              disabled={!!voted}
              className={`px-3 py-1 rounded border text-sm ${
                voted === label
                  ? 'bg-green-500 text-white'
                  : 'bg-white hover:bg-gray-100 border-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {voted && (
          <p className="mt-4 text-green-600 text-sm">
            「{voted}」に投票ありがとうございます！
          </p>
        )}
      </section>

      {/* 📝 フォーム型リクエスト */}
      <section>
        <h2 className="text-lg font-semibold mb-2">もっと詳しくリクエストしたい方へ</h2>
        <p className="text-sm text-gray-700 mb-4">
          ピンポイントな要望や、画像の用途などがあれば、下記のフォームからお送りください。
        </p>
        <iframe
          src="https://docs.google.com/forms/d/e/あなたのフォームID/viewform?embedded=true"
          width="100%"
          height="800"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="画像リクエストフォーム"
        >
          読み込み中...
        </iframe>
      </section>
    </main>
  );
}