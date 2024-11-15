import React from "react"
import { articlesFormatter } from "@/utils/formatter"
import { getArticleBySlug } from "../apiFunction"

import { useQuery } from "@tanstack/react-query"

const useGetArticlesBySlug = (queryKey: string[], slug: string) => {
  const query = useQuery({
    queryKey: queryKey,
    queryFn: getArticleBySlug.bind(this, slug),
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    select: (data: any) => {
      if (!!data) {
        return {
          articles: articlesFormatter([data.data.article]),
        }
      } else {
        return []
      }
    },
  })
  return query
}

export default useGetArticlesBySlug
