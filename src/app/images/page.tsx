import ClientPage from './ClientPage';

type Props = {
  searchParams?: { [key: string]: string | string[] };
};

export default function Page({ searchParams = {} }: Props) {
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