import { client } from '@/libs/client';
import { NextResponse } from 'next/server';

type Image = {
  id: string;
  title: string;
  viewCount?: number;
  image: {
    url: string;
    width: number;
    height: number;
  };
};

export async function GET() {
  try {
    const data = await client.get({ endpoint: 'images', queries: { limit: 100 } });
    const contents = data.contents as Image[];

    const sorted = contents
      .filter((item) => typeof item.viewCount === 'number')
      .sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0));

    return NextResponse.json(sorted.slice(0, 10));
  } catch (error: unknown) {
    console.error('📉 ランキング取得エラー:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch ranking';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}