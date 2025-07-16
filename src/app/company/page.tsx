'use client';

import Image from 'next/image';

export default function CompanyPage() {
  return (
    <main className="max-w-[1040px] mx-auto px-4 py-16 space-y-10 font-sans">
      <h1 className="bg-[#fff] text-2xl font-bold font-rounded text-[#F6F4EB]"> </h1>
      <section className="bg-[#F6F4EB] p-6 rounded-2xl shadow-card space-y-6">
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p>思考と構造のあいだに余白をつくる。</p>
          <p>埋めないことを設計し、熱ではなく灰を残す。</p>
          <p>語らない美しさが、静かな体験をつくる。</p>
        </div>
      </section>

      <section className="bg-[#F9FAFB] p-6 rounded-2xl shadow-card space-y-4">
        <h2 className="text-lg font-bold font-rounded text-gray-800">会社概要</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
          <div>
            <dt className="font-semibold">会社名</dt>
            <dd>株式会社リフレクション</dd>
          </div>
          <div>
            <dt className="font-semibold">代表取締役</dt>
            <dd>近藤 聖樹</dd>
          </div>
          <div>
            <dt className="font-semibold">所在地</dt>
            <dd>〒550-0006 大阪府大阪市西区江之子島1-7-3 奥内阿波座駅前ビル 808</dd>
          </div>
          <div>
            <dt className="font-semibold">TEL</dt>
            <dd>06-4400-0514</dd>
          </div>
          <div>
            <dt className="font-semibold">URL</dt>
            <dd>
              <a href="https://reflection-inc.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                https://reflection-inc.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">資本金</dt>
            <dd>3,000,000円</dd>
          </div>
          <div>
            <dt className="font-semibold">事業内容</dt>
            <dd className="mt-1">
              <ul className="list-disc ml-5 space-y-1">
                <li>Webサイト・Webシステム・Webアプリ制作</li>
                <li>Webマーケティング企画・支援・運用</li>
                <li>教育支援コンテンツの企画開発・導入サポート</li>
                <li>生成AIを活用したプロダクト開発・運営</li>
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">主要取引先</dt>
            <dd className="mt-1">
              <ul className="list-disc ml-5 space-y-1">
                <li>ヤフーLINE株式会社</li>
                <li>株式会社マイナビ</li>
                <li>株式会社Speee</li>
                <li>株式会社JR東海エージェンシー など</li>
              </ul>
            </dd>
          </div>
        </dl>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-rounded text-gray-800">制作実績</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl overflow-hidden shadow-card bg-white">
            <Image src="/images/work1.png" alt="株式会社リフレクションのWebサイト" width={400} height={300} className="w-full h-auto object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card bg-white">
            <Image src="/images/work2.png" alt="日本酒にしようプロジェクトのECサイト" width={400} height={300} className="w-full h-auto object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card bg-white">
            <Image src="/images/work3.png" alt="株式会社DeepXのWebサイト" width={400} height={300} className="w-full h-auto object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card bg-white">
            <Image src="/images/work4.png" alt="ALPS税理士法人のリクルートサイト" width={400} height={300} className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>
    </main>
  );
}