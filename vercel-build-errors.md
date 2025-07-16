# 🔧 Vercel Build Errors Log
---

## ❌ [2025-07-16] `searchParams` 型エラー

### エラー内容（Next.js App Router / page.tsx）

### 状況
- Next.js 15.3.5
- App Router 構成
- `src/app/images/page.tsx` にて `searchParams` をURLSearchParamsに変換

### 原因
- Next.jsが `PageProps` をうまく推論できず、型が Promise 系と誤解されてビルドエラー

### 対応策
- 明示的に Props 型を定義（`type Props = { searchParams?: { [key: string]: string | string[] } }`）
- コンポーネント引数で `searchParams = {}` とデフォルト値を指定

### 修正後のコード
```tsx
type Props = {
  searchParams?: { [key: string]: string | string[] };
};

export default function Page({ searchParams = {} }: Props) {
  const urlSearchParams = new URLSearchParams();
  // 略
}

### 状況
- Next.js 15.3.5（App Router）
- `src/app/images/page.tsx` で `searchParams` を使っていた
- `Page` を普通の関数として定義していた（asyncなし）

### 原因
Next.js が App Router の `Page` に対して `async` 関数であることを前提に型チェックしているため、  
非asyncなままだと `searchParams` を Promise だと誤解し型エラーになる。

### 対応策
- `export default async function Page(...)` に変更
- `searchParams` に `Record<string, string | string[]>` 型を明示

### 修正コード
```tsx
export default async function Page({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  const urlSearchParams = new URLSearchParams();
  for (const key in searchParams) {
    const val = searchParams[key];
    if (Array.isArray(val)) {
      val.forEach(v => urlSearchParams.append(key, v));
    } else {
      urlSearchParams.set(key, val);
    }
  }

  return <ClientPage searchParams={urlSearchParams} />;
}

---

## ✅ [2025-07-16] `PageProps` Promise対応でsearchParams型エラー解消

### エラー内容
Type ‘{ searchParams: … }’ does not satisfy the constraint ‘PageProps’.
…
missing properties from type ‘Promise’: then, catch, finally

### 原因
Next.js 15 の App Router において、`Page` の引数 `props` が `Promise<PageProps>` 扱いになっているため、  
通常のオブジェクト型 `{ searchParams: ... }` では型不一致となりエラー。

### 対応策
引数を `Promise` 型で受け取り、`await` で中身を展開する形式に変更。

### 修正コード
```tsx
export default async function Page(
  propsPromise: Promise<{ searchParams: Record<string, string | string[]> }>
) {
  const { searchParams } = await propsPromise;

  const urlSearchParams = new URLSearchParams();
  // ...
}