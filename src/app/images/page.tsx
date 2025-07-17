import ClientPage from './ClientPage';

export default function Page(props: any) {
  const { searchParams } = props as {
    searchParams: Record<string, string | string[]>;
  };

  return <ClientPage />;
}