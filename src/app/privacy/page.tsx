export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-[1040px] mx-auto px-4 py-16 space-y-10 font-sans">
      <h1 className="text-2xl font-bold font-rounded text-gray-800">プライバシーポリシー</h1>
      <div className="bg-[#F6F4EB] p-6 rounded-2xl shadow-card space-y-4">
        <h2 className="text-lg font-bold font-rounded text-gray-800">株式会社リフレクション / プライバシーポリシー</h2>
        <p>
          株式会社リフレクション（以下、「当社」といいます。）は、当社が管理および運営するサイトおよびサービス（以下、「本サービス」といいます。）を利用するユーザー（以下「ユーザー」といいます。）の個人情報の重要性を認識し、適切な収集、利用、保護の徹底をはかるためにプライバシーポリシーを定め、以下のとおり運用いたします。
        </p>

        <h2 className="text-lg font-semibold mt-8">第1条（個人情報の定義）</h2>
        <ul className="list-decimal list-inside space-y-1">
          <li>氏名、住所、性別、職業、電話番号、電子メールアドレス等により特定の個人を識別することができる情報。</li>
          <li>他の情報と照合することで特定の個人を識別できる情報。</li>
          <li>個人識別符号（個人情報の保護に関する法律 第2条第2項）が含まれる情報。</li>
        </ul>

        <h2 className="text-lg font-semibold mt-8">第2条（個人情報の収集）</h2>
        <p>当社は、利用目的を明示し、その達成に必要な範囲で、適法かつ公正な手段により個人情報を取得します。</p>

        <h2 className="text-lg font-semibold mt-8">第3条（個人情報の管理）</h2>
        <p>当社は、個人情報管理責任者を設け、適切な管理体制を整備し、保護に努めます。</p>

        <h2 className="text-lg font-semibold mt-8">第4条（個人情報の第三者提供）</h2>
        <ul className="list-decimal list-inside space-y-1">
          <li>本人の同意がある場合</li>
          <li>法令に基づく場合</li>
          <li>生命・身体・財産の保護に必要な場合</li>
          <li>公衆衛生・児童の健全育成に必要な場合</li>
          <li>国・地方公共団体などによる法令の事務遂行への協力が必要な場合</li>
          <li>決済処理における金融機関への情報確認が必要な場合</li>
        </ul>

        <h2 className="text-lg font-semibold mt-8">第5条（開示・訂正・利用停止等）</h2>
        <p>
          本人から開示・訂正・削除・利用停止等の請求があった場合、次の例外を除き、適切に対応します。
        </p>
        <ul className="list-decimal list-inside space-y-1">
          <li>他者の権利利益を害するおそれがある場合</li>
          <li>当社業務に支障がある場合</li>
          <li>他法令に違反する場合</li>
        </ul>

        <h2 className="text-lg font-semibold mt-8">第6条（第三者への委託）</h2>
        <p>
          個人情報の処理を外部委託する場合は、適正な委託先の選定と契約を行い、必要な監督を実施します。
        </p>

        <h2 className="text-lg font-semibold mt-8">第7条（Cookieの利用）</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Cookieは端末に保存されるテキストファイルです。</li>
          <li>個人の特定には用いません。</li>
          <li>ブラウザの設定でCookieの受け入れ可否を変更できます。</li>
          <li>取得された情報は第三者のプライバシーポリシーに基づき管理されます。</li>
        </ul>

        <h2 className="text-lg font-semibold mt-8">第8条（免責）</h2>
        <p>
          本サービスの情報に基づいてユーザーが行う行為に関して、当社は責任を負いません。
        </p>

        <h2 className="text-lg font-semibold mt-8">第9条（ポリシーの変更）</h2>
        <p>
          社会情勢や法令改正等に応じ、事前通知なしにプライバシーポリシーを変更する場合があります。変更後は通知・公表いたします。
        </p>

        <h2 className="text-lg font-semibold mt-8">第10条（お問い合わせ窓口）</h2>
        <p>
          本ポリシーに関するご質問は、お問い合わせフォームまたは以下までご連絡ください。
        </p>
        <address className="not-italic mt-2">
          株式会社リフレクション<br />
          〒550-0006 大阪府大阪市西区江之子島1-7-3 奥内阿波座駅前ビル808<br />
          <a href="mailto:info@reflection-inc.com" className="text-blue-500 underline">info@reflection-inc.com</a><br />
          担当：近藤 聖樹
        </address>

        <p className="mt-4 text-xs text-gray-500">
          2022年4月13日 制定／2023年2月1日 改訂
        </p>
      </div>
    </main>
  );
}