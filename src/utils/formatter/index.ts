import type { ArticlesDataType } from "@/types"
import { formatDateToLongString } from "@/utils/helper"

export const articlesFormatter = (rowData: ArticlesDataType[]) => {
  return rowData.map(el => {
    return {
      title: el?.title ?? "",
      author: el?.author?.username ?? "",
      tagList: el?.tagList,
      createdAt: formatDateToLongString(el?.createdAt) ?? "",
      body: el?.body ?? "",
      description: el?.description ?? "",
      slug: el?.slug ?? "",
    }
  })
}
