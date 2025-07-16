import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="max-w-[1040px] mx-auto px-4 py-16 space-y-10 font-sans">
      <h1 className="text-2xl font-bold font-rounded text-gray-800">Senseeとは？</h1>
      <section className="bg-[#F6F4EB] p-6 rounded-2xl shadow-card space-y-4">
        <h2 className="text-lg font-bold font-rounded text-gray-800">Senseeの想い</h2>
        <p className="text-gray-600 text-sm">せんせいの“見せたい”をやさしく支える。</p>
        <p className="text-gray-600 text-sm">安心して使える画像は、センシーにまかせて。</p>
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          先生たちは日々、配布物やプリント、ポップの作成など
          “見せるための工夫”を求められていると思います。
        </p>
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          でも——
          著作権や肖像権の不安、検索の難しさ、素材探しの手間。
          それらは決して本来の仕事ではないのに、時間を奪ってしまっている。
        </p>
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          Sensee（センシー）は、「安心して使える画像」を届ける、
          やさしい相棒のような存在になるはずです。
        </p>
      </section>

      <section className="bg-[#F9FAFB] p-6 rounded-2xl shadow-card space-y-4">
        <h2 className="text-lg font-bold font-rounded text-gray-800">Senseeの使い方</h2>
        <h3 className="text-sm font-bold font-rounded text-gray-700">
          Senseeの画像は、以下のような場面でご活用いただけます。
        </h3>
        <ul className="list-disc list-inside text-gray-700 text-sm">
          <li>学校内での掲示物・印刷物（おたより・プリント・ポスター等）</li>
          <li>授業内での教材・配布資料</li>
          <li>保護者向けのLINEやメール配信など</li>
        </ul>
        <h3 className="text-sm font-bold font-rounded text-gray-700">Senseeは、こんなふうに使えます。</h3>
        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
          <li>「なんとなく、で伝えてもOK！センシーがいっしょに考えます。」</li>
          <li>「例えば“春っぽい装飾”など、あいまいなことばでも大丈夫です。」</li>
          <li>「このままプリントやポスターに使えます。」</li>
          <li>「必要なら画像の透過など自由におこなってください。」</li>
          <li>「画像は先生向けに生成・チェック済です。」</li>
          <li>「欲しい画像がなかったら気軽にリクエストしてください。」</li>
        </ul>
        <h3 className="text-sm font-bold font-rounded text-gray-700">安心して使っていただくために、以下の行為は禁止とさせていただいています。</h3>
        <ul className="list-disc list-inside text-gray-700 text-sm">
          <li>商用利用（販売物、広告目的の使用など）</li>
          <li>画像の再配布・再公開</li>
          <li>公序良俗に反する用途</li>
        </ul>
      </section>
      <p className="text-sm text-gray-500 text-center leading-relaxed whitespace-pre-line">
        {`本サービスは現在ベータ版です。
        ご意見・ご要望などがあれば、お気軽にお問い合わせフォームからお知らせください。`}
      </p>
      <div className="text-center">
        <Link href="/contact">
          <button
            type="button"
            className="bg-[#A7D8DE] text-white font-semibold py-2 px-6 rounded-full shadow transition-all duration-200 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:bg-opacity-90 text-sm cursor-pointer"
          >
            お問い合わせはこちら
          </button>
        </Link>
      </div>
    </main>
  );
}