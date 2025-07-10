// src/app/api/views/[id]/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/libs/client';

interface Params { params: { id: string } }

export async function POST(
  request: Request,
  { params }: Params
) {
  const { id } = params;

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