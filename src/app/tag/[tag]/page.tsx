import { redirect } from 'next/navigation';

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  redirect(`/images?tags=${encodeURIComponent(tag)}`);
}