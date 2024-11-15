"use client"
import { ArticleDetailes } from "@/ui/view"
import { usegetTags } from "@/utils/api/apiQuery"
import LoadingUi from "@/ui/components/loadingUi"

export default function CreateArticles() {
  // const tags = await getTag()
  const { data, isLoading } = usegetTags(["tags"])
  console.log(data, "datta")

  return (
    <>
      {isLoading ? (
        <LoadingUi />
      ) : (
        <div>
          <h1 className='text-heading_md text-black'>New Article</h1>
          <ArticleDetailes initialTag={!!data ? data?.tags : []} />
        </div>
      )}
    </>
  )
}
