import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchRequests } from '@/libs/client';
import { RequestType } from '@/types';

export default function RequestList() {
  const [requests, setRequests] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchRequests();
        setRequests(data);
      } catch (err) {
        console.error(err);
        setError('リクエストの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">リクエスト一覧</h2>

      {loading && <p>読み込み中...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="space-y-6">
          {requests.map((item) => (
            <div key={item.id} className="p-4 border rounded shadow-sm bg-white">
              <p className="font-bold text-lg">{item.title}</p>
              {item.detail && <p className="text-gray-700 mt-1">{item.detail}</p>}
              <p
                className={`mt-2 text-sm font-semibold ${
                  item.status === '対応済み'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }`}
              >
                ステータス: {item.status}
              </p>

              {Array.isArray(item.imageRef) &&
                item.imageRef.map((ref) => (
                  <Link
                    key={ref.id}
                    href={`/images/${ref.id}`}
                    className="text-sm text-blue-500 underline mt-1 block"
                  >
                    対応画像を見る
                  </Link>
                ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}