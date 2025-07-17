import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { client } from '@/libs/client';
import { ImageType } from '@/types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type TagScore = {
  tag: string;
  score: number;
};

type TagItem = {
  id: string;
  tag: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question: string = body.question;

    const safeQuestion = Buffer.from(question, 'utf-8').toString('utf-8');

    const tagMaster = await client.get({ endpoint: 'tags', queries: { limit: 100 } });
    const tags = tagMaster.contents as TagItem[];

    const tagList = tags.map((t) => t.tag);
    const tagIdMap = Object.fromEntries(tags.map((t) => [t.tag, t.id]));

    const prompt = `以下はユーザーの質問です。この内容に関連しそうなタグを最大3つ選び、それぞれに0~1のscoreをつけてJSON形式で返してください。
スコアは「そのタグがどれだけ関係しそうか」を表してください。
※関係ないタグ（スコア0.5未満）は含めないでください。

質問: "${safeQuestion}"
タグ一覧: ${JSON.stringify(tagList)}

出力例:
[
  { "tag": "natsu", "score": 0.9 },
  { "tag": "animal", "score": 0.6 }
]`;

    const gptRes = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const rawJson = gptRes.choices?.[0]?.message?.content || '[]';
    let parsedTags: TagScore[] = [];

    try {
      parsedTags = JSON.parse(rawJson) as TagScore[];
    } catch {
      console.warn('⚠️ GPT出力のJSONパース失敗:', rawJson);
    }

    const matchedTags = parsedTags
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .filter((t) => t.score > 0.6)
      .map((t) => tagIdMap[t.tag])
      .filter(Boolean);

    const tagFilter = matchedTags.length
      ? `(${matchedTags.map((tag) => `tags[contains]${tag}`).join('[or]')})`
      : '';

    const textFields = ['title', 'description', 'category'];
    const textFilter = `(${textFields.map((field) => `${field}[contains]${question}`).join('[or]')})`;

    const filterQuery = tagFilter
      ? `(${tagFilter}[or]${textFilter})`
      : textFilter;

    const data = await client.get({
      endpoint: 'images',
      queries: {
        filters: filterQuery,
        limit: 20,
      },
    });

    const contents = data.contents as ImageType[];
    const formattedImages = contents.map((item) => ({
      id: item.id,
      title: item.title,
      image: {
        url: item.image.url,
        width: item.image.width,
        height: item.image.height,
      },
    }));

    if (formattedImages.length === 0) {
      return NextResponse.json({
        reply: 'すみません。。ご希望に合う画像が見つかりませんでした。他のキーワードも試してみてください！',
        images: [],
      });
    }

    return NextResponse.json({
      reply: 'おすすめの画像を見つけました！画像をクリックすると詳細ページにいくよ♪',
      images: formattedImages,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('❌ APIエラー:', message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}