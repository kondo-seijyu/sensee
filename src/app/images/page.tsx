import ClientPage from './ClientPage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const { searchParams } = props as {
    searchParams: Record<string, string | string[]>;
  };

  return <ClientPage searchParams={searchParams} />;
}