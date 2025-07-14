'use client';

import { useState, useEffect } from 'react';
import { fetchRequests } from '@/libs/client';
import { RequestType } from '@/types';
import Link from 'next/link';

export default function RequestPage() {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');
  const [purpose, setPurpose] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [requests, setRequests] = useState<RequestType[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchRequests();
      setRequests(data);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center space-y-4">
        <h1 className="text-2xl font-bold font-rounded">リクエストありがとうございました！</h1>
        <p className="text-gray-700">今後の素材追加の参考にさせていただきます 🙏</p>
        <Link href="/">
          <button className="mt-4 bg-primary text-white font-semibold py-2 px-6 rounded-full shadow hover:scale-105 hover:bg-opacity-90 transition-transform text-sm cursor-pointer">
            トップページに戻る
          </button>
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-[1040px] mx-auto px-4 py-16 space-y-10 font-sans">
      <h1 className="text-2xl font-bold font-rounded text-gray-800">リクエスト</h1>
      <section className="bg-[#F6F4EB] p-6 rounded-2xl shadow-card space-y-4">
        <h2 className="text-lg font-bold font-rounded text-gray-800">画像のリクエストもお気軽に！</h2>
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
          欲しい画像や場面があれば、ぜひ教えてください！
          なるべく早めに対応します。</p>
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">対応後にお知らせが必要な場合は、
          「学校名または氏名」と「メールアドレス」の記入もお願いします。
        </p>
      </section>

      <section className="bg-[#F9FAFB] p-6 rounded-2xl shadow-card space-y-4">
        <h2 className="text-lg font-bold font-rounded text-gray-800">リクエストフォーム</h2>
        <form onSubmit={handleSubmit} className="bg-secondary p-6 rounded-2xl shadow-card space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">貴社名 / 貴校名</label>
            <input
              type="text"
              className="w-full rounded-md p-2 bg-[#FCFCFC] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="例：株式会社●● / 〇〇小学校"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">氏名</label>
            <input
              type="text"
              className="w-full rounded-md p-2 bg-[#FCFCFC] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例：田中 太郎"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
            <input
              type="email"
              className="w-full rounded-md p-2 bg-[#FCFCFC] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="例：sensei@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">リクエスト内容 <span className="text-red-500">*</span></label>
            <textarea
              required
              className="w-full rounded-md p-2 bg-[#FCFCFC] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="例：運動会の準備をしている子どもたちの様子"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">利用シーンや目的</label>
            <textarea
              className="w-full rounded-md p-2 bg-[#FCFCFC] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              rows={2}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="例：10月の行事紹介スライドに使いたい"
            />
          </div>
          <button
            type="submit"
            className="bg-[#A7D8DE] text-white font-semibold py-2 px-6 rounded-full shadow hover:scale-105 hover:bg-opacity-90 transition-transform text-sm cursor-pointer"
          >
            送信する
          </button>
        </form>
      </section>
      <section className="bg-[#F6F4EB] p-6 rounded-2xl shadow-card space-y-4">
        <h2 className="text-lg font-bold font-rounded text-gray-800">リクエスト一覧</h2>
        <div className="space-y-6">
          {requests.map((item) => (
            <div key={item.id} className="p-4 border rounded-xl shadow-card bg-white space-y-1">
              <p className="font-bold text-sm">{item.title}</p>
              {item.detail && <p className="text-gray-700 text-sm">{item.detail}</p>}
              <p className="text-xs text-blue-600 mt-2">ステータス: {item.status}</p>
              {Array.isArray(item.imageRef) &&
                item.imageRef.map((ref, index) => (
                  <Link
                    key={`${item.id}-${ref.id}-${index}`}
                    href={`/images/${ref.id}`}
                    className="text-sm text-blue-500 underline mt-1 block"
                  >
                    対応画像を見る
                  </Link>
                ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}