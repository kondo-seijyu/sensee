import { createClient } from 'microcms-js-sdk';
import { RequestType } from '@/types';

// microCMS クライアント初期化
export const client = createClient({
  serviceDomain: 'teacher-images',
  apiKey: process.env.MICROCMS_API_KEY!, // .env で安全に管理
});

// リクエスト一覧取得（最新100件）
export const fetchRequests = async (): Promise<RequestType[]> => {
  const res = await client.get<{ contents: RequestType[] }>({
    endpoint: 'requests',
    queries: { limit: 100, orders: '-publishedAt' },
  });
  return res.contents;
};