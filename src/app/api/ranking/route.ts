import { NextResponse } from 'next/server';
import { client } from '@/libs/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 最大100件取得して viewCount でソート
    const res = await client.get({
      endpoint: 'images',
      queries: { limit: 100 },
    });

    // viewCountがあるデータをソートして上位10件に絞る
    const sorted = res.contents
      .filter((item: any) => typeof item.viewCount === 'number')
      .sort((a: any, b: any) => b.viewCount - a.viewCount)
      .slice(0, 10);

    return NextResponse.json({ ranking: sorted });
  } catch (error) {
    console.error('Failed to fetch ranking:', error);
    return NextResponse.json({ error: 'ランキング取得失敗' }, { status: 500 });
  }
}  