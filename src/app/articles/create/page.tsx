"use client"
import { ArticleDetailes } from "@/ui/view"
import { usegetTags } from "@/utils/api/apiQuery"
import LoadingUi from "@/ui/components/loadingUi"
import {
  useProtectRoute,
  useIsClient,
  useLogOutOnLocalStorageChange,
} from "@/hook"

export default function CreateArticles() {
  const isClient = useIsClient()
  useProtectRoute()
  useLogOutOnLocalStorageChange()
  // const tags = await getTag()
  const { data, isLoading } = usegetTags(["tags"])

  return (
    <>
      {isClient ? (
        isLoading ? (
          <LoadingUi />
        ) : (
          <div>
            <h1 className='text-heading_md text-black'>New Article</h1>
            <ArticleDetailes initialTag={!!data ? data?.tags : []} />
          </div>
        )
      ) : (
        ""
      )}
    </>
  )
}
