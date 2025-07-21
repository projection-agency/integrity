import TabSection from '@/components/ui/TabSection/TabSection'
import s from './SimilarArticlesSection.module.css'
import { getPostsWithFilter } from '@/action/getPostsWithFilter'
import ArticleItem from '@/components/ui/ArticleItem/ArticleItem'

const SimilarArticlesSection = async () => {
  const categoryId = 'all'

  const [filteredPosts] = await Promise.all([getPostsWithFilter(categoryId)])

  console.log(filteredPosts.slice(0, 3))

  return (
    <div className={s.similarArticlesCont}>
      <div className={s.topBlock}>
        <TabSection text="articles" style="gray" />
        <h2>
          <span>similar</span> articles
        </h2>
      </div>
      <div className={s.articlesList}>
        {filteredPosts.slice(1, 3).map((post, index) => (
          <ArticleItem key={post.id} post={post} idx={index} />
        ))}
      </div>
    </div>
  )
}

export default SimilarArticlesSection
