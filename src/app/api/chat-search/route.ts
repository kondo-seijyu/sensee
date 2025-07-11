import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { client } from '@/libs/client'; // microCMSのクライアント

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { question } = await request.json();
    console.log('ユーザー質問:', question);

    // GPT呼び出し
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: question }],
      functions: [
        {
          name: "extract_search_params",
          description: "質問から検索に必要なタグやカテゴリを抽出する",
          parameters: {
            type: "object",
            properties: {
              tags: { type: "array", items: { type: "string" } },
              categories: { type: "array", items: { type: "string" } },
              keyword: { type: "string" },
            },
          },
        },
      ],
      function_call: "auto",
    });

    const functionCall = chatCompletion.choices[0].message.function_call;
    console.log('GPT function_call:', functionCall);
    const args = functionCall ? JSON.parse(functionCall.arguments) : {};
    console.log('抽出パラメータ:', args);

    // キーワードをタグリストに追加してまとめてOR検索にする
    const tags = args.tags ?? [];
    if (args.keyword && args.keyword.trim()) {
      tags.push(args.keyword.trim());
    }
    const tagFilter = tags.length
      ? `(${tags.map((tag: string) => `tags[contains]${tag}`).join('[or]')})`
      : '';

    const categoryFilter = args.categories?.length
      ? `(${args.categories.map((cat: string) => `category[contains]${cat}`).join('[or]')})`
      : '';

    // filters配列に追加。AND条件で結合
    const filtersArr = [];
    if (tagFilter) filtersArr.push(tagFilter);
    if (categoryFilter) filtersArr.push(categoryFilter);

    const filters = filtersArr.length > 0 ? filtersArr.join('[and]') : '';
    console.log('microCMS filters:', filters);

    // microCMS検索
    const data = await client.get({
      endpoint: 'images',
      queries: {
        filters,
        limit: 20,
      },
    });
    console.log('microCMS検索結果件数:', data.contents.length);

    return NextResponse.json({ images: data.contents });
  } catch (error) {
    console.error('APIエラー:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}