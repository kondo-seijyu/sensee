import ClientPage from './ClientPage';

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const urlSearchParams = new URLSearchParams();
  for (const key in searchParams) {
    const val = searchParams[key];
    if (Array.isArray(val)) {
      val.forEach(v => urlSearchParams.append(key, v));
    } else if (val !== undefined) {
      urlSearchParams.set(key, val);
    }
  }

  return <ClientPage searchParams={urlSearchParams} />;
}