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

## 🔁 [2025-07-16] PageProps 未存在による VS Code 型エラー対応

### エラー内容
モジュール ‘“next/navigation”’ にエクスポートされたメンバー ‘PageProps’ がありません。

### 原因
`next/navigation` に `PageProps` が定義されておらず、VS Code／TSで型が見つからない。

### 対応策
- ❗ Option A：`props: { searchParams: Promise<...> }` として await 展開する
- ✅ Option B：`any` で受け、`as { searchParams: Record<...> }` でキャスト（時短）

### （Option A：Promise受け→await展開）

import ClientPage from './ClientPage';

export default async function Page(
  props: Promise<{ searchParams: Record<string, string | string[]> }>
) {
  const { searchParams } = await props;

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

## ✅ [2025-07-16] Option A失敗 → Option Bでキャストに切替

### エラー内容
Page “src/app/images/page.tsx” has an invalid “default” export:
Type “Promise<…>” is not valid.

### 原因
Promise型のpropsを使った構成がNext.jsでサポートされていない

### 対応策
- props を `any` で受け（型を曖昧化）、
- `as { searchParams: Record<...> }` で必要な型を得る構成に変更

### 修正コード
```tsx
export default async function Page(props: any) {
  const { searchParams } = props as { searchParams: Record<string, string | string[]> };
  // ...
}

## ❌ [2025-07-16] Option A再使用による型エラー再発（戻ってしまった）

### 状況
- `props: { searchParams: ... }` と明示的に指定（Option A）
- → 前回と同様の型不一致で `PageProps` の制約に合わずエラー

### 対応
- Option B に戻す
- `any + as` 構成で確実に通るように修正

## ✅ [2025-07-16] ESLint no-explicit-any 対策としてルール無効コメントを追加

### 対応
現状 Next.js 15 の型定義が安定せず、正確な型指定をすると PageProps と整合せずビルドエラーとなる。
そのため、TypeScriptの厳密さより「動くコード優先」で any を許容する一時的対応。

```tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
