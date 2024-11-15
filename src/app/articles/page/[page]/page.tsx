"use client"
import { useParams, useRouter } from "next/navigation"
import { useGetArticles } from "@/utils/api/apiQuery"
import LoadingUi from "@/ui/components/loadingUi"
import { ArticleTable, PaginateLayout } from "@/ui/view"
import {
  useProtectRoute,
  useIsClient,
  useLogOutOnLocalStorageChange,
} from "@/hook"

export default function Articles() {
  useProtectRoute()
  const router = useRouter()
  const { page } = useParams()
  const isClient = useIsClient()
  useLogOutOnLocalStorageChange()
  if (!!page && (page === "1" || +page < 0)) {
    router.push("/articles")
  }
  const offest = !!page ? (+page - 1) * 10 : 0

  const { data, isFetching, refetch }: any = useGetArticles(
    ["articles", String(page)],
    String(offest),
    "10",
  )

  const articlesCount = !!data ? data?.articlesCount : 0
  const articles = !!data ? data?.articles : []

  return (
    <>
      {isClient ? (
        <main className='space-y-7'>
          {isFetching ? (
            <LoadingUi />
          ) : (
            <>
              <h1 className='text-heading_md text-black'>All Posts</h1>
              <ArticleTable refetch={refetch} initialArticles={articles} />
              <PaginateLayout
                articlesCount={articlesCount}
                initialPage={!!page ? +page - 1 : 0}
              />
            </>
          )}
        </main>
      ) : (
        ""
      )}
    </>
  )
}
