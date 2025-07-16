export default function LoginPage() {
  return (
    <main className="max-w-[1040px] mx-auto px-4 py-16 space-y-10 font-sans">
      <h1 className="text-2xl font-bold font-rounded text-gray-800">ログイン / 会員登録</h1>
      <div className="bg-[#F6F4EB] p-6 rounded-2xl shadow-card space-y-4">
        <p className="text-red-600 font-semibold">※このページは現在準備中です</p>
        <p className="text-sm text-gray-600">
          ご要望・ご質問などございましたら、
          <a href="/contact" className="text-blue-600 underline ml-1">こちらからご連絡ください。</a>
        </p>
      </div>

      {/* ここに将来的なログインフォーム構造をコメントアウトで追加 */}
      {/**
      <form className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
          <input type="email" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">パスワード</label>
          <input type="password" className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">ログイン</button>
      </form>
      **/}
    </main>
  );
}