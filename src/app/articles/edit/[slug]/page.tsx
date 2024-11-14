import { ArticleDetailes } from "@/ui/view"
import { getArticleBySlug, getTag } from "@/utils/api"

type ArticleEditPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function EditArticles({ params }: ArticleEditPageProps) {
  const { slug } = await params
  const tags = await getTag()
  const articledata = await getArticleBySlug(slug)
  const { article } = articledata?.data ?? null
  let tagsList: string[] = []
  if (!!tags && tags?.data) {
    tagsList = [...new Set([...tags.data, ...article[0].tagList])]
  }
  return (
    <main className='space-y-7'>
      <h1 className='text-heading_md text-black'>Edit Article</h1>
      <ArticleDetailes initialTag={tagsList} initailData={article[0]} isEdit />
    </main>
  )
}
