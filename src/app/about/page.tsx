import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">このサイトについて</h1>

      <p className="mb-4 text-gray-700 leading-relaxed">
        このサイト「Sensee」は、先生方向けに安心して利用できる画像素材を配布するためのプラットフォームです。
        掲載されている画像は、すべてAI（ChatGPT / DALL·E）で生成され、株式会社リフレクションが著作権を保有しています。
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">✅ ご利用いただける用途</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>学校内での掲示物・印刷物（おたより・プリント・ポスター等）</li>
        <li>授業内での教材・配布資料</li>
        <li>保護者向けのLINEやメール配信など</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-2">⚠️ 禁止事項</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>商用利用（販売物、広告目的の使用など）</li>
        <li>画像の再配布・再公開</li>
        <li>公序良俗に反する用途</li>
      </ul>

      <p className="mt-6 text-sm text-gray-500">
        本サービスは現在ベータ版です。今後、NPOや教育関連団体との連携も検討しています。
      </p>

      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← トップページに戻る
        </Link>
      </div>
    </main>
  );
}