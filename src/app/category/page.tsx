// src/app/category/page.tsx
import { client } from '@/libs/client'
import Link from 'next/link'

type Category = {
  id: string
  name: string
}

export default async function CategoryPage() {
  const data = await client.get<{ contents: Category[] }>({
    endpoint: 'categories',
  })

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">カテゴリ一覧</h1>
      <ul className="space-y-2">
        {data.contents.map((category: Category) => (
          <li key={category.id}>
            <Link
              href={`/category/${category.id}`}
              className="text-blue-600 hover:underline"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}