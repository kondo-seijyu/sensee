import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { client } from '@/libs/client';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const { question } = await request.json();
    console.log('🧠 ユーザー質問:', question);

    // タグ一覧取得
    const tagMaster = await client.get({ endpoint: 'tags', queries: { limit: 100 } });
    const tagList = tagMaster.contents.map((t: any) => t.tag);
    const tagIdMap = Object.fromEntries(tagMaster.contents.map((t: any) => [t.tag, t.id]));

    // GPTでタグ予測（スコア付き）
    const prompt = `以下はユーザーの質問です。この内容に関連しそうなタグを最大3つ選び、それぞれに0〜1のscoreをつけてJSON形式で返してください。
スコアは「そのタグがどれだけ関係しそうか」を表してください。
※関係ないタグ（スコア0.5未満）は含めないようにしてください。

質問: 「${question}」
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
    let parsedTags: { tag: string; score: number }[] = [];

    try {
      parsedTags = JSON.parse(rawJson);
    } catch (e) {
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

    const formattedImages = data.contents.map((item: any) => ({
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
  } catch (error) {
    console.error('❌ APIエラー:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
