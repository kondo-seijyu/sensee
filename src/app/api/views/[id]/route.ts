import { NextResponse } from 'next/server';
import { client } from '@/libs/client';

export async function POST(request: Request) {
  // URLからparamsのidを取得
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // [id]部分を取得

  if (!id) {
    return NextResponse.json({ success: false, error: 'ID not found' }, { status: 400 });
  }

  try {
    const image = await client.get({
      endpoint: 'images',
      contentId: id,
    });

    const currentCount = image.viewCount ?? 0;

    await client.update({
      endpoint: 'images',
      contentId: id,
      content: { viewCount: currentCount + 1 },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('View count update failed:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}