import ClientPage from './ClientPage';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ImagePageWrapper({ searchParams }: Props) {
  const sp = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => sp.append(key, v));
    } else if (value) {
      sp.set(key, value);
    }
  });

  return <ClientPage key={sp.toString()} searchParams={sp} />;
}