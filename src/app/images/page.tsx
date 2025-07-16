import ClientPage from './ClientPage';

export default async function Page(props: any) {
  const { searchParams } = props as { searchParams: Record<string, string | string[]> };

  const urlSearchParams = new URLSearchParams();
  for (const key in searchParams || {}) {
    const val = searchParams[key];
    if (Array.isArray(val)) {
      val.forEach((v) => urlSearchParams.append(key, v));
    } else {
      urlSearchParams.set(key, val);
    }
  }

  return <ClientPage searchParams={urlSearchParams} />;
}