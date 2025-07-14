import Link from 'next/link';
import Image from 'next/image';

type ImageCardProps = {
  item: {
    id: string;
    title: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
  };
};

export default function ImageCard({ item }: { item: ImageCardProps["item"] }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-md transition text-center w-[150px]">
      <Link href={`/images/${item.id}`}>
        <Image
          src={item.image.url}
          alt={item.title}
          width={item.image.width}
          height={item.image.height}
          className="object-cover w-full h-auto hover:opacity-80 transition"
        />
      </Link>

      <p
        className="text-sm font-sans line-clamp-2 leading-snug w-[150px] mx-auto px-2 mt-1"
        style={{ minHeight: '2.5em' }}
      >
        {item.title}
      </p>
    </div>
  );
}