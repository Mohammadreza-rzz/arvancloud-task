import { ArticleDetailes } from "@/ui/view"
import getTag from "@/utils/api/getTag"

export default async function CreateArticles() {
  const tags = await getTag()

  console.log(tags, "tagg")
  return (
    <div>
      <h1 className='text-heading_md text-black'>New Article</h1>
      <ArticleDetailes initialTag={tags?.data} />
    </div>
  )
}
