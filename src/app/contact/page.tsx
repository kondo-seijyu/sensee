'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [agree, setAgree] = useState(false);
  const [form, setForm] = useState({
    company: '',
    name: '',
    email: '',
    tel: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert('プライバシーポリシーに同意してください');
      return;
    }
    if (!form.name || !form.email) {
      alert('必須項目が未入力です');
      return;
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      alert('送信に失敗しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <main className="max-w-[1040px] mx-auto px-4 py-16 space-y-10 font-sans">
      <h1 className="text-2xl font-bold font-rounded text-gray-800">お問い合わせ</h1>
      <section className="bg-[#F6F4EB] p-6 rounded-2xl shadow-card space-y-4">
        <h2 className="text-lg font-bold font-rounded text-gray-800">お気軽にお問い合わせください！</h2>
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
          ご意見・ご要望・不具合などありましたら、以下のフォームからお気軽にお送りください。
        </p>
      </section>

      {submitted ? (
        <div className="text-green-600 font-semibold text-center">送信ありがとうございます！</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#F9FAFB] p-6 rounded-2xl shadow-card space-y-4">
          <div>
            <h2 className="text-lg font-bold font-rounded text-gray-800 mb-4">お問い合わせフォーム</h2>
            <label className="block text-sm font-medium text-gray-700">貴社名 / 貴校名</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full rounded-md p-2 bg-[#FCFCFC] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="例：〇〇小学校 / 株式会社●●"
            />
          </div>
          <div>
            <h2 className="text-lg font-bold font-rounded text-gray-800"></h2>
            <label className="block text-sm font-medium text-gray-700">
              氏名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-md p-2 bg-[#FCFCFC] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="例：田中 太郎"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-md p-2 bg-[#FCFCFC] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="例：sensei@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">電話番号</label>
            <input
              type="tel"
              name="tel"
              value={form.tel}
              onChange={handleChange}
              className="w-full rounded-md p-2 bg-[#FCFCFC] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="例：06-1234-5678"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">お問い合わせ内容</label>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-md p-2 bg-[#FCFCFC] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="ご意見やご要望、サービスへの質問などをご記入ください。"
            />
          </div>
          <div className="flex items-start space-x-2">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 cursor-pointer"
            />
            <label htmlFor="agree" className="text-sm text-gray-700 cursor-pointer">
              <span>
                <Link href="/privacy" className="text-[#A7D8DE] underline hover:opacity-80 transition">
                  プライバシーポリシー
                </Link>
                に同意する
              </span>
            </label>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#A7D8DE] text-white font-semibold py-2 px-6 rounded-full shadow hover:scale-105 hover:bg-opacity-90 transition-transform text-sm cursor-pointer"
            >
              送信する
            </button>
          </div>
        </form>
      )}
    </main>
  );
}