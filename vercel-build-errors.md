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