'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type ImageType = {
  id: string;
  title: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
};

type Message = 
  | { role: 'user'; text: string }
  | { role: 'bot'; text: string; images: ImageType[] };

export default function ChatSearchPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 最新メッセージが見えるようスクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // ユーザーメッセージ追加
    setMessages((prev) => [...prev, { role: 'user', text: input }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: data.reply || 'おすすめの画像を見つけました！',
          images: data.images || [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: '申し訳ありません。検索に失敗しました。', images: [] },
      ]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 flex flex-col h-[80vh] border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">チャット検索ベータ版</h1>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 bg-gray-50 p-4 rounded">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] ${
              msg.role === 'user' ? 'ml-auto bg-blue-600 text-white' : 'mr-auto bg-white text-gray-900'
            } p-3 rounded-lg shadow`}
          >
            <p>{msg.text}</p>
            {msg.role === 'bot' && msg.images.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {msg.images.map((img) => (
                  <Image
                    key={img.id}
                    src={img.image.url}
                    alt={img.title}
                    width={img.image.width}
                    height={img.image.height}
                    className="rounded"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="flex-grow border rounded px-3 py-2"
          placeholder="質問を入力してください"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? '検索中...' : '送信'}
        </button>
      </form>
    </main>
  );
}