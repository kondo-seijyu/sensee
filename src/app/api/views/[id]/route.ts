import { NextResponse } from 'next/server';
import { client } from '@/libs/client';

export async function POST(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ success: false, error: 'ID not found in request URL' }, { status: 400 });
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('📊 View count update error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}