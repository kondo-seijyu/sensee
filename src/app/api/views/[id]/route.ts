import { NextResponse } from 'next/server';
import { client } from '@/libs/client';

export async function POST(_: Request, context: { params: { id: string } }) {
  const id = context.params.id;

  try {
    const image = await client.get({ endpoint: 'images', contentId: id });
    const currentCount = image.viewCount || 0;

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