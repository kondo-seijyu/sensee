'use client';

import { useSearchParams } from 'next/navigation';
import ClientPage from './ClientPage';

export default function ImagePageWrapper() {
  const searchParams = useSearchParams();
  return <ClientPage key={searchParams.toString()} />;
}