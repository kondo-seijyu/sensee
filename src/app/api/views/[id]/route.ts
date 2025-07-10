// src/app/api/views/[id]/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/libs/client';

export async function POST(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    // 現在のviewCountを取得
    const image = await client.get({ endpoint: 'images', contentId: id });
    const currentCount = image.viewCount || 0;

    // +1して更新
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