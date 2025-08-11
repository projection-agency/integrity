'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Dispatch, useState } from 'react'
import s from './BlogSection.module.css'
import 'simplebar-react/dist/simplebar.min.css'
import SimpleBar from 'simplebar-react'
import { SetStateAction } from 'react'
type Category = {
  id: string
  name: string
  count: number
}

export default function FilterBlog({
  categories,
  setPostData,
}: {
  categories: Category[]
  setPostData: Dispatch<SetStateAction<any[] | undefined>>
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'
  const [activeFilter, setActiveFilter] = useState('all')

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
      <SimpleBar
        forceVisible="x"
        style={{ maxWidth: '100%' }}
        className={s.simpleBarCont}
        autoHide={false}
      >
        <div className={s.filterPostsCategories}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${s.filterPostsCategory} ${activeFilter === category.id ? s.active : ''}`}
              onClick={() => {
                setPostData(undefined)
                handleCategoryChange(category.id)
                setActiveFilter(category.id)
              }}
            >
              {category.name}
              <span className={s.filterPostsCategoryCount}>( {category.count} )</span>
            </div>
          ))}
        </div>
      </SimpleBar>
    </div>
  )
}
