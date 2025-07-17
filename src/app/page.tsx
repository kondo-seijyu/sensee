'use client';

import { useEffect, useState } from 'react';
import { client } from '@/libs/client';
import Link from 'next/link';
import Image from 'next/image';
import { ImageType, Tag, Category } from '@/types';

export default function HomePage() {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    if (keyword.trim()) {
      window.location.href = `/images?search=${encodeURIComponent(keyword)}`;
    }
  };
  const [data, setData] = useState<ImageType[]>([]);
  const [seasonalData, setSeasonalData] = useState<ImageType[]>([]);
  const [rankingData, setRankingData] = useState<ImageType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [topTags, setTopTags] = useState<Tag[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);

  useEffect(() => {
    const getSeasonTagId = () => {
      const month = new Date().getMonth() + 1;
      if ([3, 4, 5].includes(month)) return 'spring';
      if ([6, 7, 8].includes(month)) return 'summer';
      if ([9, 10, 11].includes(month)) return 'autumn';
      return 'winter';
    };

    const fetchInitialData = async () => {
      try {
        const [latest, seasonal, rankingRes, catTag] = await Promise.all([
          client.get({ endpoint: 'images', queries: { limit: 12, orders: '-publishedAt' } }),
          client.get({
            endpoint: 'images',
            queries: {
              filters: `tags[contains]${getSeasonTagId()}`,
              limit: 6,
              orders: '-_sys.updatedAt',
            },
          }),
          fetch('/api/ranking').then((res) => res.json()),
          Promise.all([
            client.get({ endpoint: 'categories', queries: { limit: 20 } }),
            client.get({ endpoint: 'tags', queries: { limit: 50 } }),
          ]),
        ]);

        setData(latest.contents);
        setSeasonalData(seasonal.contents);
        setRankingData(rankingRes.slice(0, 6));
        setCategories(catTag[0].contents);
        setTags(catTag[1].contents);

        const tagCountMap: Record<string, { name: string; count: number }> = {};
        latest.contents.forEach((img: ImageType) => {
          img.tags?.forEach((tag: Tag) => {
            if (!tagCountMap[tag.id]) {
              tagCountMap[tag.id] = { name: tag.name, count: 1 };
            } else {
              tagCountMap[tag.id].count += 1;
            }
          });
        });

        const sorted = Object.entries(tagCountMap)
          .sort((a, b) => b[1].count - a[1].count)
          .slice(0, 20)
          .map(([id, info]) => ({ id, name: info.name }));

        setTopTags(sorted);
      } catch (err) {
        console.error('初期データの取得に失敗:', err);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <main className="max-w-[1040px] mx-auto px-4 py-12 space-y-16">
      {/* メインビジュアル */}
      <section className="text-center space-y-6">
        <h1 className="sr-only">Sensee</h1>
        <div className="mb-6">
          <Image
            src="/images/logo.webp"
            alt="Sensee"
            width={240}
            height={80}
            className="mx-auto"
            priority
          />
        </div>
        <div className="leading-relaxed">
          <p className="font-semibold">せんせいの“見せたい”をやさしく支える。</p>
          <p className="text-gray-500">〜安心して使える画像は、Sensee(センシー)にまかせて。〜</p>
        </div>

        {/* カテゴリタグ */}
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/images?category=${cat.id}`}
              className="bg-[#F6F4EB] text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-[#A7D8DE] /30 transition"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/category"
            className="text-sm text-blue-500 hover:underline self-center"
          >
            もっと見る
          </Link>
        </div>

        {/* 検索ボックス */}
        <div className="flex w-full max-w-xl mx-auto mt-6 h-11">
          <div className="relative flex-grow">
            <span className="absolute left-3 inset-y-0 my-auto flex items-center text-gray-400 text-lg">
              🔍
            </span>
            <input
              type="text"
              placeholder="検索キーワードを入力"
              className="w-full h-full pl-10 pr-3 border border-gray-300 rounded-l-full text-sm focus:outline-none"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-24 h-full bg-blue-500 text-white text-sm rounded-r-fullhover:bg-blue-600 transition"
          >
            検索
          </button>
        </div>

        <section className="おすすめタグ">
          <h2 className="text-lg font-bold mb-2">おすすめのタグ</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {(showAllTags ? tags : topTags).map(tag => (
              <Link key={tag.id} href={`/images?tags=${tag.id}`}>
                <span className="px-3 py-1 rounded-full bg-[#B5D8B1] text-sm text-white">
                  #{tag.name}
                </span>
              </Link>
            ))}
            {!showAllTags && (
              <button
                onClick={() => setShowAllTags(true)}
                className="text-blue-500 text-sm mt-1 underline"
              >
                もっと見る
              </button>
            )}
          </div>
        </section>

        <div>
          <Link href="/chat-search" passHref>
            <button className="bg-[#A7D8DE] text-white font-semibold py-2 px-6 rounded-full shadow transition-all duration-200 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:bg-opacity-90 text-sm cursor-pointer">
              &quot;Sensee AI&quot;とお話ししてみる
            </button>
          </Link>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4 font-rounded">新着画像</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-md transition text-center w-[150px]"
            >
              <Link href={`/images/${item.id}`}>
                <Image
                  src={item.image.url}
                  alt={item.title}
                  width={item.image.width}
                  height={item.image.height}
                  className="object-cover w-full h-auto hover:opacity-80 transition"
                />
              </Link>
              <p
                className="text-sm font-sans line-clamp-2 leading-snug w-[150px] mx-auto px-2"
                style={{ minHeight: '2.5em' }}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {seasonalData.length > 0 && (
        <section className="text-center">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4 font-rounded">季節のおすすめ</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {seasonalData.map(item => (
              <div key={item.id} className="w-[150px] rounded-2xl bg-white shadow hover:shadow-md transition text-center">
                <Link href={`/images/${item.id}`}>
                  <Image
                    src={item.image.url}
                    alt={item.title}
                    width={item.image.width}
                    height={item.image.height}
                    className="object-cover w-full h-auto hover:opacity-80 transition"
                  />
                </Link>
                <p className="text-sm line-clamp-2 px-2">{item.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4 font-rounded">人気の画像</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {rankingData.map((item, index) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-md transition text-center w-[150px]"
            >
              <Link href={`/images/${item.id}`}>
                <Image
                  src={item.image.url}
                  alt={item.title}
                  width={item.image.width}
                  height={item.image.height}
                  className="object-cover w-full h-auto hover:opacity-80 transition"
                />
              </Link>
              <p className="mt-2 text-sm font-sans line-clamp-2 leading-tight w-[150px] mx-auto">
                🏆 {index + 1}位: {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>


      <section className="text-center py-16 px-4 mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-rounded">Senseeとは？</h2>
        <div className="mx-auto">
          <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
            Sensee（センシー）は、
            <span className="bg-yellow-200 px-1 rounded-sm">先生の&quot;見せたい&quot;をやさしく支える</span>
            画像素材サイトです。<br />
            保育・教育現場にぴったりな画像を、
            <span className="bg-yellow-200 px-1 rounded-sm">あいまいなことばでもAIが見つけてくれる</span>
            のが特徴。<br />
            安心して使える画像は、センシーにおまかせください。
          </p>
          <Link href="/about">
            <button className="mt-6 bg-[#A7D8DE] text-white font-semibold py-2 px-6 rounded-full shadow transition-all duration-200 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:bg-opacity-90 text-sm cursor-pointer">
              Senseeについてもっと知る
            </button>
          </Link>
        </div>
      </section>

      <section className="text-center px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-rounded">Senseeが選ばれる理由</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          <div className="bg-[#F6F4EB] p-4 rounded-xl shadow-sm">
            <p className="text-lg font-bold mb-2">① 現在はベータ版のため完全無料！</p>
            <p className="text-sm text-gray-700">今だけの特典として、すべての画像が無料で使えます。</p>
          </div>
          <div className="bg-[#F6F4EB] p-4 rounded-xl shadow-sm">
            <p className="text-lg font-bold mb-2">② 現在はベータ版のため登録不要！</p>
            <p className="text-sm text-gray-700">面倒な会員登録なしで、すぐに利用スタート可能。</p>
          </div>
          <div className="bg-[#F6F4EB] p-4 rounded-xl shadow-sm">
            <p className="text-lg font-bold mb-2">③ 著作権や肖像権は全てクリア！</p>
            <p className="text-sm text-gray-700">先生が安心して使えるように、利用規約に沿った素材のみ掲載。</p>
          </div>
          <div className="bg-[#F6F4EB] p-4 rounded-xl shadow-sm">
            <p className="text-lg font-bold mb-2">④ AIがあいまい検索をサポート！</p>
            <p className="text-sm text-gray-700">「あの行事のやつ」「◯◯の絵」などのゆるい検索もOK。</p>
          </div>
          <div className="bg-[#F6F4EB] p-4 rounded-xl shadow-sm">
            <p className="text-lg font-bold mb-2">⑤ 毎日画像をアップロード中！</p>
            <p className="text-sm text-gray-700">毎日画像を追加中。今しかない画像にも出会えるかも。</p>
          </div>
          <div className="bg-[#F6F4EB] p-4 rounded-xl shadow-sm">
            <p className="text-lg font-bold mb-2">⑥ 欲しい画像のリクエストもお気軽に！</p>
            <p className="text-sm text-gray-700">欲しい画像が見つからなかったらリクエストしてください！</p>
          </div>
        </div>
      </section>

      <section className="text-center px-4 py-16 bg-[#F9FAFB]">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-rounded">&quot;Sensee AI&quot;とは？</h2>
        <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed text-base space-y-4">
          <p>
            「どんな画像を探せばいいか分からない…」そんな時は、
            <span className="bg-yellow-100 px-1 rounded-sm font-medium">SenseeAI</span>に聞いてみてください。
          </p>
          <p>
            保育や教育の現場で使われるシーンを理解して、<br className="hidden sm:inline" />
            あいまいな言葉からでもぴったりの画像を見つけてくれます。
          </p>
          <p>会話するだけで、画像検索がもっと簡単＆たのしく。</p>

          <Link href="/chat-search">
            <button className="bg-[#A7D8DE] text-white font-semibold py-2 px-6 rounded-full shadow transition-all duration-200 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:bg-opacity-90 text-sm cursor-pointer">
              &quot;Sensee AI&quot;とお話してみる
            </button>
          </Link>
        </div>
      </section>
      {/* 画像リクエスト募集 */}
      <section className="text-center py-16 px-4 mx-auto bg-[#F6F4EB] rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-rounded">画像リクエスト募集中！</h2>
        <p className="text-gray-700 mb-6">
          「こんな画像ほしい！」を教えてください。<br />
          教育・保育現場に役立つ素材をどんどん追加していきます！
        </p>
        <Link href="/request">
          <button className="bg-[#EAC67A] text-white font-semibold py-2 px-6 rounded-full shadow transition-all duration-200 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:bg-opacity-90 text-sm cursor-pointer">
            リクエストする
          </button>
        </Link>
      </section>
    </main>
  );
}