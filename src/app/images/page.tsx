import ClientPage from './ClientPage';

export default async function Page(propsPromise: Promise<{ searchParams: Record<string, string | string[]> }>) {
  const { searchParams } = await propsPromise;

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