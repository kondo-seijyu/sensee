import { createClient } from 'microcms-js-sdk';
import { RequestType } from '@/types';

export const client = createClient({
  serviceDomain: 'teacher-images',
  apiKey: process.env.MICROCMS_API_KEY!,
});

export const fetchRequests = async (): Promise<RequestType[]> => {
  const res = await client.get<{ contents: RequestType[] }>({
    endpoint: 'requests',
    queries: { limit: 100, orders: '-publishedAt' },
  });
  return res.contents;
};