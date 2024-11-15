import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"

import { toastHandler } from "@/utils/helper"

import { EditArticleApi } from "../apiFunction"

const useEditArticleApi = () => {
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: EditArticleApi,
    gcTime: 0,
    onError: error => {
      if (error instanceof AxiosError && error.response) {
        const errorMessageKey = Object.keys(error?.response.data.errors)[0]
        const errorMessage = error?.response.data.errors[errorMessageKey][0]
        const message = `${errorMessageKey} ${errorMessage}`
        toastHandler(
          400,
          "edit Article Failed!",
          message,
          "edit Article Failed!",
        )
      }
      return
    },
    onSuccess: () => {
      toastHandler(
        200,
        "Well Done!",
        "Article Edited successfuly",
        "addArticle-success",
      )
      router.push("/articles")
    },
  })
  return mutation
}

export default useEditArticleApi
