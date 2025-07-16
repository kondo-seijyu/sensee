import { ReadonlyURLSearchParams } from 'next/navigation';
import ClientPage from './ClientPage';

type Props = {
  searchParams: ReadonlyURLSearchParams;
};

export default function ImagePageWrapper({ searchParams }: Props) {
  return <ClientPage key={searchParams.toString()} searchParams={searchParams} />;
}