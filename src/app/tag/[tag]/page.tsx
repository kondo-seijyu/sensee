import { redirect } from 'next/navigation';

type Props = {
  params: { tag: string };
};

export default function TagPage({ params }: Props) {
  const { tag } = params;
  redirect(`/images?tags=${encodeURIComponent(tag)}`);
}