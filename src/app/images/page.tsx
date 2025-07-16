import ClientPage from './ClientPage';

export default async function Page({ searchParams }: { searchParams: Record<string, string | string[]> }) {
  // searchParams は Promise ではなく、既に解決済みの型。
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