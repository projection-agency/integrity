'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import s from './BlogSection.module.css'

type Category = {
  id: string
  name: string
  count: number
}

export default function FilterBlog({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams)
    if (categoryId === 'all') {
      params.delete('category')
    } else {
      params.set('category', categoryId)
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className={s.filterPosts}>
      <div className={s.filterPostsCategories}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${s.filterPostsCategory} ${activeCategory === category.id ? s.active : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
            <span className={s.filterPostsCategoryCount}>( {category.count} )</span>
          </div>
        ))}
      </div>
    </div>
  )
}
