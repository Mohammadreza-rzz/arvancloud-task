"use client"

import { ArticleDetailes } from "@/ui/view"
import { useParams } from "next/navigation"
import { useGetArticlesBySlug, usegetTags } from "@/utils/api/apiQuery"
import LoadingUi from "@/ui/components/loadingUi"
import {
  useProtectRoute,
  useLogOutOnLocalStorageChange,
  useIsClient,
} from "@/hook"

export default function EditArticles() {
  useProtectRoute()
  useLogOutOnLocalStorageChange()
  const isClient = useIsClient()
  const { slug } = useParams()
  const { data: tagsData, isLoading: getTagIsLoading } = usegetTags(["tags"])
  const { data: articleInfo, isLoading: getArticleIsLoading }: any =
    useGetArticlesBySlug(["article", String(slug)], !!slug ? String(slug) : "")
  let tagsList: string[] = []
  if (!!tagsData && !!articleInfo) {
    tagsList = [
      ...new Set([...tagsData.tags, ...articleInfo.articles[0].tagList]),
    ]
  }
  return (
    <>
      {isClient ? (
        <main className='space-y-7'>
          <>
            {getTagIsLoading || getArticleIsLoading ? (
              <LoadingUi />
            ) : (
              <>
                {" "}
                <h1 className='text-heading_md text-black'>Edit Article</h1>
                <ArticleDetailes
                  initialTag={tagsList}
                  initailData={!!articleInfo ? articleInfo.articles[0] : []}
                  isEdit
                />
              </>
            )}
          </>
        </main>
      ) : (
        ""
      )}
    </>
  )
}
